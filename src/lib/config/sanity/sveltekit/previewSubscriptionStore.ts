import type { GroqStore, Subscription } from '@sanity/groq-store';
import { type Aborter, getAborter } from './aborter';
import type { Params, ProjectConfig, SubscriptionOptions } from './types';
import { get, writable } from 'svelte/store';
import { getCurrentUser } from './currentUser';
import { onMount } from 'svelte';

const EMPTY_PARAMS = {};

export function createPreviewSubscriptionStore({
	projectId,
	dataset,
	token,
	EventSource,
	documentLimit = 3000,
}: ProjectConfig & { documentLimit?: number }) {
	// Only construct/setup the store when `getStore()` is called
	let store: Promise<GroqStore>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return function previewSubscriptionStore<R = any>(query: string, options: SubscriptionOptions<R> = {}) {
		const { params = EMPTY_PARAMS, initialData, enabled } = options;

		return querySubscription<R>({
			getStore,
			projectId,
			query,
			params,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			initialData: initialData as any,
			enabled: enabled ? typeof window !== 'undefined' : false,
			token,
		});
	};

	function getStore(abort: Aborter) {
		if (!store) {
			store = import('@sanity/groq-store').then(({ groqStore }) => {
				// Skip creating the groq store if we've been unmounted to save memory and reduce gc pressure
				if (abort.signal.aborted) {
					const error = new Error('Cancelling groq store creation');
					// This ensures we can skip it in the catch block same way
					error.name = 'AbortError';
					return Promise.reject(error);
				}

				return groqStore({
					projectId,
					dataset,
					documentLimit,
					token,
					EventSource,
					listen: true,
					overlayDrafts: true,
					subscriptionThrottleMs: 10,
				});
			});
		}
		return store;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function querySubscription<R = any>(options: {
	getStore: (abort: Aborter) => Promise<GroqStore>;
	projectId: string;
	query: string;
	params: Params;
	initialData: R;
	enabled: boolean;
	token?: string;
}) {
	const { getStore, projectId, query, initialData, enabled = false, token } = options;
	const error = writable<Error>();
	const loading = writable(false);
	const data = writable<R>();
	const params = writable<Params>(options.params);

	onMount(() => {
		if (!enabled) {
			return;
		}

		loading.set(true);

		const aborter = getAborter();
		let subscription: Subscription | undefined;

		getCurrentUser(projectId, aborter, token)
			.then((user) => {
				if (user) {
					return;
				}

				// eslint-disable-next-line no-console
				console.warn('Not authenticated - preview not available');
				throw new Error('Not authenticated - preview not available');
			})
			.then(() => getStore(aborter))
			.then((store) => {
				subscription = store.subscribe(query, get(params), (err, result) => {
					if (err) {
						error.set(err);
					} else {
						data.set(result);
					}
				});
			})
			.catch((err: Error) => (err.name === 'AbortError' ? null : error.set(err)))
			.finally(() => loading.set(false));

		return () => {
			if (subscription) {
				subscription.unsubscribe();
			}

			aborter.abort();
		};
	});

	return {
		data: typeof get(data) === 'undefined' ? writable(initialData) : data,
		error,
		loading,
	};
}

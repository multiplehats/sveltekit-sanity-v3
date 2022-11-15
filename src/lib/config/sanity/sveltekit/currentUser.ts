import type { CurrentUser } from './types';
import { getAborter, type Aborter } from './aborter';
import { derived, writable } from 'svelte/store';
import { onMount } from 'svelte';

export function createCurrentUserStore({ projectId }: { projectId: string; dataset?: string }) {
	return () => currentSanityUserStore(projectId);
}

export async function getCurrentUser(projectId: string, abort: Aborter, token?: string): Promise<CurrentUser | null> {
	const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
	return fetch(`https://${projectId}.api.sanity.io/v1/users/me`, {
		credentials: 'include',
		signal: abort.signal,
		headers,
	})
		.then((res) => res.json())
		.then((res) => (res?.id ? res : null));
}

function currentSanityUserStore(projectId: string) {
	const data = writable<CurrentUser | null>(null);
	const error = writable<Error>();

	onMount(() => {
		const aborter = getAborter();
		getCurrentUser(projectId, aborter)
			.then(data.set)
			.catch((err: Error) => err.name !== 'AbortError' && error.set(err));

		return () => {
			aborter.abort();
		};
	});

	const loading = derived([data, error], ([$data, $error]) => !$data && !$error);

	return { data, error, loading };
}

// function useCurrentUser(projectId: string) {
// 	const [data, setUser] = useState<CurrentUser | null>()
// 	const [error, setError] = useState<Error>()

// 	useEffect(() => {
// 	  const aborter = getAborter()
// 	  getCurrentUser(projectId, aborter)
// 		.then(setUser)
// 		.catch((err: Error) => err.name !== 'AbortError' && setError(err))

// 	  return () => {
// 		aborter.abort()
// 	  }
// 	}, [projectId])

// 	return {data, error, loading: data !== null || !error}
//   }

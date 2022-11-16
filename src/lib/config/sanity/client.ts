import sanityClient from '@sanity/client';
import type { ClientConfig, SanityClient } from '@sanity/client';
import { env } from '$env/dynamic/private';
import { sanityConfig } from './config';

const createClient = (config: ClientConfig): SanityClient => {
	return sanityClient(config);
}

export const previewClient = createClient({
	...sanityConfig,
	useCdn: false,
	token: env.SANITY_API_READ_TOKEN || env.SANITY_API_WRITE_TOKEN || '',
});
export const client = createClient(sanityConfig);
export const getSanityServerClient = (usePreview: boolean) => (usePreview ? previewClient : client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function overlayDrafts(docs: any[]): any[] {
	const documents = docs || [];
	const overlayed = documents.reduce((map, doc) => {
		if (!doc._id) {
			throw new Error('Ensure that `_id` is included in query projection');
		}

		const isDraft = doc._id.startsWith('drafts.');
		const id = isDraft ? doc._id.slice(7) : doc._id;
		return isDraft || !map.has(id) ? map.set(id, doc) : map;
	}, new Map());

	return Array.from(overlayed.values());
}

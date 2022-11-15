import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/client';
import { allPostsQuery } from '$lib/config/sanity/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// export const prerender = 'auto';
export const load: PageServerLoad = async ({ parent, params }) => {
	const posts = await getSanityServerClient(false).fetch(allPostsQuery);

	if (!posts) {
		throw error(500, 'Posts not found');
	}

	return {
		posts
	};
};

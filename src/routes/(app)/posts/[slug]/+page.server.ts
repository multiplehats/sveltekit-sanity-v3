import { getSanityServerClient, overlayDrafts } from '$lib/config/sanity/client';
import { postQuery } from '$lib/config/sanity/queries';
import type { Post } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { previewMode } = await parent();

	const { post, morePosts } = await getSanityServerClient(previewMode).fetch<{
		post: Post;
		morePosts: Post[];
	}>(postQuery, {
		slug: params.slug,
	});

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		previewMode,
		slug: post?.slug || params.slug,
		initialData: {
			post,
			morePosts: overlayDrafts(morePosts),
		},
	};
};

import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';
import { getSanityServerClient } from '$lib/config/sanity/client';
import { postBySlugQuery } from '$lib/config/sanity/queries';
import { setPreviewCookie } from '$lib/utils';

export const GET: RequestHandler = async ({ url, cookies, setHeaders }) => {
	const allParams = url.searchParams;
	const secret = env.VITE_SANITY_PREVIEW_SECRET;
	const incomingSecret = allParams.get('secret');

	setHeaders({
		'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
	});

	if (secret !== incomingSecret || !url.searchParams.has('slug') || !url.searchParams.has('type')) {
		throw error(401, 'Invalid secret');
	}

	const type = allParams.get('type');
	const slug = allParams.get('slug');

	let redirectSlug = '/';

	if (type === 'post') {
		const post = await getSanityServerClient(true).fetch(postBySlugQuery, {
			slug,
		});

		if (!post) {
			throw error(401, 'Invalid slug');
		}

		redirectSlug = `/posts/${post.slug}?isPreview=true`;
	}

	setPreviewCookie(cookies);

	// We don't redirect to request.url.searchParams.get("slug") as that might lead to open redirect vulnerabilities
	throw redirect(302, redirectSlug);
};

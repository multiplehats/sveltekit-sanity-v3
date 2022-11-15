import type { RequestHandler } from './$types';
import { clearPreviewCookie } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, cookies, url }) => {
	const referer = request.headers.get('referer');

	clearPreviewCookie(cookies);

	throw redirect(302, referer || url.origin || '/');
};

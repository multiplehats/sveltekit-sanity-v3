import { getPreviewCookie } from '$lib/utils';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const previewModeCookie = getPreviewCookie(event.cookies);

	event.locals.previewMode = false;

	if (previewModeCookie === 'true') {
		event.locals.previewMode = true;
	}

	const response = await resolve(event);

	return response;
};

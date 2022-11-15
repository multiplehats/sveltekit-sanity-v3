import { isDev } from '$lib/config/environment';
import type { Cookies } from '@sveltejs/kit';

const cookieName = '__preview_mode';

/**
 * Preview mode cookie name.
 *
 * @param cookies The cookies object from the request
 * @returns The cookies object with the preview cookie set
 */
export const setPreviewCookie = (cookies: Cookies) =>
	cookies.set(cookieName, 'true', {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		secure: !isDev,
	});

/**
 * Get the preview mode cookie value.
 *
 * @param cookies The cookies object from the request
 * @returns The preview mode cookie value
 */
export const getPreviewCookie = (cookies: Cookies) => cookies.get(cookieName);

/**
 * Remove the preview mode cookie.
 *
 * @param cookies The cookies object from the request
 * @returns The cookies object with the preview cookie removed
 */
export const clearPreviewCookie = (cookies: Cookies) => {
	cookies.set(cookieName, 'true', {
		httpOnly: true,
		path: '/',
		sameSite: 'strict',
		secure: !isDev,
		expires: new Date(0),
	});
};

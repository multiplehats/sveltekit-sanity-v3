/**
 * This component is responsible for rendering a preview of a post inside the Studio.
 * It's imported in `sanity.config.ts´ and used as a component in the defaultDocumentNode function.
 */
import { Card, Text } from '@sanity/ui';
import React from 'react';

export function PostsPreview(props: unknown) {
	// @ts-expect-error - TODO: Fix this
	if (!props.document.displayed.slug) {
		return (
			<Card tone="primary" margin={5} padding={6}>
				<Text align="center">Please add a slug to the post to see the preview!</Text>
			</Card>
		);
	}

	return (
		<Card scheme="light" style={{ width: '100%', height: '100%' }}>
			{/* @ts-expect-error - TODO: Fix this */}
			<iframe style={{ width: '100%', height: '100%' }} src={getUrl(props)} />
		</Card>
	);
}

// @ts-expect-error - TODO: Fix this
function getUrl({ document }) {
	const url = new URL('/api/preview', location.origin);
	const secret = import.meta.env.VITE_SANITY_PREVIEW_SECRET;

	if (secret) {
		url.searchParams.set('secret', secret);
	}

	url.searchParams.set('slug', document.displayed.slug.current);
	url.searchParams.set('type', document.displayed._type);

	// Needed to break the cache.
	url.searchParams.set('random', Math.random().toString(36).substring(7));

	return url.toString();
}

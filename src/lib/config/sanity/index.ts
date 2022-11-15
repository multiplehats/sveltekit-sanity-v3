import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { createPreviewSubscriptionStore } from './sveltekit/previewSubscriptionStore';
import { sanityConfig } from './config';
import { createCurrentUserStore } from './sveltekit/currentUser';

export const previewSubscription = createPreviewSubscriptionStore(sanityConfig);
export const imageBuilder = createImageUrlBuilder(sanityConfig);

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlForImage = (source: SanityImageSource) => {
	return imageBuilder.image(source).auto('format').fit('max');
};

export const sanityUser = createCurrentUserStore(sanityConfig);

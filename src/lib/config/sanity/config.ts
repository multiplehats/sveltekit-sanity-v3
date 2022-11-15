import { isProd } from '$lib/config/environment';

export const sanityConfig = {
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
	dataset: import.meta.env.VITE_SANITY_DATASET,
	useCdn: typeof document !== 'undefined' && isProd,
	// useCdn == true gives fast, cheap responses using a globally distributed cache.
	// When in production the Sanity API is only queried on build-time, and on-demand when responding to webhooks.
	// Thus the data need to be fresh and API response time is less important.
	// When in development/working locally, it's more important to keep costs down as hot reloading can incurr a lot of API calls
	// And every page load calls getStaticProps.
	// To get the lowest latency, lowest cost, and latest data, use the Instant Preview mode
	apiVersion: '2022-03-13',
	// see https://www.sanity.io/docs/api-versioning for how versioning works
};

import { defineConfig, type Slug } from 'sanity'
import { PostsPreview } from './components/PostsPreview';
import app from '../app';

/*-------------- PLUGINS --------------*/
import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
/*------------------------------------*/

/*-------------- SCHEMAS --------------*/
import authorType from '$lib/config/sanity/schemas/author';
import postType from '$lib/config/sanity/schemas/post';
/*------------------------------------*/

export default defineConfig({
	basePath: '/studio',
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
	dataset: import.meta.env.VITE_SANITY_DATASET,
	title: app.appName + ' - Studio',
	schema: {
		// If you want more content types, you can add them to this array
		types: [ postType, authorType]
	},
	plugins: [
		deskTool({
			// `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
			// You can add any React component to `S.view.component` and it will be rendered in the pane
			// and have access to content in the form in real-time.
			// It's part of the Studio's “Structure Builder API” and is documented here:
			// https://www.sanity.io/docs/structure-builder-reference
			defaultDocumentNode: (S, { schemaType }) => {
				if (schemaType === 'post') {
					return S.document().views([S.view.form(), S.view.component(PostsPreview).title('Preview')]);
				}

				return null;
			},
		}),
		// Add an image asset source for Unsplash
		unsplashImageAsset(),
		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({
			defaultApiVersion: '2022-08-08',
		}),
	],
	document: {
		productionUrl: async (prev, { document }) => {
			const url = new URL('/api/preview', location.origin);
			const secret = import.meta.env.VITE_SANITY_PREVIEW_SECRET;
			if (secret) {
				url.searchParams.set('secret', secret);
			}

			try {
				switch (document._type) {
					case postType.name:
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						url.searchParams.set('slug', (document.slug as Slug).current!);
						break;
					default:
						return prev;
				}
				return url.toString();
			} catch {
				return prev;
			}
		},
	},
})

import { defineConfig } from 'cypress';

export default defineConfig({
	video: true,
	screenshotOnRunFailure: true,

	e2e: {
		baseUrl: 'http://localhost:3000/',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});

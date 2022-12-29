import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';
import aspectRatio from 'windicss/plugin/aspect-ratio';

export default defineConfig({
	darkMode: 'class',
	extract: {
		include: ['src/**/*.{html,svx,svelte}'],
	},
	plugins: [
		typography({
			dark: true,
		}),
		aspectRatio,
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		extend: {
			colors: {
				discord: '#5865F2',
				dark: {
					50: 'hsl(240, 4%, 29%)',
					100: 'hsl(240, 7%, 24%)',
					200: 'hsl(240, 10%, 20%)',
					300: 'hsl(240, 13%, 18%)',
					400: 'hsl(240, 13%, 13%)',
					500: 'hsl(240, 15%, 12%)',
					600: 'hsl(240, 18%, 11%)',
					700: 'hsl(240, 21%, 11%)',
					800: 'hsl(240, 24%, 9%)',
					900: 'hsl(240, 27%, 6%)',
				},
				gray: {
					50: 'hsl(240, 6%, 98%)',
					100: 'hsl(240, 6%, 95%)',
					200: 'hsl(240, 6%, 87%)',
					300: 'hsl(240, 6%, 78%)',
					400: 'hsl(240, 6%, 65%)',
					500: 'hsl(240, 6%, 55%)',
					600: 'hsl(240, 7%, 45%)',
					700: 'hsl(240, 8%, 35%)',
					800: 'hsl(240, 11%, 22%)',
					900: 'hsl(240, 18%, 15%)',
				},
				primary: {
					50: 'hsl(240, 70%, 95%)',
					100: 'hsl(240, 70%, 85%)',
					200: 'hsl(240, 70%, 75%)',
					300: 'hsl(240, 70%, 65%)',
					400: 'hsl(240, 60%, 52%)',
					500: 'hsl(240, 55%, 43%)',
					600: 'hsl(240, 50%, 32%)',
					700: 'hsl(240, 45%, 28%)',
					800: 'hsl(240, 40%, 16%)',
					900: 'hsl(240, 43%, 9%)',
				},
			},
		},
	},
});

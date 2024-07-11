import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import catppuccinDaisy from '@catppuccin/daisyui';
import catppuccinTw from '@catppuccin/tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Fira Sans'],
			mono: ['Fira Code Variable']
		}
	},
	plugins: [daisyui, catppuccinTw({ defaultFlavour: 'mocha' })],
	darkMode: 'media',
	daisyui: {
		themes: [catppuccinDaisy('mocha', 'mauve')]
	}
} satisfies Config;

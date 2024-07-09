import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import catppuccin from '@catppuccin/daisyui'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Fira Sans'],
      mono: ['Fira Code Variable']
    }
  },
  plugins: [daisyui],
  darkMode: 'media',
  daisyui: {
    themes: [catppuccin('mocha', 'mauve')],
  }
} satisfies Config


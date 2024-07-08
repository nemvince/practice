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
  daisyui: {
    themes: [
      {
        mocha: {
          "primary": "#f5e0dc",    // Rosewater
          "secondary": "#f2cdcd",  // Flamingo
          "accent": "#cba6f7",     // Mauve
          "neutral": "#313244",    // Surface0
          "base-100": "#1e1e2e",   // Base
          "base-200": "#181825",   // Mantle
          "base-300": "#11111b",   // Crust
          "info": "#89dceb",       // Sky
          "success": "#a6e3a1",    // Green
          "warning": "#fab387",    // Peach
          "error": "#f38ba8"       // Red
        },
        latte: {
          "primary": "#dc8a78",    // Rosewater
          "secondary": "#dd7878",  // Flamingo
          "accent": "#8839ef",     // Mauve
          "neutral": "#ccd0da",    // Surface0
          "base-100": "#eff1f5",   // Base
          "base-200": "#e6e9ef",   // Mantle
          "base-300": "#dce0e8",   // Crust
          "info": "#04a5e5",       // Sky
          "success": "#40a02b",    // Green
          "warning": "#fe640b",    // Peach
          "error": "#d20f39"       // Red
        }
      }
    ],
  }
} satisfies Config


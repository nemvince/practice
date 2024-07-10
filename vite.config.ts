import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			plugins: [
				copy({
					targets: [{ src: 'node_modules/tinymce/**/*', dest: 'static/tinymce' }]
				})
			]
		}
	}
});

<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import '@catppuccin/highlightjs/css/catppuccin-mocha.css';

	const code = `
  import { Router } from '@sveltejs/kit';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    page.set({ title: 'Page Route' });
  });
  `;
</script>

<div>Welcome to the page route!</div>

<Highlight language={typescript} {code} />

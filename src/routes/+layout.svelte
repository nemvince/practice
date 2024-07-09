<script lang="ts">
	import Nav from '$lib/components/nav/Nav.svelte';

	import '$lib/app.css';
	import type { LayoutData } from './$types';
	import Auth from '$lib/views/Auth.svelte';

	export let data: LayoutData;
</script>

<main class="min-h-screen">
	{#if data.user}
		<Nav user={data.user} />

		<slot />
	{:else}
		<Auth />
	{/if}
</main>

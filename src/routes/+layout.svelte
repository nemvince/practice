<script lang="ts">
	import { Toaster } from 'svelte-sonner';

	import '$lib/app.css';
	import type { LayoutData } from './$types';
	import Nav from '$lib/components/nav/Nav.svelte';
	import Auth from '$lib/views/Auth.svelte';

	export let data: LayoutData;
</script>

<Toaster />
<main class="min-h-screen">
	{#if data.user}
		<Nav user={data.user} />

		<slot />
	{:else}
		<Auth />
	{/if}
</main>

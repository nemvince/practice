<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import Icon from '@iconify/svelte';

	import '$lib/app.css';
	import type { LayoutData } from './$types';
	import Nav from '$lib/components/nav/Nav.svelte';
	import Auth from '$lib/views/Auth.svelte';

	export let data: LayoutData;
</script>

<Toaster
	toastOptions={{
		unstyled: false,
		classes: {
			toast: 'bg-base-200 border-primary',
			title: 'text-primary',
			description: 'text-primary',
			actionButton: 'text-primary',
			cancelButton: 'text-primary',
			closeButton: 'text-primary',
			action: 'text-primary'
		}
	}}
>
	<Icon
		icon="mingcute:loading-3-fill"
		class="animate-spin text-primary text-xl"
		slot="loading-icon"
	/>
	<Icon icon="mdi:success-circle" class="text-primary text-xl" slot="success-icon" />
	<Icon icon="ooui:error" class="text-primary text-xl" slot="error-icon" />
	<Icon icon="mdi:information-outline" class="text-primary text-xl" slot="info-icon" />
	<Icon icon="bxs:error" class="text-primary text-xl" slot="warning-icon" />
</Toaster>
<main class="min-h-screen">
	{#if data.user}
		<Nav user={data.user} />

		<slot />
	{:else}
		<Auth />
	{/if}
</main>

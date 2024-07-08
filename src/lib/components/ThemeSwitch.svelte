<script lang="ts">
	import '$lib/app.css';

	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
</script>

<label class="flex cursor-pointer gap-1.5 text-base-content">
	<Icon icon="material-symbols:sunny-rounded" class="text-xl" />
	<input
		type="checkbox"
		data-toggle-theme="latte,mocha"
		class="toggle bg-base-content transition"
	/>
	<Icon icon="material-symbols:clear-night" class="text-xl" />
</label>

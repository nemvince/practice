<script>
	import Icon from '@iconify/svelte';

	export let href = '/';
	export let icon = 'ph:question';
	export let text = '';
</script>

<li>
	<a {href}>
		<div class="flex items-center gap-1">
			<Icon {icon} class="text-xl w-6" />
			<span>{text}</span>
		</div>
	</a>
</li>

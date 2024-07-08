<script lang="ts">
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';

	import '$lib/app.css';

</script>

<div class="transition-all">
	<header class="flex">
		<div class="navbar bg-base-200 m-2 rounded-xl flex justify-between">
			<a class="btn btn-ghost text-xl font-bold" href="/">Practice</a>
			<nav>
				<ul class="menu menu-horizontal items-center gap-3">
					<li>About</li>
					<li>Portfolio</li>
					<li>
						<ThemeSwitch />
					</li>
				</ul>
			</nav>
		</div>
	</header>
	<slot />
</div>

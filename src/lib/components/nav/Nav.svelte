<script lang="ts">
	import type { User } from 'lucia';
	import Item from '$lib/components/nav/menu/Item.svelte';

	export let user: User;
</script>

<header class="flex">
	<div class="navbar bg-base-200 m-2 rounded-xl flex justify-between">
		<a class="btn btn-ghost text-xl font-bold" href="/">Practice</a>
		<nav>
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img alt="?" src={user.avatarUrl} />
					</div>
				</div>

				<div
					tabindex="-1"
					class="menu menu-sm dropdown-content bg-base-200 rounded-xl z-[1] mt-3 w-56 px-1 py-1 shadow"
				>
					<ul class="space-y-1">
						<Item href="/profile" icon="mdi:user" text={user.name || user.username} />
						<Item href="/settings" icon="mdi:cog" text="Settings" />
						<Item href="/auth/logout" icon="mdi:logout" text="Logout" />
					</ul>
				</div>
			</div>
		</nav>
	</div>
</header>

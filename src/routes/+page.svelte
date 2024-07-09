<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{JSON.stringify(data)}

<form method="post" use:enhance>
	<button>Sign out</button>
</form>

<button
	on:click={() => {
		goto('/auth/login/github');
	}}>Sign in</button
>

<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Practice</title>
</svelte:head>

<div class="flex items-center justify-center">
  <pre>
		{JSON.stringify(data, null, 2)}
	</pre>
</div>
<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
</script>

<div class="w-svw min-h-svh flex flex-col gap-3 items-center justify-center">
  <div class="flex items-center gap-3">
    <h1 class="text-4xl font-bold">{$page.status.toFixed()}</h1>
    <div class="">
      <p>Whoops...</p>
      <pre class="text-lg">{$page.error?.message || 'asd'}</pre>
    </div>
  </div>
  <button
    class="btn"
    on:click={() => {
      goto('/');
    }}>Go home</button
  >
</div>

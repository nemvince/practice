<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
</script>


<svelte:head>
  <title>Log in</title>
</svelte:head>

<div class="w-full h-screen">
  <div class="flex items-center justify-center h-full">
    <div class="bg-base-200 space-y-6 rounded-lg shadow-lg min-w-72 p-6">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold flex justify-center items-center gap-1">
          <Icon icon="material-symbols:lock" />
          Auth
        </h1>
        <p class="text-gray-500 dark:text-gray-400">Please log in to continue</p>
      </div>

      <div class="space-y-4 justify-center flex">
        <button
          on:click={() => {
            goto(`/auth/login/github?redirectTo=${$page.url}`);
          }}
          class="btn btn-primary"
        >
          <Icon icon="akar-icons:github-fill" class="text-2xl" />
          Github
        </button>
      </div>
    </div>
  </div>
</div>

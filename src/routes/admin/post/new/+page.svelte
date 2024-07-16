<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import EditorWrapper from '$lib/components/editor/EditorWrapper.svelte';

  import { toast } from 'svelte-sonner';

  let form: HTMLFormElement;
  let title = '';
  let publish: false;
  let buttonText = 'Save as draft';
  let isLoading = false;
  let postContent = '';

  $: buttonText = publish ? 'Publish' : 'Save as draft';

  const handleDoneButton = () => {
    if (buttonText === 'You sure?') {
      form.requestSubmit();
      return;
    }
    if (publish) {
      buttonText = 'You sure?';
    } else {
      form.requestSubmit();
    }
  };
</script>

<svelte:head>
  <title>{title ? `Editing ${title}` : 'Create new Post'}</title>
</svelte:head>

<form
  bind:this={form}
  method="post"
  enctype="multipart/form-data"
  class="flex flex-col gap-4 px-8 pt-6"
  use:enhance={({ formData, cancel }) => {
    isLoading = true;
    if (!formData.get('title') || !formData.get('content')) {
      toast.error(
        `Please fill all required fields, missing ${!formData.get('title') ? 'title' : 'content'}`
      );
      isLoading = false;
      cancel();
    }

    return async ({ result }) => {
      if (result.type === 'success') {
        toast.success(`Post ${publish ? 'published' : 'saved as draft'}!`);
        goto('/admin/posts');
      } else if (result.type === 'failure') {
        toast.error('Failed to create post');
      }
      isLoading = false;
    };
  }}
>
  <div class="flex justify-center gap-3">
    <input
      name="title"
      type="text"
      placeholder="Title"
      bind:value={title}
      class="input input-bordered w-full"
    />

    <input
      name="files"
      type="file"
      class="file-input file-input-bordered w-full max-w-xs font-semibold"
      multiple
    />
  </div>

  <div class="">
    <textarea name="content" class="hidden" bind:value={postContent}></textarea>
    <EditorWrapper bind:content={postContent} />
  </div>

  <div class="flex justify-between">
    <label class="label cursor-pointer w-40">
      <span class="label-text">Publish instantly?</span>
      <input
        type="checkbox"
        bind:checked={publish}
        name="publish"
        class="checkbox checkbox-primary"
      />
    </label>
    <button
      type="button"
      on:click={handleDoneButton}
      class="btn w-32"
      class:btn-primary={!publish}
      class:btn-warning={publish}
      disabled={isLoading}
    >
      {#if isLoading}
        <span class="loading loading-infinity loading-lg"></span>
      {:else}
        {buttonText}
      {/if}
    </button>
  </div>
</form>

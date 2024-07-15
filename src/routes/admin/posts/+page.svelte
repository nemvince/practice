<script lang="ts">
  import Icon from '@iconify/svelte';
  import { enhance } from '$app/forms';
  import { goto, invalidateAll } from '$app/navigation';
  import { toast } from 'svelte-sonner';
  export let data;
</script>

<article class="px-8 my-4 flex flex-col gap-4">
  {#each data.posts as post}
    {@const san = post.content?.replace(/<[^>]*>/g, '')}
    <div class="card lg:card-side bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between">
          <h2 class="card-title">{post.title}</h2>
          <div class="flex gap-2">
            <form
              method="post"
              action="?/changePublish"
              use:enhance={({ formElement, formData, action, cancel, submitter }) => {
                formData.append('id', post.id);

                return async ({ result }) => {
                  if (result.type === 'success') {
                    toast.success(`Post ${!post.published ? 'published' : 'unpublished'}!`);
                    invalidateAll();
                  } else if (result.type === 'failure') {
                    toast.error('Failed to update post');
                  }
                };
              }}
            >
              <div
                class="tooltip"
                class:tooltip-primary={!post.published}
                class:tooltip-warning={post.published}
                data-tip={post.published ? 'Unpublish' : 'Publish'}
              >
                <button
                  type="submit"
                  class="btn btn-outline btn-square btn-sm"
                  class:btn-primary={!post.published}
                  class:btn-warning={post.published}
                >
                  <Icon
                    icon={post.published
                      ? 'material-symbols:unpublished'
                      : 'material-symbols:publish'}
                    class="text-lg"
                  />
                </button>
              </div>
            </form>

            <div class="tooltip tooltip-accent" data-tip="Edit">
              <button
                class="btn btn-outline btn-accent btn-square btn-sm"
                on:click={() => {
                  goto(`/admin/post/edit/${post.id}`);
                }}
              >
                <Icon icon="mdi:edit" class="text-lg" />
              </button>
            </div>

            <form
              method="post"
              action="?/delete"
              use:enhance={({ formElement, formData, action, cancel, submitter }) => {
                formData.append('id', post.id);

                return async ({ result }) => {
                  if (result.type === 'success') {
                    toast.success(`Post deleted!`);
                    invalidateAll();
                  } else if (result.type === 'failure') {
                    toast.error('Failed to update post');
                  }
                };
              }}
            >
              <div class="tooltip tooltip-error" data-tip="Delete">
                <button class="btn btn-outline btn-error btn-square btn-sm">
                  <Icon icon="mdi:delete" class="text-lg" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex gap-3">
          {#if post.published}
            <div class="badge badge-primary">Published</div>
          {/if}
          {#if post.fileIDs.length > 0}
            <div class="badge badge-accent">
              {post.fileIDs.length}
              {post.fileIDs.length > 1 ? 'files' : 'file'}
            </div>
          {/if}
        </div>
        <p>
          <!-- dirty hack -->
          {#if san}
            {@html san.substring(0, 96) + (san.length > 96 ? '...' : '')}
          {:else}
            <p>Congrats, you somehow made an empty post!</p>
          {/if}
        </p>
      </div>
    </div>
  {/each}
</article>

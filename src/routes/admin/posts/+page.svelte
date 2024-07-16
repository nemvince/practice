<script lang="ts">
  import Icon from '@iconify/svelte';
  import { enhance } from '$app/forms';
  import { goto, invalidateAll } from '$app/navigation';
  import { toast } from 'svelte-sonner';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  dayjs.extend(relativeTime);

  export let data;
</script>

<svelte:head>
  <title>My posts</title>
</svelte:head>

<article class="px-8 my-4 flex flex-col gap-4 max-w-4xl mx-auto">
  {#each data.posts as post}
    {@const san = post.content?.replace(/<[^>]*>/g, '')}
    <div class="card lg:card-side bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <div class="max-w-md">
              <h2 class="card-title">{post.title}</h2>
            </div>
            <div class="flex gap-2">
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
          </div>
          <div class="flex gap-2">
            <form
              method="post"
              action="?/changePublish"
              use:enhance={({ formData }) => {
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
              use:enhance={({ formData }) => {
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
        <div class="text-secondary text-sm -mt-2">Last updated {dayjs().to(post.updatedAt)}</div>

        <p>
          <!-- dirty hack -->
          {#if san}
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html san.substring(0, 96) + (san.length > 96 ? '...' : '')}
          {:else}
            <p>Congrats, you somehow made an empty post!</p>
          {/if}
        </p>
      </div>
    </div>
  {:else}
    <div class="flex flex-col gap-3 items-center justify-center">
      <p>You don't have any posts yet!</p>
      <button
        class="btn btn-primary"
        on:click={() => {
          goto('/admin/post/new');
        }}>New post</button
      >
    </div>
  {/each}
</article>

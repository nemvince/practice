<script lang="ts">
  import type { PageData } from './$types';

  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);

  export let data: PageData;
</script>

<svelte:head>
  <title>Practice</title>
</svelte:head>
<article class="px-8 my-4 flex flex-col gap-4 max-w-4xl flex-grow mx-auto">
  {#each data.feed as post}
    {@const san = post.content?.replace(/<[^>]*>/g, '')}
    <div class="card lg:card-side bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <a href={`/posts/${post.id}`}>
            <h2 class="card-title">{post.title}</h2>
          </a>
          <div class="flex items-center gap-2">
            <div class="text-right">
              <p class="font-semibold">{post.author.name}</p>
              <span class="text-secondary text-sm">{dayjs().to(post.updatedAt)}</span>
            </div>
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img alt="?" src={post.author.avatar_url} />
              </div>
            </div>
          </div>
        </div>
        <p>
          {#if san}
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html san.substring(0, 96) + (san.length > 96 ? '...' : '')}
          {:else}
            <p>Well, this post is empty...</p>
          {/if}
        </p>
      </div>
    </div>
  {:else}
    <div class="flex justify-center items-center">
      <h1>Woah, this is empty...</h1>
    </div>
  {/each}
</article>

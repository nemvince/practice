<script lang="ts">
  import type { PageServerData } from './$types';
  export let data: PageServerData;

  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);
</script>

<svelte:head>
  <title>{data.post.title}</title>
</svelte:head>

<div class="max-w-3xl flex flex-col mx-auto">
  <div class="flex items-end pt-10">
    <div class="max-w-3xl space-y-4 text-primary-foreground">
      <h1 class="text-3xl font-bold">
        {data.post.title}
      </h1>
      <div class="flex items-center space-x-3">
        <span class="relative flex h-10 w-10 overflow-hidden rounded-full">
          <img class="aspect-square h-full w-full" src={data.post.author.avatar_url} />
        </span>
        <div class="text-sm">
          <div class="font-medium">{data.post.author.name}</div>
          <div class="text-secondary">{dayjs().to(data.post.updatedAt)}</div>
        </div>
      </div>
    </div>
  </div>

  <article class="pb-10 pt-6">
    <style>
      #content p {
        @apply text-justify;
      }

      #content h1 {
        @apply text-2xl font-bold;
      }

      #content h2 {
        @apply text-xl font-bold;
      }

      #content h3 {
        @apply text-lg font-bold;
      }

      #content pre:has(code) {
        @apply mockup-code bg-base-200 text-base-content;
      }

      #content pre:has(code) code {
        @apply pl-6;
      }

      #content code {
        @apply bg-base-200;
      }

      #content div {
        @apply mt-3;
      }
    </style>
    <div id="content" class="prose max-w-none">
      {@html data.post.content}
    </div>
  </article>
</div>

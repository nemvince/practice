<script lang="ts">
  import type { PageServerData } from './$types';
  import { Carta, Markdown } from 'carta-md';
  export let data: PageServerData;

  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);

  import { carta } from '$lib/components/editor/carta';
  import { PreRendered } from 'carta-md';
</script>

<svelte:head>
  <title>{data.post.title}</title>
</svelte:head>

<div class="max-w-4xl flex flex-col mx-auto">
  <div class="flex items-end pt-10">
    <div class="max-w-3xl space-y-4 text-primary-foreground">
      <h1 class="text-5xl font-bold">
        {data.post.title}
      </h1>
      <div class="flex items-center space-x-3">
        <span class="relative flex h-10 w-10 overflow-hidden rounded-full">
          <img class="aspect-square h-full w-full" src={data.post.author.avatar_url} alt="Avatar" />
        </span>
        <div class="text-sm">
          <div class="font-medium">{data.post.author.name}</div>
          <div class="text-secondary">{dayjs().to(data.post.updatedAt)}</div>
        </div>
      </div>
    </div>
  </div>

  <article class="pb-10 pt-6 prose max-w-none">
    <PreRendered html={data.rendered} />
  </article>
</div>

<script lang="ts">
    export let data;
</script>

<article class="px-8 my-4 flex flex-col gap-4">
{#each data.posts as post}
<div class="card lg:card-side bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title"><a href="/admin/post/edit/{post.id}">
        {post.title}</a>
      </h2>
      <div class="flex gap-3">
        {#if post.published}
        <div class="badge badge-primary">Published</div>
      {/if}
      {#if post.fileIDs.length > 0}
        <div class="badge badge-accent">{post.fileIDs.length} {post.fileIDs.length > 1 ? 'files' : 'file'}</div>
      {/if}
      </div>
      <p>
        {@html post.content}
      </p>
    </div>
  </div>
{/each}
</article>

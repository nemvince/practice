<script lang="ts">
  export let content: string = '';

  import { carta } from '$lib/components/editor/carta';
  import { MarkdownEditor } from 'carta-md';
  import '$lib/components/editor/theme.scss';
</script>

<div class="bg-base-200 shadow-lg">
  <MarkdownEditor {carta} bind:value={content} mode="tabs" theme="catppuccin-mocha" />
</div>

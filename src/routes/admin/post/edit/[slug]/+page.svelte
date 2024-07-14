<script lang="ts">
	import { enhance } from '$app/forms';
	import EditorWrapper from '$lib/components/editor/EditorWrapper.svelte';

	export let data: PageServerData;

	import { toast } from 'svelte-sonner';
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';

	let form: HTMLFormElement;
	let title = data.post.title;
	let publish = data.post.published;
	let postContent = data.post.content;
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
		if (!formData.get('title') || !formData.get('content')) {
			toast.error(
				`Please fill all required fields, missing ${!formData.get('title') ? 'title' : 'content'}`
			);
			cancel();
		}

		formData.append('id', data.post.id);
		formData.append('publish', publish ? 'on' : '');

		return async ({ result }) => {
			if (result.type === 'success') {
				toast.success(`Post updated${publish ? ' and published!' : ''}!`);
				goto(publish ? `/posts/${data.post.id}` : `/admin/posts`)
			} else if (result.type === 'failure') {
				toast.error('Failed to update post');
			}
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

		<!-- TODO: file editing -->
		<!-- <input
			name="files"
			type="file"
			class="file-input file-input-bordered w-full max-w-xs font-semibold"
			multiple
		/> -->
	</div>

	<div class="">
		<textarea name="content" id="editor" class=""></textarea>
		<EditorWrapper content={postContent} />
	</div>

	<div class="flex justify-end gap-3">
		<button
			class="btn"
			class:btn-primary={!publish}
			class:btn-warning={publish}
			type="button"
			on:click={() => {
				publish = !publish;
			}}
		>
			{publish ? 'Published' : 'Draft'}
		</button>
		<button type="submit" class="btn" class:btn-primary={!publish} class:btn-warning={publish}>
			Update
		</button>
	</div>
</form>

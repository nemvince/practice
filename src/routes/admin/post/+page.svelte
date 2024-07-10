<script lang="ts">
	import { enhance } from '$app/forms';

	import Editor from '@tinymce/tinymce-svelte';

	import { toast } from 'svelte-sonner';
</script>

<form
	method="post"
	enctype="multipart/form-data"
	use:enhance={({ formData, cancel }) => {
		if (!formData.get('title') || !formData.get('content')) {
			toast.error('Please fill all required fields');
			cancel();
		}

		return async ({ result }) => {
			if (result.type === 'success') {
				toast.success('Post created!');
			} else if (result.type === 'error') {
				toast.error('Failed to create post');
			}
		};
	}}
>
	<div class="flex justify-center gap-3">
		<input
			name="title"
			type="text"
			placeholder="Title"
			class="input input-bordered w-full max-w-xs"
		/>

		<input
			name="files"
			type="file"
			class="file-input file-input-bordered w-full max-w-xs"
			multiple
		/>
	</div>

	<label>
		Content
		<textarea name="content"></textarea>
	</label>
	<button type="submit">Submit</button>
</form>

<Editor scriptSrc="/tinymce/tinymce.min.js" />

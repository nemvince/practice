<script lang="ts">
	import EditorInit from '@tinymce/tinymce-svelte';
	import type { Editor } from 'tinymce';

	const onEditorSetup = (editor: Editor) => {
		editor.on('change', () => {
			editor.save();
		});
	};
</script>

<EditorInit
	cssClass="hidden"
	scriptSrc="/editor/tinymce/tinymce.min.js"
	conf={{
		license_key: 'gpl',
		selector: 'textarea#editor',
		skin_url: '/editor/skins/ui/CUSTOM',
		skin: 'CUSTOM',
		content_css: '/editor/skins/content/CUSTOM/content.min.css',
		promotion: false,
		branding: false,
		height: 800,
		setup: onEditorSetup
	}}
/>

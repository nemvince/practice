<script lang="ts">
  import EditorInit from '@tinymce/tinymce-svelte';
  import type { Editor } from 'tinymce';

  export let content: string | null = null;

  const onEditorSetup = (editor: Editor) => {
    console.log(content);
    editor.on('change', () => {
      editor.save();
    });
    editor.on('init', () => {
      editor.setContent(content || '');
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

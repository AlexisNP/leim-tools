<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { ListItem } from '@tiptap/extension-list'
import StarterKit from '@tiptap/starter-kit'
import { PhArrowUDownRight, PhArrowUUpLeft, PhListBullets, PhListNumbers, PhQuotes, PhTextB, PhTextItalic, PhTextStrikethrough, PhTextTSlash } from '@phosphor-icons/vue'

const model = defineModel()

const editor = useEditor({
  content: model.value,
  extensions: [
    StarterKit,
    ListItem.configure({

    })
  ],

  onUpdate: ({ editor }) => {
    model.value = editor.getHTML()
  }
})

function clearFormatting() {
  editor.value.chain().focus().unsetAllMarks().run()
  editor.value.chain().focus().clearNodes().run()
}
</script>

<template>
  <div v-if="editor">
    <!-- Toolbar -->
    <div class="flex gap-1.5">
      <!-- Inline styles -->
      <div class="flex">
        <UiButton
          @click.prevent="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :variant="editor.isActive('bold') ? 'default' : 'secondary'"
          class="size-7 rounded-e-none"
          size="icon"
        >
          <PhTextB weight="bold" />
        </UiButton>

        <UiButton
          @click.prevent="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :variant="editor.isActive('italic') ? 'default' : 'secondary'"
          class="size-7 rounded-none"
          size="icon"
        >
          <PhTextItalic weight="bold" />
        </UiButton>

        <UiButton
          @click.prevent="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :variant="editor.isActive('strike') ? 'default' : 'secondary'"
          class="size-7 rounded-none"
          size="icon"
        >
          <PhTextStrikethrough weight="bold" />
        </UiButton>

        <UiButton
          @click.prevent="clearFormatting"
          variant="secondary"
          class="size-7 rounded-s-none"
          size="icon"
        >
          <PhTextTSlash weight="bold" />
        </UiButton>
      </div>

      <!-- Block styles -->
      <div class="flex">
        <UiButton
          @click.prevent="editor.chain().focus().toggleBulletList().run()"
          :variant="editor.isActive('bulletList') ? 'default' : 'secondary'"
          variant="secondary"
          class="size-7 rounded-e-none"
          size="icon"
        >
          <PhListBullets weight="bold" />
        </UiButton>

        <UiButton
          @click.prevent="editor.chain().focus().toggleOrderedList().run()"
          :variant="editor.isActive('orderedList') ? 'default' : 'secondary'"
          variant="secondary"
          class="size-7 rounded-none"
          size="icon"
        >
          <PhListNumbers weight="bold" />
        </UiButton>

        <UiButton
          @click.prevent="editor.chain().focus().toggleBlockquote().run()"
          :variant="editor.isActive('blockquote') ? 'default' : 'secondary'"
          variant="secondary"
          class="size-7 rounded-s-none"
          size="icon"
        >
          <PhQuotes weight="fill" />
        </UiButton>
      </div>

      <div class="flex">
        <UiButton
          @click.prevent="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
          variant="secondary"
          class="size-7 rounded-e-none"
          size="icon"
        >
          <PhArrowUUpLeft weight="bold" />
        </UiButton>

        <UiButton
          @click.prevent="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
          variant="secondary"
          class="size-7 rounded-s-none"
          size="icon"
        >
          <PhArrowUDownRight weight="bold" />
        </UiButton>
      </div>
    </div>

    <EditorContent
      :editor
      class="overflow-y-auto md:text-sm border-b-1 border-border"
    />
  </div>
</template>

<style lang="scss">
.tiptap,
.content-editor {
  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }
}

/* Basic editor styles */
.tiptap {
  padding-block: 0.75rem;

  :first-child {
    margin-top: 0;
  }
}
</style>

<script lang="ts" setup>
import { PhCaretDown } from '@phosphor-icons/vue';
import type { Category } from '~/models/Category';

const props = defineProps<{
  placeholder?: string
  multiple?: boolean
}>()

const model = defineModel<Category[] | Category>()

const { categories: availableCategories } = useCalendarEvents()

const isPopoverOpen = ref<boolean>(false)

function handleCatSelect() {
  if (!props.multiple) {
    isPopoverOpen.value = false
  }
}

const computedTextValue = computed(() => {
  if (model.value) {
    if ("name" in model.value) {
      return model.value.name
    } else {
      return model.value[0].name
    }
  } else {
    return props.placeholder
  }
})
</script>

<template>
  <UiPopover v-model:open="isPopoverOpen">
    <UiPopoverTrigger as-child>
      <UiButton
        variant="outline"
        role="combobox"
        class="w-fit max-w-full justify-between capitalize"
      >
        {{ computedTextValue }}

        <PhCaretDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent
      :align="'start'"
      class="w-fit p-0"
    >
      <UiCommand v-model="model" :multiple>
        <UiCommandInput placeholder="Rechercher les catégories" />
        <UiCommandEmpty>Aucune catégorie trouvée.</UiCommandEmpty>
        <UiCommandList>
          <UiCommandGroup>
            <UiCommandItem
              v-for="category in availableCategories"
              :key="category.id"
              :value="category"
              @select="handleCatSelect"
            >
              <span class="capitalize">
                {{ category.name }}
              </span>
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>

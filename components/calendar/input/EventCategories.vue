<script lang="ts" setup>
import { PhCaretDown } from '@phosphor-icons/vue';
import type { Category } from '~/models/Category';

const isPopoverOpen = ref<boolean>(false)

const props = defineProps<{
  placeholder?: string
  multiple?: boolean
}>()

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

const model = defineModel<Category[] | Category>()

const { categories: availableCategories } = useCalendarEvents()

const searchTerm = ref<string>('')

function handleCatSelect() {
  if (!props.multiple) {
    isPopoverOpen.value = false
  }
}

const filteredCategories = computed(() =>
  searchTerm.value === ''
    ? availableCategories
    : availableCategories.filter((category) => {
      return category.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    })
)
</script>

<template>
  <UiPopover v-model:open="isPopoverOpen">
    <UiPopoverTrigger as-child>
      <UiButton
        variant="outline"
        role="combobox"
        class="w-fit max-w-full justify-between"
      >
        {{ computedTextValue }}

        <PhCaretDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent
      align="start"
      side="bottom"
      :collision-padding="50"
      class="w-fit h-[33vh] p-0"
    >
      <UiCommand v-model="model" v-model:searchTerm="searchTerm" :multiple>
        <UiCommandInput placeholder="Rechercher les catégories" />
        <UiCommandEmpty>Aucune catégorie trouvée.</UiCommandEmpty>
        <UiCommandList>
          <UiCommandGroup>
            <UiCommandItem
              v-for="category in filteredCategories"
              :key="category.id"
              :value="category"
              class="cursor-pointer"
              @select="handleCatSelect"
            >
              {{ category.name }}
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>

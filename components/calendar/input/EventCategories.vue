<script lang="ts" setup>
import type { Category } from "~/models/Category";

import { PhCaretDown, PhCheck } from "@phosphor-icons/vue";

const isPopoverOpen = ref<boolean>(false)

const props = defineProps<{
  placeholder?: string
}>()

const model = defineModel<Category[]>({ default: [] })
const modelBuffer = ref<Category[]>([])

watch(modelBuffer.value, () => {
  model.value = [ ...modelBuffer.value ]
})

const { categories: availableCategories } = useCalendar()

const searchTerm = ref<string>("")

const filteredCategories = computed(() =>
  searchTerm.value === ""
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
        class="relative w-full max-w-full h-fit justify-between"
      >
        <template v-if="!model.length">
          {{ props.placeholder }}
        </template>
        <template v-else>
          <ul class="flex flex-wrap gap-1">
            <li v-for="category in model" :key="`selected-cat-${category.id}`">
              <UiBadge class="lowercase" variant="secondary">
                {{ category.name }}
              </UiBadge>
            </li>
          </ul>
        </template>

        <PhCaretDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent
      align="start"
      side="bottom"
      :collision-padding="50"
      class="w-fit h-[33vh] p-0"
    >
      <UiCommand v-model="modelBuffer" v-model:searchTerm="searchTerm" :multiple="true">
        <UiCommandInput :placeholder="$t('entity.category.search')" />
        <UiCommandEmpty>{{ $t('entity.category.notFoundAny') }}</UiCommandEmpty>
        <UiCommandList>
          <UiCommandGroup>
            <UiCommandItem
              v-for="category in filteredCategories"
              :key="category.id"
              :value="category"
              class="cursor-pointer flex justify-between items-center"
            >
              <span>
                {{ category.name }}
              </span>

              <PhCheck v-if="model.find(cat => cat.id === category.id)" />
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>

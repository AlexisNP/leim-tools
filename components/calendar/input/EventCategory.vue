<script lang="ts" setup>
import { PhCaretDown } from "@phosphor-icons/vue";
import type { Category } from "~/models/Category";

const isPopoverOpen = ref<boolean>(false)

const props = defineProps<{
  placeholder?: string
}>()

const model = defineModel<Category>()

const { categories: availableCategories } = useCalendar()

const searchTerm = ref<string>("")

function handleCatSelect() {
  isPopoverOpen.value = false
}

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
        class="w-full max-w-full justify-between"
      >
        <template v-if="!model">
          {{ props.placeholder }}
        </template>
        <template v-else>
          {{ model.name }}
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
      <UiCommand v-model="model" v-model:searchTerm="searchTerm">
        <UiCommandInput :placeholder="$t('entity.category.search')" />
        <UiCommandEmpty>{{ $t('entity.category.notFoundAny') }}</UiCommandEmpty>
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

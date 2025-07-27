<script lang="ts" setup>
import { contentStates, type ContentState } from "@@/models/Entity";

defineProps<{
  id: string
}>();

const model = defineModel<ContentState>({ default: "draft" });
</script>

<template>
  <UiSelect v-model="model">
    <UiSelectTrigger :id>
      <UiSelectValue
        :placeholder="$t('ui.contentState.selectOne')"
      />
    </UiSelectTrigger>
    <UiSelectContent position="popper">
      <UiSelectGroup>
        <UiSelectItem
          v-for="state in contentStates"
          :key="state"
          :value="state"
        >
          {{ $t(`ui.contentState.${state}`) }}
        </UiSelectItem>
      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>
</template>

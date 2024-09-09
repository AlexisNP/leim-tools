<script lang="ts" setup>
import { type RPGColor, rpgColors } from "~/models/Color";

const model = defineModel<RPGColor>()
</script>

<template>
  <UiSelect v-model="model">
    <UiSelectTrigger>
      <UiSelectValue :placeholder="$t('ui.colors.selectOne')" />
    </UiSelectTrigger>
    <UiSelectContent>
      <UiSelectGroup>
        <UiSelectItem v-for="color in rpgColors" :key="color" :value="color">
          {{ $t(`ui.colors.${color}`) }}
        </UiSelectItem>
      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>
</template>

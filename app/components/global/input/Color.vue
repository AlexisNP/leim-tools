<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { type RPGColor, rpgColors } from "@@/models/Color";

const { id, theme = "normal", position = "popper" } = defineProps<{
  id: string
  theme?: "normal" | "subtle"
  position?: "item-aligned" | "popper" | undefined
}>();

const model = defineModel<RPGColor>({ default: "white" });
</script>

<template>
  <UiSelect v-model="model">
    <UiSelectTrigger :id :class="cn({ 'h-9': theme === 'subtle' })">
      <UiSelectValue
        :placeholder="$t('ui.colors.selectOne')"
        class="bgc"
        :class="cn(`element-${model}`)"
      />
    </UiSelectTrigger>
    <UiSelectContent :position>
      <UiSelectGroup>
        <UiSelectItem
          v-for="color in rpgColors"
          :key="color"
          :value="color"
          class="bgc"
          :class="
            cn(
              `element-${color}`,
            )
          "
        >
          {{ $t(`ui.colors.${color}`) }}
        </UiSelectItem>
      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>
</template>

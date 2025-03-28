<script setup lang="ts">
import { cn } from "@/lib/utils"
import { useCalendar } from "@/stores/CalendarStore"
import { PhCalendarBlank, PhCheckCircle, PhGear, PhTag } from "@phosphor-icons/vue"
import { computed } from "vue"

const optionsOpened = ref<boolean>(false)

const user = useSupabaseUser()

function closeMenu() {
  optionsOpened.value = false
}
watch(user, closeMenu)

const { currentConfig, viewTypeOptions, getViewTypeTitle, setViewType } = useCalendar()
const { isReadOnly } = storeToRefs(useCalendar())

const viewTypeTitle = computed(() => getViewTypeTitle(currentConfig.viewType))
</script>

<template>
  <UiDropdownMenu v-model:open="optionsOpened">
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="secondary" size="icon">
        <PhGear size="20" weight="fill" />
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent :side="'bottom'" :align="'start'" :side-offset="10" :align-offset="25" :collision-padding="40" class="text-right">
      <UiDropdownMenuLabel>
        {{ $t('entity.calendar.seeOptions') }}
      </UiDropdownMenuLabel>
      <UiDropdownMenuSub>
        <UiDropdownMenuSubTrigger arrow-direction="left" class="p-0 rounded-none">
          <UiDropdownMenuItem class="flex gap-[1ch] justify-end items-center pointer-events-none">
            {{ $t('ui.displayMode') }}

            <PhCalendarBlank size="18" weight="fill" />
          </UiDropdownMenuItem>
        </UiDropdownMenuSubTrigger>
        <UiDropdownMenuPortal>
          <UiDropdownMenuSubContent>
            <UiDropdownMenuItem
              v-for="option in viewTypeOptions"
              :key="option"
              class="flex gap-[.5ch] items-center rounded-none transition-colors"
              :class="cn({ 'text-emerald-600': viewTypeTitle === getViewTypeTitle(option) })"
              @click="setViewType(option)"
            >
              <PhCheckCircle v-if="viewTypeTitle === getViewTypeTitle(option)" size="20" weight="fill" />

              {{ getViewTypeTitle(option) }}
            </UiDropdownMenuItem>
          </UiDropdownMenuSubContent>
        </UiDropdownMenuPortal>
      </UiDropdownMenuSub>

      <template v-if="!isReadOnly">
        <UiDropdownMenuSeparator />

        <UiDropdownMenuItem class="flex gap-[1ch] justify-end items-center">
          {{ $t('entity.category.namePlural') }}

          <PhTag size="18" weight="fill" />
        </UiDropdownMenuItem>
      </template>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils"
import { PhArchive, PhCalendarDots, PhFile, PhFileDashed, PhFilePlus, PhPencil, PhPencilSimpleLine, PhTrash } from "@phosphor-icons/vue"
import { DateTime } from "luxon"
import type { Calendar } from "@@/models/CalendarConfig"

const props = defineProps<{
  calendar: Calendar
  gmId?: string
  showActions?: boolean
}>()

const emit = defineEmits(["on-edit", "on-delete"])

const cardRef = ref(null)
const isCardHovered = useElementHover(cardRef)
const { focused: isCardFocused } = useFocusWithin(cardRef)

const { locale } = useI18n()

const createdAt = DateTime.fromISO(props.calendar.createdAt!).toLocaleString(DateTime.DATETIME_MED, { locale: locale.value })
const updatedAt = computed<string>(() => props.calendar.updatedAt ? DateTime.fromISO(props.calendar.updatedAt).toLocaleString(DateTime.DATETIME_MED, { locale: locale.value }) : "")

const user = useSupabaseUser()
const isOwner = computed(() => user.value && props.gmId && user.value.id === props.gmId)
const calendarLink = computed(() => isOwner.value ? `/my/calendars/${props.calendar.id}` : `/calendars/${props.calendar.shortId}`)

const hasActions = computed(() => isOwner.value && props.showActions)
</script>

<template>
  <UiCard
    ref="cardRef"
    class="w-full h-full flex flex-col"
    :link="calendarLink"
    :class="cn(
      calendar.color ? `group card-color element-${calendar.color}` : '',
    )"
  >
    <UiCardHeader class="gap-4">
      <UiCardTitle
        class="text-xl"
        :class="cn({
          'pr-18': hasActions
        })"
      >
        {{ calendar.name }}
      </UiCardTitle>

      <div v-if="calendar.state === 'published'" class="flex items-center gap-1 text-sm">
        <PhFile size="20" weight="fill" />
        <span>{{ $t('ui.contentState.published') }}</span>
      </div>
      <div v-if="calendar.state === 'draft'" class="flex items-center gap-1 text-sm">
        <PhFileDashed size="20" weight="fill" />
        <span>{{ $t('ui.contentState.draft') }}</span>
      </div>
      <div v-if="calendar.state === 'archived'" class="flex items-center gap-1 text-sm">
        <PhArchive size="20" weight="fill" />
        <span>{{ $t('ui.contentState.archived') }}</span>
      </div>
    </UiCardHeader>

    <UiCardContent class="grow">
      <p class="flex items-center gap-1">
        <PhCalendarDots size="24" weight="fill" />
        <span v-if="calendar.eventNb?.[0]!.count! > 1">{{ $t("entity.calendar.hasXEvents", { count: calendar.eventNb?.[0]!.count }) }}</span>
        <span v-else>{{ $t("entity.calendar.hasXEvent", { count: calendar.eventNb?.[0]!.count }) }}</span>
      </p>

      <div
        v-if="hasActions && (isCardHovered || isCardFocused)"
        class="flex gap-2 absolute top-4 right-4 z-20"
      >
        <Transition name="fade" appear>
          <UiButton size="icon" variant="outline" class="size-8 border-foreground/20 group-hover:border-foreground/30 hover:text-background hover:border-foreground hover:bg-foreground" @click="emit('on-edit')">
            <PhPencil size="15" weight="fill" />
          </UiButton>
        </Transition>
        <Transition name="fade" appear>
          <UiButton size="icon" variant="outline" class="size-8 border-foreground/25 group-hover:border-foreground/40 hover:text-background hover:border-rose-500 hover:bg-rose-500" @click="emit('on-delete')">
            <PhTrash size="15" weight="fill" />
          </UiButton>
        </Transition>
      </div>
    </UiCardContent>

    <hr>

    <UiCardFooter class="border-t-0">
      <ul class="grid gap-1 text-sm">
        <li class="flex gap-1 items-center">
          <PhFilePlus size="18" />
          <span>{{ $t('common.createdAt', { createdAt }) }}</span>
        </li>
        <li v-if="updatedAt" class="flex gap-1 items-center">
          <PhPencilSimpleLine size="18" />
          <span>{{ $t('common.updatedAt', { updatedAt }) }}</span>
        </li>
      </ul>
    </UiCardFooter>
  </UiCard>
</template>

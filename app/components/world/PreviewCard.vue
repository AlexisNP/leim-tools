<script lang="ts" setup>
import { PhArchive, PhFile, PhFileDashed, PhFilePlus, PhPencil, PhPencilSimpleLine, PhTrash } from "@phosphor-icons/vue"
import type { World } from "@@/models/World"
import { DateTime } from "luxon"
import { cn } from "@/lib/utils"

const props = defineProps<{
  world: World
}>()

const emit = defineEmits(["on-edit", "on-delete"])

const cardRef = ref(null)
const isCardHovered = useElementHover(cardRef)
const { focused: isCardFocused } = useFocusWithin(cardRef)

const { locale } = useI18n()
const createdAt = DateTime.fromISO(props.world.createdAt!).toLocaleString(DateTime.DATETIME_MED, { locale: locale.value })
const updatedAt = computed<string>(() => props.world.updatedAt ? DateTime.fromISO(props.world.updatedAt).toLocaleString(DateTime.DATETIME_MED, { locale: locale.value }) : "")
</script>

<template>
  <UiCard
    ref="cardRef"
    class="w-full h-full flex flex-col"
    :link="`/my/worlds/${world.id}`"
    :class="cn(
      world.color ? `card-color element-${world.color}` : '',
    )"
  >
    <UiCardHeader class="gap-4">
      <UiCardTitle>
        {{ world.name }}
      </UiCardTitle>
      <div v-if="world.state === 'published'" class="flex items-center gap-1 text-sm">
        <PhFile size="20" weight="fill" />
        <span>{{ $t('ui.contentState.published') }}</span>
      </div>
      <div v-if="world.state === 'draft'" class="flex items-center gap-1 text-sm">
        <PhFileDashed size="20" weight="fill" />
        <span>{{ $t('ui.contentState.draft') }}</span>
      </div>
      <div v-if="world.state === 'archived'" class="flex items-center gap-1 text-sm">
        <PhArchive size="20" weight="fill" />
        <span>{{ $t('ui.contentState.archived') }}</span>
      </div>
    </UiCardHeader>

    <UiCardContent class="grow">
      <div class="md:text-sm" v-html="world.description"></div>

      <div
        v-if="isCardHovered || isCardFocused"
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

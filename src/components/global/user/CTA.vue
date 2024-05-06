<script lang="ts" setup>
import { supabase } from '@/supabase/client'
import { type Session } from '@supabase/supabase-js'
import { computed, onMounted, ref, watch } from 'vue'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PhUserCircle } from '@phosphor-icons/vue'
import Button from '@/components/ui/button/Button.vue'
import MenuLoggedIn from './MenuLoggedIn.vue'
import MenuLoggedOut from './MenuLoggedOut.vue'

const session = ref<Session | null>()
const hasSession = computed(() => Boolean(session.value))
const menuOpened = ref<boolean>(false)

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})

watch(session, closeMenu)

function closeMenu() {
  menuOpened.value = false
}
</script>

<template>
  <Popover v-model:open="menuOpened">
    <PopoverTrigger :as-child="hasSession">
      <Avatar v-if="session" class="cursor-pointer">
        <AvatarImage
          :src="session?.user.user_metadata.avatar_url"
          :alt="session?.user.user_metadata.full_name"
          referrerpolicy="no-referrer"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button v-else variant="outline" size="icon">
        <PhUserCircle size="18" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-fit p-0" :align="'start'" :side="'top'" :collision-padding="20">
      <MenuLoggedIn v-if="session" :session />
      <MenuLoggedOut v-else />
    </PopoverContent>
  </Popover>
</template>

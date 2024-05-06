<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Profile from '@/components/auth/Profile.vue'
import Auth from '@/components/auth/Auth.vue'
import { supabase } from '@/supabase/client'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Profile v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>

import { supabase } from '@/supabase/client'
import type { Session } from '@supabase/supabase-js'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface JwtPayloadExt extends JwtPayload {
  user_role: string
}

export const useAuth = defineStore('auth', () => {
  const session = ref<Session | null>()
  const userRoles = computed(() => {
    if (session.value) {
      return (jwtDecode(session.value.access_token) as JwtPayloadExt).user_role
    }

    return ''
  })

  async function loadSession() {
    return supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })
  }

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })

  return { session, userRoles, loadSession }
})

<script lang="ts" setup>
import { supabase } from '@/supabase/client'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import type { Session } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

defineProps<{
  session: Session
}>()

const router = useRouter()

async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw error
  } catch (err) {
    console.log(err)
  }
}

function gotoProfilePage() {
  router.push({ path: '/profil' })
}
</script>

<template>
  <Command>
    <CommandList>
      <CommandGroup :heading="`Connecté en tant que ${session.user.user_metadata.email}`">
        <CommandItem value="profile" @select="gotoProfilePage"> Profil </CommandItem>
        <CommandItem value="logout" @select="handleLogout"> Déconnexion </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>

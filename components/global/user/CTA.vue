<script lang="ts" setup>
import { computed } from 'vue'

import { PhUserCircle } from '@phosphor-icons/vue'

const router = useRouter()

const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const userMeta = computed(() => user.value?.user_metadata)
const hasSession = computed(() => Boolean(user.value))

async function handleGoogleLogin() {
  try {
    auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function handleLogout() {
  try {
    const { error } = await auth.signOut()

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
  <ClientOnly>
    <UiPopover>
      <UiPopoverTrigger :as-child="hasSession">
        <UiAvatar v-if="hasSession" class="cursor-pointer">
          <UiAvatarImage
            :src="userMeta?.avatar_url"
            :alt="userMeta?.full_name"
            referrerpolicy="no-referrer"
          />
          <UiAvatarFallback>Me</UiAvatarFallback>
        </UiAvatar>
        <UiButton v-else variant="outline" size="icon">
          <PhUserCircle size="18" />
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-fit p-0" :align="'start'" :side="'top'" :collision-padding="20">
        <div id="user-popover">
          <UiCommand>
            <UiCommandList v-if="user">
              <UiCommandGroup :heading="`Connecté en tant que ${user?.email}`">
                <UiCommandItem value="profile" @select="gotoProfilePage"> Profil </UiCommandItem>
                <UiCommandItem value="logout" @select="handleLogout"> Déconnexion </UiCommandItem>
              </UiCommandGroup>
            </UiCommandList>
            <UiCommandList v-else>
              <UiCommandItem value="logout" @select="handleGoogleLogin"> Connexion </UiCommandItem>
            </UiCommandList>
          </UiCommand>
        </div>
      </UiPopoverContent>
    </UiPopover>
  </ClientOnly>
</template>

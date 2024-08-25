<script lang="ts" setup>
import { computed } from "vue"

import { PhUserCircle } from "@phosphor-icons/vue"

const router = useRouter()

const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const userMeta = computed(() => user.value?.user_metadata)
const profileUrl: string = `${useRequestURL().origin}/me/`

const menuOpened = ref<boolean>(false)

function closeMenu() {
  menuOpened.value = false
}
watch(user, closeMenu)

async function handleGoogleLogin() {
  try {
    auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent"
        },
        redirectTo: profileUrl
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
  router.push({ path: "/me" })

  closeMenu()
}
</script>

<template>
  <ClientOnly>
    <UiPopover v-model:open="menuOpened">
      <UiPopoverTrigger>
        <UiAvatar v-if="user" class="cursor-pointer">
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
      </UiPopoverContent>
    </UiPopover>
  </ClientOnly>
</template>

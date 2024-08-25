<script lang="ts" setup>
import { computed } from "vue"

import { PhGear, PhGlobeHemisphereWest, PhLaptop, PhMoon, PhPalette, PhSignOut, PhSun, PhTranslate, PhUserCircle } from "@phosphor-icons/vue"

const router = useRouter()
const { preference } = useColorMode()

const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const userMeta = computed(() => user.value?.user_metadata)
const profileUrl: string = `${useRequestURL().origin}/my/`

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
  router.push({ path: "/my/preferences" })

  closeMenu()
}

function gotoSettingsPage() {
  router.push({ path: "/my/settings" })

  closeMenu()
}
</script>

<template>
  <ClientOnly>
    <UiDropdownMenu v-model:open="menuOpened">
      <UiDropdownMenuTrigger>
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
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-fit p-0" :align="'start'" :side="'top'" :side-offset="10" :align-offset="25" :collision-padding="40">

        <template v-if="user">
          <p class="p-2 text-xs opacity-75">Connecté en tant que {{ user?.email }}</p>

          <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none" @click="gotoProfilePage">
            <PhGlobeHemisphereWest size="20" weight="fill" />
            <span>Mondes</span>
          </UiDropdownMenuItem>

          <UiDropdownMenuSeparator />

          <UiDropdownMenuSub>
            <UiDropdownMenuSubTrigger class="p-0">
              <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none">
                <PhPalette size="20" weight="fill" />
                <span>Apparence</span>
              </UiDropdownMenuItem>
            </UiDropdownMenuSubTrigger>
            <UiDropdownMenuPortal>
              <UiDropdownMenuSubContent>
                <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none">
                  <PhMoon size="20" />
                  <span>Sombre</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none">
                  <PhSun size="20" />
                  <span>Clair</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none">
                  <PhLaptop size="20" />
                  <span>Système</span>
                </UiDropdownMenuItem>
              </UiDropdownMenuSubContent>
            </UiDropdownMenuPortal>
          </UiDropdownMenuSub>

          <UiDropdownMenuSub>
            <UiDropdownMenuSubTrigger class="p-0">
              <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none">
                <PhTranslate size="20" />
                <span>Langage</span>
              </UiDropdownMenuItem>
            </UiDropdownMenuSubTrigger>
            <UiDropdownMenuPortal>
              <UiDropdownMenuSubContent>
                <UiDropdownMenuSubContent>
                  <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none">
                    <span>Français</span>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none">
                    <span>English</span>
                  </UiDropdownMenuItem>
                </UiDropdownMenuSubContent>
              </UiDropdownMenuSubContent>
            </UiDropdownMenuPortal>
          </UiDropdownMenuSub>

          <UiDropdownMenuSeparator />

          <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none" @click="gotoSettingsPage">
            <PhGear size="20" weight="fill" />
            <span>Compte</span>
          </UiDropdownMenuItem>
          <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none" @click="handleLogout">
            <PhSignOut size="20" weight="fill" />
            <span>Déconnexion</span>
          </UiDropdownMenuItem>
        </template>

        <template v-else>
          <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none" @click="handleGoogleLogin">
            <PhGear size="20" weight="fill" />
            <span>Connexion</span>
          </UiDropdownMenuItem>
        </template>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </ClientOnly>
</template>

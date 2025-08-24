<script lang="ts" setup>
import { computed } from "vue"

import { PhCheckCircle, PhUser, PhLaptop, PhMoon, PhPalette, PhSignIn, PhSignOut, PhSun, PhTranslate, PhUserCircle, PhInfo } from "@phosphor-icons/vue"
import { cn } from "@/lib/utils";

const router = useRouter()

const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const userMeta = computed(() => user.value?.user_metadata)
const profileUrl: string = `${useRequestURL().origin}/my/`

const { locale, setLocale } = useI18n()

const menuOpened = ref<boolean>(false)

function closeMenu() {
  menuOpened.value = false
}
watch(user, closeMenu)

async function handleGoogleLogin() {
  const { error } = await auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent"
      },
      redirectTo: profileUrl
    }
  })

  if (error) {
    console.log(error.message)
  }
}

async function handleLogout() {
  const { error } = await auth.signOut()

  if (error) {
    console.log(error.message)
  }
}
</script>

<template>
  <ClientOnly>
    <UiDropdownMenu v-model:open="menuOpened">
      <UiDropdownMenuTrigger as-child>
        <UiButton
          variant="ghost"
          class="w-full justify-start p-2 h-fit hover:text-secondary-foreground hover:bg-secondary"
          :class="cn({ 'bg-secondary': menuOpened })"
        >
          <TransitionGroup name="fade-group" appear>
            <div
              v-if="user"
              class="flex gap-2 items-center"
            >
              <UiAvatar
                id="user-avatar"
                size="sm"
                class="rounded-sm ring-[.2rem] ring-primary transition-all cursor-pointer"
              >
                <UiAvatarImage
                  :src="userMeta?.avatar_url"
                  :alt="userMeta?.full_name"
                  referrerpolicy="no-referrer"
                />
                <UiAvatarFallback>
                  {{ $t('ui.sidebarMenu.avatarFallback') }}
                </UiAvatarFallback>
              </UiAvatar>

              <div class="text-xs">
                {{ userMeta?.name }}
              </div>
            </div>
          </TransitionGroup>
        </UiButton>
      </UiDropdownMenuTrigger>

      <UiDropdownMenuContent class="w-72 p-0 pb-1" :align="'start'" :side="'top'" :side-offset="10" :align-offset="25" :collision-padding="40">
        <template v-if="user">
          <p class="p-2 text-[.7em] opacity-75">
            {{ $t('ui.greeting', { user: user?.email }) }}
          </p>
        </template>

        <template v-else>
          <p class="p-2 text-[.7em] opacity-75">
            {{ $t('ui.anonymousGreeting') }}
          </p>
        </template>

        <UiDropdownMenuSub>
          <UiDropdownMenuSubTrigger class="p-0 rounded-none">
            <UiDropdownMenuItem class="flex gap-[.5ch] items-center pointer-events-none">
              <PhPalette size="20" weight="fill" />
              <span>
                {{ $t('ui.sidebarMenu.appearance') }}
              </span>
            </UiDropdownMenuItem>
          </UiDropdownMenuSubTrigger>
          <UiDropdownMenuPortal>
            <UiDropdownMenuSubContent>
              <UiDropdownMenuItem
                class="flex gap-[.5ch] items-center rounded-none transition-colors"
                :class="cn({ 'text-emerald-600': $colorMode.preference === 'dark' })"
                @select.prevent="$colorMode.preference = 'dark'"
              >
                <PhCheckCircle v-if="$colorMode.preference === 'dark'" size="20" weight="fill" />
                <PhMoon v-else size="20" />

                <span>
                  {{ $t('ui.dark') }}
                </span>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem
                class="flex gap-[.5ch] items-center rounded-none transition-colors"
                :class="cn({ 'text-emerald-600': $colorMode.preference === 'light' })"
                @select.prevent="$colorMode.preference = 'light'"
              >
                <PhCheckCircle v-if="$colorMode.preference === 'light'" size="20" weight="fill" />
                <PhSun v-else size="20" />

                <span>
                  {{ $t('ui.light') }}
                </span>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem
                class="flex gap-[.5ch] items-center rounded-none transition-colors"
                :class="cn({ 'text-emerald-600': $colorMode.preference === 'system' })"
                @select.prevent="$colorMode.preference = 'system'"
              >
                <PhCheckCircle v-if="$colorMode.preference === 'system'" size="20" weight="fill" />
                <PhLaptop v-else size="20" />

                <span>
                  {{ $t('ui.system') }}
                </span>
              </UiDropdownMenuItem>
            </UiDropdownMenuSubContent>
          </UiDropdownMenuPortal>
        </UiDropdownMenuSub>

        <UiDropdownMenuSub>
          <UiDropdownMenuSubTrigger class="p-0 rounded-none">
            <UiDropdownMenuItem class="flex gap-[.5ch] items-center pointer-events-none">
              <PhTranslate size="20" />
              <span>
                {{ $t('ui.sidebarMenu.language') }}
              </span>
            </UiDropdownMenuItem>
          </UiDropdownMenuSubTrigger>
          <UiDropdownMenuPortal>
            <UiDropdownMenuSubContent>
              <UiDropdownMenuSubContent>
                <UiDropdownMenuItem
                  class="flex gap-[.5ch] items-center rounded-none transition-colors"
                  :class="cn({ 'text-emerald-600': locale === 'fr' })"
                  @select.prevent="setLocale('fr')"
                >
                  <PhCheckCircle v-if="locale === 'fr'" size="20" weight="fill" />
                  <img v-else src="/images/flag-fr.png" width="20" alt="" loading="eager">
                  <span>Français</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                  class="flex gap-[.5ch] items-center rounded-none transition-colors"
                  :class="cn({ 'text-emerald-600': locale === 'en' })"
                  @select.prevent="setLocale('en')"
                >
                  <PhCheckCircle v-if="locale === 'en'" size="20" weight="fill" />
                  <img v-else src="/images/flag-uk.png" width="20" alt="" loading="eager">
                  <span>English</span>
                </UiDropdownMenuItem>
              </UiDropdownMenuSubContent>
            </UiDropdownMenuSubContent>
          </UiDropdownMenuPortal>
        </UiDropdownMenuSub>

        <UiDropdownMenuSeparator />

        <template v-if="user">
          <UiDropdownMenuItem class="flex gap-[.5ch] items-center rounded-none" @click="handleLogout">
            <PhSignOut size="20" weight="fill" />
            <span>
              {{ $t('ui.sidebarMenu.logout') }}
            </span>
          </UiDropdownMenuItem>
        </template>

        <UiDropdownMenuItem v-if="!user" class="flex gap-[.5ch] items-center rounded-none" @click="handleGoogleLogin">
          <PhSignIn size="18" weight="fill" />
          <span>
            {{ $t('ui.sidebarMenu.login') }}
          </span>
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </ClientOnly>
</template>

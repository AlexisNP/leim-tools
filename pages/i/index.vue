<script lang="ts" setup>
import type { World } from '~/models/World';

const { data: res } = await useFetch('/api/worlds/query')

const worlds = res.value?.data as World[]

useHead({
  title: 'Profil'
})
definePageMeta({
  middleware: ['auth-guard']
})

const user = useSupabaseUser()

// Redirect user back home when they log out on the page
watch(user, (n, _o) => {
  if (!n) {
    navigateTo('/')
  }
})
</script>

<template>
    <main class="p-8">
    <Heading>{{ user?.user_metadata.full_name }}</Heading>

    <section v-if="worlds" class="mt-4">
      <h2 class="mb-4 text-lg font-bold">
        Mondes
      </h2>

      <ul class="grid lg:grid-cols-2 gap-2">
        <li v-for="world in worlds" :key="world.id">
          <UiCard
            class="w-full transition-all"
            :link="`/i/world/${world.id}`"
            :class="{
              'hover:bg-slate-50 dark:hover:bg-sky-950 dark:focus-within:outline-sky-900': !world.color,
              'bg-red-100 dark:bg-red-950 border-red-200 hover:bg-red-50 dark:hover:bg-red-900 dark:border-red-900 dark:focus-within:outline-red-900': world.color === 'red',
              'bg-orange-100 dark:bg-orange-950 border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900 dark:border-orange-900 dark:focus-within:outline-orange-900': world.color === 'orange',
              'bg-amber-100 dark:bg-amber-950 border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900 dark:border-amber-900 dark:focus-within:outline-amber-900': world.color === 'amber',
              'bg-yellow-100 dark:bg-yellow-950 border-yellow-200 hover:bg-yellow-50 dark:hover:bg-yellow-900 dark:border-yellow-900 dark:focus-within:outline-yellow-900': world.color === 'yellow',
              'bg-lime-100 dark:bg-lime-950 border-lime-200 hover:bg-lime-50 dark:hover:bg-lime-900 dark:border-lime-900 dark:focus-within:outline-lime-900': world.color === 'lime',
              ' bg-green-100 dark:bg-green-950 border-green-200 hover:bg-green-50 dark:hover:bg-green-900 dark:border-green-900 dark:focus-within:outline-green-900': world.color === 'green',
              'bg-emerald-100 dark:bg-emerald-950 border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900 dark:border-emerald-900 dark:focus-within:outline-emerald-900': world.color === 'emerald',
              'bg-teal-100 dark:bg-teal-950 border-teal-200 hover:bg-teal-50 dark:hover:bg-teal-900 dark:border-teal-900 dark:focus-within:outline-teal-900': world.color === 'teal',
              'bg-cyan-100 dark:bg-cyan-950 border-cyan-200 hover:bg-cyan-50 dark:hover:bg-cyan-900 dark:border-cyan-900 dark:focus-within:outline-cyan-900': world.color === 'cyan',
              'bg-sky-100 dark:bg-sky-950 border-sky-200 hover:bg-sky-50 dark:hover:bg-sky-900 dark:border-sky-900 dark:focus-within:outline-sky-900': world.color === 'sky',
              'bg-blue-100 dark:bg-blue-950 border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900 dark:border-blue-900 dark:focus-within:outline-blue-900': world.color === 'blue',
              'bg-indigo-100 dark:bg-indigo-950 border-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 dark:border-indigo-900 dark:focus-within:outline-indigo-900': world.color === 'indigo',
              'bg-violet-100 dark:bg-violet-950 border-violet-200 hover:bg-violet-50 dark:hover:bg-violet-900 dark:border-violet-900 dark:focus-within:outline-violet-900': world.color === 'violet',
              'bg-purple-100 dark:bg-purple-950 border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900 dark:border-purple-900 dark:focus-within:outline-purple-900': world.color === 'purple',
              'bg-fuchsia-100 dark:bg-fuchsia-950 border-fuchsia-200 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900 dark:border-fuchsia-900 dark:focus-within:outline-fuchsia-900': world.color === 'fuchsia',
              'bg-pink-100 dark:bg-pink-950 border-pink-200 hover:bg-pink-50 dark:hover:bg-pink-900 dark:border-pink-900 dark:focus-within:outline-pink-900': world.color === 'pink',
              'bg-pink-100 dark:bg-rose-950 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-900 dark:border-rose-900 dark:focus-within:outline-rose-900': world.color === 'rose',
              'text-slate-100 bg-slate-900 border-slate-700 hover:bg-slate-700 dark:hover:bg-slate-800 dark:border-slate-900 dark:focus-within:outline-slate-900': world.color === 'black',
              ' hover:bg-slate-50 dark:hover:text-slate-900 dark:hover:bg-slate-300 dark:border-slate-500 dark:focus-within:outline-slate-100': world.color === 'white',
            }"
          >
            <UiCardHeader>
              <UiCardTitle>{{ world.name }}</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="italic">{{ world.description }}</p>
            </UiCardContent>
          </UiCard>
        </li>
      </ul>
    </section>
  </main>
</template>

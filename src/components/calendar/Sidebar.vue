<script lang="ts" setup>
import { PhList, PhHouse } from '@phosphor-icons/vue'
import Button from '../ui/button/Button.vue'
</script>

<template>
  <nav class="w-16 py-6 border-r-[1px] border-l-slate-500 grid justify-center">
    <menu>
      <li class="mb-12">
        <Button variant="ghost" size="icon" @click="console.log" class="rounded-full">
          <PhList size="27" />
        </Button>
      </li>
      <li>
        <Button variant="ghost" size="icon" class="rounded-full" as-child>
          <RouterLink to="/">
            <PhHouse size="24" weight="fill" />
          </RouterLink>
        </Button>
      </li>
    </menu>
  </nav>
</template>

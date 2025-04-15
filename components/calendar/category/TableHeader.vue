<script setup lang="ts">
import { PhListBullets } from "@phosphor-icons/vue";
</script>

<template>
  <header class="grid grid-cols-12 gap-4 px-2 py-4 border-b-[1px] border-b-foreground/10 font-bold mr-4">
    <div class="col-span-1 flex items-end">
      <PhListBullets size="20" />
    </div>
    <div class="col-span-5">
      Nom
    </div>
    <div class="col-span-4">
      Couleur
    </div>
    <div class="col-span-2" />
  </header>
</template>


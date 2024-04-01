<script lang="ts" setup>
import Calendar from '@/components/calendar/Calendar.vue'
</script>

<template>
  <main class="h-full">
    <Calendar />
    <!-- <pre>
      {{ currentDate }}
    </pre>
    <div class="grid gap-2">
      <div class="flex gap-2">
        <button class="bg-slate-800 py-2 px-4 rounded-sm" @click="incrementMonth()">Month +</button>
        <button class="bg-slate-800 py-2 px-4 rounded-sm" @click="decrementMonth()">Month -</button>
      </div>
      <div class="flex gap-2">
        <button class="bg-slate-800 py-2 px-4 rounded-sm" @click="incrementYear()">Year +</button>
        <button class="bg-slate-800 py-2 px-4 rounded-sm" @click="decrementYear()">Year -</button>
      </div>
      <div class="flex gap-2">
        <button class="bg-slate-800 py-2 px-4 rounded-sm" @click="incrementYear(100)">
          Century +
        </button>
        <button class="bg-slate-800 py-2 px-4 rounded-sm" @click="decrementYear(100)">
          Century -
        </button>
      </div>
      <div class="flex gap-2">
        <button class="bg-slate-800 py-2 px-4 rounded-sm" @click="incrementYear(1000)">
          Millenia +
        </button>
        <button class="bg-slate-800 py-2 px-4 rounded-sm" @click="decrementYear(1000)">
          Millenia -
        </button>
      </div>
      <div class="flex gap-2">
        <input class="bg-slate-900" type="number" v-model="monthTarget" />
        <button class="bg-slate-800 py-2 px-4 rounded-sm" @click="setMonth(monthTarget)">
          Set Month
        </button>
      </div>
    </div>

    <pre>
      Current events:
      {{ currentEvents }}
    </pre> -->
  </main>
</template>

<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useCalendar } from '@/stores/calendar'

const { currentConfig, currentDate, viewTypeOptions } = useCalendar()
</script>

<template>
  <header class="py-4 border-slate-700 border-b-[1px]">
    <div class="container">
      <div class="grid md:grid-cols-12">
        <div class="md:col-span-9">
          <h1 class="text-2xl font-bold">
            {{ currentDate.currentDateTitle }}
          </h1>
        </div>
        <div class="md:col-span-3">
          <Select v-model="currentConfig.viewType">
            <SelectTrigger>
              <SelectValue placeholder="Changer le mode d'affichage" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="(option, index) in viewTypeOptions" :key="index" :value="option">
                  {{ option }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </header>
</template>

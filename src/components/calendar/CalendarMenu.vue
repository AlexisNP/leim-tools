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
import Button from '../ui/button/Button.vue'

const {
  currentConfig,
  currentDate,
  viewTypeOptions,
  decrementMonth,
  incrementMonth,
  jumpToDefaultDate
} = useCalendar()
</script>

<template>
  <header class="py-4 border-slate-700 border-b-[1px]">
    <div class="container">
      <div class="grid md:grid-cols-12 items-center">
        <div class="md:col-span-9">
          <div class="flex items-center gap-6">
            <menu class="flex items-center gap-2">
              <li>
                <Button @click="jumpToDefaultDate"> Today </Button>
              </li>
              <li>
                <!-- Implement decrementDate to account for other mods -->
                <Button variant="outline" size="icon" @click="decrementMonth">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#FFF"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"
                    />
                  </svg>
                </Button>
              </li>
              <li>
                <!-- Implement decrementDate to account for other mods -->
                <Button variant="outline" size="icon" @click="incrementMonth">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#FFF"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
                    />
                  </svg>
                </Button>
              </li>
            </menu>
            <h1 class="text-2xl font-bold">
              {{ currentDate.currentDateTitle }}
            </h1>
          </div>
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

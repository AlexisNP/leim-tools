<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useCalendar } from '@/stores/calendar'
import Button from '../ui/button/Button.vue'

const { decrementMonth, incrementMonth, decrementYear, incrementYear } = useCalendar()
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Implement decrementDate to account for other mods -->

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="decrementYear()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
              <path
                d="M205.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L131.31,128ZM51.31,128l74.35-74.34a8,8,0,0,0-11.32-11.32l-80,80a8,8,0,0,0,0,11.32l80,80a8,8,0,0,0,11.32-11.32Z"
              />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Année précédente</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="decrementMonth()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
              <path
                d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"
              />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mois précédent</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="incrementMonth()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
              <path
                d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
              />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mois suivant</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="incrementYear()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
              <path
                d="M141.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L124.69,128,50.34,53.66A8,8,0,0,1,61.66,42.34l80,80A8,8,0,0,1,141.66,133.66Zm80-11.32-80-80a8,8,0,0,0-11.32,11.32L204.69,128l-74.35,74.34a8,8,0,0,0,11.32,11.32l80-80A8,8,0,0,0,221.66,122.34Z"
              ></path></svg
          ></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Année suivante</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>

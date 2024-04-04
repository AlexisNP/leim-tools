<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button>
        <PhMagnifyingGlass size="20" weight="light" />
        Recherche avancée
      </Button>
    </DialogTrigger>

    <DialogContent>
      <div class="relative w-full items-center">
        <Input
          id="search"
          type="text"
          placeholder="Rechercher un évènement, un personnage…"
          class="pl-10 py-6 text-lg"
        />
        <span class="absolute start-1 inset-y-0 flex items-center justify-center px-2 opacity-50">
          <PhMagnifyingGlass size="20" />
        </span>
      </div>
    </DialogContent>
  </Dialog>
</template>

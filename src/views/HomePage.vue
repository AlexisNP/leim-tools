<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { titleTemplate } from '@/utils/meta'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

useTitle('Outils', titleTemplate)
</script>

<template>
  <main class="h-full grid place-items-center" v-once>
    <Card class="w-1/3 min-w-72" link="/calendrier">
      <CardHeader>
        <CardTitle>Calendrier</CardTitle>
        <CardDescription>
          <Badge class="mix-blend-luminosity font-bold bg-gray-600" variant="secondary">
            chronologie
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        Chronologie complète de Léïm, rassemblant les évènements et personnages clés du monde
      </CardContent>
    </Card>
  </main>
</template>

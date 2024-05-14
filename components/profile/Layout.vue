<script lang="ts" setup>
const user = useSupabaseUser()
</script>

<template>
  <div class="p-8">
    <Heading>{{ user?.user_metadata.full_name }}</Heading>
  </div>
</template>

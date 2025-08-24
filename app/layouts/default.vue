<template>
  <div
    class="h-full grid md:grid-cols-[auto_1fr] bg-background transition-colors after:absolute after:transition-colors"
  >
    <Sidebar />

    <div
      class="wrapper max-h-screen transition-all overflow-y-auto"
    >
      <slot />
    </div>
  </div>
</template>

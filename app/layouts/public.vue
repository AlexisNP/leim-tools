<template>
  <div
    class="wrapper max-h-screen h-full transition-all overflow-y-auto grid grid-rows-[auto_1fr]"
  >
    <Navbar />

    <div class="inner-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inner-content {
  position: relative;

  &::before {
    position: absolute;
    inset-inline: 0;
    top: 0;
    display: block;
    content: '';
    height: .1rem;
    max-width: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      transparent 10%,
      color-mix(in srgb, var(--color-primary) 50%, transparent) 25%,
      color-mix(in srgb, var(--color-primary) 50%, transparent) 75%,
      transparent 90%,
      transparent 100%
    );
  }
}
</style>

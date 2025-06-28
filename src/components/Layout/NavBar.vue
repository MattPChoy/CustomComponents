<template>
  <nav>
    <div class="nav-left nav-item-container">
      <slot name="nav-left"></slot>
    </div>

    <div class="nav-right nav-item-container">
      <slot name="nav-right"></slot>

    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  padding: var(--space-2);
  background-color: var(--bg-main-10);
}

.nav-item-container {
  display: flex;
  flex-direction: row;
  gap: var(--space-2);
  justify-content: center;
  align-items: center;
}

.nav-right {
  margin-left: auto;
}

a {
  text-decoration: none;
}
</style>
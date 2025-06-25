<template>
  <nav>
    <div class="nav-left nav-item-container">
      <slot name="nav-left">
        <b>MattPChoy</b>
      </slot>
    </div>

    <div class="nav-right nav-item-container">
      <slot name="nav-right">
        <div class="pointer changeDarkThemeButton" @click="onThemeNameClicked">
          <FontAwesomeIcon v-if="isDark" icon="fa-solid fa-moon"/>
          <FontAwesomeIcon v-else icon="fa-solid fa-sun"/>
        </div>
        Some other stuff on the right
      </slot>

    </div>
  </nav>
</template>

<script setup lang="ts">
import {isDark, toggleTheme} from "../../styles/theming.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
function onThemeNameClicked() {
  toggleTheme();
}
</script>

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

.changeDarkThemeButton {
  background-color: var(--bg-main-40);
  padding: var(--space-half) var(--space-1);
  border-radius: var(--space-1);
}
</style>
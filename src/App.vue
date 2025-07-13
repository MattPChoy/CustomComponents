<template>
  <NavBar>
    <template #nav-left>
      <a href="/CustomComponents/" class="app-logo">MattPChoy</a>
    </template>
    <template #nav-right>
      <a href="/CustomComponents/inputs">Inputs</a>
      <a href="/CustomComponents/layouts">Layout</a>

      <div class="pointer changeDarkThemeButton" @click="onThemeNameClicked">
        <FontAwesomeIcon v-if="isDark" icon="fa-solid fa-moon" />
        <FontAwesomeIcon v-else icon="fa-solid fa-sun" />
      </div>
    </template>
  </NavBar>
  <router-view></router-view>
  <div class="footer-container">
    <span>Created by Matt Choy</span>
    <span>
      <font-awesome-icon icon="fab fa-github" />
      <a
        class="github-link"
        href="https://github.com/MattPChoy/CustomCompoments"
        >Custom Components</a
      >
    </span>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/Layout/NavBar.vue'
import { isDark, toggleTheme } from './styles/theming'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

function onThemeNameClicked() {
  toggleTheme()
}
</script>

<style scoped>
.footer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--bg-main-10);
  padding: var(--space-8) var(--space-2) var(--space-4) var(--space-2);
}

a {
  color: var(--font-primary);
  text-decoration: none;
}

.app-logo {
  color: var(--primary);
  font-weight: bold;
}

.github-link {
  text-decoration-line: underline;
  color: var(--primary);
  margin-left: var(--space-half);
}

.changeDarkThemeButton {
  background-color: var(--bg-main-40);
  padding: var(--space-half) var(--space-1);
  border-radius: var(--space-1);
}
</style>

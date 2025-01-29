<template>
  <div class="container">
    <router-view />
    <ThemeToggle />  
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from './components/ThemeToggle.vue';
import { useThemeStore } from './stores/theme';

const themeStore = useThemeStore();
if (themeStore.isDark) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
</script>


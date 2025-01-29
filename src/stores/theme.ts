import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const storedTheme = localStorage.getItem('isDark');
  const isDark = ref<boolean>(storedTheme === null ? true : storedTheme === 'true');

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('isDark', isDark.value.toString());
    document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
  };

  // Применяем тему при начальной загрузке
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');

  return { isDark, toggleTheme };
});

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light-theme')

  const toggleTheme = () => {
    theme.value = theme.value === 'light-theme' ? 'dark-theme' : 'light-theme'
  }

  return {
    theme,
    toggleTheme
  }
})

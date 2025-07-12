import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'

export const isDark = ref(false)
const isDarkComposable = useDark({
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
export const toggleTheme = useToggle(isDarkComposable)

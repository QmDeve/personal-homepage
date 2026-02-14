import { ref, onMounted, onUnmounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  const THEME_KEY = 'theme'
  const DARK_CLASS = 'dark-mode'
  const LIGHT_CLASS = 'light-mode'

  const updateMetaThemeColors = (color) => {
    const themeColorMeta = document.getElementById('theme-color-meta')
    const msTileColorMeta = document.getElementById('ms-tile-color-meta')

    if (themeColorMeta) themeColorMeta.content = color
    if (msTileColorMeta) msTileColorMeta.content = color

    const appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
    if (appleMeta) {
      appleMeta.content = color === '#1a1a1a' ? 'black' : 'default'
    }
  }

  const toggleTheme = () => {
    const body = document.body
    const shouldBeDark = !isDark.value
    
    body.classList.remove(LIGHT_CLASS)
    body.classList.remove(DARK_CLASS)
    
    if (shouldBeDark) {
      body.classList.add(DARK_CLASS)
      isDark.value = true
      localStorage.setItem(THEME_KEY, 'dark')
      updateMetaThemeColors('#1a1a1a')
    } else {
      body.classList.add(LIGHT_CLASS)
      isDark.value = false
      localStorage.setItem(THEME_KEY, 'light')
      updateMetaThemeColors('#e0e5ec')
    }
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const body = document.body

    body.classList.remove(LIGHT_CLASS)
    body.classList.remove(DARK_CLASS)

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      body.classList.add(DARK_CLASS)
      isDark.value = true
      updateMetaThemeColors('#1a1a1a')
    } else {
      body.classList.add(LIGHT_CLASS)
      isDark.value = false
      updateMetaThemeColors('#e0e5ec')
    }
  }

  let mediaQueryListener

  onMounted(() => {
    initTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQueryListener = (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        const body = document.body
        body.classList.remove(LIGHT_CLASS)
        body.classList.remove(DARK_CLASS)
        
        if (e.matches) {
          body.classList.add(DARK_CLASS)
          isDark.value = true
          updateMetaThemeColors('#1a1a1a')
        } else {
          body.classList.add(LIGHT_CLASS)
          isDark.value = false
          updateMetaThemeColors('#e0e5ec')
        }
      }
    }
    mediaQuery.addEventListener('change', mediaQueryListener)
  })

  onUnmounted(() => {
    if (mediaQueryListener) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mediaQueryListener)
    }
  })

  return {
    isDark,
    toggleTheme
  }
}
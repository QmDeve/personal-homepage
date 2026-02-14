<template>
  <div class="theme-switcher">
    <div class="theme-switcher__title">
      <span class="theme-switcher__title-text">Home</span>
      <span class="theme-switcher__github-icon" @click="openLink('https://github.com/QmDeve')">
        <i class="fab fa-github"></i>
      </span>
    </div>
    <button class="theme-switcher__toggle" @click="handleToggle">
      <div class="theme-switcher__toggle-handle">
        <i class="fas fa-sun"></i>
        <i class="fas fa-moon"></i>
      </div>
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '../js/theme'
import { openLink } from '../js/utils'

const { toggleTheme } = useTheme()

const handleToggle = () => {
  toggleTheme()
}
</script>

<style>
@import '../styles/t.css';
</style>
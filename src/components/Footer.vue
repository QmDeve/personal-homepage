<template>
  <footer class="footer">
    <p>
      Copyright © {{ copyrightYear }}
      <span class="footer__link" @click="handleLinkClick">
        {{ name }}
      </span>
      All Rights Reserved
    </p>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { openLink } from '../js/utils'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const copyrightYear = computed(() => {
  const start = 2025
  const current = new Date().getFullYear()
  return current > start ? `${start}-${current}` : start.toString()
})

const handleLinkClick = () => {
  openLink('https://github.com/QmDeve')
}
</script>

<style scoped>
@import '../styles/footer.css';
</style>
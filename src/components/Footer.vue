<template>
  <footer class="footer">
    <p>
      Copyright © {{ copyrightYear }}
      <span class="footer__link" @click="openLink('https://github.com/QmDeve')">
        Donny Yale
      </span>
      All Rights Reserved
    </p>
  </footer>
</template>

<script setup>
import { openLink, copyrightYear } from '../js/utils'
</script>

<style scoped>
@import '../styles/footer.css';
</style>
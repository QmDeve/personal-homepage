<template>
  <div class="avatar">
    <img
      :src="src"
      :alt="alt"
      @load="onLoad"
      :class="['avatar__img', { 'avatar__img--loaded': loaded }]"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'avatar'
  }
})

const loaded = ref(false)

const onLoad = () => {
  loaded.value = true
}
</script>

<style scoped>
@import '../styles/avatar.css';
</style>
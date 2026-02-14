<template>
  <section class="card" :id="id">
    <h2 class="card__title">{{ title }}</h2>
    <div class="card__content">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
@import '../styles/card.css';
</style>
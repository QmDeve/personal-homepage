<template>
  <header class="header">
    <Avatar :src="avatarUrl" alt="avatar" />
    <h1 class="header__name">{{ name }}</h1>
    <p class="header__title">{{ title }}</p>
    <nav class="nav">
      <a
        v-for="link in navLinks"
        :key="link.name"
        :href="link.href"
        class="nav__item"
        @click.prevent="link.action ? link.action() : null"
      >
        <i :class="link.icon"></i>
        <span>{{ link.name }}</span>
      </a>
    </nav>
  </header>
</template>

<script setup>
import Avatar from './Avatar.vue'
import { navLinkss } from '../js/navLinks'
import { computed } from 'vue'

const props = defineProps({
  avatarUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  onOpenWeChat: {
    type: Function,
    required: true
  }
})

const navLinks = computed(() => navLinkss(props.onOpenWeChat))
</script>

<style scoped>
@import '../styles/header.css';
</style>
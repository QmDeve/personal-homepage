<template>
  <div class="app">
    <Loading ref="loadingRef" />
    <ThemeSwitcher />
    <div class="app__background"></div>
    <div class="app__container">
      <!-- You can customize the following -->
      <Header :avatar-url="avatarUrl" :name="config.name" :title="config.des" :on-open-we-chat="openPop" />
      <main class="app__content">
        <Card id="about" title="About Me">
          <p><b>Country:</b> {{ config.country }}</p>
          <p><b>Interests:</b> {{ config.interests }}</p>
        </Card>
        <Card id="skills" title="Skills">
          <p><span>{{ config.skills }}</span></p>
        </Card>
        <Card id="github-contributions" title="GitHub Contributions">
          <img
            src="https://raw.githubusercontent.com/QmDeve/QmDeve/refs/heads/output/github-contribution-grid-snake.svg"
            alt="GitHub Contributions" loading="lazy" style="width: 100%; height: auto;"
            @click="openLink('https://github.com/QmDeve')" />
        </Card>
        <Card id="github-stats" title="GitHub Stats">
          <img
            :src="`https://stats.qmdeve.com/api?username=${config.github_username}&show_icons=true&random=2&theme=transparent&icon_color=0b61f4&title_color=0b61f4&text_color=0b61f4&border_radius=30&border_color=0b61f4`"
            alt="GitHub Stats" loading="lazy" style="width: 100%; height: auto;"
            @click="openLink('https://github.com/QmDeve')" />
        </Card>
        <Card id="contact" title="Discuss Group">
          <nav class="nav">
            <a v-for="link in groupLinks" :key="link.name" :href="link.href" class="nav__item"
              @click.prevent="link.action ? link.action() : null">
              <i :class="link.icon"></i>
              <span>{{ link.name }}</span>
            </a>
          </nav>
        </Card>
      </main>
      <Footer :name="config.name" />
    </div>
    <QrPop :is-open="popOpen" @close="closePop" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import Header from './components/Header.vue'
import Card from './components/Card.vue'
import Footer from './components/Footer.vue'
import QrPop from './components/QrCodePop.vue'
import Loading from './components/Loading.vue'
import { openLink } from './js/utils'
import { group } from './js/links'
import { config } from './js/config'

const loadingRef = ref(null)
const avatarUrl = import.meta.env.VITE_AVATAR_URL
const popOpen = ref(false)

const openPop = () => {
  popOpen.value = true
}

const closePop = () => {
  popOpen.value = false
}

const groupLinks = computed(() => group())


  const delay = (Math.random() * 400 + 800)
  setTimeout(() => {
    loadingRef.value.hide()
  }, delay)

</script>

<style scoped>
@import './styles/app.css';
</style>
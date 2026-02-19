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
          <div v-html="config.about"></div>
        </Card>
        <Card id="skills" title="Skills">
          <!-- <p><span>{{ config.skills }}</span></p> -->
          <div v-html="config.skills"></div>
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
        <Card id="contact" title="Discuss Group" v-if="groupLinks && groupLinks.length > 0">
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
import { ref, onMounted } from 'vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import Header from './components/Header.vue'
import Card from './components/Card.vue'
import Footer from './components/Footer.vue'
import QrPop from './components/QrCodePop.vue'
import Loading from './components/Loading.vue'
import { openLink } from './js/utils'
import { config } from './js/config'

const loadingRef = ref(null)
const avatarUrl = import.meta.env.VITE_AVATAR_URL
const popOpen = ref(false)
const groupLinks = ref([])

onMounted(async () => {
  try {
    const linksModule = await import('./js/links')
    if (typeof linksModule.group === 'function') {
      groupLinks.value = linksModule.group() || []
    }
  } catch (error) {
    groupLinks.value = []
  }
})

const openPop = () => {
  popOpen.value = true
}

const closePop = () => {
  popOpen.value = false
}

const delay = (Math.random() * 400 + 800)
setTimeout(() => {
  loadingRef.value.hide()
}, delay)

</script>

<style scoped>
@import './styles/app.css';
</style>
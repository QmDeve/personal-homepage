<template>
  <div class="app">
    <ThemeSwitcher />
    <div class="app__background"></div>
    <div class="app__container">
      <Header :avatar-url="avatarUrl" :name="config.name" :title="config.des" :on-open-we-chat="openPop" />
      <main class="app__content">
        <Card id="about" title="About Me">
          <p><b>Country:</b> {{ config.country }}</p>
          <p><b>Interests:</b> {{ config.interests }}</p>
        </Card>
        <Card id="github-contributions" title="GitHub Contributions">
          <img
            src="https://raw.githubusercontent.com/QmDeve/QmDeve/refs/heads/output/github-contribution-grid-snake.svg"
            alt="GitHub Contributions" loading="lazy" style="width: 100%; height: auto;" 
            @click="openLink('https://github.com/QmDeve')"/>
        </Card>
        <Card id="contact" title="Discuss Group">
          <p v-for="group in config.groups" :key="group.name">
            <b>{{ group.name }}:</b>
            <span>&nbsp;</span>
            <span class="app__link" @click="openLink(group.url)">
              {{ group.value }}
            </span>
          </p>
        </Card>
      </main>
      <Footer :name="config.name" />
    </div>
    <QrPop :is-open="popOpen" @close="closePop" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import Header from './components/Header.vue'
import Card from './components/Card.vue'
import Footer from './components/Footer.vue'
import QrPop from './components/QrCodePop.vue'
import { openLink } from './js/utils'

const avatarUrl = import.meta.env.VITE_AVATAR_URL
const popOpen = ref(false)

const config = {
  name: import.meta.env.VITE_NAME,
  des: import.meta.env.VITE_DES,
  country: import.meta.env.VITE_COUNTRY,
  interests: import.meta.env.VITE_INTERESTS,
  groups: [
    { name: 'Telegram', value: 'QmDeve', url: 'https://t.me/QmDeve' },
    { name: 'QQ Group', value: '1054049593', url: 'https://qm.qq.com/cgi-bin/qm/qr?k=h7AsDzrQgPZRmVKo_Qz1uPPf9Vs0PzUk&jump_from=webapi&authKey=uL4o3bmLcoHszokz6LeX2IqtnZv9CsDqnJC2IxNVYIFuFV+pto6vF6BmsL6i6PAL' }
  ]
}

const openPop = () => {
  popOpen.value = true
}

const closePop = () => {
  popOpen.value = false
}
</script>

<style scoped>
@import './styles/app.css';
</style>
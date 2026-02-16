<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <div ref="lottieContainer" class="lottie-container"></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import lottie from 'lottie-web'
import loadingAnimation from '../assets/lottie/loading.json'

const isLoading = ref(true)
const lottieContainer = ref(null)
let animation = null

function initLottie() {
  if (lottieContainer.value && !animation) {
    animation = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingAnimation
    })
  }
}

function destroyLottie() {
  if (animation) {
    animation.destroy()
    animation = null
  }
}

watch(isLoading, async (newVal) => {
  if (newVal) {
    await nextTick()
    initLottie()
  } else {
    destroyLottie()
  }
})

onMounted(() => {
  if (isLoading.value) {
    initLottie()
  }
})

onUnmounted(() => {
  destroyLottie()
})

defineExpose({
  hide: () => isLoading.value = false,
  show: () => isLoading.value = true
})
</script>

<style scoped>
@import '../styles/loading.css';
</style>
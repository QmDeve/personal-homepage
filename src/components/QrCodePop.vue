<template>
  <div
    class="modal"
    :class="{
      'modal--open': isOpen && !isClosing,
      'modal--closing': isClosing
    }"
    @click="handleBackdropClick"
    @wheel.stop
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
  >
    <div class="modal__content" @click.stop>
      <div class="modal__qrcode">
        <img src="../assets/img/wechat.png" alt="QR Code" loading="lazy">
      </div>
      <button class="modal__close" @click="handleClose">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const isClosing = ref(false)
const startY = ref(0)

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.isOpen && !isClosing.value) {
    handleClose()
  }
}

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    isClosing.value = false
    document.body.style.overflow = 'hidden'
    await nextTick()
  } else {
    document.body.style.overflow = ''
  }
})

const handleClose = () => {
  if (isClosing.value) return
  isClosing.value = true

  setTimeout(() => {
    isClosing.value = false
    emit('close')
  }, 300)
}

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget && !isClosing.value) {
    handleClose()
  }
}

const handleTouchStart = (e) => {
  startY.value = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  if (isClosing.value) return

  const content = e.currentTarget.querySelector('.modal__content')
  const isAtTop = content.scrollTop === 0
  const isAtBottom = content.scrollHeight - content.scrollTop === content.clientHeight
  const direction = e.touches[0].clientY - startY.value

  if ((isAtTop && direction > 0) || (isAtBottom && direction < 0)) {
    e.stopPropagation()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
@import '../styles/qrpop.css';
</style>
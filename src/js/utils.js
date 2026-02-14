export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function openLink(url) {
  if (isMobileDevice()) {
    window.location.href = url
    return
  }
  window.open(url, '_blank')
}

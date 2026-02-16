import { config } from './config'

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

export async function getUserRegion() {
  try {
    const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace')
    const text = await response.text()
    
    const lines = text.split('\n')
    const data = {}
    lines.forEach(line => {
      const [key, value] = line.split('=')
      if (key && value) {
        data[key] = value
      }
    })
    
    const countryCode = data.loc
    if (countryCode === 'CN' || countryCode === 'HK') {
      return countryCode
    }
    
    return 'OTHER'
  } catch (error) {
    return 'OTHER'
  }
}

export const copyrightYear = (() => {
  const start = config.start_year || new Date().getFullYear()
  const current = new Date().getFullYear()
  return current > start ? `${start}-${current}` : start.toString()
})()
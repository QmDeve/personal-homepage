let cachedRegion = null;

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
  if (cachedRegion) {
    return cachedRegion;
  }

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
    console.log('Detected country code:', countryCode)
    if (countryCode === 'CN' || countryCode === 'HK') {
      cachedRegion = countryCode
      return countryCode
    }
    
    cachedRegion = 'OTHER'
    return 'OTHER'
  } catch (error) {
    console.warn('Failed to fetch region from Cloudflare:', error)
    cachedRegion = 'OTHER'
    return 'OTHER'
  }
}
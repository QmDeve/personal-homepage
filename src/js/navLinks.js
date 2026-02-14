import { openLink } from './utils'

export const navLinkss = (onOpenWeChat) => [
  {
    name: 'GitHub',
    href: 'https://github.com/QmDeve',
    icon: 'fab fa-github fa-lg',
    action: () => openLink('https://github.com/QmDeve')
  },
  {
    name: 'Email',
    href: 'mailto:donny@qmdeve.com',
    icon: 'fas fa-envelope fa-lg',
    action: () => {
      window.location.href = 'mailto:donny@qmdeve.com'
    }
  },
  {
    name: 'Telegram',
    href: 'https://t.me/donny_yale',
    icon: 'fab fa-telegram fa-lg',
    action: () => openLink('https://t.me/donny_yale')
  },
  {
    name: 'WeChat',
    href: 'javascript:void(0)',
    icon: 'bi bi-wechat fa-lg',
    action: () => onOpenWeChat()
  },
  {
    name: 'QQ',
    href: 'https://qm.qq.com/q/fEejS2afAY',
    icon: 'fab fa-qq fa-lg',
    action: () => openLink('https://qm.qq.com/q/fEejS2afAY')
  }
]
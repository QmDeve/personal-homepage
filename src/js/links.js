import { openLink } from './utils'
import { getUserRegion } from '../js/utils'

export const nav = async (onOpenWeChat) => {
    const region = await getUserRegion()

    const links = [
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
        }
    ]

    // The "Telegram" button is not displayed when the user's IP is in China
    if (region !== 'CN') {
        links.push({
            name: 'Telegram',
            name: 'Telegram',
            href: 'https://t.me/donny_yale',
            icon: 'fab fa-telegram fa-lg',
            action: () => openLink('https://t.me/donny_yale')
        })
    }

    // The "WeChat" button is only displayed when the user's IP is in China or Hong Kong
    if (region === 'CN' || region === 'HK') {
        links.push({
            name: 'WeChat',
            href: 'javascript:void(0)',
            icon: 'bi bi-wechat fa-lg',
            action: () => onOpenWeChat()
        })
    }

    // The "QQ" button is only displayed when the user's IP is in China or Hong Kong
    if (region === 'CN' || region === 'HK') {
        links.push({
            name: 'QQ',
            href: 'https://qm.qq.com/q/fEejS2afAY',
            icon: 'fab fa-qq fa-lg',
            action: () => openLink('https://qm.qq.com/q/fEejS2afAY')
        })
    }
    return links
}

export const group = () => [
    {
        name: 'Telegram Groups',
        href: 'https://t.me/QmDeve',
        icon: 'fab fa-telegram fa-lg',
        action: () => openLink('https://t.me/QmDeve')
    },
    {
        name: 'Tencent QQ Groups',
        href: 'https://qm.qq.com/q/w87fhbEsYS',
        icon: 'fab fa-qq fa-lg',
        action: () => openLink('https://qm.qq.com/q/w87fhbEsYS')
    }
]
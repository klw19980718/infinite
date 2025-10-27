import { Metadata } from 'next'
import AuthPageClient from './AuthPageClient'

export const metadata: Metadata = {
  title: 'Sign In | Infinite Talk AI',
  description: 'Sign in to Infinite Talk AI to create unlimited talking videos. Secure authentication with Google OAuth and Email OTP.',
  keywords: ['sign in', 'login', 'authentication', 'infinite talk ai', 'talking video', 'AI video generation'],
  openGraph: {
    title: 'Sign In | Infinite Talk AI',
    description: 'Sign in to Infinite Talk AI to create unlimited talking videos. Secure authentication with Google OAuth and Email OTP.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/auth',
    siteName: 'Infinite Talk AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In | Infinite Talk AI',
    description: 'Sign in to Infinite Talk AI to create unlimited talking videos. Secure authentication with Google OAuth and Email OTP.',
  },
  robots: {
    index: true, // 认证页面通常不需要被搜索引擎索引
    follow: true,
  },
}

export default function AuthPage() {
  return <AuthPageClient />
}


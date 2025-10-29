import { Metadata } from 'next'
import { ProfilePageClient } from './ProfilePageClient'

export const metadata: Metadata = {
  title: 'Profile | Infinite Talk AI',
  description: 'Manage your Infinite Talk AI profile, view credits, and account settings.',
  keywords: ['profile', 'account', 'infinite talk ai', 'user settings', 'credits'],
  openGraph: {
    title: 'Profile | Infinite Talk AI',
    description: 'Manage your Infinite Talk AI profile, view credits, and account settings.',
    type: 'website',
    url: 'https://www.infinitetalkai.org/profile',
    siteName: 'Infinite Talk AI',
  },
  twitter: {
    card: 'summary',
    title: 'Profile | Infinite Talk AI',
    description: 'Manage your Infinite Talk AI profile, view credits, and account settings.',
  },
  robots: {
    index: false, // 个人页面不需要被搜索引擎索引
    follow: true,
  },
}

export default function ProfilePage() {
  return <ProfilePageClient />
}

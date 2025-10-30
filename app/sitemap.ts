import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.infinitetalkai.org'
  
  return [
    // 首页
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // 认证页面
    {
      url: baseUrl + '/auth',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // 定价页面
    {
      url: baseUrl + '/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 个人中心页面
    {
      url: baseUrl + '/profile',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    // 法律页面
    {
      url: baseUrl + '/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: baseUrl + '/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: baseUrl + '/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]
}

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://infinitetalkai.org'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: baseUrl + '/auth',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
   
  ]
}

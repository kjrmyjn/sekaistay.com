import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sekaistay.com'

  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/blog`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/simulate`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/audit`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly' as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const posts = getAllPosts()
  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages.map(p => ({ ...p, lastModified: new Date() })),
    ...blogPages,
  ]
}

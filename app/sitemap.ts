import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { AREAS } from '@/lib/areas'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sekaistay.com'
  const now = new Date()

  /* ── Static pages ── */
  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/portfolio`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/faq`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/diagnostic`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/area`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/lp`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/company`, changeFrequency: 'yearly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly' as const, priority: 0.7 },
    { url: `${baseUrl}/simulate`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/audit`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  /* ── Blog posts ── */
  const posts = getAllPosts()
  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  /* ── Area pages ── */
  const areaPages = AREAS.map(area => ({
    url: `${baseUrl}/area/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages.map(p => ({ ...p, lastModified: now })),
    ...blogPages,
    ...areaPages,
  ]
}

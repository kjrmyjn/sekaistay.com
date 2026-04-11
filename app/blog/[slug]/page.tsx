import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

const SITE_URL = 'https://sekaistay.com'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url,
      siteName: 'SEKAI STAY',
      locale: 'ja_JP',
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  }
}

// ── Structured Data (BlogPosting + BreadcrumbList) ────────────────
function BlogPostJsonLd({ post }: { post: { slug: string; title: string; description: string; date: string; category: string; tags: string[]; body: string } }) {
  const url = `${SITE_URL}/blog/${post.slug}`
  const wordCount = post.body.replace(/[#*|\-\[\]()]/g, '').length

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Organization',
      name: 'SEKAI STAY',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEKAI STAY',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/sekai_stay_03_03.png` },
    },
    image: `${SITE_URL}/og-image.jpg`,
    wordCount,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'ja',
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'コラム', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}

// ── Markdown Renderer ─────────────────────────────────────────────
function renderMarkdown(md: string) {
  const lines = md.split('\n')
  const html: string[] = []
  let inTable = false
  let inList = false
  let inUl = false

  for (const line of lines) {
    // table
    if (line.startsWith('|')) {
      if (line.includes('---')) continue
      const cells = line.split('|').filter(Boolean).map(c => c.trim())
      if (!inTable) {
        html.push('<table class="w-full text-sm border-collapse my-6"><tbody>')
        html.push(`<tr>${cells.map(c => `<th class="text-left px-3 py-2.5 border-b-2 border-deep-teal/20 font-bold text-charcoal bg-teal-tint">${c}</th>`).join('')}</tr>`)
        inTable = true
        continue
      }
      html.push(`<tr class="hover:bg-cloud-white transition">${cells.map(c => `<td class="px-3 py-2.5 border-b border-light-gray text-dark-gray">${formatInline(c)}</td>`).join('')}</tr>`)
      continue
    }
    if (inTable) { html.push('</tbody></table>'); inTable = false }

    // unordered list
    if (/^[-*]\s/.test(line)) {
      if (!inUl) { html.push('<ul class="list-disc pl-5 my-3 space-y-1.5 text-sm text-dark-gray leading-relaxed">'); inUl = true }
      html.push(`<li>${formatInline(line.replace(/^[-*]\s/, ''))}</li>`)
      continue
    }
    if (inUl && !/^[-*\s]/.test(line)) { html.push('</ul>'); inUl = false }

    // ordered list
    if (/^\d+\.\s/.test(line)) {
      if (!inList) { html.push('<ol class="list-decimal pl-5 my-3 space-y-1.5 text-sm text-dark-gray leading-relaxed">'); inList = true }
      html.push(`<li>${formatInline(line.replace(/^\d+\.\s/, ''))}</li>`)
      continue
    }
    if (inList && !/^\d+\./.test(line) && !line.startsWith(' ')) { html.push('</ol>'); inList = false }

    // headings
    if (line.startsWith('### ')) {
      html.push(`<h3 class="text-base font-bold text-charcoal mt-8 mb-3">${formatInline(line.slice(4))}</h3>`)
    } else if (line.startsWith('## ')) {
      html.push(`<h2 class="text-lg md:text-xl font-bold text-charcoal mt-12 mb-4 pb-2 border-b border-light-gray">${formatInline(line.slice(3))}</h2>`)
    } else if (line.startsWith('---')) {
      html.push('<hr class="my-8 border-light-gray" />')
    } else if (line.trim() === '') {
      // skip empty
    } else {
      html.push(`<p class="text-sm md:text-base text-dark-gray leading-relaxed mb-4">${formatInline(line)}</p>`)
    }
  }
  if (inTable) html.push('</tbody></table>')
  if (inList) html.push('</ol>')
  if (inUl) html.push('</ul>')

  return html.join('\n')
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-charcoal">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, label, href) => {
      const isExternal = href.startsWith('http') && !href.includes('sekaistay.com')
      const rel = isExternal ? ' rel="noopener noreferrer" target="_blank"' : ''
      return `<a href="${href}" class="text-deep-teal hover:underline"${rel}>${label}</a>`
    })
}

// ── Page Component ────────────────────────────────────────────────
export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  // Related: same category first, then recent
  const sameCategory = allPosts.filter(p => p.slug !== post.slug && p.category === post.category)
  const others = allPosts.filter(p => p.slug !== post.slug && p.category !== post.category)
  const related = [...sameCategory, ...others].slice(0, 3)

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'コラム', href: '/blog' }, { label: post.title }]} />
      <BlogPostJsonLd post={post} />
      <main>
        <article className="px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">

            {/* Meta */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-deep-teal bg-teal-tint px-2 py-0.5 rounded">{post.category}</span>
              <time className="text-[10px] text-mid-gray" dateTime={post.date}>{post.date}</time>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-charcoal tracking-tight leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-base text-dark-gray leading-relaxed mb-10 border-b border-light-gray pb-10">
              {post.description}
            </p>

            {/* Body */}
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-light-gray">
              {post.tags.map(tag => (
                <span key={tag} className="text-[11px] text-dark-gray bg-pale-gray px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-teal-tint rounded-2xl border border-deep-teal/20 p-6 md:p-8 mt-10 text-center">
              <p className="text-lg font-bold text-charcoal mb-2">民泊運営のご相談はお気軽に</p>
              <p className="text-sm text-dark-gray mb-6">SEKAI STAYが手数料8%で一括代行します。</p>
              <Link
                href="/contact"
                className="inline-block bg-deep-teal hover:bg-sekai-teal text-white font-bold px-8 py-3.5 rounded-xl transition text-sm"
              >
                無料相談する
              </Link>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-16">
                <h2 className="text-lg font-bold text-charcoal mb-6">関連記事</h2>
                <div className="space-y-4">
                  {related.map(r => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="block bg-cloud-white rounded-xl border border-light-gray p-4 hover:border-deep-teal/30 transition group"
                    >
                      <p className="text-sm font-bold text-charcoal group-hover:text-deep-teal transition">{r.title}</p>
                      <p className="text-[10px] text-mid-gray mt-1">{r.date} · {r.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

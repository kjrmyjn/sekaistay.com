import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { IconArrowRight, IconCalendar, IconCheck } from '@/components/Icons'

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
      images: [{ url: post.image || `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
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
function BlogPostJsonLd({ post }: { post: { slug: string; title: string; description: string; date: string; category: string; tags: string[]; body: string; image?: string } }) {
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
      '@type': 'Person',
      name: '松本凌輔',
      jobTitle: 'コラム編集長',
      worksFor: {
        '@type': 'Organization',
        name: 'SEKAI STAY',
        url: SITE_URL,
      },
      description: 'agoda Customer Service部門を経て、民泊業界でCS・運営支援に5年間従事。住宅宿泊管理業の修了証を取得。',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEKAI STAY',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/sekai_stay_03_03.png` },
    },
    image: post.image || `${SITE_URL}/og-image.jpg`,
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
  if (!md) return '<p class="text-sm text-dark-gray">記事の本文を準備中です。</p>'
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

  // Estimated reading time (Japanese: ~500 chars/min)
  const plainLength = post.body.replace(/[#*|\-\[\]()]/g, '').length
  const readingMinutes = Math.max(1, Math.round(plainLength / 500))

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'コラム', href: '/blog' }, { label: post.title }]} />
      <BlogPostJsonLd post={post} />
      <FloatingCTA />
      <main>
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="bg-warm-gradient px-6 pt-14 pb-10 md:pt-20 md:pb-14 border-b border-light-gray">
          <div className="max-w-3xl mx-auto">
            {/* Hero image */}
            {post.image && (
              <div className="aspect-[2/1] sm:aspect-[5/2] rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-[10px] font-bold text-deep-teal bg-teal-tint px-2.5 py-1 rounded tracking-wider">
                {post.category}
              </span>
              <time className="inline-flex items-center gap-1.5 text-[11px] text-dark-gray" dateTime={post.date}>
                <IconCalendar size={12} />
                {post.date}
              </time>
              <span className="text-[11px] text-dark-gray">·</span>
              <span className="text-[11px] text-dark-gray">読了 約{readingMinutes}分</span>
            </div>

            <h1 className="text-2xl md:text-[34px] font-black text-charcoal tracking-tight leading-[1.35] mb-5">
              {post.title}
            </h1>
            <p className="text-base text-dark-gray leading-relaxed">
              {post.description}
            </p>
          </div>
        </section>

        {/* ── Article body ─────────────────────────────── */}
        <article className="px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Author card */}
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-light-gray">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-deep-teal to-sekai-teal flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                松
              </div>
              <div>
                <p className="text-[13px] font-bold text-charcoal leading-tight">
                  松本凌輔<span className="text-[11px] font-normal text-dark-gray ml-2">コラム編集長</span>
                </p>
                <p className="text-[11px] text-dark-gray mt-0.5 leading-relaxed">
                  agoda CS部門出身 / 民泊業界5年 / 住宅宿泊管理業修了
                </p>
              </div>
            </div>

            {/* Body */}
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-light-gray">
              {post.tags.map(tag => (
                <span key={tag} className="text-[11px] text-dark-gray bg-pale-gray px-3 py-1 rounded-full">#{tag}</span>
              ))}
            </div>

            {/* Premium CTA */}
            <div className="relative overflow-hidden bg-charcoal rounded-3xl p-8 md:p-10 mt-12 text-center">
              {/* Teal glow */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 20% 0%, rgba(84,190,195,0.45), transparent 50%), radial-gradient(circle at 80% 100%, rgba(22,123,129,0.4), transparent 55%)',
                }}
              />
              <div className="relative">
                <p className="text-[10px] font-bold text-bright-teal tracking-[0.25em] uppercase mb-3">
                  SEKAI STAY Management
                </p>
                <p className="text-xl md:text-2xl font-black text-white leading-snug mb-3">
                  民泊運営を、まるごと。<br className="md:hidden" />手数料8%で一括代行。
                </p>
                <p className="text-sm text-white/75 leading-relaxed mb-7 max-w-md mx-auto">
                  OTA掲載・プライシング・ゲスト対応・清掃まで。<br />
                  初期費用0円・最低契約期間なし。
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 bg-white text-deep-teal font-bold px-8 py-3.5 rounded-xl transition hover:bg-cloud-white text-sm shadow-lg"
                  >
                    無料相談する
                    <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                  <Link
                    href="/simulate"
                    className="group inline-flex items-center gap-2 border border-white/30 text-white font-bold px-8 py-3.5 rounded-xl transition hover:bg-white/10 text-sm"
                  >
                    収支シミュレーション
                    <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 text-[10px] text-white/60">
                  <span className="inline-flex items-center gap-1"><IconCheck size={11} color="#54BEC3" /> 初期費用0円</span>
                  <span className="inline-flex items-center gap-1"><IconCheck size={11} color="#54BEC3" /> 手数料8%</span>
                  <span className="inline-flex items-center gap-1"><IconCheck size={11} color="#54BEC3" /> 全国対応</span>
                </div>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-16">
                <p className="text-[10px] font-bold text-deep-teal tracking-[0.2em] uppercase mb-4">Related Articles</p>
                <h2 className="text-xl font-black text-charcoal mb-6">関連記事</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {related.map(r => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group block bg-cloud-white rounded-xl border border-light-gray p-5 hover:border-deep-teal/40 hover:shadow-md transition"
                    >
                      <span className="inline-block text-[9px] font-bold text-deep-teal bg-teal-tint px-2 py-0.5 rounded tracking-wider mb-3">
                        {r.category}
                      </span>
                      <p className="text-sm font-bold text-charcoal group-hover:text-deep-teal transition leading-snug mb-2 line-clamp-3">
                        {r.title}
                      </p>
                      <p className="text-[10px] text-dark-gray">{r.date}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to index */}
            <div className="mt-12 pt-8 border-t border-light-gray text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-deep-teal hover:text-sekai-teal transition"
              >
                コラム一覧へ戻る
                <IconArrowRight size={14} />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

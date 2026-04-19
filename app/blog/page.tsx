import type { Metadata } from 'next'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import BlogGrid from '@/components/blog/BlogGrid'
import { getAllPostSummaries, getCategories } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'コラム',
  description: '民泊運営に関するノウハウ、費用・手数料の解説、法令情報、成功事例などをお届けするSEKAI STAYのコラム。',
}

export default function BlogPage() {
  const posts = getAllPostSummaries()
  const categories = getCategories()

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: 'コラム' }]} />
      <FloatingCTA />
      <main className="bg-ivory">
        {/* Chapter Ⅰ — masthead */}
        <section className="bg-paper border-b border-rule">
          <div className="container-edit section-hero">
            <div className="chapter-marker">
              <span className="rule-teal-sm" />
              <p className="eyebrow text-sekai-teal">Chapter Ⅰ · Column</p>
            </div>
            <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end">
              <h1 className="heading-display text-ink">
                民泊運営お役立ち情報
                <span className="block font-sans font-light text-mid-gray text-[0.55em] mt-3">The Journal</span>
              </h1>
              <div className="text-right">
                <p className="eyebrow-mono text-mid-gray mb-2">Issue · 2026 Spring</p>
                <p className="font-sans font-light text-[44px] md:text-[56px] text-sekai-teal leading-none tabular-nums">
                  {String(posts.length).padStart(2, '0')}
                </p>
                <p className="eyebrow-mono text-mid-gray mt-1">Articles</p>
              </div>
            </div>
            <p className="lead text-dark-gray mt-10 max-w-2xl">
              民泊運営のノウハウ、業界動向、成功事例をお届けします。
            </p>
          </div>
        </section>

        {/* Chapter Ⅱ — grid */}
        <section className="section-xl">
          <div className="container-edit px-5 md:px-8">
            <BlogGrid posts={posts} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

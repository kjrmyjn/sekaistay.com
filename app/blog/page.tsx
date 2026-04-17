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
      <main>
        <section className="bg-warm-gradient px-6 section-heavy">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold text-deep-teal tracking-[0.2em] uppercase mb-3">Column</p>
            <h1 className="heading-display text-charcoal mb-6">
              民泊運営お役立ち情報
            </h1>
            <p className="text-base text-dark-gray leading-relaxed max-w-2xl mx-auto">
              民泊運営のノウハウ、業界動向、成功事例をお届けします。
            </p>
          </div>
        </section>

        <section className="px-6 section-heavy">
          <div className="max-w-5xl mx-auto">
            <BlogGrid posts={posts} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

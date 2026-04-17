import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import { getAllPosts, getCategories } from '@/lib/blog'
import { IMG } from '@/lib/images'

export const metadata: Metadata = {
  title: 'コラム',
  description: '民泊運営に関するノウハウ、費用・手数料の解説、法令情報、成功事例などをお届けするSEKAI STAYのコラム。',
}

export default function BlogPage() {
  const posts = getAllPosts()
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
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12">
                <span className="text-xs font-bold text-white bg-deep-teal px-4 py-2 rounded-full">
                  すべて ({posts.length})
                </span>
                {categories.map(cat => (
                  <span key={cat} className="text-xs font-medium text-dark-gray bg-pale-gray px-4 py-2 rounded-full border border-light-gray">
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {/* Posts */}
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-dark-gray text-lg">記事の準備中です。</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block bg-white rounded-2xl border border-light-gray overflow-hidden hover:shadow-lg hover:border-deep-teal/30 transition-all group"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={post.image || IMG.blogPlaceholder} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-deep-teal bg-teal-tint px-2 py-0.5 rounded">{post.category}</span>
                        <span className="text-[10px] text-dark-gray">{post.date}</span>
                      </div>
                      <h2 className="text-sm font-bold text-charcoal group-hover:text-deep-teal transition leading-relaxed mb-2">
                        {post.title}
                      </h2>
                      <p className="text-xs text-dark-gray line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

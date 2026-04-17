'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { BlogPostSummary } from '@/lib/blog'
import { IMG } from '@/lib/images'

interface Props {
  posts: BlogPostSummary[]
  categories: string[]
}

export default function BlogGrid({ posts, categories }: Props) {
  const [active, setActive] = useState<string>('all')

  const filtered = useMemo(() => {
    if (active === 'all') return posts
    return posts.filter(p => p.category === active)
  }, [active, posts])

  // Count per category
  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const p of posts) {
      map[p.category] = (map[p.category] || 0) + 1
    }
    return map
  }, [posts])

  return (
    <>
      {/* Category filter tabs */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
          <button
            onClick={() => setActive('all')}
            className={`text-xs font-bold px-4 py-2 rounded-full border transition ${
              active === 'all'
                ? 'text-white bg-charcoal border-charcoal'
                : 'text-dark-gray bg-white border-light-gray hover:border-sekai-teal hover:text-sekai-teal'
            }`}
          >
            すべて
            <span className={`ml-1.5 text-[10px] font-mono ${active === 'all' ? 'text-white/70' : 'text-mid-gray'}`}>
              {posts.length}
            </span>
          </button>
          {categories.map(cat => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-full border transition ${
                  isActive
                    ? 'text-white bg-charcoal border-charcoal'
                    : 'text-dark-gray bg-white border-light-gray hover:border-sekai-teal hover:text-sekai-teal'
                }`}
              >
                {cat}
                <span className={`ml-1.5 text-[10px] font-mono ${isActive ? 'text-white/70' : 'text-mid-gray'}`}>
                  {counts[cat] || 0}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Posts grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-dark-gray text-lg">該当する記事がありません。</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl border border-light-gray overflow-hidden hover:shadow-lg hover:border-deep-teal/30 transition-all group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-pale-gray">
                <img
                  src={post.image || IMG.blogPlaceholder}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-deep-teal bg-teal-tint px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-dark-gray">{post.date}</span>
                </div>
                <h2 className="text-sm font-bold text-charcoal group-hover:text-deep-teal transition leading-relaxed mb-2 line-clamp-2">
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

      {/* Result count */}
      <p className="mt-6 text-[11px] text-mid-gray text-center">
        {filtered.length}件の記事を表示中
        {active !== 'all' && (
          <button
            onClick={() => setActive('all')}
            className="ml-2 text-sekai-teal hover:text-deep-teal font-bold transition"
          >
            すべて表示
          </button>
        )}
      </p>
    </>
  )
}

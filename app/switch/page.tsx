/* ─────────────────────────────────────────────────────────────────
 * /switch — 社内LP (sekaistay-lp.vercel.app/switch) の完全ミラー
 *
 * 元LPのHTMLをサーバーサイドで取得し、全ての相対パス
 * （/_next/*, /images/*, /favicon*）を元LPドメインへの絶対URLに
 * 書き換えて iframe srcDoc に注入する。
 *
 * 結果:
 *  - sekaistay.com/switch のURLで元LPがそのまま表示される
 *  - CSS・JS・画像・フォントは sekaistay-lp.vercel.app から読み込まれる
 *  - フォームやインタラクションも元LPと同一に動作する
 *  - LPチームが更新すると最短5分で反映（revalidate）
 * ───────────────────────────────────────────────────────────────── */

export const revalidate = 300 // 5分ごとに再取得

const LP_ORIGIN = 'https://sekaistay-lp.vercel.app'
const LP_URL = `${LP_ORIGIN}/switch`

function rewriteAssetUrls(html: string): string {
  let out = html

  // 1. href/src/action/content 属性内の絶対パス → LP絶対URL
  out = out.replace(
    /(href|src|action|content)="\/([^/"][^"]*?)"/g,
    (_m, attr, path) => `${attr}="${LP_ORIGIN}/${path}"`
  )

  // 2. srcSet 属性（カンマ区切りの複数URL）
  out = out.replace(/srcSet="([^"]+)"/g, (_m, val: string) => {
    const rewritten = val.replace(
      /(^|\s|,\s*)\/([^/\s][^\s,]*)/g,
      (_s, sep: string, path: string) => `${sep}${LP_ORIGIN}/${path}`
    )
    return `srcSet="${rewritten}"`
  })

  // 3. RSC (React Server Components) ペイロード内のエスケープされたURL
  //    self.__next_f.push(...) に \"/_next/...\" の形で埋め込まれている
  out = out.replace(
    /\\"\/([^/\\"][^\\"]*?)\\"/g,
    (_m, path) => `\\"${LP_ORIGIN}/${path}\\"`
  )

  return out
}

async function fetchLP(): Promise<string> {
  const res = await fetch(LP_URL, {
    next: { revalidate: 300 },
    headers: { 'user-agent': 'sekaistay-proxy/1.0' },
  })
  if (!res.ok) throw new Error(`LP fetch failed: ${res.status}`)
  const html = await res.text()
  return rewriteAssetUrls(html)
}

export default async function SwitchPage() {
  let html = ''
  try {
    html = await fetchLP()
  } catch {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            ページを読み込めませんでした
          </h1>
          <p style={{ color: '#666' }}>
            しばらく経ってから再度アクセスしてください。
          </p>
          <a href="/" style={{ color: '#0891b2', marginTop: '1rem', display: 'inline-block' }}>
            トップへ戻る →
          </a>
        </div>
      </div>
    )
  }

  return (
    <iframe
      srcDoc={html}
      title="SEKAI STAY｜手数料8%の民泊運用代行"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        border: 0,
        margin: 0,
        padding: 0,
        display: 'block',
      }}
    />
  )
}

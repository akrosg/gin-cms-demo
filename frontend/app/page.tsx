import Link from 'next/link'
import { Suspense } from 'react'
import { getPosts } from '@/lib/api'
import PostList from '@/components/PostList'

// ISR: 60秒ごとに再生成
export const revalidate = 60

export default async function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <header className="bg-white border-b border-gray-200 py-4 mb-8">
        <h1 className="text-2xl font-semibold">Gin CMS Demo</h1>
        <nav className="flex gap-6 mt-2">
          <Link href="/" className="text-gray-600 hover:text-black transition-colors">
            ホーム
          </Link>
          <Link href="/admin" className="text-gray-600 hover:text-black transition-colors">
            管理画面
          </Link>
        </nav>
      </header>

      <main>
        <h2 className="mb-6 text-2xl">
          記事一覧（ISR: 60秒ごとに再生成）
        </h2>
        
        {/* PPR: Suspenseで動的部分を分離 */}
        <Suspense fallback={
          <div className="text-center py-8 text-gray-600">
            記事を読み込み中...
          </div>
        }>
          <PostList />
        </Suspense>
      </main>
    </div>
  )
}


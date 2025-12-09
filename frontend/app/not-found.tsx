import Link from 'next/link'

export default function NotFound() {
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
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h1 className="text-4xl mb-4">404 - ページが見つかりません</h1>
          <p className="mb-4">お探しのページは存在しません。</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
            ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  )
}


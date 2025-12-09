import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60'>
      <div className='container-custom flex h-16 items-center justify-between'>
        <div className='flex items-center gap-8'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-xl font-bold tracking-tight text-slate-900'>Gin CMS</span>
          </Link>
          <nav className='hidden md:flex gap-6'>
            <Link
              href='/'
              className='text-sm font-medium text-slate-600 transition-colors hover:text-primary-600'
            >
              ホーム
            </Link>
            <Link
              href='/admin'
              className='text-sm font-medium text-slate-600 transition-colors hover:text-primary-600'
            >
              管理画面
            </Link>
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          {/* 将来的な検索バーやログインボタンのためのスペース */}
        </div>
      </div>
    </header>
  );
}

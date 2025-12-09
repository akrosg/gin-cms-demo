import PostList from '@/components/PostList';
import { Suspense } from 'react';

// ISR: 60秒ごとに再生成
export const revalidate = 60;

const SKELETON_IDS = [
  'skeleton-1',
  'skeleton-2',
  'skeleton-3',
  'skeleton-4',
  'skeleton-5',
  'skeleton-6',
] as const;

export default async function HomePage() {
  return (
    <div className='container-custom py-12 md:py-20'>
      <div className='mb-16 text-center max-w-2xl mx-auto'>
        <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6'>
          Thoughts & Ideas
        </h1>
        <p className='text-lg text-slate-600 leading-relaxed'>
          日々の学びや技術的な知見を共有するデモブログ。
          <br className='hidden sm:inline' />
          GinとNext.jsで構築された、高速でモダンなCMSです。
        </p>
      </div>

      <div className='space-y-8'>
        <div className='flex items-center justify-between border-b border-gray-200 pb-4 mb-8'>
          <h2 className='text-xl font-semibold text-slate-800'>Latest Posts</h2>
          <span className='text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full'>
            ISR: 60s
          </span>
        </div>

        <Suspense
          fallback={
            <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {SKELETON_IDS.map((id) => (
                <div key={id} className='h-64 rounded-xl bg-gray-100 animate-pulse' />
              ))}
            </div>
          }
        >
          <PostList />
        </Suspense>
      </div>
    </div>
  );
}

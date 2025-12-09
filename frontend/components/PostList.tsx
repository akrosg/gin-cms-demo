import { getPosts } from '@/lib/api';
import Link from 'next/link';

export default async function PostList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 text-center'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
          <svg
            className='w-8 h-8 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <title>記事がまだありません</title>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
            />
          </svg>
        </div>
        <p className='text-lg font-medium text-slate-600'>記事がまだありません</p>
        <p className='text-sm text-slate-400 mt-1'>管理画面から新しい記事を投稿してください。</p>
      </div>
    );
  }

  return (
    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.slug}`} className='group block h-full'>
          <article className='h-full flex flex-col bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:-translate-y-1 border border-gray-100'>
            <div className='flex-1'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10'>
                  Article
                </span>
                <time className='text-xs text-slate-400 font-medium' dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <h2 className='text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2'>
                {post.title}
              </h2>
              <p className='text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4'>
                {post.content}
              </p>
            </div>
            <div className='mt-auto pt-4 border-t border-gray-50 flex items-center justify-between'>
              <span className='text-sm font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1'>
                Read more
                <svg
                  className='w-4 h-4 transition-transform group-hover:translate-x-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <title>記事を読む</title>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

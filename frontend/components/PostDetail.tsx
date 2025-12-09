import { getPost } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PostDetail({ slug }: { slug: string }) {
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className='max-w-3xl mx-auto'>
      <div className='mb-10'>
        <Link
          href='/'
          className='inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors mb-8 group'
        >
          <svg
            className='w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <title>戻る</title>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Back to Home
        </Link>

        <div className='flex items-center gap-3 mb-6'>
          <span className='inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10'>
            Article
          </span>
          <time className='text-sm text-slate-500 font-medium' dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-8'>
          {post.title}
        </h1>

        <div className='flex items-center justify-between border-y border-gray-100 py-4'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-linear-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold'>
              A
            </div>
            <div>
              <p className='text-sm font-semibold text-slate-900'>Author</p>
              <p className='text-xs text-slate-500'>Gin CMS User</p>
            </div>
          </div>
          <div className='flex gap-2'>{/* シェアボタンなどのプレースホルダー */}</div>
        </div>
      </div>

      <div className='prose prose-lg prose-slate max-w-none text-slate-600 leading-8 whitespace-pre-wrap'>
        {post.content}
      </div>

      {post.updatedAt !== post.createdAt && (
        <p className='mt-12 text-sm text-slate-400 italic text-right border-t border-gray-100 pt-4'>
          Updated: {new Date(post.updatedAt).toLocaleDateString('ja-JP')}
        </p>
      )}
    </article>
  );
}

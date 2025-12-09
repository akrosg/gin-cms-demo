'use client';

import { type Post, createPost, deletePost, getPosts, updatePost } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await updatePost(editingPost.id, formData);
      } else {
        await createPost(formData);
      }
      setFormData({ title: '', content: '', slug: '' });
      setEditingPost(null);
      loadPosts();
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('保存に失敗しました');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      slug: post.slug,
    });
    // フォームまでスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('本当に削除しますか？')) return;
    try {
      await deletePost(id);
      loadPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('削除に失敗しました');
    }
  };

  return (
    <div className='container-custom py-12'>
      <div className='flex items-center justify-between mb-10'>
        <h1 className='text-3xl font-bold text-slate-900'>管理ダッシュボード</h1>
        <span className='text-sm px-3 py-1 bg-slate-100 text-slate-500 rounded-full'>
          Admin Area
        </span>
      </div>

      <div className='grid lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-1'>
          <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24'>
            <h3 className='mb-6 text-lg font-bold text-slate-900 flex items-center gap-2'>
              {editingPost ? (
                <>
                  <svg
                    className='w-5 h-5 text-primary-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <title>記事を編集</title>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    />
                  </svg>
                  記事を編集
                </>
              ) : (
                <>
                  <svg
                    className='w-5 h-5 text-primary-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <title>新規記事作成</title>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4v16m8-8H4'
                    />
                  </svg>
                  新規記事作成
                </>
              )}
            </h3>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label htmlFor='title' className='block mb-1.5 text-sm font-medium text-slate-700'>
                  タイトル
                </label>
                <input
                  type='text'
                  id='title'
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow'
                  placeholder='記事のタイトルを入力'
                />
              </div>

              <div>
                <label htmlFor='slug' className='block mb-1.5 text-sm font-medium text-slate-700'>
                  スラッグ (URL)
                </label>
                <div className='relative'>
                  <span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm'>
                    /posts/
                  </span>
                  <input
                    id='slug'
                    type='text'
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className='w-full pl-16 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow font-mono text-sm'
                    placeholder='my-post-slug'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='content'
                  className='block mb-1.5 text-sm font-medium text-slate-700'
                >
                  本文
                </label>
                <textarea
                  id='content'
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={8}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow resize-none'
                  placeholder='記事の本文を入力...'
                />
              </div>

              <div className='flex gap-3 pt-2'>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer'
                >
                  {editingPost ? '変更を保存' : '記事を公開'}
                </button>
                {editingPost && (
                  <button
                    type='button'
                    onClick={() => {
                      setEditingPost(null);
                      setFormData({ title: '', content: '', slug: '' });
                    }}
                    className='px-4 py-2.5 bg-white text-slate-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer'
                  >
                    キャンセル
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className='lg:col-span-2'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <div className='px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50'>
              <h3 className='font-bold text-slate-800'>記事一覧</h3>
              <span className='text-xs font-medium bg-white border border-gray-200 px-2 py-1 rounded-md text-slate-500'>
                Total: {posts.length}
              </span>
            </div>

            {loading ? (
              <div className='text-center py-12 text-slate-500 flex flex-col items-center gap-2'>
                <div className='w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin' />
                読み込み中...
              </div>
            ) : posts.length === 0 ? (
              <div className='text-center py-12 text-slate-500'>記事がありません</div>
            ) : (
              <div className='divide-y divide-gray-100'>
                {posts.map((post) => (
                  <div key={post.id} className='p-6 hover:bg-gray-50/50 transition-colors group'>
                    <div className='flex justify-between items-start gap-4'>
                      <div className='flex-1 min-w-0'>
                        <h2 className='text-lg font-bold text-slate-900 mb-1 truncate group-hover:text-primary-600 transition-colors'>
                          {post.title}
                        </h2>
                        <div className='flex items-center gap-3 text-xs text-slate-400 mb-2'>
                          <span className='font-mono bg-gray-100 px-1.5 py-0.5 rounded text-slate-500'>
                            /{post.slug}
                          </span>
                          <span>•</span>
                          <time>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</time>
                        </div>
                        <p className='text-slate-600 text-sm line-clamp-2 leading-relaxed'>
                          {post.content}
                        </p>
                      </div>

                      <div className='flex flex-col sm:flex-row gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button
                          type='button'
                          onClick={() => handleEdit(post)}
                          className='p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer'
                          title='編集'
                        >
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <title>編集</title>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                            />
                          </svg>
                        </button>
                        <button
                          type='button'
                          onClick={() => handleDelete(post.id)}
                          className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer'
                          title='削除'
                        >
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <title>削除</title>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

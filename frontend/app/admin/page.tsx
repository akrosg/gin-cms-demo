'use client';

import { type Post, createPost, deletePost, getPosts, updatePost } from '@/lib/api';
import Link from 'next/link';
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
    <div className='max-w-6xl mx-auto px-8 py-8'>
      <header className='bg-white border-b border-gray-200 py-4 mb-8'>
        <h1 className='text-2xl font-semibold'>管理画面</h1>
        <nav className='flex gap-6 mt-2'>
          <Link href='/' className='text-gray-600 hover:text-black transition-colors'>
            ホーム
          </Link>
          <Link href='/admin' className='text-gray-600 hover:text-black transition-colors'>
            管理画面
          </Link>
        </nav>
      </header>

      <main>
        <h2 className='mb-6 text-2xl'>記事管理</h2>

        <form onSubmit={handleSubmit} className='mb-8 bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='mb-4 text-lg font-semibold'>
            {editingPost ? '記事を編集' : '新規記事を作成'}
          </h3>
          <div className='mb-4'>
            <label htmlFor='title' className='block mb-2 font-medium'>
              タイトル
            </label>
            <input
              type='text'
              id='title'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='slug' className='block mb-2 font-medium'>
              Slug
            </label>
            <input
              id='slug'
              type='text'
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='content' className='block mb-2 font-medium'>
              コンテンツ
            </label>
            <textarea
              id='content'
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={10}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex gap-2'>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer'
            >
              {editingPost ? '更新' : '作成'}
            </button>
            {editingPost && (
              <button
                type='button'
                onClick={() => {
                  setEditingPost(null);
                  setFormData({ title: '', content: '', slug: '' });
                }}
                className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer'
              >
                キャンセル
              </button>
            )}
          </div>
        </form>

        <div>
          <h3 className='mb-4 text-xl font-semibold'>記事一覧</h3>
          {loading ? (
            <div className='text-center py-8 text-gray-600'>読み込み中...</div>
          ) : posts.length === 0 ? (
            <div className='text-center py-8 text-gray-600'>記事がありません</div>
          ) : (
            <div className='grid gap-6'>
              {posts.map((post) => (
                <div key={post.id} className='bg-white rounded-lg p-6 shadow-sm'>
                  <h2 className='text-xl mb-2 text-black font-semibold'>{post.title}</h2>
                  <p className='text-gray-600 mb-2'>{post.content.substring(0, 100)}...</p>
                  <div className='text-sm text-gray-400 mb-4'>
                    {new Date(post.createdAt).toLocaleDateString('ja-JP')}
                  </div>
                  <div className='mt-4 flex gap-2'>
                    <button
                      type='button'
                      onClick={() => handleEdit(post)}
                      className='px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors cursor-pointer'
                    >
                      編集
                    </button>
                    <button
                      type='button'
                      onClick={() => handleDelete(post.id)}
                      className='px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors cursor-pointer'
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

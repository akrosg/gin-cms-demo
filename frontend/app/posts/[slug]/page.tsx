import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPost, getPosts } from "@/lib/api";
import PostDetail from "@/components/PostDetail";

// ISR: 30秒ごとに再生成
export const revalidate = 30;

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <header className="bg-white border-b border-gray-200 py-4 mb-8">
        <h1 className="text-2xl font-semibold">Gin CMS Demo</h1>
        <nav className="flex gap-6 mt-2">
          <a href="/" className="text-gray-600 hover:text-black transition-colors">
            ホーム
          </a>
          <a href="/admin" className="text-gray-600 hover:text-black transition-colors">
            管理画面
          </a>
        </nav>
      </header>

      <main>
        {/* PPR: Suspenseで動的部分を分離 */}
        <Suspense
          fallback={<div className="text-center py-8 text-gray-600">記事を読み込み中...</div>}
        >
          <PostDetail slug={params.slug} />
        </Suspense>
      </main>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost } from "@/lib/api";

export default async function PostDetail({ slug }: { slug: string }) {
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <Link href="/" className="text-gray-600 text-sm hover:text-black transition-colors">
        ← 一覧に戻る
      </Link>
      <h1 className="text-4xl mb-4 mt-4">{post.title}</h1>
      <div className="text-sm text-gray-400 mb-6">
        作成日: {new Date(post.createdAt).toLocaleDateString("ja-JP")}
        {post.updatedAt !== post.createdAt && (
          <> | 更新日: {new Date(post.updatedAt).toLocaleDateString("ja-JP")}</>
        )}
      </div>
      <div className="leading-relaxed mt-6">{post.content}</div>
    </div>
  );
}

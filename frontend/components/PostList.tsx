import Link from "next/link";
import { getPosts } from "@/lib/api";

export default async function PostList() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return <div className="text-center py-8 text-gray-600">記事がありません</div>;
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.slug}`}>
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <h2 className="text-xl mb-2 text-black font-semibold">{post.title}</h2>
            <p className="text-gray-600 mb-2">{post.content.substring(0, 150)}...</p>
            <div className="text-sm text-gray-400">
              {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

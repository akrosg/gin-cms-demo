import PostDetail from "@/components/PostDetail";
import { getPosts } from "@/lib/api";
import { Suspense } from "react";

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="container-custom py-12 md:py-20">
      <Suspense
        fallback={
          <div className="text-center py-20 text-slate-500">
            Loading story...
          </div>
        }
      >
        <PostDetail slug={slug} />
      </Suspense>
    </div>
  );
}

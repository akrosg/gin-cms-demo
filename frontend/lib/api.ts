const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

// 記事一覧を取得（ISR用）
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      next: { revalidate: 60 }, // ISR: 60秒
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// 記事詳細を取得（PPR用）
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL}/posts/${slug}`, {
      next: { revalidate: 30 }, // ISR: 30秒
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch post");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// 記事を作成
export async function createPost(
  data: Omit<Post, "id" | "createdAt" | "updatedAt">
): Promise<Post> {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
}

// 記事を更新
export async function updatePost(id: number, data: Partial<Post>): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json();
}

// 記事を削除
export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
}

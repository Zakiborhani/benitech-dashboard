"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts, Post } from "../utils/postsData";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/posts/create">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Create Post
          </button>
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No posts yet. Start by creating your first post!</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded p-4 flex flex-col sm:flex-row gap-4 items-start bg-gray-50 hover:bg-blue-50 transition"
            >
              {post.image && (
                <img src={post.image} alt={post.title} className="w-24 h-24 object-cover rounded" />
              )}
              <div>
                <Link href={`/posts/${post.id}`}>
                  <h2 className="text-lg font-semibold mb-1 text-blue-700 hover:underline cursor-pointer">{post.title}</h2>
                </Link>
                <p className="text-gray-700 mb-2">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

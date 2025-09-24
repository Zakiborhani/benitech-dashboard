"use client";

import { notFound, useRouter } from "next/navigation";
import { getPosts, Post } from "../../utils/postsData";
import Link from "next/link";
import React, { useState } from "react";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const postId = Number(id);
  const post = getPosts().find((p) => p.id === postId);
  const router = useRouter();

  const [form, setForm] = useState({
    title: post?.title || "",
    content: post?.content || "",
    image: post?.image || "",
    file: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(post?.image || null);
  const [saving, setSaving] = useState(false);

  if (!post) return notFound();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, files } = e.target as any;
    if (name === "image" && files && files[0]) {
      setForm((prev) => ({ ...prev, file: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // Simulate update in-memory (replace in posts array)
    setTimeout(() => {
      if (post) {
        post.title = form.title;
        post.content = form.content;
        if (form.file) {
          post.image = preview || "";
        }
      }
      setSaving(false);
      router.push("/posts");
    }, 800);
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 h-32 object-cover rounded" />
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/posts">
            <button type="button" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Back to Posts</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

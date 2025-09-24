// utils/postsData.ts
// Simple in-memory mock for posts
export type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
};

let posts: Post[] = [
  {
    id: 1,
    title: "Welcome to Benitech!",
    content: "This is your first post. Edit or delete it, or create a new one!",
    image: "/benitech-logo.png",
  },
];

export function getPosts() {
  return posts;
}

export function addPost(post: Omit<Post, "id">) {
  const newPost = { ...post, id: Date.now() };
  posts = [newPost, ...posts];
  return newPost;
}

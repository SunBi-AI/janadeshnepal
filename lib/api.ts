import { buildApiUrl } from './config';

export async function fetchBlogBySlug(slug: string, locale: 'en' | 'np') {
  const res = await fetch(buildApiUrl(`/blogs/${slug}?lang=${locale}`));

  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
}

// Example: fetch all blogs
export async function fetchAllBlogs(locale: 'en' | 'np') {
  const res = await fetch(buildApiUrl(`/blogs?lang=${locale}`));

  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
}

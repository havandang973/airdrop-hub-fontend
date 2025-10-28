'use client';

import { useState } from 'react';
import NewsSearchBar from '../(components)/NewsSearchBar';
import NewsFilterTabs from '../(components)/NewsFilterTabs';
import NewsCard from '../(components)/NewsCard';
import { Spin } from 'antd'; // nếu bạn dùng Ant Design
import { useGetPosts } from '@/lib/hooks/post';
import { Link } from '@heroui/link';

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Gọi API lấy danh sách bài viết
  const { data: posts, isLoading } = useGetPosts(true);

  // ✅ Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  // ✅ Fallback nếu không có bài viết
  if (!posts || posts.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-500">
        <h1 className="text-2xl font-semibold mb-4">No News Found</h1>
        <p>There are currently no articles available.</p>
      </section>
    );
  }

  // ✅ Lọc bài viết theo từ khóa tìm kiếm
  const filteredNews = posts.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-center text-3xl font-semibold mb-6">
        <span className="text-blue-600">News</span>
      </h1>

      {/* Search bar */}
      <NewsSearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Filter tabs */}
      <div className="mt-8 mb-6">
        <NewsFilterTabs
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* Grid list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredNews.map((post: any) => (
          <Link
            key={post.id}
            href={
              post.category?.name
                ? `/news/${post.category.name}/${post.slug}` // có category
                : `/news/${post.slug}` // không có category
            }
          >
            <NewsCard
              key={post.id}
              post={{
                id: post.id,
                title: post.title,
                date: new Date(post.createdAt).toLocaleDateString('vi-VN'),
                image: post.thumbnail || '/default-thumbnail.jpg',
              }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

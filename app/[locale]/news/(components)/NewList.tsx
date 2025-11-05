'use client';

import { useEffect, useState } from 'react';
import NewsSearchBar from './NewsSearchBar';
import NewsFilterTabs from './NewsFilterTabs';
import NewsCard from './NewsCard';
import { Spin, Pagination } from 'antd'; // ✅ thêm Pagination
import { useGetPosts } from '@/lib/hooks/post';
import { Link } from '@heroui/link';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function NewsList({ hash }: { hash?: string }) {
  const [selectedCategory, setSelectedCategory] = useState(hash || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const locale = useLocale();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9); // ✅ hiển thị 9 bài mỗi trang

  const [filters, setFilters] = useState({
    title: '',
    category: 'all',
    visibility: undefined as number | undefined,
    page,
    size: pageSize,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page, size: pageSize }));
  }, [page, pageSize]);

  const { data: posts, isLoading, refetch } = useGetPosts(filters);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: selectedCategory }));
    refetch();
  }, [selectedCategory, hash]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!posts?.data || posts.data.length === 0) {
    return (
      <section className="w-full mx-auto px-4 py-10 text-center text-gray-500">
        <h1 className="text-2xl font-semibold mb-4">No News Found</h1>
        <p>There are currently no articles available.</p>
      </section>
    );
  }

  const filteredNews = posts.data.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mx-auto px-4 py-10">
      <h1 className="text-center text-3xl font-semibold mb-6">
        <span className="text-blue-600">News</span>
      </h1>

      <NewsSearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="mt-8 mb-6">
        <NewsFilterTabs
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            if (value === 'all') {
              router.push(`/${locale}/news`);
            } else {
              router.push(`/${locale}/news#${value}`);
            }
          }}
        />
      </div>

      {/* Grid hiển thị bài viết */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredNews.map((post: any) => (
          <Link
            key={post.id}
            href={
              post.category?.name
                ? `/${locale}/news/${post.category.name}/${post.slug}`
                : `/${locale}/news/${post.slug}`
            }
          >
            <NewsCard
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

      {/* ✅ Pagination */}
      <div className="flex justify-center mt-10">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={posts.pagination?.total || 0}
          showSizeChanger
          onChange={(page, size) => {
            setPage(page);
            setPageSize(size);
          }}
        />
      </div>
    </section>
  );
}

'use client';

import { useGetPosts } from '@/lib/hooks/post';
import { useLocale } from 'next-intl';
import { Link } from '@heroui/link';
import { Image } from '@heroui/image';

export default function LatestNews() {
  const { data: posts, isLoading } = useGetPosts({
    title: '',
    category: 'all',
    visibility: 1,
    page: 1,
    size: 10, // lấy 5 bài, nhưng chỉ hiển thị 2 bài đầu tiên
  });

  const locale = useLocale();
  const news = (posts?.data || []).slice(0, 10);

  function stripHTML(html: string, limit = 100) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }

  if (isLoading) {
    return (
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Tin tức mới nhất
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-4 flex gap-4 animate-pulse"
            >
              <div className="w-32 h-32 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 w-1/3"></div>
                <div className="h-5 bg-gray-200 w-3/4"></div>
                <div className="h-4 bg-gray-200 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="">
      {/* <h2 className="text-2xl font-bold mb-8 text-center">Tin tức mới nhất</h2> */}
      <div className="grid md:grid-cols-2 gap-6">
        {news.map((item: any) => (
          <Link
            key={item.id}
            href={`/${locale}/news/${item.slug}`}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex gap-4 group"
          >
            <Image
              src={item.thumbnail || '/default-thumb.jpg'}
              alt={item.title}
              width={128}
              height={128}
              className="w-32 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform"
            />

            <div className="flex-1">
              <p className="text-sm text-gray-400">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : ''}
              </p>
              <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-primary transition">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {stripHTML(item.content).trim() ||
                  'Không có mô tả cho bài viết này.'}
              </p>
            </div>
          </Link>
        ))}

        {news.length === 0 && (
          <p className="text-center text-gray-500 col-span-2">
            Không có tin tức mới.
          </p>
        )}
      </div>
    </section>
  );
}

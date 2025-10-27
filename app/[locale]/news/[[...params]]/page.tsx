'use client';

import { useParams } from 'next/navigation';
import NewsList from '../(components)/NewList';
import NewsDetail from '../(components)/NewsDetail';

export default function NewsPage() {
  const params = useParams() as { locale: string; params?: string[] };

  console.log(params);
  // /vi/news -> không có params => trang danh sách
  if (!params?.params || params?.params?.length === 0) {
    console.log('ok');
    return <NewsList />;
  }

  // /vi/news/[slug] hoặc /vi/news/[category]/[slug]
  return <NewsDetail />;
}

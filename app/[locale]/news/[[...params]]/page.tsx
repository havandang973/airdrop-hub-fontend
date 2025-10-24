'use client';

import NewsList from '../(components)/NewList';
import NewsDetail from '../(components)/NewsDetail';

export default function NewsPage({
  params,
}: {
  params: { params?: string[] };
}) {
  const { params: routeParams } = params;

  // /vi/news -> không có params => trang danh sách
  if (!routeParams || routeParams.length === 0) {
    return <NewsList />;
  }

  // /vi/news/[slug] hoặc /vi/news/[category]/[slug]
  return <NewsDetail />;
}

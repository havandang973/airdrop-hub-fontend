'use client';

import { useParams, usePathname } from 'next/navigation';
import NewsList from '../(components)/NewList';
import NewsDetail from '../(components)/NewsDetail';
import { useEffect, useState } from 'react';

export default function NewsPage() {
  const params = useParams() as { locale: string; params?: string[] };
  const [hash, setHash] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash.replace('#', ''));
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (hash) {
    return <NewsList hash={hash} />;
  }

  if (!params?.params || params?.params?.length === 0) {
    console.log('ok');
    return <NewsList />;
  }

  // /vi/news/[slug] hoặc /vi/news/[category]/[slug]
  return <NewsDetail />;
}

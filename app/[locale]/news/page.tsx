import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';

export default function NewsPage() {
  const trans = useTranslations();

  return (
    <div>
      <h1 className={title()}>{trans('News')}</h1>
    </div>
  );
}

import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const trans = useTranslations();

  return (
    <div>
      <h1 className={title()}>{trans('About')}</h1>
    </div>
  );
}

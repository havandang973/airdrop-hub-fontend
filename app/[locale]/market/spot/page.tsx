import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';

export default function Page() {
  const trans = useTranslations();

  return (
    <div>
      <h1 className={title()}>{trans('Spot')}</h1>
    </div>
  );
}

import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';

export default function MarketPage() {
  const trans = useTranslations();

  return (
    <div>
      <h1 className={title()}>{trans('Market')}</h1>
    </div>
  );
}

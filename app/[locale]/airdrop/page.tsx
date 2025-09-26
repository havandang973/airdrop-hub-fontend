import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';

export default function AirdropPage() {
  const trans = useTranslations();

  return (
    <div>
      <h1 className={title()}>{trans('Airdrop')}</h1>
    </div>
  );
}

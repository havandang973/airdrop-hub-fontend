import { Tooltip } from '@heroui/tooltip';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function Time({
  date,
  variant,
  size = '2',
}: {
  date: Date;
  variant?: 'full' | 'human' | 'sensitive' | 'short' | 'day';
  size?: '1' | '2';
}) {
  variant = variant || 'short';

  const variants: any = {
    day: <span>{dayjs(date).format('DD/MM/YYYY')}</span>,
    short: <span>{dayjs(date).format('HH:mm:ss DD/MM/YY')}</span>,
    full: (
      <div className="flex flex-col gap-0">
        <span>{dayjs(date).format('HH:mm DD/MM/YY')}</span>
        <span className="text-gray-800">{dayjs(date).fromNow()}</span>
      </div>
    ),
    human: (
      <Tooltip showArrow content={dayjs(date).format('HH:mm DD/MM/YY')}>
        <span className="text-gray-800">{dayjs(date).fromNow()}</span>
      </Tooltip>
    ),
    sensitive: (
      <Tooltip showArrow content={dayjs(date).format('HH:mm DD/MM/YY')}>
        <span className="text-gray-800">{dayjs(date).fromNow()}</span>
      </Tooltip>
    ),
  };

  return variants[variant];
}

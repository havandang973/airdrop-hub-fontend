'use client';
import { Input } from 'antd';
const { Search } = Input;

export default function NewsSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex justify-center">
      <Search
        placeholder="Tìm kiếm từ khóa"
        enterButton="Tìm kiếm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-xl"
        size="large"
      />
    </div>
  );
}

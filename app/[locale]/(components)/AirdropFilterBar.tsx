'use client';

import { Input, Select, Button, Space } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

export default function AirdropFilterBar() {
  const [filter, setFilter] = useState({
    project: '',
    taskType: undefined,
    status: undefined,
  });

  return (
    <div className="flex items-center justify-between border rounded-xl px-3 py-2 bg-white dark:bg-[#1f1f1f] shadow-sm">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search input */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-1 hover:shadow-sm transition">
          <SearchOutlined className="text-gray-500" />
          <Input
            placeholder="Filter projects"
            bordered={false}
            className="w-40"
            value={filter.project}
            onChange={(e) => setFilter({ ...filter, project: e.target.value })}
          />
        </div>

        {/* Task Type */}
        <Select
          placeholder="Task Type"
          value={filter.taskType}
          allowClear
          style={{ width: 140 }}
          options={[
            { value: 'research', label: 'Research' },
            { value: 'design', label: 'Design' },
            { value: 'development', label: 'Development' },
          ]}
          onChange={(v) => setFilter({ ...filter, taskType: v })}
        />

        {/* Status */}
        <Select
          placeholder="Status"
          value={filter.status}
          allowClear
          style={{ width: 140 }}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'paused', label: 'Paused' },
            { value: 'completed', label: 'Completed' },
          ]}
          onChange={(v) => setFilter({ ...filter, status: v })}
        />

        {/* Filters button */}
        <Button icon={<FilterOutlined />} type="text">
          FILTERS
        </Button>

        {/* Tags */}
        <Space size="small">
          <Button
            type="default"
            className="rounded-full bg-gray-50 hover:bg-gray-100"
          >
            New Tasks
          </Button>
          <Button
            type="primary"
            className="rounded-full bg-orange-400 border-none hover:bg-orange-500"
          >
            Exclusive
          </Button>
        </Space>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-1">
        <Button shape="circle" icon={<LeftOutlined />} type="text" />
        <Button shape="circle" icon={<RightOutlined />} type="text" />
      </div>
    </div>
  );
}

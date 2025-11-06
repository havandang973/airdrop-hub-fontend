'use client';
import { ConfigProvider, Flex, Select, Table, Tag } from 'antd';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal';
import {
  IconExclamationCircleFilled,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import {
  useDeleteAirdropPost,
  useGetAirdropPosts,
  useGetAirdrops,
} from '@/lib/hooks/airdrop';
import { Input } from '@heroui/input';
import { SearchIcon } from '@/components/icons';
import {
  Select as AntdSelect,
  SelectItem as AntdSelectItem,
} from '@heroui/select';

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    name: '',
    status: undefined as string | undefined,
    airdropId: '',
    date: undefined as string | undefined,
    page,
    size: pageSize,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page, size: pageSize }));
  }, [page, pageSize]);

  const { data: airdrops } = useGetAirdrops();
  const { data: posts, isLoading } = useGetAirdropPosts(filters);
  const { mutate: deletePost, isPending } = useDeleteAirdropPost();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDelete = () => {
    if (!selectedId) return;
    deletePost(selectedId, {
      onSuccess: () => {
        console.log('✅ Post deleted successfully');
      },
      onError: (err: any) => {
        console.error('❌ Failed to delete post:', err);
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Flex align="center" gap={10}>
          <span className="font-medium">{text}</span>
        </Flex>
      ),
    },
    {
      title: 'Airdrop',
      dataIndex: ['airdrop', 'title'],
      key: 'airdrop',
      render: (_: any, record: any) => (
        <Link
          href={`/admin/airdrops/edit/${record?.airdrop?.id}`}
          className="text-blue-600 text-sm"
        >
          {record?.airdrop?.name || '—'}
        </Link>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'volcano'}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (v: string) => (v ? new Date(v).toLocaleDateString() : '—'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (v: string) => new Date(v).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Flex gap={10}>
          <Button variant="light" size="sm" className="!min-w-8 !h-8 !p-0">
            <Link href={`/admin/airdrop-post/edit/${record.id}`}>
              <IconPencil size={16} />
            </Link>
          </Button>

          <Button
            onPress={() => {
              setSelectedId(record.id);
              onOpen();
            }}
            variant="light"
            size="sm"
            className="!min-w-8 !h-8 !p-0"
          >
            <IconTrash size={16} className="text-red-500" />
          </Button>
        </Flex>
      ),
    },
  ];

  const handleReset = () => {
    setFilters({
      name: '',
      status: undefined as string | undefined,
      airdropId: '',
      date: undefined as string | undefined,
      page,
      size: pageSize,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Airdrop Posts
      </h1>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-4 mb-5 bg-white dark:bg-[#1f1f1f] shadow-sm">
          {/* LEFT - Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <Input
              type="text"
              placeholder="Nhập tiêu đề..."
              startContent={<SearchIcon className="text-gray-500" size={18} />}
              value={filters.name}
              onChange={(e) =>
                setFilters((p) => ({ ...p, name: e.target.value }))
              }
              className="w-[200px]"
              variant="bordered"
              classNames={{ inputWrapper: 'rounded-md border-1' }}
            />

            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorTextPlaceholder: '#8b8b8b',
                  },
                },
              }}
            >
              <Select
                className="w-[300px] !h-10"
                placeholder="Chọn airdrop"
                loading={!airdrops?.data.length}
                allowClear
                showSearch
                optionLabelProp="label" // dùng label để filter và hiển thị tag
                filterOption={(input, option: any) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                value={filters.airdropId || undefined}
                onChange={(e) => {
                  setFilters((p) => ({ ...p, airdropId: e }));
                }}
              >
                {airdrops?.data.map((item: any) => (
                  <Select.Option
                    key={item.id}
                    value={item.id}
                    label={item.name}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.logo || '/default-logo.png'}
                        alt={item.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>{item.name}</span>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </ConfigProvider>

            {/* Status */}
            <AntdSelect
              labelPlacement="outside"
              placeholder="Trạng thái"
              selectedKeys={filters.status ? [filters.status] : []}
              onChange={(e) =>
                setFilters((p) => ({ ...p, status: e.target.value }))
              }
              className="w-[140px]"
              variant="bordered"
              classNames={{ trigger: 'rounded-md border-1' }}
            >
              <AntdSelectItem key="completed">Completed</AntdSelectItem>
              <AntdSelectItem key="closed">Closed</AntdSelectItem>
            </AntdSelect>

            {/* Date Range */}
            {/* <DateRangePicker
              // label="Thời gian"
              variant="bordered"
              labelPlacement="outside-left"
              className="w-[300px]"
              onChange={(range) =>
                setFilters((p) => ({
                  ...p,
                  startDate: range?.start?.toString() || '',
                  endDate: range?.end?.toString() || '',
                }))
              }
              classNames={{ inputWrapper: 'rounded-md border-1' }}
            /> */}
          </div>

          {/* RIGHT - Buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="solid"
              color="primary"
              className="rounded-md border-1"
              onPress={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={posts?.data || []}
          loading={isLoading}
          rowKey="id"
          pagination={{
            current: page,
            pageSize,
            total: posts?.pagination?.total || 0,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>

      {/* Modal xác nhận xóa */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{ backdrop: 'backdrop-blur-md bg-black/40' }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                <IconExclamationCircleFilled className="text-red-500" />
                Delete Post
              </ModalHeader>
              <ModalBody>
                <span className="text-sm font-normal text-gray-500">
                  Are you sure you want to delete this post? This action cannot
                  be undone.
                </span>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleDelete();
                    onClose();
                  }}
                  // isLoading={isPending}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

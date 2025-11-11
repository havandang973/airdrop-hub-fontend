'use client';
import { Flex, Table, Tag } from 'antd';
import { useDeleteAirdrop, useGetAirdrops } from '@/lib/hooks/airdrop';
import {
  IconExclamationCircleFilled,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal';
import { Link } from '@heroui/link';
import { useEffect, useState } from 'react';
import { Input } from '@heroui/input';
import { SearchIcon } from '@/components/icons';
import { Select, SelectItem } from '@heroui/select';
import { DateRangePicker } from '@heroui/date-picker';
import { Button } from '@heroui/button';

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    name: '',
    status: undefined as string | undefined,
    fund: '',
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
    minRaise: undefined as number | undefined,
    maxRaise: undefined as number | undefined,
    page,
    size: pageSize,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page, size: pageSize }));
  }, [page, pageSize]);

  const { data: airdrops, isLoading } = useGetAirdrops(filters);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteAirdrop, isPending } = useDeleteAirdrop();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDelete = () => {
    if (!selectedId) return;

    deleteAirdrop(selectedId, {
      onSuccess: () => {
        console.log('✅ Airdrop deleted successfully');
      },
      onError: (err) => {
        console.error('❌ Failed to delete airdrop:', err);
      },
    });
  };

  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: 80,
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Flex align="center" gap={10}>
          <img
            src={record.logo || record.image || '/default-logo.png'}
            alt={text}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{text}</span>
        </Flex>
      ),
    },
    {
      title: 'Total Raise',
      dataIndex: 'raise',
      key: 'raise',
      render: (v: number) => v?.toLocaleString(),
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
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'created_at',
      render: (v: string) => new Date(v)?.toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Flex gap={10}>
          <Button variant="light" size="sm" className="!min-w-8 !h-8 !p-0">
            <Link href={`/admin/airdrop/edit/${record.slug}`}>
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

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="opaque"
            classNames={{
              backdrop: 'backdrop-blur-md bg-black/40',
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex items-center gap-1">
                    <IconExclamationCircleFilled className="text-red-500" />
                    Delete Airdrop
                  </ModalHeader>
                  <ModalBody>
                    <span className="text-sm font-normal text-gray-500">
                      Are you sure you want to delete this airdrop? This action
                      cannot be undone.
                    </span>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="default" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="danger"
                      onPress={() => {
                        handleDelete();
                        onClose();
                      }}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </Flex>
      ),
    },
  ];

  const handleReset = () => {
    setFilters({
      name: '',
      status: undefined,
      fund: '',
      startDate: undefined,
      endDate: undefined,
      minRaise: undefined,
      maxRaise: undefined,
      page: 1,
      size: 10,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Airdrop List
      </h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-4 mb-5 bg-white dark:bg-[#1f1f1f] shadow-sm">
          {/* LEFT - Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <Input
              type="text"
              placeholder="Nhập tên..."
              startContent={<SearchIcon className="text-gray-500" size={18} />}
              value={filters.name}
              onChange={(e) =>
                setFilters((p) => ({ ...p, name: e.target.value }))
              }
              className="w-[200px]"
              variant="bordered"
              classNames={{ inputWrapper: 'rounded-md border-1' }}
            />

            {/* Range input */}
            <div className="flex items-center">
              <Input
                type="number"
                placeholder="Vốn từ"
                value={filters.minRaise?.toString() || ''}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    minRaise: Number(e.target.value),
                  }))
                }
                className="w-[140px]"
                variant="bordered"
                classNames={{
                  inputWrapper: 'rounded-md rounded-r-none border-1',
                }}
              />
              <Input
                type="number"
                placeholder="Vốn đến"
                value={filters.maxRaise?.toString() || ''}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    maxRaise: Number(e.target.value),
                  }))
                }
                className="w-[140px]"
                variant="bordered"
                classNames={{
                  inputWrapper: 'rounded-md rounded-l-none border-1 ',
                }}
              />
            </div>

            {/* Status */}
            <Select
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
              <SelectItem key="active">Active</SelectItem>
              <SelectItem key="inactive">Inactive</SelectItem>
            </Select>

            {/* Fund */}
            <Input
              placeholder="Nhập quỹ..."
              value={filters.fund}
              onChange={(e) =>
                setFilters((p) => ({ ...p, fund: e.target.value }))
              }
              className="w-[160px]"
              variant="bordered"
              classNames={{ inputWrapper: 'rounded-md border-1' }}
            />

            {/* Date Range */}
            <DateRangePicker
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
            />
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
          dataSource={airdrops?.data || []}
          loading={isLoading}
          rowKey="id"
          scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
          pagination={{
            current: page,
            pageSize,
            total: airdrops?.pagination?.total || 0, // tổng số bản ghi backend trả về
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </div>
  );
}

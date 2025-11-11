'use client';
import { Flex, Table, Tag, Image } from 'antd';
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
import { useDeleteFund, useGetFunds } from '@/lib/hooks/fund';
import { SearchIcon } from '@/components/icons';
import { Input } from '@heroui/input';

export default function FundsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    name: '',
    fund: '',
    status: undefined as string | undefined,
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

  const { data: funds, isLoading } = useGetFunds(filters);
  const { mutate: deleteFund, isPending } = useDeleteFund();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDelete = () => {
    if (!selectedId) return;
    deleteFund(selectedId, {
      onSuccess: () => console.log('✅ Fund deleted successfully'),
      onError: (err: any) => console.error('❌ Failed to delete fund:', err),
    });
  };

  const columns = [
    {
      title: 'Fund',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: any) => (
        <Flex align="center" gap={10}>
          <img
            src={record.logo}
            alt={record.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium">{record.name}</span>
        </Flex>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug: string) => (
        <span className="text-gray-500 text-sm">{slug}</span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <span className="text-gray-600 text-sm line-clamp-1">{text}</span>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (v: string) => new Date(v).toLocaleDateString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (v: string) => new Date(v).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Flex gap={10}>
          <Button variant="light" size="sm" className="!min-w-8 !h-8 !p-0">
            <Link href={`/admin/funds/edit/${record.id}`}>
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
      fund: '',
      status: undefined as string | undefined,
      startDate: undefined as string | undefined,
      endDate: undefined as string | undefined,
      minRaise: undefined as number | undefined,
      maxRaise: undefined as number | undefined,
      page,
      size: pageSize,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Funds</h1>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-4 mb-5 bg-white dark:bg-[#1f1f1f] shadow-sm">
          {/* LEFT - Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <Input
              type="text"
              placeholder="Nhập tên quỹ..."
              startContent={<SearchIcon className="text-gray-500" size={18} />}
              value={filters.fund}
              onChange={(e) =>
                setFilters((p) => ({ ...p, fund: e.target.value }))
              }
              className="w-[200px]"
              variant="bordered"
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
          dataSource={funds?.data || []}
          loading={isLoading}
          rowKey="id"
          pagination={{
            current: page,
            pageSize,
            total: funds?.pagination?.total,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          // onChange={handleChange}
          scroll={{ x: 700 }}
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
                Delete Fund
              </ModalHeader>
              <ModalBody>
                <span className="text-sm font-normal text-gray-500">
                  Are you sure you want to delete this fund? This action cannot
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
                  isLoading={isPending}
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

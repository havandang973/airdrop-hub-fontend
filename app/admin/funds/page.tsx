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
import { useState } from 'react';
import { useDeleteFund, useGetFunds } from '@/lib/hooks/fund';

export default function FundsPage() {
  const { data: funds, isLoading } = useGetFunds();
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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Funds</h1>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <Table
          columns={columns}
          dataSource={funds || []}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
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

'use client';
import { Flex, Table, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAirdrops } from '@/lib/api/airdrop/getAirdrops';
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
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { use, useState } from 'react';

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: airdrops, isLoading } = useGetAirdrops({
    page,
    size: pageSize,
  });
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
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Airdrop List
      </h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {/* <Table
          columns={columns}
          dataSource={airdrops?.data || []}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        /> */}

        <Table
          columns={columns}
          dataSource={airdrops?.data || []}
          loading={isLoading}
          rowKey="id"
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

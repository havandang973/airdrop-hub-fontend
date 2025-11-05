'use client';
import { Flex, Table, Tag } from 'antd';
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
import { useDeleteAirdropPost, useGetAirdropPosts } from '@/lib/hooks/airdrop';

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: posts, isLoading } = useGetAirdropPosts({
    page,
    size: pageSize,
  });
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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Airdrop Posts
      </h1>

      <div className="p-6 bg-white rounded-lg shadow-md">
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

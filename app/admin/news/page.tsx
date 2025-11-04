'use client';
import { useState } from 'react';
import { Flex, Table, Tag, Switch } from 'antd';
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
  IconPin,
  IconHome,
} from '@tabler/icons-react';
import { useDeletePost, useGetPosts } from '@/lib/hooks/post';

export default function NewsPage() {
  const { data: posts, isLoading } = useGetPosts(true, 'all');
  const { mutate: deletePost, isPending } = useDeletePost();

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

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <Link
          href={`/admin/news/edit/${record.id}`}
          className="text-blue-600 font-medium text-sm hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug: string) => <span className="text-gray-500">{slug}</span>,
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
      render: (_: any, record: any) =>
        record?.category ? (
          <Tag color="blue">{record.category.name}</Tag>
        ) : (
          <span>—</span>
        ),
    },
    {
      title: 'Visibility',
      dataIndex: 'visibility',
      key: 'visibility',
      render: (v: boolean) =>
        v ? (
          <Tag color="green">Visible</Tag>
        ) : (
          <Tag color="volcano">Hidden</Tag>
        ),
    },
    {
      title: 'Pin',
      dataIndex: 'pin',
      key: 'pin',
      render: (v: boolean) =>
        v ? <IconPin size={16} className="text-yellow-500" /> : null,
      align: 'center',
      width: 70,
    },
    {
      title: 'Pin to Home',
      dataIndex: 'pin_to_home',
      key: 'pin_to_home',
      render: (v: boolean) =>
        v ? <IconHome size={16} className="text-blue-500" /> : null,
      align: 'center',
      width: 100,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (v: string) =>
        v ? new Date(v).toLocaleDateString('vi-VN') : '—',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Flex gap={10}>
          <Button
            as={Link}
            href={`/admin/news/edit/${record.id}`}
            variant="light"
            size="sm"
            className="!min-w-8 !h-8 !p-0"
          >
            <IconPencil size={16} />
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
      width: 110,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">News Posts</h1>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <Table
          columns={columns}
          dataSource={posts || []}
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

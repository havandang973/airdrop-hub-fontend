'use client';
import { useEffect, useState } from 'react';
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
import { Input } from '@heroui/input';
import { SearchIcon } from '@/components/icons';
import { Select, SelectItem } from '@heroui/select';
import { useGetCategories } from '@/lib/hooks/category';

export default function NewsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    title: '',
    category: 'all',
    visibility: undefined as number | undefined,
    page,
    size: pageSize,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, page, size: pageSize }));
  }, [page, pageSize]);

  const { data: posts, isLoading } = useGetPosts(filters);
  const { mutate: deletePost, isPending } = useDeletePost();
  const { data: categories } = useGetCategories();

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

  const handleReset = () => {
    setFilters({
      title: '',
      category: 'all',
      visibility: undefined,
      page: 1,
      size: 10,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">News Posts</h1>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl p-4 mb-5 bg-white dark:bg-[#1f1f1f] shadow-sm">
          {/* LEFT - Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <Input
              type="text"
              placeholder="Nhập tiêu đề..."
              startContent={<SearchIcon className="text-gray-500" size={18} />}
              value={filters.title}
              onChange={(e) =>
                setFilters((p) => ({ ...p, title: e.target.value }))
              }
              className="w-[200px]"
              variant="bordered"
              classNames={{ inputWrapper: 'rounded-md border-1' }}
            />

            {/* Status */}
            <Select
              labelPlacement="outside"
              placeholder="Danh mục"
              selectedKeys={filters.category ? [filters.category] : []}
              onChange={(e) =>
                setFilters((p) => ({ ...p, category: e.target.value }))
              }
              className="w-[140px]"
              variant="bordered"
              classNames={{ trigger: 'rounded-md border-1' }}
            >
              {(categories ?? []).map((category: any) => (
                <SelectItem key={category.name}>{category.name}</SelectItem>
              ))}
            </Select>
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
            total: posts?.pagination?.total,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          // onChange={handleChange}
          scroll={{ x: 700, y: 'calc(100vh - 380px)' }}
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

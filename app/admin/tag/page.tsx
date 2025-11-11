'use client';

import { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from 'antd';
import {
  mutationCreateTag,
  mutationUpdateTag,
  useDeleteTag,
  useGetTags,
} from '@/lib/hooks/tag';

interface Tag {
  id: number;
  name: string;
}

export default function Page() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  // 🟢 Lấy danh sách tag
  const { data: tags, isLoading, refetch } = useGetTags();

  // 🟢 Mutation: create / update / delete
  const createTag = mutationCreateTag();
  const updateTag = mutationUpdateTag();
  const deleteTag = useDeleteTag();

  // ✅ Mở modal (create hoặc edit)
  const openModal = (tag?: Tag) => {
    if (tag) {
      setEditingTag(tag);
      form.setFieldsValue(tag);
    } else {
      setEditingTag(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // ✅ Lưu (tạo hoặc cập nhật)
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingTag) {
        // Cập nhật
        await updateTag.mutateAsync({ id: editingTag.id, obj: values });
        message.success('Tag updated successfully');
      } else {
        // Tạo mới
        await createTag.mutateAsync(values);
        message.success('Tag created successfully');
      }

      setIsModalOpen(false);
      refetch(); // reload lại danh sách
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  // ✅ Xóa
  const handleDelete = async (id: number) => {
    try {
      await deleteTag.mutateAsync(id);
      message.success('Deleted successfully');
      refetch();
    } catch {
      message.error('Failed to delete');
    }
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
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Tag) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Tag</h1>
        <Button type="primary" onClick={() => openModal()}>
          + Create Tag
        </Button>
      </div>

      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <Table
          columns={columns}
          dataSource={tags || []}
          rowKey="id"
          bordered
          loading={isLoading}
        />
      </div>

      <Modal
        title={editingTag ? 'Edit Tag' : 'Create Tag'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Tag name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

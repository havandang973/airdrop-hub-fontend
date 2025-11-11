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
import { useQueryClient } from '@tanstack/react-query';
import {
  mutationCreateCategory,
  mutationUpdateCategory,
  useDeleteCategory,
  useGetCategories,
} from '@/lib/hooks/category';

interface Category {
  id: number;
  name: string;
}

export default function Page() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const queryClient = useQueryClient();

  // 🟢 Lấy danh sách category
  const { data: categories, isLoading } = useGetCategories(true);

  // 🟢 Tạo / Cập nhật / Xóa
  const { mutateAsync: createCategory } = mutationCreateCategory();
  const { mutateAsync: updateCategory } = mutationUpdateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      form.setFieldsValue(category);
    } else {
      setEditingCategory(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await updateCategory({
          id: editingCategory.id,
          obj: values,
        });
        message.success('Category updated successfully');
      } else {
        await createCategory(values);
        message.success('Category created successfully');
      }

      // ✅ Làm mới lại danh sách sau khi CRUD
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsModalOpen(false);
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    message.success('Deleted successfully');
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Category) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger loading={false}>
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
        <h1 className="text-2xl font-semibold text-gray-900">Category</h1>
        <Button type="primary" onClick={() => openModal()}>
          + Create Category
        </Button>
      </div>

      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <Table
          columns={columns}
          dataSource={categories || []}
          rowKey="id"
          bordered
          loading={isLoading}
        />
      </div>

      <Modal
        title={editingCategory ? 'Edit Category' : 'Create Category'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
        // confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Category name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

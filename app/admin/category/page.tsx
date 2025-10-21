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

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Page() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Airdrop', description: 'Airdrop category' },
    { id: 2, name: 'Blockchain', description: 'Blockchain category' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // ✅ Open modal để tạo hoặc sửa
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

  // ✅ Lưu (tạo hoặc cập nhật)
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingCategory) {
        // update
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id ? { ...cat, ...values } : cat
          )
        );
        message.success('Category updated successfully');
      } else {
        // create
        const newCategory = {
          id: Date.now(),
          ...values,
        };
        setCategories((prev) => [...prev, newCategory]);
        message.success('Category created successfully');
      }
      setIsModalOpen(false);
    });
  };

  // ✅ Xóa
  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    message.success('Deleted successfully');
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
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
        <h1 className="text-2xl font-semibold text-gray-900">Category</h1>
        <Button type="primary" onClick={() => openModal()}>
          + Create Category
        </Button>
      </div>

      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <Table columns={columns} dataSource={categories} rowKey="id" bordered />
      </div>

      <Modal
        title={editingCategory ? 'Edit Category' : 'Create Category'}
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
            <Input placeholder="Category name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Description..." rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

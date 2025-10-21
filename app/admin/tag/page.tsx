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

interface Tag {
  id: number;
  name: string;
}

export default function Page() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Tag[]>([
    { id: 1, name: 'Airdrop' },
    { id: 2, name: 'Blockchain' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  // ✅ Open modal để tạo hoặc sửa
  const openModal = (Tag?: Tag) => {
    if (Tag) {
      setEditingTag(Tag);
      form.setFieldsValue(Tag);
    } else {
      setEditingTag(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // ✅ Lưu (tạo hoặc cập nhật)
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingTag) {
        // update
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingTag.id ? { ...cat, ...values } : cat
          )
        );
        message.success('Tag updated successfully');
      } else {
        // create
        const newTag = {
          id: Date.now(),
          ...values,
        };
        setCategories((prev) => [...prev, newTag]);
        message.success('Tag created successfully');
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
        <Table columns={columns} dataSource={categories} rowKey="id" bordered />
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
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Description..." rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

'use client';
import { IconPlus } from '@tabler/icons-react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import TinyEditor from '../(components)/TinyEditor';
import { mutationCreateAirdrop } from '@/lib/hooks/airdrop';
import slugify from 'slugify'; // npm install slugify

export default function Page() {
  const [form] = Form.useForm();
  const { mutate: createAirdrop } = mutationCreateAirdrop();

  // ⚙️ Cấu hình Cloudinary
  const CLOUD_NAME = 'dzdbaikqm'; // 👉 thay bằng của bạn
  const UPLOAD_PRESET = 'upload_img'; // 👉 preset bạn tạo trong Cloudinary

  const handleSubmit = (values: any) => {
    const slug = slugify(values.title, { lower: true });
    const avatarUrl = values.avatar?.[0]?.response?.secure_url || '';

    const payload = {
      title: values.title.trim(),
      slug,
      content: values.content || '',
      avatar: avatarUrl,
      status: values.status || null,
      total_raise: values.total_raise ? parseFloat(values.total_raise) : null,
      category_id: values.category_id ? Number(values.category_id) : null,
      created_by: 1, // sau này thay = userId thật
    };

    console.log('📦 Payload gửi đi:', payload);

    createAirdrop(payload, {
      onSuccess: () => {
        message.success('✅ Airdrop created successfully!');
        form.resetFields();
      },
      onError: (err: any) => {
        console.error(err);
        message.error('❌ Failed to create Airdrop. Please try again!');
      },
    });
  };

  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success('Upload ảnh thành công!');
    } else if (info.file.status === 'error') {
      message.error('Upload ảnh thất bại!');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Create Airdrop</h1>

      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          onFinish={handleSubmit}
        >
          {/* 🟢 TITLE */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter a title!' }]}
          >
            <Input placeholder="Enter Airdrop title" />
          </Form.Item>

          {/* 🟢 AVATAR */}
          <Form.Item
            label="Avatar"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              {
                required: true,
                message: 'Please upload an avatar!',
                validator: (_, value) =>
                  value && value.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('Please upload an avatar!')),
              },
            ]}
          >
            <Upload
              name="file"
              listType="picture-card"
              maxCount={1}
              action={`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`}
              data={{ upload_preset: UPLOAD_PRESET }}
              onChange={handleUploadChange}
            >
              <IconPlus size={20} stroke={1} />
            </Upload>
          </Form.Item>

          {/* 🟢 CATEGORY */}
          <Form.Item label="Category" name="category_id">
            <Select placeholder="Select category (optional)" allowClear>
              <Select.Option value={1}>Airdrop</Select.Option>
              <Select.Option value={2}>IDO</Select.Option>
            </Select>
          </Form.Item>

          {/* 🟢 STATUS */}
          <Form.Item label="Status" name="status">
            <Select placeholder="Select status (optional)" allowClear>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          {/* 🟢 TOTAL RAISE */}
          <Form.Item label="Total Raise" name="total_raise">
            <Input
              type="number"
              placeholder="Enter total raise amount (optional)"
            />
          </Form.Item>

          {/* 🟢 CONTENT */}
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please enter content!',
                validator: (_, value) =>
                  !value || value.trim() === ''
                    ? Promise.reject(new Error('Please enter content!'))
                    : Promise.resolve(),
              },
            ]}
            getValueFromEvent={(content) => content}
          >
            <TinyEditor />
          </Form.Item>

          {/* 🟢 SUBMIT BUTTON */}
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

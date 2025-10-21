'use client';
import { IconPlus } from '@tabler/icons-react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { mutationCreateAirdrop } from '@/lib/hooks/airdrop';
import slugify from 'slugify'; // npm install slugify
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import TinyEditor from '../(components)/TinyEditor';

export default function Page() {
  const [form] = Form.useForm();
  const { mutate: createAirdrop } = mutationCreateAirdrop();
  const router = useRouter();
  // ⚙️ Cấu hình Cloudinary
  const CLOUD_NAME = 'dzdbaikqm'; // 👉 thay bằng của bạn
  const UPLOAD_PRESET = 'upload_img'; // 👉 preset bạn tạo trong Cloudinary

  const handleSubmit = (values: any) => {
    const slug = slugify(values.name, { lower: true });
    console.log('📝 Form Values:', slug);
    const logoUrl = values.logo?.[0]?.response?.secure_url || '';

    const payload = {
      name: values.name.trim(),
      slug,
      logo: logoUrl,
      status: values.status || null,
      raise: values.raise ? parseFloat(values.raise) : null,
      createdBy: 1, // sau này thay = userId thật
    };

    console.log('📦 Payload gửi đi:', payload);
    createAirdrop(payload, {
      onSuccess: () => {
        message.success('✅ Airdrop created successfully!');
        form.resetFields();
        router.push('/admin/airdrop');
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a name!' }]}
          >
            <Input placeholder="Enter Airdrop title" />
          </Form.Item>

          {/* 🟢 AVATAR */}
          <Form.Item
            label="Logo"
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              {
                required: true,
                message: 'Please upload an logo!',
                validator: (_, value) =>
                  value && value.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('Please upload an logo!')),
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

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          {/* 🟢 STATUS */}
          <Form.Item label="Status" name="status">
            <Select placeholder="Select status (optional)" allowClear>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          {/* 🟢 TOTAL RAISE */}
          <Form.Item label="Raise" name="raise">
            <Input
              type="number"
              placeholder="Enter total raise amount (optional)"
            />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" placeholder="Select date (optional)" />
          </Form.Item>

          {/* 🟢 CONTENT */}
          {/* <Form.Item
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
          </Form.Item> */}

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

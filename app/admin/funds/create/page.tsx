'use client';
import { IconPlus } from '@tabler/icons-react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import slugify from 'slugify';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import { mutationCreateFund } from '@/lib/hooks/fund';

export default function Page() {
  const [form] = Form.useForm();
  const { mutate: createFund } = mutationCreateFund();
  const router = useRouter();

  // ⚙️ Cloudinary config
  const CLOUD_NAME = 'dzdbaikqm';
  const UPLOAD_PRESET = 'upload_img';

  const handleSubmit = (values: any) => {
    const slug = slugify(values.name, { lower: true });
    const logoUrl = values.logo?.[0]?.response?.secure_url || '';

    const payload = {
      name: values.name.trim(),
      slug,
      logo: logoUrl,
      description: values.description || '',
    };

    console.log('📦 Payload gửi đi:', payload);

    createFund(payload, {
      onSuccess: () => {
        message.success('✅ Fund created successfully!');
        form.resetFields();
        router.push('/admin/funds');
      },
      onError: (err: any) => {
        console.error(err);
        message.error('❌ Failed to create fund. Please try again!');
      },
    });
  };

  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success('✅ Upload ảnh thành công!');
    } else if (info.file.status === 'error') {
      message.error('❌ Upload ảnh thất bại!');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Create Fund</h1>

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
          {/* 🟢 NAME */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a fund name!' }]}
          >
            <Input placeholder="Enter fund name" />
          </Form.Item>

          {/* 🟢 LOGO */}
          <Form.Item
            label="Logo"
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              {
                required: true,
                message: 'Please upload a logo!',
                validator: (_, value) =>
                  value && value.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('Please upload a logo!')),
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

          {/* 🟢 DESCRIPTION */}
          <Form.Item
            label="Description"
            name="description"
            // rules={[{ required: true, message: 'Please enter a description!' }]}
          >
            <TextArea rows={4} placeholder="Enter description" />
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

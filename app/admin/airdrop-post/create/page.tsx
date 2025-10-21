'use client';
import { IconPlus } from '@tabler/icons-react';
import { Button, Form, Input, Select, Switch, Upload, message } from 'antd';
import {
  mutationCreateAirdrop,
  mutationCreateAirdropPost,
  useGetAirdrops,
} from '@/lib/hooks/airdrop';
import slugify from 'slugify'; // npm install slugify
import { SelectItem } from '@heroui/select';
import { Avatar } from '@heroui/avatar';
import TinyEditor from '../../airdrop/(components)/TinyEditor';

export default function Page() {
  const [form] = Form.useForm();
  const { mutate: createAirdrop } = mutationCreateAirdropPost();
  const { data: airdrops, isLoading } = useGetAirdrops();

  // ⚙️ Cấu hình Cloudinary
  const CLOUD_NAME = 'dzdbaikqm'; // 👉 thay bằng của bạn
  const UPLOAD_PRESET = 'upload_img'; // 👉 preset bạn tạo trong Cloudinary

  const handleSubmit = (values: any) => {
    const payload = {
      name: values.name.trim(),
      content: values.content || '',
      status: values.status || null,
      date: values.date || null,
      airdropId: values.airdrop || null,
      createdBy: 1, // sau này thay = userId thật
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
      <h1 className="text-2xl font-semibold text-gray-900">
        Create Post Airdrop
      </h1>

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
            <Input placeholder="Enter Airdrop Post name" />
          </Form.Item>

          {/* 🟢 STATUS */}
          <Form.Item label="Status" name="status">
            <Select placeholder="Select status (optional)" allowClear>
              <Select.Option value="Closed">Closed</Select.Option>
              <Select.Option value="Compeleted">Compeleted</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" placeholder="Select date (optional)" />
          </Form.Item>

          <Form.Item label="Hide" name="hide">
            <Switch />
          </Form.Item>

          <Form.Item
            label="Airdrop"
            name="airdrop"
            rules={[{ required: true, message: 'Please select an Airdrop!' }]}
          >
            <Select
              placeholder="Select an Airdrop"
              loading={!airdrops?.length}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {airdrops?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.logo || '/default-logo.png'}
                      alt={item.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{item.name}</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
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

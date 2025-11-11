'use client';
import { IconPlus } from '@tabler/icons-react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';
import { mutationCreateAirdrop } from '@/lib/hooks/airdrop';
import { useGetFunds } from '@/lib/hooks/fund'; // Hook lấy danh sách Fund
import TinyEditor from '../(components)/TinyEditor';
import { Avatar } from '@heroui/avatar';

export default function Page() {
  const [form] = Form.useForm();
  const { mutate: createAirdrop } = mutationCreateAirdrop();
  const router = useRouter();

  const CLOUD_NAME = 'dzdbaikqm';
  const UPLOAD_PRESET = 'upload_img';

  // 🔹 Lấy danh sách Fund
  const { data: funds } = useGetFunds({
    page: 1,
    size: 10,
  });

  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') message.success('Upload ảnh thành công!');
    else if (info.file.status === 'error')
      message.error('Upload ảnh thất bại!');
  };

  const handleSubmit = (values: any) => {
    const slug = slugify(values.name, { lower: true });
    const logoUrl = values.logo?.[0]?.response?.secure_url || '';

    const payload = {
      name: values.name.trim(),
      slug,
      logo: logoUrl,
      description: values.description || '',
      status: values.status || null,
      raise: values.raise ? parseFloat(values.raise) : null,
      date: values.date || null,
      createdBy: 1, // thay bằng userId thật
      fundIds: values.fundIds || [], // danh sách fundId
    };

    console.log('📦 Payload gửi đi:', payload);

    createAirdrop(payload, {
      onSuccess: () => {
        message.success('Airdrop created successfully!');
        form.resetFields();
        router.push('/admin/airdrop');
      },
      onError: (err: any) => {
        console.error(err);
        message.error('Failed to create Airdrop.');
      },
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Create Airdrop</h1>
      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ flex: '110px' }}
          wrapperCol={{ flex: 1 }}
          colon={false}
          onFinish={handleSubmit}
        >
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a name!' }]}
          >
            <Input placeholder="Enter Airdrop title" />
          </Form.Item>

          {/* Logo */}
          <Form.Item
            label="Logo"
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              {
                required: true,
                message: 'Please upload a logo!',
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

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            // rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          {/* Status */}
          <Form.Item label="Status" name="status">
            <Select placeholder="Select status (optional)" allowClear>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          {/* Raise */}
          <Form.Item label="Raise" name="raise">
            <Input
              type="number"
              placeholder="Enter total raise amount (optional)"
            />
          </Form.Item>

          {/* Date */}
          <Form.Item label="Date" name="date">
            <Input type="date" placeholder="Select date (optional)" />
          </Form.Item>

          <Form.Item label="Funds" name="fundIds">
            <Select
              mode="multiple"
              placeholder="Select funds"
              allowClear
              showSearch
              optionLabelProp="label" // hiển thị label trong tag khi chọn
              filterOption={(input, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            >
              {funds?.data.map((f: any) => (
                <Select.Option
                  key={f.id}
                  value={f.id}
                  label={f.name} // 🔹 label là string để search và hiển thị trong tag
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={f.logo || '/no-image.png'}
                      alt={f.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{f.name}</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Submit */}
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

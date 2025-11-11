'use client';
import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import slugify from 'slugify';
import TextArea from 'antd/es/input/TextArea';
import { mutationUpdateAirdrop, useGetAirdrop } from '@/lib/hooks/airdrop';
import { useGetFunds } from '@/lib/hooks/fund'; // 🔹 import hook lấy danh sách fund

export default function EditAirdropPage() {
  const CLOUD_NAME = 'dzdbaikqm';
  const UPLOAD_PRESET = 'upload_img';
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const { mutate: updateAirdrop } = mutationUpdateAirdrop();
  const { data: funds } = useGetFunds({
    page: 1,
    size: 100,
  }); // 🔹 lấy tất cả fund
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { data: airdrop, isLoading } = useGetAirdrop(slug as string, !!slug);
  const [selectAirdrop, setSelectAirdrop] = useState<any>(null);

  useEffect(() => {
    setSelectAirdrop(airdrop);
  }, [airdrop]);

  useEffect(() => {
    if (!slug) return;
    if (selectAirdrop) {
      form.setFieldsValue({
        name: selectAirdrop.name,
        description: selectAirdrop.description,
        status: selectAirdrop.status,
        raise: selectAirdrop.raise,
        date: selectAirdrop.date ? selectAirdrop.date.split('T')[0] : undefined,
        logo: selectAirdrop.logo
          ? [
              {
                uid: '-1',
                name: 'logo.png',
                status: 'done',
                url: selectAirdrop.logo,
              },
            ]
          : [],
        // 🔹 Set fundIds hiện tại
        fundIds: selectAirdrop.funds?.map((f: any) => f.id),
      });
    }
  }, [slug, selectAirdrop, form]);

  const handleSubmit = (values: any) => {
    const slug = slugify(values.name, { lower: true });
    const logoUrl =
      values.logo?.[0]?.response?.secure_url || values.logo?.[0]?.url || '';

    const payload = {
      name: values.name.trim(),
      slug,
      logo: logoUrl,
      description: values.description,
      status: values.status || null,
      raise: values.raise ? parseFloat(values.raise) : null,
      date: values.date ? new Date(values.date) : null,
      fundIds: values.fundIds || [], // 🔹 gửi fundIds lên server
    };

    updateAirdrop(
      { id: selectAirdrop.id, obj: payload },
      {
        onSuccess: () => {
          message.success('Airdrop updated successfully!');
          router.push('/admin/airdrop');
        },
        onError: () => {
          message.error('Failed to update Airdrop!');
        },
      }
    );
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
      <h1 className="text-2xl font-semibold text-gray-900">Edit Airdrop</h1>
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
          {/* Các field cũ giữ nguyên */}
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter Airdrop name" />
          </Form.Item>

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

          <Form.Item
            label="Description"
            name="description"
            // rules={[{ required: true }]}
          >
            <TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select placeholder="Select status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Raise" name="raise">
            <Input type="number" placeholder="Enter total raise amount" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Funds" name="fundIds">
            <Select
              mode="multiple"
              placeholder="Select funds"
              allowClear
              showSearch
              optionLabelProp="label" // dùng label string để hiển thị tag
              filterOption={(input, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            >
              {funds?.data.map((f: any) => (
                <Select.Option
                  key={f.id}
                  value={f.id}
                  label={f.name} // 🔹 label string, tag hiển thị text
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

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              className="ml-2"
              onClick={() => router.push('/admin/airdrop')}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

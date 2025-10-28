'use client';

import { useGetCategories } from '@/lib/hooks/category';
import { mutationCreatePost } from '@/lib/hooks/post';
import { Button, Form, Input, Select, Switch, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import slugify from 'slugify';
import TinyEditor from '../../airdrop/(components)/TinyEditor';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';

export default function CreatePostPage() {
  const [form] = Form.useForm();
  const { mutate: createPost } = mutationCreatePost();
  const { data: categories, isLoading } = useGetCategories();
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  // 🧩 Cấu hình Cloudinary
  const CLOUD_NAME = 'dzdbaikqm';
  const UPLOAD_PRESET = 'upload_img';

  // 🖼️ Upload ảnh thumbnail
  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') message.success('Upload ảnh thành công!');
    else if (info.file.status === 'error')
      message.error('Upload ảnh thất bại!');
  };

  // 🧾 Submit form
  const handleSubmit = (values: any) => {
    const thumbnailUrl = values.thumbnail?.[0]?.response?.secure_url || '';

    const payload = {
      title: values.title.trim(),
      thumbnail: thumbnailUrl || '',
      content: values.content || '',
      visibility: values.visibility ?? true,
      pin: values.pin ?? false,
      pin_to_home: values.pin_to_home ?? false,
      categoryId: Number(values.categoryId) || null,
      createdBy: 1, // TODO: thay bằng userId thật
    };

    console.log('🚀 Payload gửi đi:', payload);

    createPost(payload, {
      onSuccess: () => {
        message.success('✅ Post created successfully!');
        form.resetFields();
        setThumbnailUrl(null);
      },
      onError: (err: any) => {
        console.error(err);
        message.error('❌ Failed to create post.');
      },
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Create Post</h1>

      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ flex: '130px' }}
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
            <Input placeholder="Enter post title" />
          </Form.Item>

          {/* 🟢 SLUG */}
          <Form.Item label="Slug (auto)" name="slug">
            <Input placeholder="Auto-generated from title" disabled />
          </Form.Item>

          {/* 🟢 THUMBNAIL */}

          <Form.Item
            label="Thumbnail"
            name="thumbnail"
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

          {/* 🟢 CATEGORY */}
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              placeholder="Select category"
              loading={isLoading}
              allowClear
              showSearch
              optionLabelProp="label"
              filterOption={(input, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            >
              {categories?.map((item) => (
                <Select.Option key={item.id} value={item.id} label={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* 🟢 VISIBILITY */}
          <Form.Item
            label="Visibility"
            name="visibility"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>

          {/* 🟢 PIN */}
          <Form.Item label="Pin" name="pin" valuePropName="checked">
            <Switch />
          </Form.Item>

          {/* 🟢 PIN TO HOME */}
          <Form.Item
            label="Pin to Home"
            name="pin_to_home"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          {/* 🟢 CONTENT */}
          <Form.Item
            label="Content"
            name="content"
            getValueFromEvent={(content) => content}
          >
            <TinyEditor />
          </Form.Item>

          {/* 🟢 BUTTONS */}
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Create Post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

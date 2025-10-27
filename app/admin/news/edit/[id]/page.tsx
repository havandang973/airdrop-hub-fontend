'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Input, Select, Switch, Upload, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { mutationUpdatePost, useGetPost } from '@/lib/hooks/post';
import { useGetCategories } from '@/lib/hooks/category';

const TinyEditor = dynamic(
  () => import('@/app/admin/airdrop/(components)/TinyEditor'),
  { ssr: false }
);

export default function EditNewsPage() {
  const CLOUD_NAME = 'dzdbaikqm';
  const UPLOAD_PRESET = 'upload_img';

  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = useParams(); // 👉 /admin/news/edit/[id]
  const { data: categories } = useGetCategories();
  const { data: postDetail, isLoading } = useGetPost(id as string, !!id);
  const { mutate: updatePost } = mutationUpdatePost();
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    setSelectedPost(postDetail);
  }, [postDetail]);

  useEffect(() => {
    if (selectedPost) {
      form.setFieldsValue({
        title: selectedPost.title,
        slug: selectedPost.slug,
        thumbnail: selectedPost.thumbnail
          ? [
              {
                uid: '-1',
                name: 'thumbnail.png',
                status: 'done',
                url: selectedPost.thumbnail,
              },
            ]
          : [],
        content: selectedPost.content,
        visibility: selectedPost.visibility,
        pin: selectedPost.pin,
        pin_to_home: selectedPost.pin_to_home,
        categoryId: selectedPost.categoryId,
      });
    }
  }, [selectedPost, form]);

  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success('✅ Upload ảnh thành công!');
    } else if (info.file.status === 'error') {
      message.error('❌ Upload ảnh thất bại!');
    }
  };

  const handleSubmit = (values: any) => {
    const thumbnailUrl =
      values.thumbnail?.[0]?.response?.secure_url ||
      values.thumbnail?.[0]?.url ||
      '';

    const payload = {
      title: values.title.trim(),
      // slug: values.slug.trim(),
      thumbnail: thumbnailUrl,
      content: values.content || '',
      visibility: values.visibility ?? true,
      pin: values.pin ?? false,
      pin_to_home: values.pin_to_home ?? false,
      categoryId: Number(values.categoryId) || null,
    };

    console.log('🚀 Payload to update:', payload);

    updatePost(
      { id: selectedPost.id, obj: payload },
      {
        onSuccess: () => {
          message.success('✅ Post updated successfully!');
          router.push('/admin/news');
        },
        onError: (err: any) => {
          console.error(err);
          message.error('❌ Failed to update Post.');
        },
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Edit Post</h1>

      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ flex: '140px' }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
          colon={false}
          onFinish={handleSubmit}
        >
          {/* 🟢 TITLE */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title!' }]}
          >
            <Input placeholder="Enter post title" />
          </Form.Item>

          {/* 🟢 SLUG */}
          {/* <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: 'Please enter the slug!' }]}
          >
            <Input placeholder="Enter slug (auto-generated or manual)" />
          </Form.Item> */}

          {/* 🟢 THUMBNAIL UPLOAD */}
          <Form.Item
            label="Thumbnail"
            name="thumbnail"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              { required: true, message: 'Please upload a thumbnail image!' },
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
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </Upload>
          </Form.Item>

          {/* 🟢 CATEGORY */}
          <Form.Item
            label="Category"
            name="categoryId"
            // rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              placeholder="Select a category"
              loading={!categories?.length}
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
          <Form.Item label="Content" name="content">
            <TinyEditor />
          </Form.Item>

          {/* 🟢 BUTTONS */}
          <Form.Item label=" ">
            <div className="flex gap-2">
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
              <Button onClick={() => router.push('/admin/news')}>Cancel</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Form, Input, Select, Switch, message } from 'antd';
import {
  useGetAirdrops,
  mutationUpdateAirdropPost,
  useGetAirdropPostDetail,
} from '@/lib/hooks/airdrop';
import dynamic from 'next/dynamic';

const TinyEditor = dynamic(
  () => import('@/app/admin/airdrop/(components)/TinyEditor'),
  {
    ssr: false,
  }
);

export default function EditAirdropPostPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = useParams(); // 👉 /airdrop/posts/edit/[id]
  const { data: airdrops } = useGetAirdrops();
  const { data: postDetail, isLoading } = useGetAirdropPostDetail(
    id as unknown as number,
    !!id
  );
  const { mutate: updateAirdropPost } = mutationUpdateAirdropPost();
  const [selectAirdropPost, setSelectAirdropPost] = useState<any>(null);
  useEffect(() => {
    setSelectAirdropPost(postDetail);
  }, [postDetail]);

  useEffect(() => {
    if (postDetail && selectAirdropPost) {
      form.setFieldsValue({
        name: selectAirdropPost.name,
        content: selectAirdropPost.content,
        status: selectAirdropPost.status,
        date: selectAirdropPost.date
          ? selectAirdropPost.date.split('T')[0]
          : undefined,
        visibility: selectAirdropPost.visibility,
        airdrop: selectAirdropPost.airdropId,
      });
    }
  }, [selectAirdropPost, form]);

  const handleSubmit = (values: any) => {
    const payload = {
      name: values.name.trim(),
      content: values.content || '',
      status: values.status || null,
      date: values.date || null,
      visibility: values.visibility || false,
      airdropId: Number(values.airdrop) || null,
    };

    console.log('🚀 Payload to update:', payload);
    updateAirdropPost(
      { id: selectAirdropPost.id, obj: payload },
      {
        onSuccess: () => {
          message.success('✅ Airdrop post updated successfully!');
          router.push('/admin/airdrop-post');
        },
        onError: (err: any) => {
          console.error(err);
          message.error('❌ Failed to update Airdrop post.');
        },
      }
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">
        Edit Airdrop Post
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
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </Form.Item>

          {/* 🟢 DATE */}
          <Form.Item label="Date" name="date">
            <Input type="date" placeholder="Select date (optional)" />
          </Form.Item>

          {/* 🟢 visibility */}
          <Form.Item
            label="Visibility"
            name="Visibility"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          {/* 🟢 AIRDROP */}
          <Form.Item
            label="Airdrop"
            name="airdrop"
            rules={[{ required: true, message: 'Please select an Airdrop!' }]}
          >
            <Select
              placeholder="Select an Airdrop"
              loading={!airdrops?.data.length}
              allowClear
              showSearch
              optionLabelProp="label" // dùng label để filter và hiển thị tag
              filterOption={(input, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            >
              {airdrops?.data.map((item: any) => (
                <Select.Option key={item.id} value={item.id} label={item.name}>
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
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please enter content!',
            //     validator: (_, value) =>
            //       !value || value.trim() === ''
            //         ? Promise.reject(new Error('Please enter content!'))
            //         : Promise.resolve(),
            //   },
            // ]}
            // getValueFromEvent={(content) => content}
          >
            <TinyEditor />
          </Form.Item>

          {/* 🟢 BUTTONS */}
          <Form.Item label=" ">
            <div className="flex gap-2">
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
              <Button onClick={() => router.push('/airdrop/posts')}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

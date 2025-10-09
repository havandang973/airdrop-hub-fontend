'use client';
import { IconPlus } from '@tabler/icons-react';
import { Button, Form, Input, Select, Upload } from 'antd';
import CustomEditor from '../../(components)/custom-editor';

export default function Page() {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-gray-900">Airdrop - Create</h1>
      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
        <Form
          name="wrap"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Title" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Avartar"
            valuePropName="fileList"
            rules={[{ required: true }]}
            // getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  color: 'inherit',
                  cursor: 'inherit',
                  border: 0,
                  background: 'none',
                }}
                type="button"
              >
                <IconPlus size={20} stroke={1} />
              </button>
            </Upload>
          </Form.Item>

          <Form.Item label="Category">
            <Select>
              <Select.Option value="demo">Airdrop</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Status">
            <Select>
              <Select.Option value="demo">Active</Select.Option>
              <Select.Option value="demo">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Total raise">
            <Input />
          </Form.Item>

          <CustomEditor />

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

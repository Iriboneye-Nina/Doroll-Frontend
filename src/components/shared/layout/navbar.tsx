import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Card } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAddTaskMutation } from '@/lib/auth/authSlice';

const HomeOutlined = dynamic(() => import('@ant-design/icons/HomeOutlined'), { ssr: false });
const PlusOutlined = dynamic(() => import('@ant-design/icons/PlusOutlined'), { ssr: false });
const UserOutlined = dynamic(() => import('@ant-design/icons/UserOutlined'), { ssr: false });
const CheckOutlined = dynamic(() => import('@ant-design/icons/CheckOutlined'), { ssr: false });
const SettingOutlined = dynamic(() => import('@ant-design/icons/SettingOutlined'), { ssr: false });
const CalendarOutlined = dynamic(() => import('@ant-design/icons/CalendarOutlined'), { ssr: false });
const FileTextOutlined = dynamic(() => import('@ant-design/icons/FileTextOutlined'), { ssr: false });
const InfoCircleOutlined = dynamic(() => import('@ant-design/icons/InfoCircleOutlined'), { ssr: false });
const QuestionCircleOutlined = dynamic(() => import('@ant-design/icons/QuestionCircleOutlined'), { ssr: false });
const LockOutlined = dynamic(() => import('@ant-design/icons/LockOutlined'), { ssr: false });
const LogoutOutlined = dynamic(() => import('@ant-design/icons/LogoutOutlined'), { ssr: false });

const ProfileModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <Card className="absolute top-12 right-0 p-4 bg-white shadow-md rounded-md" style={{ zIndex: 111 }}>
    <div className="flex flex-col">
      <div className='flex gap-1 mb-4 mt-0'>
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-16 h-16 rounded w-[64px] h-[48px] object-cover mr-2"
        />
        <h2 className="text-xl font-semibold p-1">Username</h2>
      </div>
      <div className="w-full mb-4 border-t border-gray-200" />
      <div className="flex flex-col w-full">
        <div className="flex items-center mb-2">
          <UserOutlined className="text-lg mr-2" />
          <span className="text-sm">My Profile</span>
        </div>
        <div className="flex items-center mb-2">
          <InfoCircleOutlined className="text-lg mr-2" />
          <span className="text-sm">About</span>
        </div>
        <div className="flex items-center mb-2">
          <QuestionCircleOutlined className="text-lg mr-2" />
          <span className="text-sm">Help</span>
        </div>
        <div className="flex items-center mb-4">
          <LockOutlined className="text-lg mr-2" />
          <span className="text-sm">Privacy</span>
        </div>
        <div className="w-full mb-[16x] border-t border-gray-200" />
        <div className="flex items-center mb-2">
          <LogoutOutlined className="text-lg mr-2" />
          <Link href="/login">
            <Button
              type="link"
              onClick={() => {
                console.log('Logging out...');
                onClose();
              }}
            >
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </Card>
);

const Navbar = (props: any) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [addTask] = useAddTaskMutation();

  const toggleProfileForm = () => {
    setShowProfileForm(prev => !prev);
  };

  const handleAddTask = async (values: any) => {
    try {
      const taskData = {
        title: values.taskName,
        description: values.description,
        createdDate: values.selectDate.format('YYYY-MM-DD'),
      };
      await addTask(taskData).unwrap();
      console.log('Task added successfully');
      setShowTaskForm(false);
    } catch (error) {
      console.error('Failed to add task:', error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <>
      <nav className="bg-white text-gray-800 p-4 flex h-14 justify-between items-center shadow-md px-[50px]">
        <div className="flex items-center space-x-2">
          <CheckOutlined className="text-2xl border-2 border-black p-[5px] rounded-[8px]" />
          <span className="font-semibold text-xl">Doroll</span>
        </div>
        <div className="flex items-center space-x-6">
          <div onClick={props.pass} className="flex items-center space-x-2 cursor-pointer">
            <HomeOutlined className="text-xl" aria-label="Home" />
            <span className="text-lg">Home</span>
          </div>
          <div onClick={props.click} className="flex items-center space-x-2 cursor-pointer">
            <SettingOutlined className="text-xl" aria-label="Settings" />
            <span className="text-lg">Settings</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 relative">
          <Button onClick={() => setShowTaskForm(true)} type="primary" className="flex items-center gap-2">
            <span>Add Task</span>
            <PlusOutlined className="text-xl" />
          </Button>
          <div className="flex items-center">
            <UserOutlined
              onClick={toggleProfileForm}
              className="border border-r-gray-200 p-[10px] rounded-tl-[5px] rounded-bl-[5px] cursor-pointer"
              aria-label="User Profile"
            />
            <CheckOutlined
              onClick={toggleProfileForm}
              className="text-[10px] border py-[13px] px-[5px] rounded-tr-[5px] rounded-br-[5px] cursor-pointer"
            />
          </div>
        </div>
      </nav>

      <div className="pt-[20px]">
        {showProfileForm && <ProfileModal onClose={() => setShowProfileForm(false)} />}
      </div>

      <Modal
        title="New Task"
        open={showTaskForm}
        onCancel={() => setShowTaskForm(false)}
        footer={null}
        closable={false}
      >
        <Form
          name="taskForm"
          layout="vertical"
          onFinish={handleAddTask}
        >
          <div className="flex justify-between gap-4">
            <Form.Item
              label="Task Name"
              name="taskName"
              className="w-1/2"
              rules={[{ required: true, message: 'Please enter the task name' }]}
            >
              <Input
                placeholder="Enter title"
                prefix={<FileTextOutlined />}
              />
            </Form.Item>
            <Form.Item
              label="Select Date"
              name="selectDate"
              className="w-1/2"
              rules={[{ required: true, message: 'Please select a date' }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="MM/DD/YYYY"
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          <div className="flex justify-end mt-4">
            <Button type="primary" htmlType="submit" size="small" className="flex items-center gap-2">
              <span>Add Task</span>
              <PlusOutlined />
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Navbar;

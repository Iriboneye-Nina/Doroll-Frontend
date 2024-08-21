import React, { useState } from 'react';
import { Button, Modal, Form, Input, DatePicker, Card } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link'; // Import Link from next/link

// Dynamically import Ant Design icons
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
  <Card className="absolute top-12 right-0 p-4 bg-white shadow-md rounded-md" style={{zIndex:111}}>
    <div className="flex flex-col" >
      {/* Profile Image and Username */}
      <div className='flex gap-1 mb-4 mt-0 '>
        <img 
          src="/profile.jpg" 
          alt="Profile" 
          className="w-16 h-16 rounded w-[64px] h-[48px] object-cover mr-2" 
        />
        <h2 className="text-xl font-semibold p-1">Username</h2>
      </div>
      
      {/* Divider */}
      <div className="w-full mb-4 border-t border-gray-200" />

      {/* Menu Options */}
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
        {/* Divider Below Privacy */}
        <div className="w-full mb-[16x] border-t border-gray-200" />
        {/* Logout Link */}
        <div className="flex items-center mb-2">
          <LogoutOutlined className="text-lg mr-2" />
          <Link href="/login"> {/* Use Link for navigation */}
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

  const toggleProfileForm = () => {
    setShowProfileForm(prev => !prev);
  };

  return (
    <>
      <nav className="bg-white text-gray-800 p-4 flex h-14 justify-between items-center shadow-md px-[50px]">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <CheckOutlined className="text-2xl border-2 border-black p-[5px] rounded-[8px]" />
          <span className="font-semibold text-xl">Doroll</span>
        </div>

        {/* Center Links */}
        <div className="flex items-center space-x-6">
          <div onClick={props.pass} className="flex items-center space-x-2 cursor-pointer">
            <HomeOutlined className="text-xl" aria-label="Home" />
            <span className="text-lg">Home</span>
          </div>
          {/* Settings */}
          <div onClick={props.click} className="flex items-center space-x-2 cursor-pointer">
            <SettingOutlined className="text-xl" aria-label="Settings" />
            <span className="text-lg">Settings</span>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4 relative">
          <Button onClick={() => setShowTaskForm(true)} type="primary">
            <PlusOutlined className="text-xl" />
            <span>Add Task</span>
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

      {/* Main Content Area */}
      <div className="pt-[20px]">
        {showProfileForm && <ProfileModal onClose={() => setShowProfileForm(false)} />}
      </div>

      {/* Task Form Modal */}
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
  onFinish={(values) => {
    console.log('Task Form Values:', values);
    setShowTaskForm(false);
  }}
>
  <div className="flex justify-between gap-4">
    <Form.Item
      label="Task Name"
      name="taskName"
      rules={[{ required: true, message: 'Please enter the task name!' }]}
      className="w-1/2"
    >
      <Input
        placeholder="Enter title"
        prefix={<FileTextOutlined />}
      />
    </Form.Item>
    <Form.Item
      label="Due Date"
      name="dueDate"
      rules={[{ required: true, message: 'Please select a due date!' }]}
      className="w-1/2"
    >
      <Input.Group compact>
        <Input
        />
        <DatePicker style={{ width: '90%' }} />
      </Input.Group>
    </Form.Item>
  </div>
  <Form.Item
    label="Description"
    name="description"
    rules={[{ required: true, message: 'Please enter the description!' }]}
   >
    <Input.TextArea placeholder="Enter description" />
  </Form.Item>

  {/* Button placed on the right side below the description */}
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

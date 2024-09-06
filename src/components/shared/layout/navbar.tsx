// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, DatePicker, Card, message } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { useAddTaskMutation, useFetchTasksQuery } from '@/lib/auth/authSlice';

const HomeOutlined = dynamic(() => import('@ant-design/icons/HomeOutlined'), { ssr: false });
const PlusOutlined = dynamic(() => import('@ant-design/icons/PlusOutlined'), { ssr: false });
const UserOutlined = dynamic(() => import('@ant-design/icons/UserOutlined'), { ssr: false });
const CheckOutlined = dynamic(() => import('@ant-design/icons/CheckOutlined'), { ssr: false });
const SettingOutlined = dynamic(() => import('@ant-design/icons/SettingOutlined'), { ssr: false });
const FileTextOutlined = dynamic(() => import('@ant-design/icons/FileTextOutlined'), { ssr: false });
const InfoCircleOutlined = dynamic(() => import('@ant-design/icons/InfoCircleOutlined'), { ssr: false });
const QuestionCircleOutlined = dynamic(() => import('@ant-design/icons/QuestionCircleOutlined'), { ssr: false });
const LockOutlined = dynamic(() => import('@ant-design/icons/LockOutlined'), { ssr: false });
const LogoutOutlined = dynamic(() => import('@ant-design/icons/LogoutOutlined'), { ssr: false });
const DeleteOutlined = dynamic(() => import('@ant-design/icons/DeleteOutlined'), { ssr: false });

// Profile Modal component
const ProfileModal: React.FC<{ onClose: () => void; email: string; onLogout: () => void }> = ({ onClose, email, onLogout }) => (
  <Card className="absolute top-12 right-0 p-4 bg-white shadow-md rounded-md" style={{ zIndex: 111 }}>
    <div className="flex flex-col">
      <div className="flex gap-1 mb-4 mt-0">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-16 h-16 rounded w-[64px] h-[64px] object-cover mr-2"
        />
        <h2 className="text-xl font-semibold p-1">{email}</h2>
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
        <div className="w-full mb-[16px] border-t border-gray-200" />
        <div className="flex items-center mb-2">
          <LogoutOutlined className="text-lg mr-2" />
          <Button type="link" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

// Navbar component
const Navbar = (props: any) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [form] = Form.useForm(); 
  const [addTask] = useAddTaskMutation();
  const router = useRouter();
  const { data, error, isLoading, refetch } = useFetchTasksQuery();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setEmail(decodedToken.email);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const toggleProfileForm = () => {
    setShowProfileForm(prev => !prev);
  };

  const handleAddTask = async (values: any) => {
    try {
      // Get the current date and deadline date (without time part)
      const currentDate = new Date();
      const deadlineDate = new Date(values.selectDate.format('YYYY-MM-DD'));
  
      // Normalize dates to exclude time part
      currentDate.setHours(0, 0, 0, 0);
      deadlineDate.setHours(0, 0, 0, 0);
  
      // Determine status based on comparison
      let status;
      if (deadlineDate < currentDate) {
        status = 'OFF_TRACK'; // Past date
      } else if (deadlineDate.getTime() === currentDate.getTime()) {
        status = 'ON_TRACK'; // Today's date
      } else {
        status = 'PENDING'; // Future date
      }
  
      // Prepare task data
      const taskData = {
        title: values.taskName,
        description: values.description,
        deadline: values.selectDate.format('YYYY-MM-DD'),
        status: status // Ensure this matches EStatus values in backend
      };
  
      // Add task and handle the response
      await addTask(taskData).unwrap();
  
      message.success('Task added successfully!');
      refetch(); // Refresh the task list
      form.resetFields(); // Reset the form
      setShowTaskForm(false); // Hide the form after task submission
  
    } catch (error) {
      console.error('Failed to add task:', error);
      message.error('Failed to add task. Please try again.');
    }
  };
  
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setEmail(null);
    setUsername(null); 
    router.push('/login');
    message.success('Logged out successfully!');
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
            {/* Display the username */}
            {username && <span className="ml-2 text-sm">{username}</span>}
          </div>
        </div>
      </nav>

      <div className="pt-[20px]">
        {showProfileForm && <ProfileModal email={email || 'User'} onClose={() => setShowProfileForm(false)} onLogout={handleLogout} />}
      </div>

      <Modal
        title="New Task"
        open={showTaskForm}
        onCancel={() => setShowTaskForm(false)}
        footer={null}
        closable={false}
      >
        <Form form={form} name="taskForm" layout="vertical" onFinish={handleAddTask}>
          <div className="flex justify-between gap-4">
            <Form.Item
              label="Title"
              name="taskName"
              className="w-1/2"
              rules={[{ required: true, message: 'Please enter the task name' }]}
            >
              <Input placeholder="Enter title" prefix={<FileTextOutlined />} />
            </Form.Item>
            <Form.Item
              label="Due Date"
              name="selectDate"
              className="w-1/2"
              rules={[{ required: true, message: 'Please select a date' }]}
            >
              <DatePicker format="YYYY-MM-DD" placeholder="MM/DD/YYYY" />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Navbar;

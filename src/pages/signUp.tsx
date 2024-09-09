import React, { useState } from 'react';
import { Input, Card, Checkbox, Button, Form, message } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { useRegisterUserMutation } from '@/lib/auth/authSlice';

const UserOutlined = dynamic(() => import('@ant-design/icons/UserOutlined'), { ssr: false });
const MailOutlined = dynamic(() => import('@ant-design/icons/MailOutlined'), { ssr: false });
const PhoneOutlined = dynamic(() => import('@ant-design/icons/PhoneOutlined'), { ssr: false });
const LockOutlined = dynamic(() => import('@ant-design/icons/LockOutlined'), { ssr: false });
const EyeOutlined = dynamic(() => import('@ant-design/icons/EyeOutlined'), { ssr: false });
const EyeInvisibleOutlined = dynamic(() => import('@ant-design/icons/EyeInvisibleOutlined'), { ssr: false });
const LogoutOutlined = dynamic(() => import('@ant-design/icons/LogoutOutlined'), { ssr: false });

const SignUp = () => {
  const router = useRouter(); 
  const [register, { isLoading }] = useRegisterUserMutation();
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onFinish = async (values: any) => {
    try {
      const response = await register(values).unwrap();
     
      if (response.statusCode === 400 || response.status === "error") {
        message.error(response.message || "Registration failed!");
      } else {
        message.success("Registration successful!");
        form.resetFields();
        router.push('/login'); 
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || "Registration failed!";
      message.error(errorMsg); 
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center py-8">
      <Card className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
        <h2 className=" text-xl font-bold mb-6">Register</h2>
        <Form onFinish={onFinish} form={form} layout="vertical">
         
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input
                  placeholder="Enter your first name"
                  prefix={<UserOutlined className="text-[#C0D310]" />}
                  className="text-sm"
                />
              </Form.Item>
            </div>
            <div className="flex-1">
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input
                  placeholder="Enter your last name"
                  prefix={<UserOutlined className="text-[#C0D310]" />}
                  className="text-sm"
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
              >
                <Input
                  placeholder="Enter your email"
                  prefix={<MailOutlined className="text-[#C0D310]" />}
                  className="text-sm"
                />
              </Form.Item>
            </div>
            <div className="flex-1">
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input
                  placeholder="Enter your phone number"
                  prefix={<PhoneOutlined className="text-[#C0D310]" />}
                  className="text-sm"
                />
              </Form.Item>
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  prefix={<LockOutlined className="text-[#C0D310]" />}
                  type={passwordVisible ? "text" : "password"}
                  className="text-sm"
                  iconRender={visible => 
                    visible ? <EyeOutlined onClick={() => setPasswordVisible(!passwordVisible)} /> : 
                              <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} />
                  }
                />
              </Form.Item>
            </div>
            <div className="flex-1">
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm your password"
                  prefix={<LockOutlined className="text-[#C0D310]" />}
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="text-sm"
                  iconRender={visible => 
                    visible ? <EyeOutlined onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} /> : 
                              <EyeInvisibleOutlined onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />
                  }
                />
              </Form.Item>
            </div>
          </div>

          {/* Terms and Conditions */}
          <Form.Item>
            <Checkbox className="text-sm">Agree to the terms and conditions</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" className="px-4 py-2" loading={isLoading}>
              Register <LogoutOutlined className="ml-2" />
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Login Link */}
      <Card className="mt-6 w-full max-w-lg p-4 bg-white rounded-lg shadow-lg text-center">
        <span className="text-sm font-medium mr-2">Already have an account?</span>
        <Link href="/login" legacyBehavior>
          <a className="text-sm font-medium text-[#C0D310] mr-4">Login</a>
        </Link>
        <Link href="/login" legacyBehavior>
          <Button type="primary" size="large" className="px-4 py-2">
            Login <LogoutOutlined className="ml-2" />
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default SignUp;

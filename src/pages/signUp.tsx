// import React from 'react';
// import { Input, Card, Checkbox, Button, Form, message } from 'antd';
// import dynamic from 'next/dynamic';
// import Link from 'next/link';
// import { useAppDispatch, useAppSelector } from '../hooks/useDispatch';
// import { useRegisterUserMutation } from '@/lib/auth/authSlice';

// const UserOutlined = dynamic(() => import('@ant-design/icons/UserOutlined'), { ssr: false });
// const MailOutlined = dynamic(() => import('@ant-design/icons/MailOutlined'), { ssr: false });
// const PhoneOutlined = dynamic(() => import('@ant-design/icons/PhoneOutlined'), { ssr: false });
// const LockOutlined = dynamic(() => import('@ant-design/icons/LockOutlined'), { ssr: false });
// const LogoutOutlined = dynamic(() => import('@ant-design/icons/LogoutOutlined'), { ssr: false });



// const SignUp = () => {
//   const [register, { isLoading }] = useRegisterUserMutation();
//   const [form] = Form.useForm();
//   const onFinish = async (values: any) => {
//     try {
//       const response = await register(values).unwrap();
//       // Check if the status is error or success
//       if (response.statusCode === 400 || response.status === "error") {
//         message.error(response.message || "Registration failed!");
//       } else {
//         message.success("Registration successful!");
//         form.resetFields();
//       }
//     } catch (error: any) {
//       const errorMsg = error?.data?.message || "Registration failed!";
//       message.error(errorMsg); // Display the error message from backend
//     }
//   };
//   return (
//     <div className="bg-white min-h-screen flex flex-col justify-center items-center py-10">
      
//       <Card className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-center text-2xl font-bold mb-8">Register</h2>
//         <Form onFinish={onFinish} 
//         form={form}
        
//         >
//         {/* First Name and Last Name */}
//         <div className="flex gap-4 mb-6">
//           <div className="flex-1">
//             <label htmlFor="firstName" className="block font-medium mb-2">First Name</label>
//             <Input
//               name="firstName"
//               placeholder="Enter your first name"
//               prefix={<UserOutlined className="text-[#C0D310]" />}
//             />
//           </div>
//           <div className="flex-1">
//             <label htmlFor="lastName" className="block font-medium mb-2">Last Name</label>
//             <Form.Item>
//             <Input
//               name="lastName"
//               placeholder="Enter your last name"
//               prefix={<UserOutlined className="text-[#C0D310]" />}
//             />
//             </Form.Item>
            
//           </div>
//         </div>

//         {/* Email and Phone */}
//         <div className="flex gap-4 mb-6">
//           <div className="flex-1">
//             <label htmlFor="email" className="block font-medium mb-2">Email</label>
//             <Input
//               id="email"
//               placeholder="Enter your email"
//               prefix={<MailOutlined className="text-[#C0D310]" />}
//             />
//           </div>
//           <div className="flex-1">
//             <label htmlFor="phone" className="block font-medium mb-2">Phone</label>
//             <Input
//               id="phone"
//               placeholder="Enter your phone number"
//               prefix={<PhoneOutlined className="text-[#C0D310]" />}
//             />
//           </div>
//         </div>

//         {/* Password and Confirm Password */}
//         <div className="flex gap-4 mb-6">
//           <div className="flex-1">
//             <label htmlFor="password" className="block font-medium mb-2">Password</label>
//             <Input
//               id="password"
//               placeholder="Enter your password"
//               prefix={<LockOutlined className="text-[#C0D310]" />}
//               type="password"
//             />
//           </div>
//           <div className="flex-1">
//             <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirm Password</label>
//             <Input
//               id="confirmPassword"
//               placeholder="Confirm your password"
//               prefix={<LockOutlined className="text-[#C0D310]" />}
//               type="password"
//             />
//           </div>
//         </div>

//         {/* Terms and Conditions */}
//         <div className="flex justify-between items-center mb-6">
//           <Checkbox className="font-medium">Agree to the terms and conditions</Checkbox>
//           <Button type="primary" htmlType="submit" size="large" className="text-[#C0D310] px-6">
//             Register <LogoutOutlined className="ml-2" />
//           </Button>
//         </div>
//         </Form>
//       </Card>

//       {/* Login Link */}
//       <Card className="mt-6 w-full max-w-lg p-6 bg-white rounded-lg shadow-lg text-center">
//         <span className="font-medium mr-2">Already have an account?</span>
//         <Link href="/login" legacyBehavior>
//           <a className="font-medium text-[#C0D310] mr-4">Login</a>
//         </Link>
//         <Link href="/login" legacyBehavior>
//           <Button type="primary" size="large" className="text-[#C0D310] px-6">
//             Login <LogoutOutlined className="ml-2" />
//           </Button>
//         </Link>
//       </Card>
//     </div>
//   );
// };

// export default SignUp;
import React from 'react';
import { Input, Card, Checkbox, Button, Form, message } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter
import { useRegisterUserMutation } from '@/lib/auth/authSlice';

const UserOutlined = dynamic(() => import('@ant-design/icons/UserOutlined'), { ssr: false });
const MailOutlined = dynamic(() => import('@ant-design/icons/MailOutlined'), { ssr: false });
const PhoneOutlined = dynamic(() => import('@ant-design/icons/PhoneOutlined'), { ssr: false });
const LockOutlined = dynamic(() => import('@ant-design/icons/LockOutlined'), { ssr: false });
const LogoutOutlined = dynamic(() => import('@ant-design/icons/LogoutOutlined'), { ssr: false });

const SignUp = () => {
  const router = useRouter(); 
  const [register, { isLoading }] = useRegisterUserMutation();
  const [form] = Form.useForm();

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
    <div className="bg-white min-h-screen flex flex-col justify-center items-center py-10">
      <Card className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-8">Register</h2>
        <Form onFinish={onFinish} form={form} layout="vertical">
         
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input
                  placeholder="Enter your first name"
                  prefix={<UserOutlined className="text-[#C0D310]" />}
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
                />
              </Form.Item>
            </div>
          </div>

         
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
              >
                <Input
                  placeholder="Enter your email"
                  prefix={<MailOutlined className="text-[#C0D310]" />}
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
                />
              </Form.Item>
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input
                  placeholder="Enter your password"
                  prefix={<LockOutlined className="text-[#C0D310]" />}
                  type="password"
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
                <Input
                  placeholder="Confirm your password"
                  prefix={<LockOutlined className="text-[#C0D310]" />}
                  type="password"
                />
              </Form.Item>
            </div>
          </div>

          {/* Terms and Conditions */}
          <Form.Item>
            <Checkbox className="font-medium">Agree to the terms and conditions</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" className=" px-6" loading={isLoading}>
              Register <LogoutOutlined className="ml-2" />
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Login Link */}
      <Card className="mt-6 w-full max-w-lg p-6 bg-white rounded-lg shadow-lg text-center">
        <span className="font-medium mr-2">Already have an account?</span>
        <Link href="/login" legacyBehavior>
          <a className="font-medium text-[#C0D310] mr-4">Login</a>
        </Link>
        <Link href="/login" legacyBehavior>
          <Button type="primary" size="large" className=" px-6">
            Login <LogoutOutlined className="ml-2" />
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default SignUp;

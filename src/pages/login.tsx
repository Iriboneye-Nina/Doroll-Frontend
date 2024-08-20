import { LoginOutlined, MailOutlined, LockOutlined, CheckOutlined, EyeOutlined } from "@ant-design/icons";
import { Input, Button, Card } from "antd";
import React, { useState } from "react";
import { Typography } from 'antd';
import Link from 'next/link';  // Import the Link component from next/link

const { Text } = Typography;

export default function Login(props: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform login logic here
        // If login is successful:
        // Redirect to home page using Next.js routing
        window.location.href = '/home';  // You can use window.location.href to navigate programmatically
    };

    return (
        <>
            <div className="flex flex-col items-center space-y-6 py-10">
                <Card className="w-2/4 p-0">
                    <div className="flex justify-center rounded-[20px]">
                        <div className="w-[50%] bg-[#eeee] flex flex-col justify-between rounded-tl-[8px] rounded-bl-[8px] py-[35px] px-[20px] items-center">
                            <div className="border-2 border-black p-[5px] rounded-[8px] font-bold w-[35px] text-[#A0D911] text-center flex justify-center items-center mb-4">
                                <CheckOutlined className="font-bold text-[#C0D310]" />
                            </div>
                            <div className="text-center mb-4">
                                <h1 className="font-bold">DoRoll</h1>
                                <Text>By Awesomity Lab</Text>
                            </div>
                            <span className="text-[10px] text-center">&copy; 2024 Awesomity Lab</span>
                        </div>
                        <form onSubmit={handleLogin} className="w-[50%] bg-white px-[20px] py-[35px] rounded-tr-[10px] rounded-br-[10px] flex flex-col items-center">
                            <h1 className="pb-[20px] font-bold text-center">Login</h1>
                            <div className="w-full mb-4">
                                <label htmlFor="" className="w-full">
                                    <Text>Email</Text>
                                    <Input
                                        type="text"
                                        placeholder="Enter email"
                                        prefix={<MailOutlined className="text-[#C0D310]" />}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="w-full mb-4">
                                <label htmlFor="" className="w-full">
                                    <Text>Password</Text>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        prefix={<LockOutlined className="text-[#C0D310]" />}
                                        suffix={<EyeOutlined className="text-[10px] text-[#C0D310]" />}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col items-center w-full pt-[20px]">
                                <Text className="underline cursor-pointer mb-4" onClick={props.forgot}>Forgot Password</Text>
                                <Button type="primary" icon={<LoginOutlined />} htmlType="submit">
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>

                <Card className="w-2/4 p-0">
                    <div className="flex justify-center items-center p-5">
                        <div className="flex flex-col items-center mr-4">
                            <Text>If you dont have an account?</Text>
                            <Text>Go to register</Text>
                        </div>
                        <Link href="/register"> {/* Use Next.js Link for client-side navigation */}
                            <Button icon={<LoginOutlined className="text-[#C0D310]" />} className="text-[#C0D310]">
                                Register
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </>
    );
}

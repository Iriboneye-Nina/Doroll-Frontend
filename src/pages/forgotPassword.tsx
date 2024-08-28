import { Input, Button, Card, Form, Typography } from "antd";
import React, { useState } from "react";
import { LoginOutlined,DownOutlined, MailOutlined } from "@ant-design/icons";
import { useForgetPasswordMutation } from "../lib/auth/authSlice"; 

const { Text, Link } = Typography;

export default function ForgotPassword(props: any) {
    const [email, setEmail] = useState<string>("");
    const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation();

    const handleSubmit = async (values: { email: string }) => {
        try {
            await forgetPassword({ email }).unwrap();
            
        } catch (err) {
            
            console.error("Password reset failed:", err);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-6 py-24 bg-gray-100">
        <Card className="w-1/4">
            <Form onFinish={handleSubmit} className="p-4">
                <h1 className="pb-3 text-lg">Forgot Password</h1>
                <Text>Email</Text>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Please enter your email!" }]}
                >
                    <Input
                        type="email"
                        placeholder="Enter email"
                        prefix={<MailOutlined className="text-[#C0D310]" />}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                <div className="flex justify-between items-center pt-[20px]">
                    <Link
                        href="/login"
                        className="underline text-xs"
                      
                    >
                        Login instead
                    </Link>
                    <Button
                        type="primary"
                        icon={<LoginOutlined />}
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Submit
                        <DownOutlined />
                    </Button>
                </div>
            </Form>
        </Card>
        </div>
    );
}

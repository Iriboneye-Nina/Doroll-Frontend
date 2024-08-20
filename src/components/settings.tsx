import React, { useState } from 'react';
import { Checkbox, Input, Button } from 'antd';
import { CheckOutlined, UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons';
import Image from 'next/image'; 

export default function EditProfile() {
    const [position, setPosition] = useState<'start' | 'end'>('end');

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-[500px] bg-white p-8 rounded-lg shadow-md">
                {/* Profile Section */}
                <div className="bg-[#dddd] rounded-lg flex flex-col justify-center items-center px-6 py-8 gap-4">
                    <div className="w-16 h-16 rounded w-[64px] h-[48px] object-cover mr-2">
                        <Image src="/profile.jpg" alt="Profile picture" width={96} height={96} className="object-cover"/>
                    </div>
                    <h1 className="text-xl font-bold">Yves Honore B.</h1>
                    <p className="text-gray-500">yveshonore@awesomity.rw</p>
                </div>

                {/* Edit Profile Form */}
                <form className="py-6">
                    <h2 className="text-lg font-semibold mb-4">Edit My Profile Info</h2>
                    <div className="flex gap-4 mb-4">
                        <div className="w-full">
                            <label className="text-sm">
                                First Name
                                <Input
                                    type="text"
                                    prefix={<UserOutlined className="text-[#C0D310]" />}
                                    placeholder="Enter first name"
                                />
                            </label>
                        </div>
                        <div className="w-full">
                            <label className="text-sm">
                                Last Name
                                <Input
                                    type="text"
                                    prefix={<UserOutlined className="text-[#C0D310]" />}
                                    placeholder="Enter last name"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <div className="w-full">
                            <label className="text-sm">
                                Email
                                <Input
                                    type="email"
                                    prefix={<MailOutlined className="text-[#C0D310]" />}
                                    placeholder="Enter email"
                                />
                            </label>
                        </div>
                        <div className="w-full">
                            <label className="text-sm">
                                Phone Number
                                <Input
                                    type="tel"
                                    prefix={<PhoneOutlined className="text-[#C0D310]" />}
                                    placeholder="250 --- --- ---"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            iconPosition={position}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>

                {/* Change Password Form */}
                <form>
                    <h2 className="text-lg font-semibold mb-4">Edit My Password</h2>
                    <div className="flex gap-4 mb-4">
                        <div className="w-full">
                            <label className="text-sm">
                                Current Password
                                <Input
                                    type="password"
                                    prefix={<LockOutlined className="text-[#C0D310]" />}
                                    suffix={<EyeOutlined className="text-[#C0D310]" />}
                                    placeholder="Enter current password"
                                />
                            </label>
                        </div>
                        <div className="w-full">
                            <label className="text-sm">
                                New Password
                                <Input
                                    type="password"
                                    prefix={<LockOutlined className="text-[#C0D310]" />}
                                    suffix={<EyeOutlined className="text-[#C0D310]" />}
                                    placeholder="Enter new password"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            iconPosition={position}
                        >
                            Save Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

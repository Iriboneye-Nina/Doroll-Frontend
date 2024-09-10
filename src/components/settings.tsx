import React, { useEffect, useState } from 'react';
import { Checkbox, Input, Button, notification, message } from 'antd';
import { CheckOutlined, UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons';
import Image from 'next/image'; 
import {
    useGetUserQuery,
    useUpdatePasswordMutation,
    useUpdateProfileMutation,
} from "@/lib/auth/authSlice"; 
import jwtDecode from 'jwt-decode';

interface Decoded {
    sub: string;
}

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface UserPassword {
    currentPassword: string;
    newPassword: string;
}

export default function EditProfile() {
    const [position, setPosition] = useState<'start' | 'end'>('end');
    const [userId, setUserId] = useState<string>('');
    const [passwordData, setPasswordData] = useState<UserPassword>({
        currentPassword: "",
        newPassword: ""
    });

    const [formData, setFormData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode<Decoded>(token);
                setUserId(decodedToken.sub);
            } catch (error) {
                message.error("Invalid token.");
            }
        }
    }, []);

    const { data: fetchUserData, error, isLoading } = useGetUserQuery(userId);

    useEffect(() => {
        if (fetchUserData) {
            setFormData({
                firstName: fetchUserData.data.firstName,
                lastName: fetchUserData.data.lastName,
                email: fetchUserData.data.email,
                phone: fetchUserData.data.phone
            });
        }
    }, [fetchUserData]);

    const [updateProfile] = useUpdateProfileMutation();
    const [updatePassword] = useUpdatePasswordMutation();

    const handleSaveChanges = async () => {
        if (!userId) {
            message.error("User ID is not available");
            return;
        }
        try {
            const response = await updateProfile({ id: userId, ...formData }).unwrap();
            message.success(response.message);
        } catch (error) {
            notification.error({
                message: 'Failed to update profile'
            });
        }
    };

    const handleChangesPassword = async () => {
        if (!userId) {
            notification.error({
                message: 'User ID is not available'
            });
            return;
        }
        if (!passwordData.currentPassword || !passwordData.newPassword) {
            notification.error({
                message: 'Please enter both current and new passwords'
            });
            return;
        }
        try {
            const response = await updatePassword({ id: userId, ...passwordData }).unwrap();
            if (response?.payload?.error) {
                notification.error({
                    message: response.payload?.message[0]
                });
            } else {
                notification.success({
                    message: 'Password successfully updated'
                });
            }
            setPasswordData({ currentPassword: "", newPassword: "" });
        } catch (error) {
            message.error("Failed to update password");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-[500px] bg-white p-8 rounded-lg shadow-md">
                {/* Profile Section */}
                <div className="bg-[#dddd] rounded-lg flex flex-col justify-center items-center px-6 py-8 gap-4">
                    <div className="w-16 h-16 rounded-full object-cover mr-2">
                      
                    </div>
                    <h1 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h1>
                    <p className="text-gray-500">{formData.email}</p>
                </div>

                {/* Edit Profile Form */}
                <form className="py-6">
                    <h2 className="text-lg font-semibold mb-4">Edit My Profile Info</h2>
                    <div className="flex gap-4 mb-4">
                        <div className="w-full">
                            <label className="text-sm">
                                First Name
                                <Input
                                    value={formData.firstName}
                                    type="text"
                                    name='firstName'
                                    prefix={<UserOutlined className="text-[#C0D310]" />}
                                    placeholder="Enter first name"
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="w-full">
                            <label className="text-sm">
                                Last Name
                                <Input
                                    value={formData.lastName}
                                    type="text"
                                    name='lastName'
                                    prefix={<UserOutlined className="text-[#C0D310]" />}
                                    placeholder="Enter last name"
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <div className="w-full">
                            <label className="text-sm">
                                Email
                                <Input
                                    value={formData.email}
                                    type="email"
                                    name='email'
                                    prefix={<MailOutlined className="text-[#C0D310]" />}
                                    placeholder="Enter email"
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="w-full">
                            <label className="text-sm">
                                Phone Number
                                <Input
                                    value={formData.phone}
                                    type="tel"
                                    name='phone'
                                    prefix={<PhoneOutlined className="text-[#C0D310]" />}
                                    placeholder="250 --- --- ---"
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            iconPosition={position}
                            onClick={handleSaveChanges}
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
                                    onChange={handleInputPassword}
                                    name='currentPassword'
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
                                    onChange={handleInputPassword}
                                    name='newPassword'
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
                            onClick={handleChangesPassword}
                        >
                            Save Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

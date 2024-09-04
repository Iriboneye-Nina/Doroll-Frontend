import React, { useEffect, useState } from 'react';
import { Checkbox, Input, Button, notification, message } from 'antd';
import { CheckOutlined, UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons';
import Image from 'next/image'; 
import {
    useGetProfileQuery,
    useGetUserQuery,
    useUpdateProfileMutation,
  } from "@/lib/auth/authSlice"; 
import jwtDecode from 'jwt-decode';

  interface Decoded{
    userId:string
  }

  interface UserData{
    firstName:string,
    lastName:string,
    email:string,
    phone:string
  }

export default function EditProfile() {
    const [position, setPosition] = useState<'start' | 'end'>('end');
    const [userId,setUserId]=useState("")

    const [formData,setFormData]=useState<UserData>({
        firstName:"",
        lastName:"",
        email:"",
        phone:""
    })

    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(token){
            const decodedToken=jwtDecode<Decoded>(token)
            setUserId(decodedToken.userId)
        }
    },[])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const {data:fetchUserData,error,isLoading}=useGetUserQuery(userId)

    useEffect(()=>{
        if(fetchUserData){
            setFormData({
                firstName:fetchUserData.firstName,
               lastName:fetchUserData.lastName,
                email:fetchUserData.email,
               phone:fetchUserData.phone
            })
            
        }
    },[fetchUserData])
    console.log(formData)
    const [updateProfile]= useUpdateProfileMutation()
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
            })
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-[500px] bg-white p-8 rounded-lg shadow-md">
                {/* Profile Section */}
                <div className="bg-[#dddd] rounded-lg flex flex-col justify-center items-center px-6 py-8 gap-4">
                    <div className="w-16 h-16 rounded w-[64px] h-[48px] object-cover mr-2">
                        <Image src="/profile.jpg" alt="Profile picture" width={96} height={96} className="object-cover"/>
                    </div>
                    <h1 className="text-xl font-bold">{formData.firstName}{formData.lastName}</h1>
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
                                    onChange={handleInputChange}
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
                                    type="email"
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
                                    type="tel"
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

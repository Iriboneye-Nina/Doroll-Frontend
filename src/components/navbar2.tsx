import React from 'react';
import { Input, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
const Header: React.FC = () => {
  return (
    <nav className="bg-white p-2 shadow-md flex items-center justify-between mx-auto max-w-[90%] lg:max-w-[80%] rounded-lg">
     
      <div className="flex items-center">
        <span className="text-lg font-semibold text-black">Pending Task</span>
      </div>
      <div className="flex items-center w-1/3">
        <Input 
          placeholder="Search Task" 
          className="w-full rounded-md border-gray-300"
        />
      </div>
      <div className="flex items-center">
        <Button 
          className="border-gray-300 rounded-md flex items-center"
        >
          <span>Filter Task List</span>
          <div className="border-r border-gray-300 h-5 mx-2"></div>
          <CheckOutlined />
        </Button>
      </div>
    </nav>
  );
};
export default Header;

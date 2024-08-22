import { useState } from 'react';
import { DeleteOutlined, EditOutlined, HolderOutlined } from "@ant-design/icons";
import { Button, Checkbox, Modal, Typography, Tag } from 'antd';

const { Text } = Typography;

export default function Tasks() {
  const [isChecked, setIsChecked] = useState(false);
  const [isopen, setIsopen] = useState(false);

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const showModal = () => {
    setIsopen(true);
  };

  const handleOk = () => {
    setIsopen(false);
  };

  const handleCancel = () => {
    setIsopen(false);
  };

  return (
    <>
     
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`flex justify-between items-center hover:bg-gray-200 py-2 px-[20px] ${
                isChecked ? 'text-gray-300' : ''
              }`}
            >
              <div className="flex items-center gap-5 w-[68%]" onClick={showModal}>
                <div className="flex items-center gap-2.5">
                  <HolderOutlined style={{ transform: 'rotate(90deg)' }} />
                  <p>{index + 1}</p>
                </div>
                <div className="flex items-center gap-[15px]">
                  <div className='w-[160px]'>
                    <Tag color="default">{index % 2 === 0 ? 'ON-TRACK' : 'Done'}</Tag>
                  </div>
                  <Text className='w-[150px]'>Due: Today</Text>
                </div>
                <div>
                  <Text>Task description here</Text>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-5">
                  <Text>Created: 14 July 2024</Text>
                  <EditOutlined />
                  <DeleteOutlined onClick={showModal} />
                </div>
                <div>
                  <Checkbox onChange={handleCheckboxChange} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal
          open={isopen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <div className='flex justify-between items-center text-[12px]'>
              <Text>Created-at-30-july 2024</Text>
              <div className='flex justify-center items-center gap-[10px]'>
                <Button><EditOutlined /></Button>
                <Button onClick={handleOk}><DeleteOutlined /></Button>
              </div>
            </div>
          }
        >
          <h1 className='font-bold pb-[20px]'>Run some errands in town</h1>
          <div className='flex gap-[10px] pb-[10px]'>
            <div className='w-[160px]'>
              <Tag>ON-TRACK</Tag>
            </div>
            <Text className='w-[150px]'>Due: Today</Text>
          </div>
          <Text>
            When requiring users to interact with the application, but without jumping to a new page and interrupting the users workflow,
            you can use Modal to create a new floating layer over the current page to get user feedback or display information.
          </Text>
        </Modal>

    </>
  );
}

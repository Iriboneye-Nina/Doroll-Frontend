import React, { useState } from "react";
import {
  CheckOutlined,
  FileOutlined,
  InfoCircleOutlined,
  FilterOutlined,
  DownOutlined,
  DragOutlined,
  SearchOutlined,
  LogoutOutlined,
  HolderOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Modal,
  Space,
  Statistic,
  Typography,
  theme,
} from "antd";

type Todo = {
  id: number;
  title: string;
  description: string;
  content: string;
  createdDate: string;
};

const todos: Todo[] = [
  {
    id: 1,
    title: "Finish the project report",
    createdDate: "2024-08-10",
    description: "Complete the final draft of the report by Monday",
    content: ""
  },
  // More todos...
];

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

const DashboardData = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log("click", e);
  };

  const menuProps = {
    items: [
      {
        label: "Logout",
        key: "1",
        icon: <LogoutOutlined />,
      },
    ],
    onClick: handleMenuClick,
  };

  const handleModalOpen = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedTodo(null);
  };

  return (
    <Layout>
      <div className="p-2">
        <div className="bg-white h-14 flex justify-between items-center px-6 py-1 rounded-lg mt-1 mx-auto max-w-screen-lg">
          <span className="text-lg">Pending tasks - 7</span>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            className="w-1/3 mx-4"
          />
          <Dropdown menu={menuProps}>
            <Button className="flex items-center border border-gray-200 p-2 rounded-md cursor-pointer">
              <Space>
                <FilterOutlined className="text-lg" />
                <span className="text-sm">Filter List</span>
                <div className="border-l border-gray-300 h-4 mx-2"></div>
                <DownOutlined className="text-xs" />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>

      <Layout>
        <Sider
          width={350}
          style={{
            background: colorBgContainer,
            margin: "20px 0px 0px 50px",
          }}
        >
       <div className="p-2">
  <Title level={5} className="text-white">Summary</Title>
  <Dropdown menu={menuProps}>
    <Button className="w-full flex justify-between items-center p-2 rounded-md bg-white border border-gray-200">
      <FilterOutlined className="text-lg mr-2" />
      <span>This Week</span>
      <div className="flex items-center">
        <div className="border-l border-gray-300 h-4 mx-2"></div>
        <DownOutlined />
      </div>
    </Button>
  </Dropdown>

  <div className="grid grid-cols-2 gap-2 mt-2">
  {/* First Card */}
  <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <div className="flex items-start">
        <Statistic
          value={11}
          precision={0}
          valueStyle={{ fontSize: "18px", color: "#1f2937" }}
        />
        <span className="text-xs text-gray-700 ml-2 relative top-[-2px]">
          +10%
        </span>
      </div>
      <FileOutlined className="text-gray-500 text-lg" />
    </div>
    <div className="mt-1 text-gray-500 text-xs">Total Tasks</div>
  </Card>

  {/* Second Card */}
  <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <div className="flex items-start">
        <Statistic
          value={1}
          precision={0}
          valueStyle={{ fontSize: "18px", color: "#1f2937" }}
        />
        <span className="text-xs text-gray-700 ml-2 relative top-[-2px]">
          -10%
        </span>
      </div>
      <CheckOutlined className="text-gray-500 text-lg" />
    </div>
    <div className="mt-1 text-gray-500 text-xs">Completed</div>
  </Card>

  {/* Third Card */}
  <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <div className="flex items-start">
        <Statistic
          value={7}
          precision={0}
          valueStyle={{ fontSize: "18px", color: "#1f2937" }}
        />
        <span className="text-xs text-gray-700 ml-2 relative top-[-2px]">
          +10%
        </span>
      </div>
      <InfoCircleOutlined className="text-gray-500 text-lg" />
    </div>
    <div className="mt-1 text-gray-500 text-xs">Pending</div>
  </Card>

  {/* Fourth Card */}
  <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <div className="flex items-start">
        <Statistic
          value={3}
          precision={0}
          valueStyle={{ fontSize: "18px", color: "#1f2937" }}
        />
        <span className="text-xs text-gray-700 ml-2 relative top-[-2px]">
          +10%
        </span>
      </div>
      <InfoCircleOutlined className="text-gray-500 text-lg" />
    </div>
    <div className="mt-1 text-gray-500 text-xs">Off-Track</div>
  </Card>
</div>



 <Card className="shadow-sm bg-gray-100 rounded-lg mt-8 px-6 py-4 min-h-[80px] flex flex-col justify-between">
     <div className="text-gray-500 text-xs">Daily Tip:</div>
         <div className="mt-1 flex items-center">
            <DragOutlined className="text-gray-500 text-lg" />
            <span className="ml-2 text-xs">Use this icon on the left to re-arrange tasks</span>
         </div>
       
       
  </Card>
      </div>
   
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              marginTop: "20px",
              minHeight: 280,
              // background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="flex flex-col gap-1">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-2"
                >
                  <HolderOutlined onClick={() => handleModalOpen(todo)} />
                  <div className="w-1/12">{todo.id}</div>
                  <div className="w-2/12">{todo.content}</div>
                  <div className="w-2/12">{todo.createdDate}</div>
                  <div className="w-2/12">{todo.title}</div>
                  <div className="w-2/12 flex gap-2">
                    <Button
                      icon={<EditOutlined />}
                      className="mr-2"
                    />
                    <Button icon={<DeleteOutlined />} />
                  </div>
                  <div>
                    <Checkbox />
                  </div>
                </div>
              ))}

              {/* Modal for Todo Details */}
              {selectedTodo && (
                <Modal
                  title="Todo Details"
                  visible={isModalVisible}
                  onCancel={handleModalClose}
                  footer={null}
                >
                  <div className="bg-white shadow-lg rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-4">{selectedTodo.title}</h4>
                    <div className="flex items-center gap-5 mb-2">
                      <p className="text-gray-600"><strong>Created Date:</strong> {selectedTodo.createdDate}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600"><strong>Description:</strong></p>
                      <p>{selectedTodo.description}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600"><strong>Content:</strong></p>
                      <p>{selectedTodo.content}</p>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardData;

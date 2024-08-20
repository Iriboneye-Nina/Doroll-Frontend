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
  {
    id: 2,
    title: "Team meeting",
    content: "Get task",
    createdDate: "2024-08-11",
    description: "Attend the weekly team sync-up",
   
  },
  {
    id: 3,
    title: "Team meeting",
    createdDate: "2024-08-11",
    content: "Get task",
    description: "Attend the weekly team sync-up",
    
  },
  {
    id: 4,
    title: "Team meeting",
    createdDate: "2024-08-11",
    content: "Get task",
    description: "Attend the weekly team sync-up",
   
  },
  {
    id: 5,
    title: "Team meeting",
    content: "Get task",
    createdDate: "2024-08-11",
    description: "Attend the weekly team sync-up",
  },
  {
    id: 6,
    title: "Team meeting",
    content: "Get task",
    createdDate: "2024-08-11",
    description: "Attend the weekly team sync-up",
  },
  {
    id: 7,
    title: "Team meeting",
    content: "Get task",
    createdDate: "2024-08-11",
    description: "Attend the weekly team sync-up",
  },
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
      <div>
        <div
          className="bg-white h-14 flex justify-between items-center px-6 py-2 mx-auto rounded-lg mt-5"
          style={{ width: "95%", marginLeft: "50px" }}
        >
          <span className="text-lg">Pending tasks - 7</span>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            className="w-1/3 mx-4"
          />
          <Dropdown menu={menuProps}>
            <Button className="flex items-center border border-gray-200 p-2 rounded-l-md cursor-pointer">
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
            <Title level={5}>Summary</Title>
            <Dropdown menu={menuProps}>
            <Button style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px" }}>
            <FilterOutlined style={{ marginRight: "8px" }} />
      
             <div>
                <span>This Week</span>
              </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ borderLeft: "1px solid #d9d9d9", height: "16px", marginRight: "8px" }}></div>
                           <DownOutlined />
                      </div>
                 </Button>
               </Dropdown>

            {/* Cards Container */}
            <div className="grid grid-cols-2  gap-2 mt-2">
              {/* First Card */}
              <Card
                className="shadow-sm rounded-lg"
                style={{ borderRadius: "6px", border: "1px solid #e0e0e0", padding: "8px" }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <Statistic
                      value={11}
                      precision={0}
                      valueStyle={{ fontSize: "20px", color: "#1f2937" }}
                    />
                    <span
                      style={{ fontSize: "10px", color: "#1f2937", position: "relative", top: "-8px", marginLeft: "2px" }}
                    >
                      +10%
                    </span>
                  </div>
                  <FileOutlined style={{ fontSize: "20px", color: "#9ca3af" }} />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Total Tasks</div>
              </Card>

              {/* Second Card */}
              <Card
                className="shadow-sm rounded-lg"
                style={{ borderRadius: "6px", border: "1px solid #e0e0e0", padding: "8px" }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <Statistic
                      value={1}
                      precision={0}
                      valueStyle={{ fontSize: "20px", color: "#1f2937" }}
                    />
                    <span
                      style={{ fontSize: "10px", color: "#1f2937", position: "relative", top: "-8px", marginLeft: "2px" }}
                    >
                      -10%
                    </span>
                  </div>
                  <CheckOutlined style={{ fontSize: "20px", color: "#9ca3af" }} />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Completed</div>
              </Card>

              {/* Third Card */}
              <Card
                className="shadow-sm rounded-lg"
                style={{ borderRadius: "6px", border: "1px solid #e0e0e0", padding: "8px" }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <Statistic
                      value={7}
                      precision={0}
                      valueStyle={{ fontSize: "20px", color: "#1f2937" }}
                    />
                    <span
                      style={{ fontSize: "10px", color: "#1f2937", position: "relative", top: "-8px", marginLeft: "2px" }}
                    >
                      +10%
                    </span>
                  </div>
                  <InfoCircleOutlined style={{ fontSize: "20px", color: "#9ca3af" }} />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Pending</div>
              </Card>

              {/* Fourth Card */}
              <Card
                className="shadow-sm rounded-lg"
                style={{ borderRadius: "6px", border: "1px solid #e0e0e0", padding: "8px" }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <Statistic
                      value={3}
                      precision={0}
                      valueStyle={{ fontSize: "20px", color: "#1f2937" }}
                    />
                    <span
                      style={{ fontSize: "10px", color: "#1f2937", position: "relative", top: "-8px", marginLeft: "2px" }}
                    >
                      +10%
                    </span>
                  </div>
                  <InfoCircleOutlined style={{ fontSize: "20px", color: "#9ca3af" }} />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Off-Track</div>
              </Card>
            </div>

            {/* Additional Section */}
            <Card
              className="shadow-sm bg-gray-100 rounded-lg mt-4"
              style={{ borderRadius: "6px", border: "1px solid #e0e0e0", padding: "8px" }}
            >
              <div className="text-gray-500 text-xs">Daily Tip:</div>
              <div className="mt-1 flex items-center">
                <DragOutlined style={{ fontSize: "20px", color: "#9ca3af" }} />
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
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="flex flex-col gap-1">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
                >
                  <HolderOutlined onClick={() => handleModalOpen(todo)} />
                  <div className="w-1/12">{todo.id}</div>
                  <div className="w-2/12">{todo.content}</div>
                  <div className="w-2/12">{todo.createdDate}</div>
                  <div className="w-2/12">{todo.title}</div>
                  <div className="w-2/12 gap-12">
                    <Button
                      icon={<EditOutlined />}
                      className="mr-2"
                    />
                    <Button  icon={<DeleteOutlined />} />
                  </div>
                  <div>
                    <Checkbox/>
                  </div>
                  </div>
               
              ))}
            </div>

            {/* Modal for Todo Details */}
            {selectedTodo && (
              <Modal
                title="Todo Details"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
              >
              <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
                 <h4 className="text-xl font-semibold mb-4">{selectedTodo.title}</h4>
                   <div className="flex items-center gap-5 mb-2">
                     <p className="text-gray-600"><strong>Created Date:</strong> {selectedTodo.createdDate}</p>
                   </div>
                    <div className="mb-4">
                        <p className="text-gray-700"><strong>Description:</strong> {selectedTodo.description}</p>
                     </div>
                            
                       </div>
                        
              </Modal>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardData;

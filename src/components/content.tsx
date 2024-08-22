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
  FileTextOutlined,
  CalendarOutlined,
  PlusOutlined,
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
  Form,
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
    content: "This is a detailed description of what needs to be done for the project report. It includes all the necessary steps and considerations.",
  },
  // Additional todos...
];

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

const DashboardData = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick: MenuProps['onClick'] = (e: any) => {
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
              <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between h-[90px]">
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
              <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between h-[90px]">
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
              <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between h-[90px]">
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
              <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between h-[90px]">
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
              borderRadius: borderRadiusLG,
              background: "#f9f9f9",
            }}
          >
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[400px]">
              {todos.map((todo, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 shadow-sm p-4 rounded-lg mb-2 h-[80px]"
                >
                  <HolderOutlined className="text-gray-600 cursor-pointer" onClick={() => handleModalOpen(todo)} />
                  <div className="w-1/12 text-center">{index + 1}</div>
                  <div className="w-3/12 truncate">{todo.content}</div>
                  <div className="w-3/12 text-center">{todo.createdDate}</div>
                  <div className="w-3/12 truncate">{todo.title}</div>
                  <div className="w-2/12 flex justify-end gap-2">
                    <Button icon={<EditOutlined onClick={() => setShowTaskForm(true)} />} />
                    <Button icon={<DeleteOutlined />} />
                  </div>
                  <div className="w-1/12 text-center">
                    <Checkbox className="relative bottom-[2px]" />
                  </div>
                </div>
              ))}
            </div>
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="Todo Details"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Return
          </Button>,
        ]}
      >
        {selectedTodo && (
          <>
            <Title level={4}>{selectedTodo.title}</Title>
            <p><strong>Description:</strong> {selectedTodo.description}</p>
            <p><strong>Content:</strong> {selectedTodo.content}</p>
            <p><strong>Created Date:</strong> {selectedTodo.createdDate}</p>
          </>
        )}
      </Modal>

      <Modal
        title="Task Form"
        visible={showTaskForm}
        onCancel={() => setShowTaskForm(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={{
            title: '',
            description: '',
            content: '',
            createdDate: '',
          }}
        >
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Content" name="content">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Created Date" name="createdDate">
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default DashboardData;

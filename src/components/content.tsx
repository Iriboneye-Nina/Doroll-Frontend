import React, { useState } from "react";
import { useFetchTasksQuery } from "../lib/auth/authSlice";
import {
  CheckOutlined,
  FileOutlined,
  InfoCircleOutlined,
  FilterOutlined,
  DownOutlined,
  EditOutlined,
  HolderOutlined,
  DeleteOutlined,
  SearchOutlined,
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
  Popconfirm,
  Space,
  Statistic,
  Table,
  Typography,
  theme,
} from "antd";

type Todo = {
  status: string;
  id: number;
  title: string;
  description: string;
  content: string;
  createdDate: string;
};

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

const DashboardData = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // Number of todos per page

  // Fetch tasks
  const { data, error, isLoading } = useFetchTasksQuery();

  // Filter tasks by status
  const filteredData =
    data?.data?.filter((task: Todo) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus ? task.status === selectedStatus : true)
    ) || [];

  // Count tasks by status
  const countTasksByStatus = (status: string) => {
    return data?.data?.filter((task: Todo) => task.status === status).length || 0;
  };

  // Destructure tokens for styling
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Menu and filter items
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedStatus(e.key);
  };

  const menuProps = {
    items: [
      { label: "ON-TRACK", key: "ON-TRACK" },
      { label: "OFF-TRACK", key: "OFF-TRACK" },
      { label: "DONE", key: "DONE" },
      { label: "PENDING", key: "PENDING" },
    ],
    onClick: handleMenuClick,
  };

  const filterProps = {
    items: [
      { label: "This Week", key: "this_week" },
      { label: "This Month", key: "this_month" },
      { label: "This Year", key: "this_year" },
    ],
  };

  const handleModalOpen = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedTodo(null);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    // Implement the functionality for toggling the task status here
    console.log(`Toggling task with id: ${id}, checked: ${e.target.checked}`);
  };

  const handleDelete = (id: number): void => {
    // Implement the delete functionality here
    console.log(`Deleting task with id: ${id}`);
  };

  // Define columns for the table
  const columns = [
    {
      title: "",
      key: "icon",
      render: (text: any, record: Todo) => (
        <HolderOutlined
          style={{ fontSize: '16px', color: '#1890ff', cursor: 'pointer' }}
          onClick={() => handleModalOpen(record)}
        />
      ),
    },
    {
      title: "",
      dataIndex: "number",
      key: "number",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text: string) => (
        <span style={{ fontWeight: "bold" }}>{text}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Todo) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Checkbox
            checked={record.status === "completed"}
            onChange={(e) => handleCheckboxChange(e, record.id)}
          />
        </Space>
      ),
    },
  ];
  

  // Pagination configuration
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: filteredData.length,
    onChange: (page: number) => setCurrentPage(page),
  };

  return (
    <Layout>
      <div className="p-2">
        <div className="bg-white h-14 flex justify-between items-center px-6 py-1 rounded-lg mt-1 mx-auto max-w-screen-lg">
          <span className="text-lg">
            {isLoading
              ? "Loading tasks..."
              : error
              ? "Failed to load tasks"
              : `Pending tasks - ${filteredData.length}`}
          </span>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            className="w-1/3 mx-4"
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <Title level={5} className="text-white">
              Summary
            </Title>
            <Dropdown menu={filterProps}>
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
                      value={countTasksByStatus("PENDING")}
                      precision={0}
                      valueStyle={{ fontSize: "18px", color: "#1f2937" }}
                    />
                    <span className="text-xs text-gray-700 ml-2 relative top-[-2px]">
                      +10%
                    </span>
                  </div>
                  <FileOutlined className="text-gray-500 text-lg" />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Pending</div>
              </Card>

              {/* Second Card */}
              <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between h-[90px]">
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <Statistic
                      value={countTasksByStatus("DONE")}
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
                      value={countTasksByStatus("ON-TRACK")}
                      precision={0}
                      valueStyle={{ fontSize: "18px", color: "#1f2937" }}
                    />
                    <span className="text-xs text-gray-700 ml-2 relative top-[-2px]">
                      -5%
                    </span>
                  </div>
                  <InfoCircleOutlined className="text-gray-500 text-lg" />
                </div>
                <div className="mt-1 text-gray-500 text-xs">On Track</div>
              </Card>

              {/* Fourth Card */}
              <Card className="shadow-sm rounded-lg border border-gray-200 p-1 flex flex-col justify-between h-[90px]">
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <Statistic
                      value={countTasksByStatus("OFF-TRACK")}
                      precision={0}
                      valueStyle={{ fontSize: "18px", color: "#1f2937" }}
                    />
                    <span className="text-xs text-gray-700 ml-2 relative top-[-2px]">
                      +5%
                    </span>
                  </div>
                  <InfoCircleOutlined className="text-gray-500 text-lg" />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Off Track</div>
              </Card>
            </div>
          </div>
        </Sider>

        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
            margin: "20px 20px",
          }}
        >
          <Table
            columns={columns}
            dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            rowKey="id"
            pagination={paginationConfig}
            scroll={{ x: 'max-content' }} // Enable horizontal scrolling if necessary
            style={{ padding: 0 }} // Decrease padding
          />
        </Content>
      </Layout>

      <Modal
        title="Todo Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedTodo && (
          <div>
            <Title level={4}>{selectedTodo.title}</Title>
            <p><strong>Description:</strong> {selectedTodo.description}</p>
            <p><strong>Content:</strong> {selectedTodo.content}</p>
            <p><strong>Created Date:</strong> {selectedTodo.createdDate}</p>
            <p><strong>Status:</strong> {selectedTodo.status}</p>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default DashboardData;

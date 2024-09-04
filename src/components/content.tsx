import React, { useState, useEffect } from "react";
import { useFetchTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from "../lib/auth/authSlice";
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
  PlusOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
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
  message,
  Select,
} from "antd";
import moment from 'moment';

type Todo = {
  status: string;
  id: number;
  title: string;
  description: string;
  content: string;
  createdDate: string;
  deadline?: string;
};

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

const DashboardData = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);


  const { data, error, isLoading, refetch } = useFetchTasksQuery();

 
  const [deleteTask] = useDeleteTaskMutation();
  

  
  const filteredData =
    data?.data?.filter((task: Todo) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus ? task.status === selectedStatus : true)
    ) || [];


  useEffect(() => {
    if (searchTerm && filteredData.length === 0) {
      message.info("No tasks found with the given search term.");
    }
  }, [searchTerm, filteredData]);

 
  const countTasksByStatus = (status: string) => {
    return data?.data?.filter((task: Todo) => task.status === status).length || 0;
  };


  const {
    token: { colorBgContainer },
  } = theme.useToken();

 
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

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    try {
      // Update the status based on the checkbox state
      const status = e.target.checked ? "DONE" : "PENDING";

      await updateTask({ id, status }).unwrap();
      message.success("Task status updated successfully");
      refetch(); // Refetch tasks after status change
    } catch (error) {
      message.error("Failed to update task status");
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteTask(id).unwrap();
      message.success("Task deleted successfully");
      refetch(); // Refetch tasks after deletion
    } catch (error) {
      message.error("Failed to delete the task");
    }
  };
  const [updateTask] = useUpdateTaskMutation();

  const handleUpdateTask = async (values: any) => {
    if (selectedTodo) {
      try {
        const taskData = {
          title: values.taskName.trim(),  
          description: values.description.trim(),  
          deadline: values.selectDate ? values.selectDate.toDate() : null, 
        };
  
        if (!taskData.title || !taskData.description || !taskData.deadline) {
          message.error("All fields are required.");
          return;
        }
  
        await updateTask({ id: selectedTodo.id, ...taskData }).unwrap();
        message.success("Task updated successfully!");
        setShowTaskForm(false);
        refetch(); // Refetch tasks after update
      } catch (error) {
        console.error("Update Task Error:", error);
        message.error("Failed to update task. Please try again.");
      }
    } else {
      message.error("No task selected.");
    }
  };
  
  
  

  
  const columns = [
    {
      title: "",
      key: "icon",
      render: (text: any, record: Todo) => (
        <HolderOutlined
          style={{ fontSize: "16px", color: "#1890ff", cursor: "pointer" }}
          onClick={() => handleModalOpen(record)}
        />
      ),
      width: 50,
    },
    {
      title: "",
      dataIndex: "number",
      key: "number",
      render: (text: any, record: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "",
      dataIndex: "title",
      key: "title",
      width: 150,
      render: (text: string, record: Todo) => (
        <span style={{ cursor: "pointer", color: "#1890ff" }} onClick={() => handleModalOpen(record)}>
          {text}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "deadline",
      key: "createdDate",
      width: 150,
      render: (text: string) => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    {
      title: "",
      key: "actions",
      render: (text: string, record: Todo) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => { setSelectedTodo(record); setShowTaskForm(true); }} />
          <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Checkbox checked={record.status === "DONE"} onChange={(e) => handleCheckboxChange(e, record.id)} />
        </Space>
      ),
      width: 150,
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
              <Card className="shadow-sm rounded-lg border border-gray-200 p-4" style={{ backgroundColor: "#f0f2f5" }}>
                <Title level={4} className="text-gray-700">
                  {countTasksByStatus("PENDING")}
                </Title>
                <p className="text-gray-500">Pending</p>
              </Card>

              <Card className="shadow-sm rounded-lg border border-gray-200 p-4" style={{ backgroundColor: "#f0f2f5" }}>
                <Title level={4} className="text-gray-700">
                  {countTasksByStatus("ON-TRACK")}
                </Title>
                <p className="text-gray-500">On Track</p>
              </Card>

              <Card className="shadow-sm rounded-lg border border-gray-200 p-4" style={{ backgroundColor: "#f0f2f5" }}>
                <Title level={4} className="text-gray-700">
                  {countTasksByStatus("OFF-TRACK")}
                </Title>
                <p className="text-gray-500">Off Track</p>
              </Card>

              <Card className="shadow-sm rounded-lg border border-gray-200 p-4" style={{ backgroundColor: "#f0f2f5" }}>
                <Title level={4} className="text-gray-700">
                  {countTasksByStatus("DONE")}
                </Title>
                <p className="text-gray-500">Done</p>
              </Card>
            </div>
          </div>
        </Sider>

        <Layout>
          <Content
            style={{
              padding: "20px",
              marginLeft: 10,
              marginTop: 20,
            }}
          >
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={paginationConfig}
              rowKey="id"
              scroll={{ x: 600 }}
            />
          </Content>
        </Layout>
      </Layout>

      {/* Update Task Modal */}
      <Modal
  title="Update Task"
  visible={showTaskForm}
  onCancel={() => setShowTaskForm(false)}
  footer={null}
>
  <Form
    initialValues={{
      taskName: selectedTodo?.title,
      description: selectedTodo?.description,
      selectDate: selectedTodo?.deadline ? moment(selectedTodo?.deadline) : null,
      status: selectedTodo?.status,  // Set initial value for status
    }}
    onFinish={handleUpdateTask}
  >
    <Form.Item
      name="taskName"
      label="Task Name"
      rules={[{ required: true, message: "Please enter task name" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="description"
      label="Description"
      rules={[{ required: true, message: "Please enter a description" }]}  // Added required rule
    >
      <Input.TextArea rows={4} />
    </Form.Item>
    <Form.Item
      name="selectDate"
      label="Deadline"
      rules={[{ required: true, message: "Please select a deadline" }]}
    >
      <DatePicker />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Update Task
      </Button>
    </Form.Item>
  </Form>
</Modal>


      {/* Task Details Modal */}
      <Modal
        title="Task Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedTodo && (
          <div>
            <p><strong>Title:</strong> {selectedTodo.title}</p>
            <p><strong>Description:</strong> {selectedTodo.description}</p>
            <p><strong>Content:</strong> {selectedTodo.content}</p>
            <p><strong>Created Date:</strong> {selectedTodo.createdDate}</p>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default DashboardData;

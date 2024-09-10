import React, { useState, useEffect } from "react";
import {
  useFetchTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../lib/auth/authSlice";
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
} from "antd";
import moment from "moment";

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
  const [updateTask] = useUpdateTaskMutation();

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
  const handleCheckboxChange = async (task: Todo) => {
    const updatedStatus = task.status === "DONE" ? "PENDING" : "DONE";
    const updatedTask = { ...task, status: updatedStatus };
  
    try {
      await updateTask({ id: task.id.toString(), data: updatedTask }).unwrap();
      message.success("Task status updated successfully!");
      await refetch();  
    } catch (error: any) {
      message.error(`Failed to update task status: ${error.message}`);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteTask(id.toString()).unwrap();
      message.success("Task deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete the task");
    }
  };
  const handleEditSave = async (values: any) => {
    if (selectedTodo) {
      const updatedTask = {
        ...selectedTodo,
        title: values.taskName,
        deadline: values.selectDate.format("YYYY-MM-DD"),
        description: values.description,
      };

      try {
        await updateTask({ id: selectedTodo.id.toString(), data: updatedTask }).unwrap();
        message.success("Task updated successfully!");
        setSelectedTodo(null);
        setShowTaskForm(false);
        refetch();
      } catch (error: any) {
        message.error(`Failed to update task: ${error.message}`);
      }
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
        <span
          style={{ cursor: "pointer", color: "#1890ff" }}
          onClick={() => handleModalOpen(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "deadline",
      key: "createdDate",
      width: 150,
      render: (text: string) => {
        const formattedDate = moment(text).format("M/D/YYYY"); 
        return <span style={{ fontWeight: "bold" }}>{formattedDate}</span>;
      },
    },
    {
      title: "",
      key: "actions",
      render: (text: string, record: Todo) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedTodo(record);
              setShowTaskForm(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
          <Checkbox
          checked={record.status === "DONE"}
          onChange={() => handleCheckboxChange(record)} 
        />
        </Space>
      ),
      width: 150,
    }
    
  ];

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
              : `Pending tasks - ${filteredData.filter((task: Todo) => task.status === 'PENDING').length}`}
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
              <Card>
                <Statistic
                  title="Pending Todos"
                  value={countTasksByStatus("PENDING")}
                />
              </Card>
              <Card>
                <Statistic
                  title="Done Todos"
                  value={countTasksByStatus("DONE")}
                />
              </Card>
              <Card>
                <Statistic
                  title="Off-Track Todos"
                  value={countTasksByStatus("OFF-TRACK")}
                />
              </Card>
              <Card>
                <Statistic
                  title="On-Track Todos"
                  value={countTasksByStatus("ON-TRACK")}
                />
              </Card>
            </div>
            <Card
  className="shadow-sm bg-gray-100 rounded-lg"
  style={{
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
    padding: "8px",
    marginTop: "20px", 
  }}
>
  <div className="text-gray-500 text-xs">Daily Tip:</div>
  <div className="mt-1 flex items-center">
    <HolderOutlined
      style={{ cursor: "grab", transform: "rotate(90deg)" }}
    />
    <span className="ml-2 text-xs">
      Use this icon on the left to re-arrange tasks
    </span>
  </div>
</Card>

          </div>
        </Sider>
        <Layout style={{ padding: "0 24px", minHeight: 280 }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={paginationConfig}
              rowKey={(record) => record.id.toString()}
            />
          </Content>
        </Layout>
      </Layout>

      <Modal
        title="Task Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedTodo && (
          <div>
            <Title level={5}>Task: {selectedTodo.title}</Title>
            <p>Status: {selectedTodo.status}</p>
            <p>Description: {selectedTodo.description}</p>
            <p></p>
            <p>Created Date: {moment(selectedTodo.createdDate).format("YYYY-MM-DD")}</p>
            {selectedTodo.deadline && <p>Deadline: {moment(selectedTodo.deadline).format("YYYY-MM-DD")}</p>}
          </div>
        )}
      </Modal>

      {showTaskForm && selectedTodo && (
        <Modal
          title="Edit Task"
          visible={showTaskForm}
          onCancel={() => setShowTaskForm(false)}
          footer={null}
        >
          <Form
            initialValues={{
              taskName: selectedTodo.title,
              selectDate: selectedTodo.deadline ? moment(selectedTodo.deadline) : null,
              description: selectedTodo.description,
            }}
            onFinish={handleEditSave}
          >
            <Form.Item
              name="taskName"
              label="Task Name"
              rules={[{ required: true, message: "Please input the task name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="selectDate"
              label="Deadline"
              rules={[{ required: true, message: "Please select the deadline!" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input the description!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Layout>
  );
};

export default DashboardData;

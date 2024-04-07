import React from "react";
import {
  Button,
  Spin,
  Table,
  TableColumnsType,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/redux/features/todoSlice/actions";
import { RootState } from "@/redux/store";
import EditTaskModal from "@/components/modals/EditTaskModal";
import DeleteTaskModal from "@/components/modals/DeleteTaskModal";
import { TodoType } from "@/redux/features/types vs interfaces/types";

const CustomTable: React.FC = ({}) => { ////
  const dispatch = useDispatch<any>();
  const todoList = useSelector((state: RootState) => state.todo.taskList); //используем todoList из ReduxStore
  const todoState = useSelector((state: RootState) => state.todo);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  console.log("Current todo state:", todoState);
  const [editingTask, setEditingTask] = useState<{
    id: number | null;
    title: string;
  }>({ id: null, title: "" });
  const isBrowser = typeof window !== "undefined";
  const isLogin = isBrowser && localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const loggedInUsers = localStorage.getItem("loggedInUser");
    if (!loggedInUsers) {
      return;
    }
    if (isLogin) {
      dispatch(fetchTasks());
    }
  }, [dispatch, isLogin]);

  const loading = useSelector(
    (state: RootState) => state.todo.status === "loading"
  );
  const error = useSelector((state: RootState) => state.todo.error);

  if (loading) {
    return (
      <div>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEditButton = (id: number | null) => {
    const task = todoList.find((task) => task.id === id);
    if (task) {
      setIsEditModalOpen(true);
      setEditingTask(task);
    }
  };
  const handleDeleteButton = (id: number | null) => {
    const task = todoList.find((task) => task.id === id);
    if (task) {
      setIsDeleteModalOpen(true);
      setEditingTask(task);
    }
  };

  const columns: TableColumnsType<TodoType> = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      width: 160,
      ellipsis: true,
      render: (text: string, record: TodoType) => (
        <span
          style={{
            color: record.completed ? "#9333ea" : "black",
            textDecoration: record.completed ? "line-through" : "",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (
        <span>
          {completed ? (
            <CheckOutlined style={{ color: "green" }} />
          ) : (
            <CloseOutlined style={{ color: "red" }} />
          )}
        </span>
      ),
      width: 40,
      filters: [
        {
          text: "Completed",
          value: "Completed",
        },
        {
          text: "Not Completed",
          value: "Not Completed",
        },
      ],
      onFilter: (value, record) => {
        return record.completed === (value === "Completed");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => handleEditButton(record.id)}
            style={{ fontSize: 10 }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => handleDeleteButton(record.id)}
            style={{ fontSize: 10 }}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Button>
        </>
      ),
      width: 50,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={todoList}
        rowKey="id"
        pagination={{ pageSize: 3 }}
      />
      <EditTaskModal
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        task={editingTask}
      />
      <DeleteTaskModal
        visible={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        task={editingTask}

      />
    </>
  );
};

export default CustomTable;

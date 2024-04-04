import { Button, Input, Spin, Table, TableColumnsType, message } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchTasks } from "@/redux/features/todoSlice/actions";
import { RootState } from "@/redux/store";

export interface DataTypes {
  id: string;
  key: string;
  title: string;
  completed: boolean;
  userId: number;
  email: string;
  password: string;
  username: string;
  phone: string;
}

const CustomTable: React.FC = ({}) => {
  const dispatch = useDispatch<any>();
  const todoList = useSelector((state: RootState) => state.todo.taskList); //используем todoList из ReduxStore, поэтому локальное состояние для tasks можно не использовать
  const todoState = useSelector((state: RootState) => state.todo);
  console.log("Current todo state:", todoState); 
  const [editingTask, setEditingTask] = useState<{
    id: string | null;
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
  }, [isLogin]);

  const loading = useSelector((state: RootState) => state.todo.status === "loading");
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

  const toggleStatusTaskAndHandleError = (id: string) => {
    return async (dispatch: any) => {
      try {
        const taskToUpdate = todoList.find((task) => task.id === id);
        if (!taskToUpdate) {
          throw new Error("Task not found");
        }
        const updatedTask = {
          ...taskToUpdate,
          completed: !taskToUpdate.completed,
        };
        await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
          updatedTask
        );
        dispatch(toggleTaskStatus(id));
      } catch (error) {
        message.error("Failed to update task");
      }
    };
  };

  const columns: TableColumnsType<DataTypes> = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      width: 160,
      ellipsis: true,
      render: (text: string, record: DataTypes) =>
        record.id === editingTask.id ? (
          <Input
            value={editingTask.title}
            // onChange={handleInputChange}
            // onPressEnter={() => handleSaveEdit(record.key)}
          />
        ) : (
          <div
            style={{
              color: record.completed ? "#9333ea" : "black",
              textDecoration: record.completed ? "line-through" : "",
            }}
          >
            {record.title}
          </div>
        ),
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (
        <span>{completed ? "Completed" : "Not Completed"}</span>
      ),
      width: 60,
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
        if (value === "Completed") {
          return record.completed;
        } else if (value === "Not Completed") {
          return !record.completed;
        }
        return true;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => toggleStatusTaskAndHandleError(record.id)}
            style={{ fontSize: 10 }}
          >
            <CheckOutlined style={{ color: "purple" }} />
          </Button>
          <Button
            // onClick={() => handleEditTask(/*record.id*/ record)}
            style={{ fontSize: 10 }}
          >
            <EditOutlined />
          </Button>
          <Button
            // onClick={() => handleDeleteTask(record.id)}
            style={{ fontSize: 10 }}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Button>
        </>
      ),
      width: 90,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={todoList}
      rowKey="id"
      pagination={{ pageSize: 3 }}
    />
  );
};

export default CustomTable;
function toggleTaskStatus(id: string): any {
  throw new Error("Function not implemented.");
}

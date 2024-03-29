import { Button, Input, Spin, Table, TableColumnsType } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { JSONPlaceholder } from "@freepi/jsonplaceholder";
import axios from "axios";

export interface DataTypes {
  id: string;
  key: string;
  title: string;
  completed: boolean;
  userId: number;
}

const jsonPlaceHolder = new JSONPlaceholder();

const CustomTable: React.FC = ({}) => {
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<DataTypes[]>([]);
  const [editingTask, setEditingTask] = useState<{
    id: string | null;
    title: string;
  }>({ id: null, title: "" });
 

  const handleDeleteTask = async (id: string) => {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
      } catch (error) {
        setError("Failed to delete task");
      }
  };

  const toggleStatusTask = async (id: string) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) {
        setError("Task not found");
        return;
      }
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTask);
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      setError("Failed to update task");
    }
  };

  const handleEditTask = (id: string) => {
    const taskToEdit = tasks.find(task => task.id === id)
    if (taskToEdit) {
      setEditingTask({id, title: taskToEdit.title })
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTask({ ...editingTask, title: e.target.value });
  };

  const handleSaveEdit = async (id: string) => {
      try {
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          title: editingTask.title
        });
        const updatedTasks = tasks.map(task =>
          task.id === id ? { ...task, title: editingTask.title } : task
        );
        setTasks(updatedTasks);
        setEditingTask({id: null, title: ""})
      } catch (error) {
        setError("Failed to update task");
      }
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
            onChange={handleInputChange}
            onPressEnter={() => handleSaveEdit(record.id)}
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
            onClick={() => toggleStatusTask(record.id)}
            style={{ fontSize: 10 }}
          >
            <CheckOutlined style={{ color: "purple" }} />
          </Button>
          <Button
            onClick={() => handleEditTask(record.id)}
            style={{ fontSize: 10 }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => handleDeleteTask(record.id)}
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
      dataSource={tasks}
      rowKey="id"
      pagination={{ pageSize: 3 }}
    />
  );
};

export default CustomTable;

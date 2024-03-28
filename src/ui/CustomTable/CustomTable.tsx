import { Button, Input, Table, TableColumnsType } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  editTodo,
  removeTodo,
  toggleStatusTodo,
} from "@/redux/features/todo-slice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { JSONPlaceholder } from "@freepi/jsonplaceholder";
import axios from "axios";

interface DataTypes {
  key: string;
  title: string;
  timeend: Date;
  completed: boolean;
}

const jsonPlaceHolder = new JSONPlaceholder();

const CustomTable: React.FC = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<DataTypes[]>([]);
  const todoList = useSelector((state: RootState) => state.todo.taskList);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState<{
    id: string | null;
    title: string;
  }>({ id: null, title: "" });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<DataTypes[]>("https://jsonplaceholder.typicode.com/todos");
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch tasks");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const tasklistData = (todoList: any[]) => {
    return todoList.map((task) => ({
      ...task,
      key: task.id,
    }));
  };


  const handleDeleteTask = (id: string) => {
    dispatch(removeTodo(id));
  };

  const toggleStatusTask = (id: string) => {
    dispatch(toggleStatusTodo(id));
  };

  const handleEditTask = (record: DataTypes) => {
    setEditingTask({ id: record.key, title: record.title });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTask({ ...editingTask, title: e.target.value });
  };

  const handleSaveEdit = (id: string, title: string) => {
    dispatch(
      editTodo({
        id: id,
        newData: {
          title: title,
        },
      })
    );
    setEditingTask({ id: null, title: "" });
  };

  const columns: TableColumnsType<DataTypes> = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      width: 160,
      ellipsis: true,
      render: (text: string, record: DataTypes) =>
        record.key === editingTask.id ? (
          <Input
            value={editingTask.title}
            onChange={handleInputChange}
            onPressEnter={() => handleSaveEdit(record.key, editingTask.title)}
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
    // {
    //   title: "End Time",
    //   dataIndex: "timeend",
    //   key: "timeend",
    //   width: 90,
    //   render: (timeend: Date, record: DataTypes) => timeend.toLocaleString(),
    //   sorter: (a, b) =>
    //     new Date(a.timeend).getTime() - new Date(b.timeend).getTime(),
    //   sortDirections: ["descend", "ascend"],
    //   filters: [
    //     {
    //       text: "Today",
    //       value: "Today",
    //     },
    //     {
    //       text: "All",
    //       value: "All",
    //     },
    //   ],
    //   onFilter: (value, record) => {
    //     const currentDate = new Date();
    //     const recordDate = new Date(record.timeend);
    //     if (value === "Today") {
    //       return recordDate.toDateString() === currentDate.toDateString();
    //     }
    //     return true;
    //   },
    // },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (
        <span>{completed ? "Completed" : "Not Completed"}</span>
      ),
      width: 80,
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
            onClick={() => toggleStatusTask(record.key)}
            style={{ fontSize: 10 }}
          >
            <CheckOutlined style={{ color: "purple" }} />
          </Button>
          <Button
            onClick={() => handleEditTask(record)}
            style={{ fontSize: 10 }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => handleDeleteTask(record.key)}
            style={{ fontSize: 10 }}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Button>
        </>
      ),
      width: 110,
    },
  ];

  return (
    <Table
      columns={columns}
      // dataSource={tasklistData(todoList)}
      dataSource={tasks}
      pagination={{ pageSize: 3 }}
    />
  );
};

export default CustomTable;

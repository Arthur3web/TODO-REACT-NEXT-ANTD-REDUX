import { Button, Input, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { Task } from "../../components/AddTaskForm";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataTypes {
  key: string;
  title: string;
  timeend: Date;
  completed: boolean;
}
interface CustomTableProps {
  tasklist: Task[];
  onDeleteTask: (id: string) => void;
  toggleStatusTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  tasklist,
  onDeleteTask,
  toggleStatusTask,
  onEditTask,
}) => {
  const [editingTask, setEditingTask] = useState<{ id: string | null, title: string }>({ id: null, title: "" });
  const mapTasksToTableDate = (tasklist: Task[]) => {
    return tasklist.map((task) => ({
      ...task,
      key: task.id,
      timeend: new Date(task.timeend),
    }));
  };

  const handleDelete = (id: string) => {
    onDeleteTask(id);
  };

  const toggleStatus = (id: string) => {
    toggleStatusTask(id);
  }

  const handleEdit = (id: string, title: string) => {
    setEditingTask({ id, title });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTask({ ...editingTask, title: e.target.value });
  };

  const handleSaveEdit = () => {
    if (editingTask.id !== null) {
      onEditTask(editingTask.id, editingTask.title);
      setEditingTask({ id: null, title: "" });
    }
  };

  const columns: TableColumnsType<DataTypes> = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      width: 160,
      ellipsis: true,
      render: (text: string, record: DataTypes) => (
        record.key === editingTask.id ? (
          <Input
            value={editingTask.title}
            onChange={handleInputChange}
            onPressEnter={handleSaveEdit}
            onBlur={handleSaveEdit}
          />
        ) : (
          <div style={{ color: record.completed ? '#9333ea' : 'black' }}>{text}</div>
        )
      ),
    },
    {
      title: "End Time",
      dataIndex: "timeend",
      key: "timeend",
      width: 90,
      render: (timeend: Date) => (
        <span>{new Intl.DateTimeFormat("en-US").format(timeend)}</span>
      ),
      sorter: (a, b) => {
        if (a < b) {
          return a.timeend.getTime() - b.timeend.getTime();
        } else {
          return b.timeend.getTime() - a.timeend.getTime();
        } 
        
      },
      filters: [
        {
          text: "Today",
          value: "Today",
        },
        {
          text: "All",
          value: "All",
        },
      ],
      onFilter: (value, record) => {
        const currentDate = new Date();
        const recordDate = new Date(record.timeend);
        if (value === "Today") {
          return recordDate.toDateString() === currentDate.toDateString();
        }
        return true;
      },
    },
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
          <Button onClick={() => toggleStatus(record.key)} style={{fontSize: 10 }}>
            <CheckOutlined style={{ color: "purple" }} />
          </Button>
          <Button onClick={() => handleEdit(record.key, record.title)} style={{fontSize: 10 }}>
          <EditOutlined />
          </Button>
          <Button onClick={() => handleDelete(record.key)} style={{fontSize: 10 }}>
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
      dataSource={mapTasksToTableDate(tasklist)}
      pagination={{ pageSize: 3 }}
    />
  );
};

export default CustomTable;


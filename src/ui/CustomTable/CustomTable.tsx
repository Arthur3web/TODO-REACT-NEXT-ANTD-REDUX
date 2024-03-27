import { Button, Input, Table, TableColumnsType } from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleTodo } from "@/redux/features/todo-slice";
import { RootState } from "@/redux/store";

interface DataTypes {
  key: string;
  title: string;
  timeend: Date;
  done: boolean;
}

const CustomTable: React.FC = ({}) => {
  const todoList = useSelector((state: RootState) => state.todo.list);
  const dispatch = useDispatch();

  const tasklistData = (todoList: any[]) => {
    return todoList.map((task) => ({
      ...task,
      key: task.id,
    }));
  };

  const handleDelete = (id: string) => {
    dispatch(removeTodo(id));
  };

  const toggleStatus = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const columns: TableColumnsType<DataTypes> = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      width: 160,
      ellipsis: true,
      render: (text: string, record: DataTypes) => (
        <div style={{ color: record.done ? "#9333ea" : "black" }}>
          {record.title}
        </div>
      ),
    },
    {
      title: "End Time",
      dataIndex: "timeend",
      key: "timeend",
      width: 90,
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
      // render: (done: boolean) => (
      //   <span>{done ? "Completed" : "Not Completed"}</span>
      // ),
      // width: 80,
      // filters: [
      //   {
      //     text: "Completed",
      //     value: "Completed",
      //   },
      //   {
      //     text: "Not Completed",
      //     value: "Not Completed",
      //   },
      // ],
      // onFilter: (value, record) => {
      //   if (value === "Completed") {
      //     return record.done;
      //   } else if (value === "Not Completed") {
      //     return !record.done;
      //   }
      //   return true;
      // },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => toggleStatus(record.key)}
            style={{ fontSize: 10 }}
          >
            <CheckOutlined style={{ color: "purple" }} />
          </Button>
          <Button style={{ fontSize: 10 }}>
            <EditOutlined />
          </Button>
          <Button
            onClick={() => handleDelete(record.key)}
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
      dataSource={tasklistData(todoList)}
      pagination={{ pageSize: 3 }}
    />
  );
};

export default CustomTable;

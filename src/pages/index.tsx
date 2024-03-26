import { Inter } from "next/font/google";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Flex,
  Layout,
  Menu,
  MenuProps,
  Popover,
  Typography,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import AddTaskForm, { Task } from "@/components/AddTaskForm";
import CustomTable from "@/ui/CustomTable/CustomTable";

const inter = Inter({ subsets: ["latin"] });

const statusList = ["All", "Done", "Undone"];
const menu = (
  <Menu>
    {statusList.map((el, index) => (
      <Menu.Item key={index + 1}>
        <CheckCircleOutlined
          style={{ fontSize: "20px", marginRight: "10px" }}
        />
        {el}
      </Menu.Item>
    ))}
  </Menu>
);

const items: MenuProps["items"] = [
  {
    label: "Today",
    key: 1,
    icon: (
      <ScheduleOutlined style={{ fontSize: "20px", marginRight: "10px" }} />
    ),
  },
  {
    label: (
      <Dropdown
        overlay={menu}
        placement="bottom"
        trigger={["click"]}
        overlayStyle={{ width: 185, marginLeft: "-30px", marginTop: "40px" }}
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          All
        </a>
      </Dropdown>
    ),
    key: 2,
    icon: (
      <CheckCircleOutlined style={{ fontSize: "20px", marginRight: "10px" }} />
    ),
  },
  {
    label: "Date",
    key: 3,
    icon: (
      <>
        <ArrowDownOutlined style={{ fontSize: "10px" }} />
        <ArrowUpOutlined style={{ fontSize: "10px", margin: 0 }} />
      </>
    ),
  },
];

const justifyOptions = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];

const alignOptions = ["flex-start", "center", "flex-end"];

export default function Home() {
  const [tasklist, setTasklist] = useState<Task[]>([]);
  const [isClickAddTaskButton, setClickAddTaskButton] = useState(false);

  const handleAddTask = (task: Task) => {
    setTasklist([
      ...tasklist,
      {
        ...task,
        id: Date.now().toString(),
        completed: false,
        timestart: Date.now().toString(),
      },
    ]);
    setClickAddTaskButton(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasklist(tasklist.filter((item) => item.id !== id));
  };

  const toggleStatusTask = (id: string) => {
    const element = tasklist.findIndex((elem) => elem.id === id);
    const newTaskList = [...tasklist];
    newTaskList[element] = {
      ...newTaskList[element],
      completed: !newTaskList[element].completed,
    };
    setTasklist(newTaskList);
  };

  const handleEditTask = (id: string, title: string /* timeend: Date*/) => {
    const updatedTasklist = tasklist.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: title,
          // timeEnd: timeend,
        };
      }
      return item;
    });
    setTasklist(updatedTasklist);
  };

  const content = <Button style={{ width: 150, height: 40 }}>Exit</Button>;
  return (
    <>
      <main>
        <Layout
          style={{
            padding: "0% 7% 0 5%",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(300deg, #B9D5FF 0%, #F6D1FC 98.93%)",
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{ width: 1366, height: 1024 }}
          >
            <Typography
              style={{
                fontSize: "96px",
                fontFamily: "Roboto",
                fontWeight: "700",
                color: "#404040",
              }}
            >
              TODO <span style={{ color: "#9333ea" }}>UI</span>
            </Typography>
            <Flex>
              <Layout style={{ borderRadius: 10, background: "transparent" }}>
                <Layout.Header
                  style={{
                    background: "white",
                    height: 47,
                    padding: "16px 20px 16px 20px",
                    width: 672,
                    borderRadius: 10,
                  }}
                >
                  <Flex align="center" justify="space-between">
                    <Typography style={{ color: "#9333ea" }}>To-Do</Typography>
                    <Typography style={{ color: "#9333ea" }}>
                      Username
                    </Typography>
                    <Popover
                      content={content}
                      title="Welcome, user!"
                      trigger="click"
                      placement="bottomRight"
                    >
                      <Badge dot>
                        <Avatar
                          size={20}
                          shape="square"
                          icon={<UserOutlined />}
                        />
                      </Badge>
                    </Popover>
                  </Flex>
                </Layout.Header>
                <Layout.Content
                  style={{
                    paddingTop: "48px",
                    width: 672,
                    borderRadius: 10,
                  }}
                >
                  <Layout
                    style={{
                      // width: 457,
                      height: 320,
                      borderRadius: 10,
                      padding: "31px 17px 21px 21px",
                      background: "white",
                    }}
                  >
                    <CustomTable
                      tasklist={tasklist}
                      onDeleteTask={handleDeleteTask}
                      toggleStatusTask={toggleStatusTask}
                      onEditTask={handleEditTask}
                    />
                    <Button
                      icon={
                        <PlusOutlined
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                      }
                      style={{
                        width: 185,
                        position: "absolute",
                        marginTop: "300px",
                        height: 40,
                        borderRadius: 10,
                        colorScheme: "dark",
                        border: "1px solid gray",
                      }}
                      onClick={() => setClickAddTaskButton(true)}
                    >
                      Add Task
                    </Button>
                  </Layout>
                </Layout.Content>
              </Layout>
            </Flex>
          </Flex>
        </Layout>
      </main>
      <AddTaskForm
        visible={isClickAddTaskButton}
        onCancel={() => setClickAddTaskButton(false)}
        onSubmit={handleAddTask}
      />
    </>
  );
}
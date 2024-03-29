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
  Spin,
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
import { useEffect, useState } from "react";
import AddTaskForm from "@/components/AddTaskForm";
import CustomTable, { DataTypes } from "@/ui/CustomTable/CustomTable";
import LoginForm from "@/modules/LoginForm";
import axios from "axios";
import { fetchTodo } from "@/redux/features/todo-slice";
import { useDispatch } from "react-redux";

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
  const [isClickAddTaskButton, setClickAddTaskButton] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState("");
  const [tasks, setTasks] = useState<DataTypes[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => { //для вывода имени пользователя
    const userDataString = localStorage.getItem('loggedInUser');
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      const { username } = parsedUserData;
      setUserData(username);
    }
  }, []); 

  useEffect(() => {
    const loggedInUsers = localStorage.getItem('loggedInUser');
    if (!loggedInUsers) {
      return;
    }
    const loggedInUser = JSON.parse(loggedInUsers)

    const isLogin = localStorage.getItem('isLoggedIn');

    if (isLogin) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get<DataTypes[]>(`https://jsonplaceholder.typicode.com/todos?userId=${loggedInUser.id}`);
          setTasks(response.data);
          // console.log(tasks);
          dispatch(fetchTodo(response.data));
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch tasks");
          setLoading(false);
        }
      };
  
      fetchTasks();
    }
    
  }, [dispatch]);

  // if (loading) {
  //   return (
  //   <Spin tip="Loading" size="large">
  //     <div className="content"/>
  //   </Spin>
  //   )
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  
  
  const handleLogin = () => {;
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    localStorage.clear();
  };


  const content = <>
  <Button style={{ width: 150, height: 40, marginRight: 10 }} onClick={handleLogin}> Login</Button>
  <Button style={{ width: 150, height: 40 }} onClick={handleLogout}>Exit</Button>
  </>
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
                      {userData}
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
                    <CustomTable/>
                    <Button
                      icon={
                        <PlusOutlined
                          style={{ fontSize: "20px", marginRight: "10px" }}
                        />
                      }
                      style={{
                        width: 150,
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
      />
      <LoginForm
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      />
    </>
  );
}

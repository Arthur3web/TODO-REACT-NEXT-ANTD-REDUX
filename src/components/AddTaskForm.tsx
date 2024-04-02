import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import { DataTypes } from "@/ui/CustomTable/CustomTable";
import { useDispatch } from "react-redux";
import { addTodo } from "@/redux/features/todo-slice";

interface AddTaskFormProps {
  visible: boolean;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ visible, onCancel }) => {
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<DataTypes[]>([]);
  const dispatch = useDispatch();


  const handleAddTask = async () => {
    const userDataString = localStorage.getItem("loggedInUser");

    try {
      if (userDataString === null) {
        message.open({
          type: "info",
          content: "Пожалуйста, войдите в систему, чтобы добавить задачу.",
        });
        throw new Error(
          "Пожалуйста, войдите в систему, чтобы добавить задачу."
        );
      }
      const userData = JSON.parse(userDataString);
      if (title.length > 0) {
      const response = await axios.post<DataTypes>(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: title,
          completed: false,
          userId: userData.id,
        }
      );
      const newTask = response.data;
      // const newTaskId = newTask.id;
      setTasks((prevTasks) => [...prevTasks, newTask]);
      onCancel();
      console.log(newTask);
      // console.log(newTask.userId);
      setTitle("");
      message.open({
        type: "success",
        content: "Задача успешно добавлена",
      });

      dispatch(
        addTodo({
          id: new Date().getTime() /*newTaskId*/,
          title: title,
          timestart: new Date().toISOString(),
          completed: false,
        })
      );

    } else {
      message.open({
        type: "error",
        content: "Неполные данные",
      });
    }

      setTitle("");
      onCancel();
    } catch (error) {
      Error("Failed to add task");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", color: "#9333ea" }}>CREATE TASK</div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form name="task" onFinish={handleAddTask}>
        <Form.Item>
          <Input
            placeholder="Task title"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form>
    </Modal>
  );
};

export default AddTaskForm;

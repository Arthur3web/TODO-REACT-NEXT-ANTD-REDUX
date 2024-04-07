import { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
// import { DataTypes } from "@/ui/CustomTable/CustomTable";
import { useDispatch } from "react-redux";
import { addTasks } from "@/redux/features/todoSlice/actions";
import { TodoType } from "@/redux/features/types vs interfaces/types";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface AddTaskModalProps {
  visible: boolean;
  onCancel: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onCancel }) => {
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<TodoType[]>([]);
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    try {
      if (title.length === 0) {
        message.open({
          type: "error",
          content: "Неполные данные",
        });
        return;
      }
      // const newTask = await dispatch(addTasks({ title: title }));
      const asyncDispatch = dispatch as ThunkDispatch<RootState, void, AnyAction>;
      const newTask = await asyncDispatch(addTasks({ title: title }));
      setTasks((prevTasks: any) => [...prevTasks, newTask]);
      onCancel();
      setTitle("");
      message.open({
        type: "success",
        content: "Задача успешно добавлена",
      });
      console.log("Task added:", newTask);
    } catch (error) {
      message.error("Failed to add task");
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
        <Button type="primary" htmlType="submit" /*disabled*/>
          Add Task
        </Button>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;

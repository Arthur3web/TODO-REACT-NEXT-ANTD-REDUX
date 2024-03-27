import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { addTodo } from "@/redux/features/todo-slice";

interface AddTaskFormProps {
  visible: boolean;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  visible,
  onCancel,
}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [timeend, setTimeend] = useState<Date | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTimeendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeend(new Date(e.target.value));
  };

  const handleAddTask = () => {
    if (title && timeend) {
      dispatch(
        addTodo({
          id: new Date().toISOString(),
          title: title,
          timestart: new Date().toISOString(),
          timeend: timeend, // сохраняем как объект Date
          completed: false,
        })
      );
      setTitle("");
      setTimeend(null);
      onCancel();
    } else {
      console.error("Неполные данные");
    }
  };

  return (
    <Modal
      title={<div style={{ textAlign: "center", color: "#9333ea" }}>CREATE TASK</div>}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form name="task">
        <Form.Item>
          <Input
            placeholder="Task title"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="datetime-local"
            value={timeend ? timeend.toISOString().substring(0, 16) : ""}
            onChange={handleTimeendChange}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleAddTask}>
          Add Task
        </Button>
      </Form>
    </Modal>
  );
};

export default AddTaskForm;

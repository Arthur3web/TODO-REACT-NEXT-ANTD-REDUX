import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

export interface Task {
  id: string;
  title: string;
  timeend: string;
  completed: boolean;
  timestart: string;
}

interface AddTaskFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [title, setTitle] = useState<string>("");
  const [timeend, setTimeend] = useState<string>("");

  const handleSubmit = () => {
    onSubmit({ title, timeend } as Task);
    setTitle("");
    setTimeend("");
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
      <Form
        name="task"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item>
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item >
          <Input type="datetime-local" value={timeend} onChange={(e) => setTimeend(e.target.value)} />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Add Task
        </Button>
      </Form>
    </Modal>
  );
};
console.log("!!!!!!!")

export default AddTaskForm;

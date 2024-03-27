import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { addTodo } from "@/redux/features/todo-slice";

// export interface Task {
//   id: string;
//   title: string;
//   timeend: string;
//   completed: boolean;
//   timestart: string;
// }

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
  const [timeend, setTimeend] = useState<string>("");

  const handleAddTask = (title: string, timeend: Date) => {
    dispatch(addTodo(title));
    setTitle('');
    setTimeend('');
    onCancel();
  }

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
        // initialValues={{ remember: true }}
        // onFinish={/*handleSubmit*/}
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
        <Button type="primary" htmlType="submit" onClick={handleAddTask}>
          Add Task
        </Button>
      </Form>
    </Modal>
  );
};
console.log("!!!!!!!")

export default AddTaskForm;

import { Modal, Form, Button, message } from "antd";
import { deleteTask } from "@/redux/features/todoSlice/actions";
import axios from "axios";
import { TodoType } from "@/redux/features/interface/types";
import { useAppDispatch } from "@/redux/hooks";

interface DeleteTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  task: TodoType,
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  visible,
  onCancel,
  task,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${task.id}`
      );
      if (response.status === 200) {
        dispatch(deleteTask(task.id));
        onCancel();
      } else {
        message.error("Failed to delete task");
      }
    } catch (error) {
      message.error("Failed to delete task!");
      console.log(error)
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", color: "#9333ea" }}>DELETE TASK</div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form name="task" onFinish={handleDeleteTask}>
        <p>Are you sure want to delete this task?</p>
        <Button type="primary" htmlType="submit">
          Delete Task
        </Button>
      </Form>
    </Modal>
  );
};

export default DeleteTaskModal;

import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Select, Flex } from "antd";
import { useDispatch } from "react-redux";
import { editTask } from "@/redux/features/todoSlice/actions";
import axios from "axios";
import { AddTaskAsyncThunk, TodoType } from "@/redux/features/types vs interfaces/types";

interface EditTaskModalProps {
  visible: boolean;
  onCancel: () => void;
  task: TodoType;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  onCancel,
  task,
}) => {
  const [note, setNote] = useState<string>(task.title);
  const [isCompleted, setIsCompleted] = useState<boolean>(task.completed);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(note === "");
  }, [note]);

  useEffect(() => {
    setNote(task.title);
    setIsCompleted(task.completed);
  }, [task]);

  const handleSaveEdit = async (id: number, dispatch: Dispatch<AddTaskAsyncThunk>) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${task.id}`,
        {
          title: note,
          completed: isCompleted,
        }
      );
      if (response.status === 200) {
        dispatch(editTask({ id: task.id, title: note, completed: isCompleted }));
        setNote("");
        onCancel();
      } else {
        message.error("Failed to update task");
      }
    } catch (error) {
      message.error("Failed to update task");
    }
  };

  const handleCancel = () => {
    setNote(task.title);
    setIsCompleted(task.completed);
    onCancel();
  };

  const { TextArea } = Input;

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", color: "#9333ea" }}>EDIT TASK</div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form name="task" onFinish={handleSaveEdit}>
        <Flex style={{margin: "0 0 10px 0"}}>
          <TextArea
            placeholder="Task title"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <Select
            defaultValue={task.completed ? "Completed" : "Not Completed"}
            onChange={(value: string) => setIsCompleted(value === "Completed")}
            style={{width: 200}}
          >
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="Not Completed">Not Completed</Select.Option>
          </Select>
        </Flex>
        <Button type="primary" htmlType="submit">
          Edit Task
        </Button>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;

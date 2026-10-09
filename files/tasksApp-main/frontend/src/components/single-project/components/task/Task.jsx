import "./task.css";
import { BiTrash } from "react-icons/bi";
import { BsCheckLg, BsCheckAll } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTask,
  updateTask,
} from "../../../../redux/slices/tasks/tasks.async.thunks";

/**
 * Task component displays a single task item with controls to mark it as complete or delete it
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.task - The task object to display
 * @param {number} props.task.id - Unique identifier for the task
 * @param {string} props.task.name - The name/description of the task
 * @param {boolean} props.task.done - Whether the task is marked as complete
 * @param {number} props.task.project_id - ID of the project this task belongs to
 * @returns {JSX.Element} Rendered Task component
 */
const Task = ({ task }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /**
   * Handles task deletion by dispatching the removeTask action
   */
  const handleDeleteTask = () => {
    dispatch(removeTask({ user, task }));
  };

  /**
   * Handles task status update (toggle between complete/incomplete)
   * by dispatching the updateTask action with the updated task object
   */
  const handleUpdateTask = () => {
    dispatch(updateTask({ user, task: { ...task, done: !task.done } }));
  };

  return (
    <div className="task">
      <div className="task-name">{task.name}</div>
      <div className="buttons">
        <button onClick={handleUpdateTask}>
          {task.done ? (
            <BsCheckAll className="svg-button" />
          ) : (
            <BsCheckLg className="svg-button" />
          )}
        </button>
        <button onClick={handleDeleteTask}>
          <BiTrash className="svg-button" />
        </button>
      </div>
    </div>
  );
};

export default Task;

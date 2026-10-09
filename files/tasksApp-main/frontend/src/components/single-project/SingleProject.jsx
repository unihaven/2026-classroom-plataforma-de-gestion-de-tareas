import "./singleProject.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resetSelectedProject } from "../../redux/slices/selected-project/selectedProject.slice";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { fetchTasks, addTask } from "../../redux/slices/tasks/tasks.async.thunks";
import Task from "./components/task/Task";
import { ToastContainer } from "react-toastify";

Modal.setAppElement("#root");

/**
 * SingleProject component displays detailed view of a project, including its tasks and allows adding new tasks
 * 
 * @component
 * @returns {JSX.Element} Rendered SingleProject component
 */
const SingleProject = () => {
  const selectedProject = useSelector((state) => state.selectedProject);
  const tasks = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  /**
   * Returns to projects list by resetting selected project
   */
  const goBack = () => {
    dispatch(resetSelectedProject());
  };

  /**
   * Opens the modal for creating a new task
   */
  const openModal = () => {
    setModalIsOpen(true);
  };
  
  /**
   * Closes the modal and resets the new task name
   */
  const closeModal = () => {
    setNewTaskName("");
    setModalIsOpen(false);
  };

  /**
   * Creates a new task by dispatching the addTask action and closes the modal
   */
  const createTask = () => {
    const newTask = {
      name: newTaskName,
      projectId: selectedProject.id,
    };

    setModalIsOpen(false);

    dispatch(addTask({ user, task: newTask }));
  };

  useEffect(() => {
    dispatch(fetchTasks({ user, project: selectedProject }));
  }, []);

  useEffect(() => {
    if (!selectedProject.id) {
      navigate("/projects");
    }
  }, [selectedProject]);

  return (
    <div className="single-project">
      <div className="content">
        <div className="back">
          <button id="button" className="blue-button" onClick={goBack}>
            <BiArrowBack /> Go back
          </button>
        </div>
        <div className="project">
          <div className="headers">
            <h1 className="name">{selectedProject.name}</h1>
            <p className="priority">
              Priority:
              <span className="number">{selectedProject.priority}</span>
            </p>
          </div>
          <hr />
          <div className="markdown-body">
            <ReactMarkdown
              className="react-markdown"
              remarkPlugins={[remarkGfm]}
            >
              {selectedProject.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="tasks">
        <button className="add-task-button" onClick={openModal}>
          New task
        </button>
        <div className="tasks-list">
          {tasks.list?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="add task"
          className="add-task-modal"
          overlayClassName="add-task-modal overlay"
        >
          <label htmlFor="task-name">
            New task name
            <input
              id="task-name"
              type="text"
              placeholder="Enter the task name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </label>
          <button onClick={createTask} className="add-task-button">
            Create
          </button>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SingleProject;

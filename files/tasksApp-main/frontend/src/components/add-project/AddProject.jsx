import "./addProject.css";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { addProject } from "../../redux/slices/projects/projects.async.thunks";
import { ToastContainer } from "react-toastify";

/**
 * AddProject component provides a form for creating a new project
 * 
 * @component
 * @returns {JSX.Element} Rendered AddProject component with form controls
 */
const AddProject = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(10);
  const [description, setDescription] = useState("");

  /**
   * Navigates back to the projects list page
   */
  const goBack = () => {
    navigate("/projects");
  };

  /**
   * Creates a new project by dispatching the addProject action with form data
   * 
   * @param {Object} data - Form data from react-hook-form
   * @param {string} data.name - Project name
   * @param {number} data.priority - Project priority (0-10)
   * @param {string} data.description - Project description (supports markdown)
   */
  const createProject = (data) => {
    dispatch(addProject({ user, project: data }));
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="add-project">
      <div className="back">
        <button id="button" className="blue-button" onClick={goBack}>
          <BiArrowBack /> Go back
        </button>
      </div>
      <form className="project" onSubmit={handleSubmit(createProject)}>
        <div className="headers">
          <label htmlFor="name">
            {"Project's name"}
            <input
              {...register("name")}
              id="name"
              type="text"
              className="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </label>
          <label htmlFor="priority">
            {"Project's Priority (0 - 10)"}
            <input
              {...register("priority")}
              id="priority"
              type="number"
              className="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              placeholder="Enter priority"
              max={10}
              min={0}
            />
          </label>
        </div>
        <hr />
        <label htmlFor="description" className="description-label">
          Here you can add a description of your project, Markdown is supported.
          <TextareaAutosize
            {...register("description")}
            id="description"
            minRows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button className="submit" type="submit">
          Create
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProject;

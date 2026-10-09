import "./editProject.css";
import { resetSelectedProject } from "@/redux/slices/selected-project/selectedProject.slice";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { updateProject } from "../../redux/slices/projects/projects.async.thunks";

const EditProject = () => {
  const selectedProject = useSelector((state) => state.selectedProject);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(selectedProject.name);
  const [priority, setPriority] = useState(selectedProject.priority);
  const [description, setDescription] = useState(selectedProject.description);

  const goBack = () => {
    dispatch(resetSelectedProject());
  };

  const updateProjectFunction = (data) => {
    const newProject = {
      id: selectedProject.id,
      ...data,
    };

    dispatch(updateProject({ user, project: newProject }));
  };

  useEffect(() => {
    if (!selectedProject.id) {
      navigate("/projects");
    }
  }, [selectedProject]);

  const { register, handleSubmit } = useForm();

  return (
    <div className="edit-project">
      <div className="back">
        <button id="button" className="blue-button" onClick={goBack}>
          <BiArrowBack /> Go back
        </button>
      </div>
      <form className="project" onSubmit={handleSubmit(updateProjectFunction)}>
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
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button className="submit" type="submit">
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProject;

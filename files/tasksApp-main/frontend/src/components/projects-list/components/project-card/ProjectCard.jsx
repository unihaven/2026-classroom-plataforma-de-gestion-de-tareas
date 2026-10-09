import "./projectCard.css";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject } from "../../../../redux/slices/selected-project/selectedProject.slice";
import { useEffect, useState } from "react";
import { removeProject } from "../../../../redux/slices/projects/projects.async.thunks";

/**
 * ProjectCard component displays a card for an individual project with options to view, edit, or delete
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.project - The project object to display
 * @param {number} props.project.id - Unique identifier for the project
 * @param {string} props.project.name - The name of the project
 * @param {string} props.project.description - The project description (may include markdown)
 * @param {number} props.project.priority - The priority level of the project (0-10)
 * @returns {JSX.Element} Rendered ProjectCard component
 */
const ProjectCard = ({ project }) => {
  const selectedProject = useSelector((state) => state.selectedProject);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [route, setRoute] = useState("");

  /**
   * Sets the current project as selected and prepares to navigate to project details
   */
  const handleSeeProject = () => {
    dispatch(setSelectedProject(project));
    setRoute("/project");
  };

  /**
   * Effect hook to handle navigation after a project is selected
   */
  useEffect(() => {
    if (selectedProject.id && route) {
      navigate(route);
    }
  }, [route, selectedProject]);

  /**
   * Handles project deletion by dispatching the removeProject action
   */
  const handleDeleteProject = async () => {
    dispatch(removeProject({ user, project }));
  };

  /**
   * Sets the current project as selected and prepares to navigate to edit project page
   */
  const handleUpdateProject = () => {
    dispatch(setSelectedProject(project));
    setRoute("/editProject");
  };

  return (
    <div className="project-card">
      <div className="top">
        <div className="priority">
          Priority: <span className="priority-number">{project.priority}</span>
        </div>
        <div className="buttons">
          <Link className="link" onClick={handleUpdateProject}>
            <BiEdit className="svg-button" />
          </Link>
          <Link className="link">
            <BiTrash className="svg-button" onClick={handleDeleteProject} />
          </Link>
        </div>
      </div>
      <div className="content" onClick={handleSeeProject}>
        <p className="name">{project.name}</p>
      </div>
    </div>
  );
};

export default ProjectCard;

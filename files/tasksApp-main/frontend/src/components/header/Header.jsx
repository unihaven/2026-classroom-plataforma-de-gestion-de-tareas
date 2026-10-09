import { useDispatch } from "react-redux";
import { IoExitOutline } from "react-icons/io5";
import { resetUser } from "../../redux/slices/user/user.slice";
import { useNavigate } from "react-router-dom";
import "./header.css";

/**
 * Header component displays the application header with app name and logout button
 * 
 * @component
 * @returns {JSX.Element} Rendered Header component
 */
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles user logout by removing user from localStorage,
   * resetting user state in Redux, and navigating to login page
   */
  const logOut = () => {
    localStorage.removeItem("user");
    dispatch(resetUser());
    navigate("/logIn");
  };

  return (
    <div className="header">
      <span className="username">Tasks app</span>
      <button className="blue-button--logout" onClick={logOut}>
        <IoExitOutline />
      </button>
    </div>
  );
};

export default Header;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/user/user.slice";
import DotsLoader from "./dots-loader/DotsLoader";

/**
 * ProtectedRoute component provides authentication protection for routes
 * 
 * Checks if the user is authenticated and either:
 * - Allows access to the protected route
 * - Tries to restore user from localStorage
 * - Redirects to login if no valid user is found
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @returns {JSX.Element} Either the protected content, a loading indicator, or redirects to login
 */
function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  /**
   * Effect that checks authentication status on component mount and when user state changes
   */
  useEffect(() => {
    if (!user.token) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser) dispatch(setUser(storedUser));
      else navigate("/logIn");
    }
  }, [user]);

  if (!user.token) return <DotsLoader />;

  return <>{children || <Outlet />}</>;
}

export default ProtectedRoute;

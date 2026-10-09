import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import "./home.css";

/**
 * Home component serves as the main layout for authenticated pages
 * 
 * Includes the header and renders child routes via Outlet
 * 
 * @component
 * @returns {JSX.Element} Rendered Home component with Header and child routes
 */
const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Home;

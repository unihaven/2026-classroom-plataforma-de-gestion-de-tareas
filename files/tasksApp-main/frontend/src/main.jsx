import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectsList from "./components/projects-list/ProjectsList";
import SingleProject from "./components/single-project/SingleProject";
import ErrorPage from "./components/error-page/ErrorPage";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import EditProject from "./components/edit-project/EditProject";
import AddProject from "./components/add-project/AddProject";

const router = createBrowserRouter([
  {
    path: "/logIn",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "projects",
            element: <ProjectsList />,
          },
          {
            path: "project",
            element: <SingleProject />,
          },
          {
            path: "editProject",
            element: <EditProject />,
          },
          {
            path: "addProject",
            element: <AddProject />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

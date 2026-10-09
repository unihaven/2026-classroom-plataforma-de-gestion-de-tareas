const endPoint = `${import.meta.env.VITE_API_URL}/api/v1/task/`;
import axios from "axios";
import config from "./request.conf";
import handleApiError from "@/helpers/handleApiError";
import { toast } from "react-toastify";

export const createTask = async (user, task) => {
  try {
    const { data } = await axios.post(endPoint, task, config(user));

    toast.success(data.message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteTask = async (user, task) => {
  try {
    const { data } = await axios.delete(endPoint + task.id, config(user));

    toast.success(data.message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const modifyTask = async (user, task) => {
  try {
    const { data } = await axios.put(endPoint + task.id, task, config(user));

    toast.success(data.message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTasks = async (user, project) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/project/${project.id}/tasks`,
      config(user),
    );

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

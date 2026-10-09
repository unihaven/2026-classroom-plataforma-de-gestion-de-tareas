const endPoint = `${import.meta.env.VITE_API_URL}/api/v1/project/`;
import axios from "axios";
import config from "./request.conf";
import handleApiError from "@/helpers/handleApiError";
import { toast } from "react-toastify";

export const fetchProject = async (user, projectId) => {
  try {
    const { data } = await axios.get(endPoint + projectId, config(user));
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createProject = async (user, project) => {
  try {
    const { data } = await axios.post(
      endPoint + "create",
      project,
      config(user),
    );

    toast.success(data.message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteProject = async (user, projectId) => {
  try {
    const { data } = await axios.delete(endPoint + projectId, config(user));

    toast.success(data.message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const modifyProject = async (user, project) => {
  try {
    const { data } = await axios.put(
      endPoint + project.id,
      project,
      config(user),
    );

    toast.success(data.message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

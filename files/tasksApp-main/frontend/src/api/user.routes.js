const endPoint = `${import.meta.env.VITE_API_URL}/api/v1/user/`;
import axios from "axios";
import config from "./request.conf";
import handleApiError from "../helpers/handleApiError";

export const logIn = async (credentials) => {
  try {
    const { data } = await axios.post(endPoint + "logIn", credentials);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (user) => {
  try {
    const { data } = await axios.post(endPoint + "register", user);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchUserProjects = async (user) => {
  try {
    const { data } = await axios.get(endPoint + `projects`, config(user));
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

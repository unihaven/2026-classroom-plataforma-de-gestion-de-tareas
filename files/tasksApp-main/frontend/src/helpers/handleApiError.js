import { toast } from "react-toastify";
import history from "./history";

const handleApiError = (error) => {
  const response = error.response;

  if (response.status == 404) {
    return error.response.data;
  } else {
    toast.error(response.data.message, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }

  if (error.response.status == 401) {
    localStorage.removeItem("user");
    history.go("/logIn");
  }
};

export default handleApiError;

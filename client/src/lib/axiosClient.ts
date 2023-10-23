import axios from "axios";

const axiosClient = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeoutErrorMessage: "The request time out at this point.",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt_token"),
    },
  });

export default axiosClient;

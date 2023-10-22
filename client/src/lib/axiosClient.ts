import axios from "axios";

const axiosClient = () =>
  axios.create({
    baseURL: "http://localhost:3000/",
    timeoutErrorMessage: "The request time out at this point.",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt_token"),
    },
  });

export default axiosClient;

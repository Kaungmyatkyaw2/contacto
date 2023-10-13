import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://contacto-7w46.onrender.com",
  timeoutErrorMessage: "The request time out at this point.",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt_token"),
  },
});

export default axiosClient;

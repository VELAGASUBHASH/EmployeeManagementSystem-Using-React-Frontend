import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://employeemanagementsystembackend-r99m.onrender.com/api",
});

export default axiosInstance;
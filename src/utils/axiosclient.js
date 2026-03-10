import axios from "axios";

const axiosclient = axios.create({
  baseURL: "https://portfolio-generator-backend-3tt6.onrender.com",
  timeout: 10000
});

export default axiosclient;
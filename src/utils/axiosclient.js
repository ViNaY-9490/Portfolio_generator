import axios from "axios";
const axiosclient = axios.create({
    baseURL:"http://localhost:3000"
})
export default axiosclient;
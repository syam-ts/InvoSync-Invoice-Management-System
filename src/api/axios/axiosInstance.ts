import axios from "axios";
import { config } from "../../utils/config";

const backend_url: string = config.backend_url;

const axiosIntanse = axios.create({
    baseURL: backend_url,
    withCredentials: true,
});

export default axiosIntanse;

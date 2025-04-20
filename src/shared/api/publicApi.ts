import axios from "axios";
import { API_URL } from "../config/backend";

export const $publicApi = axios.create({
    baseURL: API_URL
})
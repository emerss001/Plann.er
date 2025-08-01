import axios from "axios";

export const api = axios.create({
    baseURL: "https://plann-er-backend-7d7434181eac.herokuapp.com/",
});

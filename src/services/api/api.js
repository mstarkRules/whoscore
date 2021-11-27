import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sofascore.com/api/v1/sport",
});

export default api;

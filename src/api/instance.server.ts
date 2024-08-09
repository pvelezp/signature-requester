import axios from "axios";

const axiosServerInstance = axios.create({
  baseURL: "https://api.trello.com/1/",
  headers: { "Content-Type": "application/json" },
});

axiosServerInstance.interceptors.request.use(
  (config) => {
    if (config.method === "get") {
      config.params = {
        ...config.params,
        apikey: process.env.API_KEY,
        token: process.env.TOKEN,
      };
    } else {
      config.headers = {
        ...config.headers,
        "X-API-Key": process.env.API_KEY,
        "X-Auth-Token": process.env.TOKEN,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosServerInstance;

import axios from "axios";

const axiosClientInstance = axios.create({
  baseURL: "https://api.trello.com/1/",
  headers: { "Content-Type": "application/json" },
});

axiosClientInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
      "X-Auth-Token": process.env.NEXT_PUBLIC_TOKEN,
    };

    if (config.method === "get") {
      config.params = {
        ...config.params,
        apikey: process.env.NEXT_PUBLIC_API_KEY,
        token: process.env.NEXT_PUBLIC_TOKEN,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClientInstance;

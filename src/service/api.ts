import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/api/v1/",
    timeout:10000,
    headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
    }
})

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        if (error?.response?.status === 403) {
            // Handle forbidden error
          }
          if (error?.response?.status === 401) {
            // Handle unauthorized error (e.g., log out the user)
          }
          throw error; // Propagate the error
    }
);

export default axiosInstance;
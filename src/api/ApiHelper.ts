import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/api/v1",
    timeout:10000,
    headers:{
        'Content-Type':'application/json',
    },
    withCredentials:true
});

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        if (error?.response?.status === 401) {
            console.log("indavild credentials")
        }
        if (error?.response?.status === 403) {
            // window.location.href = "/unauthorized";
            console.log("unauthorized");
        }

        throw error;
    }
);

export { axiosInstance as AxiosInstance };
import axios from 'axios';


const apiBaseUrl =  'http://localhost:8000/api';





    const axiosInstance = axios.create({
        baseURL: apiBaseUrl,
    });


    const setAuthToken = (token) => {
        axiosInstance.defaults.headers.common['api-key'] = token;
    };

    export { axiosInstance, setAuthToken };


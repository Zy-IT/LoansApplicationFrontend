import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_TEST_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
})

console.log("Api:", import.meta.env.VITE_TEST_URL);

export default Api;
import  { axios } from "axios"
const instance = axios.create({
    baseURL: "..." //the API (Cloud Function) URL
});
export default instance;
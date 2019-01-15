import axios from 'axios'

const service = axios.create({
    baseURL: "http://localhost:8888",
    withCredentials:true,
    timeout:15000
})
export default service;
import axios from "axios";

const api =axios.create({
    baseURL:  "https://extra-brooke-yeremiadio-46b2183e.koyeb.app",
})

api.interceptors.response.use((config) => {
    const token = localStorage.getItem("token")
    if(token) {
        config.headers.setAuthorization = `Bearer ${token}`
    }
    
    return config
})


export default api;
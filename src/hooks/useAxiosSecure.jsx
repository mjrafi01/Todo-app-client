import axios from "axios"




export const axiosSecure= axios.create({
    baseURL:'https://todo-app-server-lake-five.vercel.app'
})
export const useAxiosSecure = () => {
    return axiosSecure
}

import axios from "./axiosInstance"

const verifyOTP = async ({ phone, otp }) => await axios.post("/verify-otp", { phone, otp })


const getOTP = async ({ }) => await axios.post('/get-otp')

const createUser = async ({ phone, password }) => {
    console.info({ phone, password })
    return await axios.post('/user-create', { phone, password })

}

export { verifyOTP, getOTP, createUser }
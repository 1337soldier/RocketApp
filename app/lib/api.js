import axios from "./axiosInstance"

const verifyOTP = async ({ phone, otp }) => await axios.post("/verifyOTP", { phone, otp })


const getOTP = async () => await axios.post('/getOTP')

export { verifyOTP, getOTP }
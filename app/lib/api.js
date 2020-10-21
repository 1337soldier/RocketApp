import { server, rocketchat } from "./axiosInstance"
const axios = require('axios').default

const verifyOTP = async ({ phone, otp }) => await server.post("/verify-otp", { phone, otp }).then(e => e?.data?.verify)


const getOTP = async ({ }) => await server.post('/get-otp')

const adminLogin = async () => {
    try {
        const result = await rocketchat.post(`/api/v1/login`, { user: "huyhomie66@gmail.com", password: "Huykevil58" })
        return result?.data?.data
    } catch (error) {
        console.info(error)
    }
}

const create = async ({ name, email, password, username, userId, authToken }) => {
    try {

        const headers = {
            'X-Auth-Token': authToken,
            "X-User-Id": userId,
            "Content-type": "application/json"
        }
        console.info(headers)
        console.info({
            name,
            email,
            password,
            username
        })

        const result = await rocketchat.post(`/api/v1/users.create`, {
            name,
            email,
            password,
            username
        }, {
            headers: headers
        })
        return result?.data?.user
    } catch (error) {
        console.info(error)
    }
}

const createUser = async ({ phone, password, username }) => {
    phone = phone.replace('+84', '0');
    const admin = await adminLogin()
    const { userId, authToken } = admin
    const param = {
        name: username,
        email: `${phone}@gmail.com`,
        password,
        username
    }
    try {
        return await create({ ...param, userId, authToken })
    } catch (error) {
        console.info(error)
    }

}


export { verifyOTP, getOTP, createUser }
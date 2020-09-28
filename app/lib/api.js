import { server, rocketchat } from "./axiosInstance"


const verifyOTP = async ({ phone, otp }) => await server.post("/verify-otp", { phone, otp }).then(e => e?.data?.verify)


const getOTP = async ({ }) => await server.post('/get-otp')

const adminLogin = async () => {
    try {
        const result = await rocketchat.post(`/api/v1/login`, { user: "6969vietnam@gmail.com", password: "abc12345" })
        return result.data.data
    } catch (error) {
        console.log(error)
    }
}

const create = async ({ name, email, password, username, userId, authToken }) => {
    try {
        const headers = {
            'X-Auth-Token': authToken,
            "X-User-Id": userId
        }
        const result = await rocketchat.post('/api/v1/users.create', {
            name,
            email,
            password,
            username
        }, {
            headers: headers,
            timeout: 20000,
        })

        console.log(result.data)
        return result?.data?.user
    } catch (error) {
        console.log(error)
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
        const result = await create({ ...param, userId, authToken })
        return result?.data?.created
    } catch (error) {
        console.info(error)
    }

}


export { verifyOTP, getOTP, createUser }
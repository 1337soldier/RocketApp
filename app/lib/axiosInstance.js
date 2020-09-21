const axios = require('axios').default

const axiosInstance = axios.create({
  baseURL: "http://localhost:4444"
})

module.exports = axiosInstance
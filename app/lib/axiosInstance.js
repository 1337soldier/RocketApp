const axios = require("axios").default;
import config from "../../config"

const rocketchat = axios.create({
  baseURL: config.ROCKET_CHAT_SERVER
});

const server = axios.create({
  baseURL: config.SERVER_URL
})

export { rocketchat, server };

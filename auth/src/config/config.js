import { config } from "dotenv";
config();

const _config = {

    MONGO_URI: process.env.MONGO_URI,

    JWT_SECRET: process.env.JWT_SECRET

}

export default _config;
import { registerAs } from "@nestjs/config";



export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET_KEY || 'temp_secret_key'
}))
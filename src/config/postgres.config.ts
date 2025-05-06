import { registerAs } from "@nestjs/config";




export default registerAs('postgres', () => ({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5434,
    database: process.env.DB || 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
}))
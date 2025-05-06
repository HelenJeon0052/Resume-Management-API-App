import { registerAs } from "@nestjs/config";





export default registerAs('swagger', async () => {
    return {
        user: 'admin',
        password: 'admin~'
    }
})
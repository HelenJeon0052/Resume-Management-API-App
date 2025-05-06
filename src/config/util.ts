import { ConfigService } from "@nestjs/config";



export function getRequiredEnv(configService: ConfigService, key: string):string {
    const value = config.get<string>(key);
    if(!value) throw new Error (`error:${ key }`);

    return value;
}
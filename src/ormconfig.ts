import { DataSource } from "typeorm";



export const AppDataSource = new DataSource({
    //npm run typeorm migration: generate path + run
    type: 'postgres',
    host: 'localhost',
    port: 8000,
    database: 'postgres',
    password: '',
    entities: [__dirname + '/**/*.entity{.ts, .js}'],
    synchronize: false,
    migrations: [__dirname + '/**/migrations/*{.ts, .js}'],
    migrationsTableName: 'migrations',
})

import { DataSource } from "typeorm";

// data source
export const AppDataSource = new DataSource( {
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt( process.env.MYSQL_PORT ) || 3306,
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASS || "",
    database: process.env.MYSQL_DB || "assignment",
    synchronize: false,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*{.js,.ts}"],
    subscribers: [],
} );




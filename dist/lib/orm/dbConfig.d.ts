import { Connection, ConnectionOptions } from "typeorm";
export declare const config: ConnectionOptions;
export declare const connect: () => Promise<Connection>;

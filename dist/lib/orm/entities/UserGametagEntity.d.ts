import { BaseEntity } from "typeorm";
import { UserEntity } from "./UserEntity";
export declare class UserGametagEntity<T> extends BaseEntity {
    id: number;
    game: string;
    data?: T;
    user?: UserEntity;
}

import { BaseEntity } from "typeorm";
import { UserGametagEntity } from "./UserGametagEntity";
export declare class UserEntity extends BaseEntity {
    id: string;
    balance: number;
    vault: number;
    gametagEntity?: UserGametagEntity<unknown>[];
    private _balance;
    private _vault;
    constructor();
    private get client();
    protected entityLoad(): void;
    protected entityUpdate(): void;
    protected entityRemove(): void;
}

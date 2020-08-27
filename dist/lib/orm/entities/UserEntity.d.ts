import { BaseEntity } from "typeorm";
export declare class UserEntity extends BaseEntity {
    id: string;
    balance: number;
    vault: number;
    private _balance;
    private _vault;
    constructor();
    private get client();
    protected entityLoad(): void;
    protected entityUpdate(): void;
    protected entityRemove(): void;
}

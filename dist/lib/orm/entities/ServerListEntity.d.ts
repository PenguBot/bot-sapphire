import { BaseEntity } from "typeorm";
export declare class ServerListEntity extends BaseEntity {
    id: string;
    name: string;
    description?: string | null;
    iconUrl?: string | null;
    invite: string;
    discoverable: boolean;
    category?: string | null;
    bumps: number;
    lastBump?: Date | null;
}

import { PenguClient } from "@lib/PenguClient";
import { ValueTransformer } from "typeorm";
export declare const kBigIntTransformer: ValueTransformer;
export declare function floatPromise(ctx: {
    client: PenguClient;
}, promise: Promise<unknown>): void;

import { Event, Events } from "@sapphire/framework";
import type { PieceContext } from "@sapphire/pieces";
export declare class PenguReadyEvent extends Event<Events.Ready> {
    constructor(context: PieceContext);
    run(): Promise<void>;
}

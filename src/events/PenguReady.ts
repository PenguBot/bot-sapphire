import { Event, Events } from "@sapphire/framework";
import type { PieceContext } from "@sapphire/pieces";

export class PenguReadyEvent extends Event<Events.Ready> {
	public constructor(context: PieceContext) {
		super(context, { event: Events.Ready, once: true });
	}

	public async run() {
        await this.client.languages.init();
	}
}

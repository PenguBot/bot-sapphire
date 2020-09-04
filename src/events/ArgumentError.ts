import type { PieceContext } from "@sapphire/pieces";
import { Event } from "@sapphire/framework";
import { Events } from "@utils/Enums";

export class PenguEvent extends Event<Events.ArgumentErrorMessage> {
	public constructor(context: PieceContext) {
		super(context, { event: Events.ArgumentErrorMessage });
    }

    public run() {
        // todo
    }

}

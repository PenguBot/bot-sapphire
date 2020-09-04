import type { PieceContext } from "@sapphire/pieces";
import { Event } from "@sapphire/framework";
import { Events } from "@utils/Enums";

export class PenguEvent extends Event<Events.UserError> {
	public constructor(context: PieceContext) {
		super(context, { event: Events.UserError });
    }

    public run() {
        // todo
    }

}

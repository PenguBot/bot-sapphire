import { ApplyOptions } from "@lib/utils/decorators";
import { Event, EventOptions } from "klasa";

@ApplyOptions<EventOptions>({
    event: "ready"
})
export default class extends Event {

    async run() {
        await this.client.i18n.init();
    }

}

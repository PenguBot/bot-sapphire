import { BaseCluster } from "kurasuta";
import { TOKEN } from "@root/config";

export default class extends BaseCluster {

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    launch() {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.client.login(TOKEN);
    }

}

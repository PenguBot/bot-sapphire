import { BaseCluster } from "kurasuta";
import { TOKEN } from "@root/config";

export default class extends BaseCluster {

    launch() {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.client.login(TOKEN);
    }

}

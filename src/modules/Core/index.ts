import { Module, ModuleData, AxonClient } from "axoncore";

import * as commands from "./commands/index";
import * as listeners from "./listeners/index";

class Core extends Module {
	public constructor(client: AxonClient, data: ModuleData = {}) {
		super(client, data);

		this.label = "Core";

		this.enabled = true;
		this.serverBypass = true;

		this.info = {
			name: "Core",
			description: "The main module with most basic commands."
		};
	}

	public init() {
		return { commands, listeners };
	}
}

export default Core;

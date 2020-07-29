/* eslint-disable @typescript-eslint/no-unused-vars */
import nodeUtil from "util";
import { TextChannel, DMChannel, NewsChannel } from "discord.js";
import {
    Command,
    CommandPermissions,
    CommandOptions,
    CommandResponse,
    AxonEnums,
    DiscordEnums,
    Collection,
    Embed,
    Prompt,
    MessageCollector,
    Stack,
    Queue,
    FunctionQueue,
    AutoQueue,
    AsyncQueue,
    Module,
    CommandEnvironment
} from "axoncore";

class Eval extends Command {
    constructor(module: Module) {
        super(module);

        this.label = "eval";
        this.aliases = ["eval", "e"];

        this.info = {
            owners: ["KhaaZ"],
            name: "eval",
            description: "Eval js code.",
            usage: "eval [js code]",
            examples: ["eval 1 + 1"]
        };

        this.options = new CommandOptions(this, {
            argsMin: 1,
            cooldown: 0
        });

        this.permissions = new CommandPermissions(this, {
            staff: {
                needed: this.axon.staff.owners,
                bypass: this.axon.staff.owners
            }
        });
    }

    async execute(env: CommandEnvironment) {
        const { msg, args, guildConfig } = env;
        let evalString;
        try {
            // eslint-disable-next-line no-eval
            evalString = await eval(args.join(" "));

            if (typeof evalString === "object") {
                evalString = nodeUtil.inspect(evalString, { depth: 0, showHidden: true });
            } else {
                evalString = String(evalString);
            }
        } catch (err) {
            this.logger.debug(err.stack);
            return this.sendError(msg.channel, err.message ? err.message : `Error: ${err}`);
        }

        evalString = this.cleanUpToken(evalString);

        if (evalString.length === 0) {
            return this.sendError(msg.channel, "Nothing to evaluate.");
        }

        const splitEvaled = evalString.match(/[\s\S]{1,1900}[\n\r]/g) || [evalString];

        if (splitEvaled.length > 3) {
            this.sendMessage(msg.channel, `Cut the response! [3/${splitEvaled.length} | ${evalString.length} chars]`);
        }

        for (let i = 0; i < 3; i++) {
            if (!splitEvaled[i]) {
                break;
            }
            this.sendCode(msg.channel, splitEvaled[i]);
        }
        return new CommandResponse({
            success: true
        });
    }

    cleanUpToken(evalString: string) {
        return evalString.replace(new RegExp(this.bot.token!, "g"), "Khaaz Baguette");
    }

    sendCode(channel: TextChannel | DMChannel | NewsChannel, content: string, lang = "js") {
        return this.sendMessage(channel, `\`\`\`${lang}\n${content}\`\`\``);
    }
}

export default Eval;

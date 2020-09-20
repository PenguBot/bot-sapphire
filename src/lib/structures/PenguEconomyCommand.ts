import { Command } from "@sapphire/framework";
import { TaxationManager } from "@utils/Economy/TaxationManager";
import { container } from "tsyringe";

export abstract class PenguEconomyCommand extends Command {
    protected tax: TaxationManager = container.resolve(TaxationManager);
}

import { AsyncQueue } from "@klasa/async-queue";
import { DbSet } from "@lib/structures/DbSet";
import { singleton } from "tsyringe";

@singleton()
export class TaxationManager {

    public queue: AsyncQueue = new AsyncQueue();

    public async tax(amount: bigint) {
        await this.queue.wait();

        try {
            const connection = await DbSet.connect();
            const settings = await connection.clients.ensureEconomy();

            settings.economy.quantumsMoneyPile += amount;

            await settings.save();
        } finally {
            this.queue.shift();
        }
    }

}

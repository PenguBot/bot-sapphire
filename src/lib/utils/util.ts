/* eslint-disable valid-jsdoc */
import { PenguClient } from "@lib/PenguClient";
import { Events } from "@sapphire/framework";
import { isThenable } from "@sapphire/utilities";
import { ValueTransformer } from "typeorm";

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
export const kBigIntTransformer: ValueTransformer = { from: Number, to: String };

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
export function floatPromise(ctx: { client: PenguClient }, promise: Promise<unknown>) {
	if (isThenable(promise)) promise.catch(error => ctx.client.emit(Events.Error, error));
}

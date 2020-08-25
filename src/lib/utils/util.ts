import { ValueTransformer } from "typeorm";

/*
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
export const kBigIntTransformer: ValueTransformer = { from: Number, to: String };

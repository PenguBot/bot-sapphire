/* eslint-disable valid-jsdoc */
import { PenguClient } from "@lib/PenguClient";
import { Events } from "@sapphire/framework";
import { isThenable } from "@sapphire/utilities";
import { ValueTransformer, Timestamp } from "typeorm";
import nodeFetch, { RequestInit, Response } from "node-fetch";
import { URL } from "url";

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

export const enum FetchResultTypes {
	JSON,
	Buffer,
	Text,
	Result
}

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
export async function fetch<R>(url: URL | string, type?: FetchResultTypes.JSON): Promise<R>;
export async function fetch<R>(url: URL | string, options: RequestInit, type?: FetchResultTypes.JSON): Promise<R>;
export async function fetch(url: URL | string, type: FetchResultTypes.Buffer): Promise<Buffer>;
export async function fetch(url: URL | string, options: RequestInit, type: FetchResultTypes.Buffer): Promise<Buffer>;
export async function fetch(url: URL | string, type: FetchResultTypes.Text): Promise<string>;
export async function fetch(url: URL | string, options: RequestInit, type: FetchResultTypes.Text): Promise<string>;
export async function fetch(url: URL | string, type: FetchResultTypes.Result): Promise<Response>;
export async function fetch(url: URL | string, options: RequestInit, type: FetchResultTypes.Result): Promise<Response>;
export async function fetch<R>(url: URL | string, options: RequestInit, type: FetchResultTypes): Promise<Response | Buffer | string | R>;
export async function fetch(url: URL | string, options?: RequestInit | FetchResultTypes, type?: FetchResultTypes) {
	if (typeof options === "undefined") {
		options = {};
		type = FetchResultTypes.JSON;
	} else if (typeof options === "number") {
		type = options;
		options = {};
	} else if (typeof type === "undefined") {
		type = FetchResultTypes.JSON;
	}

	const result: Response = await nodeFetch(url, options);
	if (!result.ok) {
		console.error(new Error(`${url}\n${result.statusText}\n${await result.text()}`));
		return null;
	}

	switch (type) {
		case FetchResultTypes.Result:
			return result;
		case FetchResultTypes.Buffer:
			return result.buffer();
		case FetchResultTypes.JSON:
			return result.json();
		case FetchResultTypes.Text:
			return result.text();
		default:
			throw new Error(`Unknown type ${type}`);
	}
}

export async function fetchSubreddit(subreddit: string, type?: "top"|"hot"|"controversial"|"new"|"rising"): Promise<RedditResult> {
	const res: RedditResult = await fetch(`https://www.reddit.com/r/${subreddit}${type?.length ? `/${type}` : ""}/.json?limit=100`);
    return res;
}

export async function randomSubredditItem(subreddit: string, type?: "top"|"hot"|"controversial"|"new"|"rising"): Promise<RedditResultItem> {
	const res: RedditResult = await fetchSubreddit(subreddit, type);
	const random: RedditResultItem = res.data.children[Math.floor(Math.random() * res.data.children.length)];
	return random;
}

// Note: This is not all the data that reddit returns.
interface RedditResult {
	kind: string
	data: {
		modhash: string;
		dist: number;
		children: RedditResultItem[]
	}
}

interface RedditResultItem {
	kind: "t1" | "t2" | "t3" | "t4" | "t5" | "t6";
	data: {
		subreddit: string;
		selftext: string;
		author_fullname: string;
		title: string;
		hidden: boolean;
		name: string;
		quarantine: boolean;
		upvote_ratio: number;
		subreddit_type: "public" | "private";
		ups: number;
		is_original_content: boolean;
		is_reddit_media_domain: boolean;
		created: Timestamp;
		over_18: boolean;
		media_only: boolean;
		author: string;
		permalink: string;
		url: string;
		created_utc: Timestamp;
		thumbnail?: string;
		url_overridden_by_dest?: string;
	}
}

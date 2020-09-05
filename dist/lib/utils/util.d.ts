/// <reference types="node" />
import { PenguClient } from "@lib/PenguClient";
import { ValueTransformer, Timestamp } from "typeorm";
import { RequestInit, Response } from "node-fetch";
import { URL } from "url";
export declare const kBigIntTransformer: ValueTransformer;
export declare function floatPromise(ctx: {
    client: PenguClient;
}, promise: Promise<unknown>): void;
export declare const enum FetchResultTypes {
    JSON = 0,
    Buffer = 1,
    Text = 2,
    Result = 3
}
export declare function fetch<R>(url: URL | string, type?: FetchResultTypes.JSON): Promise<R>;
export declare function fetch<R>(url: URL | string, options: RequestInit, type?: FetchResultTypes.JSON): Promise<R>;
export declare function fetch(url: URL | string, type: FetchResultTypes.Buffer): Promise<Buffer>;
export declare function fetch(url: URL | string, options: RequestInit, type: FetchResultTypes.Buffer): Promise<Buffer>;
export declare function fetch(url: URL | string, type: FetchResultTypes.Text): Promise<string>;
export declare function fetch(url: URL | string, options: RequestInit, type: FetchResultTypes.Text): Promise<string>;
export declare function fetch(url: URL | string, type: FetchResultTypes.Result): Promise<Response>;
export declare function fetch(url: URL | string, options: RequestInit, type: FetchResultTypes.Result): Promise<Response>;
export declare function fetch<R>(url: URL | string, options: RequestInit, type: FetchResultTypes): Promise<Response | Buffer | string | R>;
export declare function fetchSubreddit(subreddit: string, type?: "top" | "hot" | "controversial" | "new" | "rising"): Promise<RedditResult>;
export declare function randomSubredditItem(subreddit: string, type?: "top" | "hot" | "controversial" | "new" | "rising"): Promise<RedditResultItem>;
interface RedditResult {
    kind: string;
    data: {
        modhash: string;
        dist: number;
        children: RedditResultItem[];
    };
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
    };
}
export {};

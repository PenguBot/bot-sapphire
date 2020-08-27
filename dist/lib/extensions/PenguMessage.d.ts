declare module "discord.js" {
    interface Message {
        send(content: StringResolvable, options?: MessageOptions): Promise<Message>;
        sendLocale(key: string, args?: Record<string, unknown>, options?: MessageOptions): Promise<Message>;
        translate(key: string, args?: Record<string, unknown>): Promise<string>;
    }
}
export {};

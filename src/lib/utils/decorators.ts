import { PieceOptions, Piece, Store } from "klasa";
import { Constructor } from "discord.js";

export function createClassDecorator<TFunction extends(...args: any[]) => void>(fn: TFunction): ClassDecorator {
    return fn;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApplyOptions<T extends PieceOptions>(options: T): ClassDecorator {
    return createClassDecorator(
        (target: Constructor<Piece>) =>
            class extends target {
                public constructor(store: Store<string, Piece, typeof Piece>, file: string[], directory: string) {
                    super(store, file, directory, options);
                }
            }
    );
}

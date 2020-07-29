import { Utils, AxonClient } from 'axoncore';

class MyUtils extends Utils {
    invite: RegExp;
    
    constructor(client: AxonClient) {
        super(client);
        this.invite = /^(discord.gg\/|discordapp.com\/invite\/)([a-z0-9]+)$/gi;
    }

    /**
     * Convert a hex code into a rgb code
     *
     * @param hex -  The base10 number to convert OR the base10 number as a String
     * @returns rgb color code `[xxx, xxx, xxx]`
     */
    hexTOrgb(hex: number | string): [number, number, number] {
        const num = parseInt(String(hex).replace('#', ''), 16);
        return [
            num >> 16,
            (num >> 8) & 255,
            num & 255,
        ];
    }

    /**
     * Convert a rgb code into a hex code
     *
     * @param red - RGB value for Red
     * @param green - RGB value for Green
     * @param blue - RGB value for Blue
     * @returns Hex color code (6 char) (without #)
     */
    rgbTOhex(red: number, green: number, blue: number): string {
        return ( (blue | (green << 8) | (red << 16) ) | (1 << 24) ).toString(16).slice(1);
    }
}

export default MyUtils;

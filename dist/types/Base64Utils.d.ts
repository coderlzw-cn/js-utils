export default class Base64Utils {
    private static isNodeEnv;
    static encode(val: string): string;
    static decode(val: string): string;
    static isBase64(v: string, opts?: IsBase64Options): boolean;
    static removeBase64Padding(base64Str: string): string;
    static addBase64Padding(base64Str: string): string;
    static urlSafeToBase64(urlSafeStr: string): string;
    static base64ToUrlSafe(base64Str: string): string;
}
interface IsBase64Options {
    allowEmpty?: boolean;
    mimeRequired?: boolean;
    allowMime?: boolean;
    paddingRequired?: boolean;
}
export {};

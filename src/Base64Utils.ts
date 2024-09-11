/**
 * @example
 * const value = "Hello，世界"
 * Base64Utils.encode(value); // "SGVsbG/vvIzkuJbnlYw="
 * Base64Utils.decode("SGVsbG/vvIzkuJbnlYw="); // "Hello，世界"
 *
 * var string = 'iVBORw0KGgoAAAANSUhEUgAABQAAAALQAQMAAAD1s08VAAAAA1BMVEX/AAAZ4gk3AAAAh0lEQVR42u3BMQEAAADCoPVPbQlPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4GsTfAAGc95RKAAAAAElFTkSuQmCC';
 * var stringWithMime = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAALQAQMAAAD1s08VAAAAA1BMVEX/AAAZ4gk3AAAAh0lEQVR42u3BMQEAAADCoPVPbQlPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4GsTfAAGc95RKAAAAAElFTkSuQmCC';
 *
 * console.log(Base64Utils.isBase64(string)); // true
 * console.log(Base64Utils.isBase64(stringWithMime)); // false
 * console.log(Base64Utils.isBase64(stringWithMime, {allowMime: true})); // true
 * console.log(Base64Utils.isBase64(string, {mimeRequired: true})); // false
 * console.log(Base64Utils.isBase64(stringWithMime, {mimeRequired: true})); // true
 * console.log(Base64Utils.isBase64('1342234')); // false
 * console.log(Base64Utils.isBase64('afQ$%rfew')); // false
 * console.log(Base64Utils.isBase64('dfasdfr342')); // false
 * console.log(Base64Utils.isBase64('uuLMhh==')); // true
 * console.log(Base64Utils.isBase64('uuLMhh')); // false
 * console.log(Base64Utils.isBase64('uuLMhh', {paddingRequired: false})); // true
 * console.log(Base64Utils.isBase64('')); // true
 * console.log(Base64Utils.isBase64('', {allowEmpty: false})); // false
 */
export default class Base64Utils {
    private static isNodeEnv() {
        console.log(process)
        return (typeof process !== 'undefined' && process.versions != null && process.versions.node != null);
    }

    /**
     * 把字符串或二进制值转为 Base64
     * @param val
     */
    static encode(val: string) {
        if (Base64Utils.isNodeEnv()) {
            return Buffer.from(val, 'utf-8').toString('base64');
        }
        /**
         将字符串进行编码，URI 编码会将非 ASCII 字符串转换为 %XX 形式的 UTF8 编码字符串，其中 xx 是该字节的十六进制值，例如，汉 字的 UTF-8 编码是 %E6%B1%89。
         btoa()：将给定的字符串转换为 Base64 编码。但 btoa 要求输入的必须是 ASCII 字符，所以如果 val 中有非 ASCII 字符（例如中文），encodeURIComponent 会将它们转换为 %XX 形式的字符，从而保证 btoa 接收到的字符串都是有效的 ASCII 字符。
         ---- 缺点
         得到的 Base64 编码并不是标准的 UTF-8 字符串的 Base64，而是 URI 编码字符串的 Base64，所以解码时需要非常小心。
         return btoa(encodeURIComponent(val));
         */
        /**
         * 正则表达式 /%([0-9A-F]{2})/g 匹配所有形如 %XX 的字符序列，将十六进制字符串 p1 转换为对应的字符。即将 %E6%B1%89 中的每个 %XX 转换为其对应的字节。
         * 这种方式下，编码结果更加接近标准的 Base64 编码。因为它将 URI 编码后的字节重新转换为字节序列，再进行 Base64 编码。
         */
        return btoa(encodeURIComponent(val).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(Number('0x' + p1))));
    }

    /**
     * 把 Base64 编码的字符串还原为原始字符串
     * @param val
     */
    static decode(val: string) {
        if (Base64Utils.isNodeEnv()) {
            return Buffer.from(val, 'base64').toString('utf-8');
        }
        // 浏览器环境下处理 UTF-8 编码的 Base64
        return btoa(encodeURIComponent(val).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(Number('0x' + p1))));
    }

    /**
     * 判断字符串是否为 Base64
     * @param v
     * @param opts
     */
    static isBase64(v: string, opts?: IsBase64Options) {
        if (opts?.allowEmpty === false && v === '') return false

        let regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?';
        const mimeRegex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)';

        if (opts?.mimeRequired === true) {
            regex = mimeRegex + regex
        } else if (opts?.allowMime === true) {
            regex = mimeRegex + '?' + regex
        }

        if (opts?.paddingRequired === false) {
            regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?'
        }
        return (new RegExp('^' + regex + '$', 'gi')).test(v)
    }

    /**
     * Base64 去除末尾的填充 =
     * @param base64Str
     */
    static removeBase64Padding(base64Str: string): string {
        return base64Str.replace(/=+$/, ''); // 去掉末尾的 '='
    }

    static addBase64Padding(base64Str: string): string {
        const padding = base64Str.length % 4;
        return padding ? base64Str + '==='.slice(0, 4 - padding) : base64Str;
    }

    static urlSafeToBase64(urlSafeStr: string): string {
        return urlSafeStr.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice(0, (4 - urlSafeStr.length % 4) % 4);
    }

    static base64ToUrlSafe(base64Str: string): string {
        return base64Str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
}

interface IsBase64Options {
    allowEmpty?: boolean, // 允许空字符串
    mimeRequired?: boolean, // 是否需要数据类型
    allowMime?: boolean, // 允许数据类型
    paddingRequired?: boolean, // 是否需要填充
}



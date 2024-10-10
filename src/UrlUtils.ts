/**
 * URL 工具类
 * 提供了一系列用于 URL 操作和解析的静态方法，兼容 Node.js 和浏览器环境
 */
export default class UrlUtils {
    private static URL: typeof globalThis.URL;
    private static URLSearchParams: typeof globalThis.URLSearchParams;

    static {
        if (typeof window !== "undefined" && window.URL && window.URLSearchParams) {
            // 浏览器环境
            UrlUtils.URL = window.URL;
            UrlUtils.URLSearchParams = window.URLSearchParams;
        } else if (typeof global !== "undefined" && global.URL && global.URLSearchParams) {
            // Node.js 环境
            UrlUtils.URL = global.URL;
            UrlUtils.URLSearchParams = global.URLSearchParams;
        } else {
            throw new Error("URL and URLSearchParams are not available in this environment");
        }
    }

    /**
     * 解析 URL 并返回其组成部分
     * @param url 要解析的 URL 字符串
     * @returns 包含 URL 各个部分的对象
     *
     * @example
     * const url = 'https://www.example.com:8080/path/to/page?param1=value1&param2=value2#section';
     * UrlUtils.parseUrl(url);
     * // 返回 URL 对象，包含 protocol, host, hostname, port, pathname, search, hash 等属性
     */
    static parseUrl(url: string): URL {
        return new UrlUtils.URL(url);
    }

    /**
     * 获取 URL 中的查询参数
     * @param url 包含查询参数的 URL 字符串å
     * @returns 包含所有查询参数的对象
     *
     * @example
     * const url = 'https://www.example.com/page?param1=value1&param2=value2';
     * UrlUtils.getQueryParams(url);
     * // 返回: { param1: 'value1', param2: 'value2' }
     */
    static getQueryParams(url: string): { [key: string]: string } {
        const parsedUrl = new UrlUtils.URL(url);
        const params: { [key: string]: string } = {};
        parsedUrl.searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }

    /**
     * 向 URL 添加查询参数
     * @param url 原始 URL 字符串
     * @param params 要添加的参数对象
     * @returns 添加了新参数的 URL 字符串
     *
     * @example
     * const url = 'https://www.example.com/page';
     * const newParams = { param1: 'value1', param2: 'value2' };
     * UrlUtils.addQueryParams(url, newParams);
     * // 返回: 'https://www.example.com/page?param1=value1&param2=value2'
     */
    static addQueryParams(url: string, params: { [key: string]: string }): string {
        const parsedUrl = new UrlUtils.URL(url);
        Object.entries(params).forEach(([key, value]) => {
            parsedUrl.searchParams.append(key, value);
        });
        return parsedUrl.toString();
    }

    /**
     * 从 URL 中移除指定的查询参数
     * @param url 原始 URL 字符串
     * @param paramsToRemove 要移除的参数名称数组
     * @returns 移除了指定参数的 URL 字符串
     *
     * @example
     * const url = 'https://www.example.com/page?param1=value1&param2=value2&param3=value3';
     * UrlUtils.removeQueryParams(url, ['param1', 'param3']);
     * // 返回: 'https://www.example.com/page?param2=value2'
     */
    static removeQueryParams(url: string, paramsToRemove: string[]): string {
        const parsedUrl = new UrlUtils.URL(url);
        paramsToRemove.forEach(param => {
            parsedUrl.searchParams.delete(param);
        });
        return parsedUrl.toString();
    }

    /**
     * 获取 URL 的域名
     * @param url 完整的 URL 字符串
     * @returns URL 的域名
     *
     * @example
     * UrlUtils.getDomain('https://sub.example.com/page');
     * // 返回: 'example.com'
     */
    static getDomain(url: string): string {
        const hostname = new UrlUtils.URL(url).hostname;
        const parts = hostname.split(".");
        return parts.slice(-2).join(".");
    }

    /**
     * 检查 URL 是否为绝对 URL
     * @param url 要检查的 URL 字符串
     * @returns 如果是绝对 URL 则返回 true，否则返回 false
     *
     * @example
     * UrlUtils.isAbsoluteUrl('https://www.example.com'); // 返回: true
     * UrlUtils.isAbsoluteUrl('/path/to/page'); // 返回: false
     */
    static isAbsoluteUrl(url: string): boolean {
        return /^[a-z][a-z\d+\-.]*:/.test(url);
    }

    /**
     * 将相对 URL 转换为绝对 URL
     * @param base 基础 URL
     * @param relative 相对 URL
     * @returns 绝对 URL
     *
     * @example
     * UrlUtils.resolveRelativeUrl('https://www.example.com/path/', '../page');
     * // 返回: 'https://www.example.com/page'
     */
    static resolveRelativeUrl(base: string, relative: string): string {
        return new UrlUtils.URL(relative, base).href;
    }
}
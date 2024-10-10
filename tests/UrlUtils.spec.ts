import UrlUtils from "../src/UrlUtils";

describe("UrlUtils 类测试", () => {
    test("parseUrl 方法应正确解析 URL", () => {
        const url = "https://www.example.com:8080/path/to/page?param1=value1&param2=value2#section";
        const parsedUrl = UrlUtils.parseUrl(url);

        expect(parsedUrl.protocol).toBe("https:");
        expect(parsedUrl.host).toBe("www.example.com:8080");
        expect(parsedUrl.pathname).toBe("/path/to/page");
        expect(parsedUrl.search).toBe("?param1=value1&param2=value2");
        expect(parsedUrl.hash).toBe("#section");
    });

    test("getQueryParams 方法应正确获取查询参数", () => {
        const url = "https://www.example.com/page?param1=value1&param2=value2";
        const params = UrlUtils.getQueryParams(url);

        expect(params).toEqual({ param1: "value1", param2: "value2" });
    });

    test("addQueryParams 方法应正确添加查询参数", () => {
        const url = "https://www.example.com/page";
        const newParams = { param1: "value1", param2: "value2" };
        const newUrl = UrlUtils.addQueryParams(url, newParams);

        expect(newUrl).toBe("https://www.example.com/page?param1=value1&param2=value2");
    });

    test("removeQueryParams 方法应正确移除指定的查询参数", () => {
        const url = "https://www.example.com/page?param1=value1&param2=value2&param3=value3";
        const newUrl = UrlUtils.removeQueryParams(url, ["param1", "param3"]);

        expect(newUrl).toBe("https://www.example.com/page?param2=value2");
    });

    test("getDomain 方法应正确获取域名", () => {
        const url = "https://sub.example.com/page";
        const domain = UrlUtils.getDomain(url);

        expect(domain).toBe("example.com");
    });

    test("isAbsoluteUrl 方法应正确判断绝对 URL", () => {
        expect(UrlUtils.isAbsoluteUrl("https://www.example.com")).toBe(true);
        expect(UrlUtils.isAbsoluteUrl("/path/to/page")).toBe(false);
    });

    test("resolveRelativeUrl 方法应正确解析相对 URL", () => {
        const base = "https://www.example.com/path/";
        const relative = "../page";
        const absoluteUrl = UrlUtils.resolveRelativeUrl(base, relative);

        expect(absoluteUrl).toBe("https://www.example.com/page");
    });
});
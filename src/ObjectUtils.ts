export default class ObjectUtils {
    /**
     * 判断是否是普通对象
     * @param value - 需要判断的值
     * @returns 是否为普通对象
     */
    isObject(value: any): boolean {
        return Object.prototype.toString.call(value) === "[object Object]";
    }

    /**
     * 判断对象是否为空
     * @param obj - 需要判断的对象
     * @returns 是否为空对象
     */
    isEmpty(obj: object): boolean {
        return Object.keys(obj).length === 0;
    }

    /**
     * 从对象中获取指定键的值
     * @param obj - 需要获取值的对象
     * @param key - 要获取的键
     * @returns 键对应的值
     */
    get<T>(obj: T, key: keyof T): any {
        return obj[key];
    }

    /**
     * 设置对象中指定键的值
     * @param obj - 需要设置值的对象
     * @param key - 要设置的键
     * @param value - 要设置的值
     */
    set<T>(obj: T, key: keyof T, value: any): void {
        obj[key] = value;
    }

    /**
     * 判断两个对象是否相等
     * @param obj1 - 第一个对象
     * @param obj2 - 第二个对象
     * @returns 是否相等
     */
    isEqual(obj1: object, obj2: object): boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    /**
     * 获取对象的所有键
     * @param obj - 需要获取键的对象
     * @returns 对象的键数组
     */
    keys(obj: object): string[] {
        return Object.keys(obj);
    }

    /**
     * 合并多个对象
     * @param target - 目标对象
     * @param sources - 源对象
     * @returns 合并后的新对象
     */
    merge<T>(target: T, ...sources: Partial<T>[]): T {
        return Object.assign({}, target, ...sources);
    }
}
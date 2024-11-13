export default class ObjectUtils {
    /**
     * 判断提供的值是否是一个对象
     * @param value - 需要判断的值
     * @returns 是否是 Object
     * @example
     * Object.prototype.toString.call({})   // '[object Object]'
     * Object.prototype.toString.call(new Person())   // '[object Object]'
     * Object.prototype.toString.call([])   // '[object Array]'
     * Object.prototype.toString.call(new Array())   // '[object Array]'
     * Object.prototype.toString.call(null)   // '[object Null]'
     * Object.prototype.toString.call(undefined)   // '[object Undefined]'
     * Object.prototype.toString.call(123)   // '[object Number]'
     * Object.prototype.toString.call('abc')   // '[object String]'
     * Object.prototype.toString.call(true)   // '[object Boolean]'
     * Object.prototype.toString.call(Symbol())   // '[object Symbol]'
     * Object.prototype.toString.call(new Map())   // '[object Map]'
     * Object.prototype.toString.call(new Set())   // '[object Set]'
     * Object.prototype.toString.call(new WeakMap())   // '[object WeakMap]'
     * Object.prototype.toString.call(new WeakSet())   // '[object WeakSet]'
     */
    isObject(value: any): boolean {
        return Object.prototype.toString.call(value) === "[object Object]";
    }

    /**
     * 判断一个值是否为纯对象（Plain Object）
     *
     * 纯对象通常是由 `{}` 字面量创建，或者是通过 `Object.create(null)` 创建的对象，
     * 而不具有继承自构造函数的其他属性或方法。
     *
     * @param {any} value - 要检查的值
     * @returns {boolean} 如果是纯对象则返回 true，否则返回 false
     */
    isPlainObject(value: any) {
        // 首先检查该值是否是对象类型，并且不为 null
        if (typeof value !== "object" || value === null) return false;

        // 获取该对象的原型
        const proto = Object.getPrototypeOf(value);

        // 如果该对象没有原型（即 proto 为 null），则它是通过 Object.create(null) 创建的纯对象
        if (proto === null) return true;

        // 初始化 baseProto 为该对象的原型
        let baseProto = proto;

        // 循环查找该对象的最顶层原型，直到找到原型链的最顶层（即 baseProto 的原型为 null）
        while (Object.getPrototypeOf(baseProto) !== null) {
            baseProto = Object.getPrototypeOf(baseProto);
        }

        // 判断该对象的原型是否等于最顶层原型，如果是，则它是一个纯对象
        return proto === baseProto;
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

    /**
     * 判断对象是否是指定类的实例
     * @param obj
     * @param cls
     * @param allowSubclass
     */
    isInstanceOfExact<T>(
        obj: any,
        cls: new (...args: any[]) => T,
        allowSubclass: boolean = false // 可选参数，默认为 false
    ): boolean {
        if (allowSubclass) {
            return obj instanceof cls; // 允许子类返回 true
        }
        return obj && obj.constructor === cls; // 仅允许确切的类实例返回 true
    }
}
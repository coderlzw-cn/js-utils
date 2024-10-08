export default class ArrayUtils {
    /**
     * 判断一个值是否为数组
     * @param value - 需要判断的值
     * @returns 是否为数组
     */
    static isArray(value: any): boolean {
        return Array.isArray(value);
    }

    /**
     * 数组去重
     * @param array - 需要去重的数组
     * @returns 去重后的数组
     */
    unique<T>(array: T[]): T[] {
        return Array.from(new Set(array));
    }

    /**
     * @deprecated
     * @param array
     */
    unique1<T>(array: T[]): T[] {
        const result: T[] = [];
        const seen: { [key: string]: boolean } = {}; // 用于存储已经遇到的元素

        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            // 通过将对象转换为字符串来生成唯一键
            const key: string = typeof item === "object" && item !== null
                ? JSON.stringify(item)
                : String(item); // 将其他类型转换为字符串

            // 如果这个键尚未存在于 seen 中，则将其添加到结果数组中
            if (!Object.prototype.hasOwnProperty.call(seen, key)) {
                result.push(item);
                seen[key] = true; // 记录该键
            }
        }

        return result;
    }

    /**
     * 合并多个数组
     * @param arrays - 要合并的数组
     * @returns 合并后的新数组
     */
    merge<T>(...arrays: T[][]): T[] {
        return [].concat(...arrays as any) as T[];
    }

    /**
     * 从数组中获取指定元素
     * @param array - 需要获取元素的数组
     * @param index - 要获取的元素索引
     * @returns 元素或 undefined
     */
    get<T>(array: T[], index: number): T | undefined {
        return array[index];
    }

    /**
     * 设置数组中指定索引的元素
     * @param array - 需要设置元素的数组
     * @param index - 要设置的元素索引
     * @param value - 要设置的值
     */
    set<T>(array: T[], index: number, value: T): void {
        array[index] = value;
    }

    /**
     * 计算数组元素的和
     * @param array - 需要计算和的数组
     * @returns 数组元素的和
     */
    sum(array: number[]): number {
        return array.reduce((acc, value) => acc + value, 0);
    }

    /**
     * 计算数组元素的平均值
     * @param array - 需要计算平均值的数组
     * @returns 数组元素的平均值
     */
    average(array: number[]): number {
        return this.sum(array) / array.length || 0;
    }

    /**
     * 扁平化数组
     * @param arr 要扁平化的数组，数组可以包含基本类型或其他数组
     * @returns 返回一个扁平化的一维数组
     *
     * @example
     * const array = [1, [2, [3, 4]], 5];
     * const flatArray = flatten(array); // [1, 2, 3, 4, 5]
     */
    static flatten<T>(arr: (T | T[])[]): T[] {
        return arr.reduce<T[]>((acc, item) => {
            return acc.concat(Array.isArray(item) ? ArrayUtils.flatten(item) : item);
        }, []);
    }
}
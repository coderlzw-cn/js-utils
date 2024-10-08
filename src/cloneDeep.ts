/**
 * 深拷贝一个对象或数组，创建其完全独立的副本。
 *
 * 该函数支持嵌套对象和数组的深拷贝，返回一个新的对象或数组，
 * 使得原始对象和新对象之间没有任何引用关系。
 *
 * @param obj - 需要深拷贝的对象或数组。
 *
 * @returns 返回深拷贝后的新对象或数组。
 *
 * @example
 * // 示例对象
 * const original = {
 *     name: 'Alice',
 *     age: 30,
 *     hobbies: ['reading', 'traveling'],
 *     address: {
 *         city: 'Wonderland',
 *         zip: 12345
 *     }
 * };
 *
 * // 深拷贝原始对象
 * const copy = cloneDeep(original);
 *
 * // 修改拷贝对象的属性，不会影响原始对象
 * copy.name = 'Bob';
 * copy.hobbies.push('swimming');
 * copy.address.city = 'New Wonderland';
 *
 * console.log(original.name); // 输出: 'Alice'
 * console.log(original.hobbies); // 输出: ['reading', 'traveling']
 * console.log(original.address.city); // 输出: 'Wonderland'
 */
export default function cloneDeep<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        // 处理数组
        return obj.map(item => cloneDeep(item)) as unknown as T;
    }

    // 处理对象
    const copy: Partial<T> = {}; // 创建一个新对象
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = cloneDeep(obj[key]); // 递归拷贝每个属性
        }
    }

    return copy as T;
}
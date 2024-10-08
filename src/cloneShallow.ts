/**
 * 浅拷贝一个对象或数组，创建其引用副本。
 *
 * 该函数支持拷贝对象或数组的第一层属性，但不支持嵌套对象的深拷贝。
 *
 * @param obj - 需要浅拷贝的对象或数组。
 *
 * @returns 返回浅拷贝后的新对象或数组。
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
 *     },
 *     greet: function() {
 *         console.log('Hello!');
 *     }
 * };
 *
 * // 浅拷贝原始对象
 * const copy = cloneShallow(original);
 *
 * // 修改拷贝对象的属性
 * copy.name = 'Bob';
 * copy.hobbies.push('swimming');
 * copy.address.city = 'New Wonderland';
 *
 * console.log(original.name); // 输出: 'Alice'
 * console.log(original.hobbies); // 输出: ['reading', 'traveling', 'swimming']
 * console.log(original.address.city); // 输出: 'New Wonderland'
 *
 * // 调用拷贝对象中的函数
 * copy.greet(); // 输出: 'Hello!'
 */
export default function cloneShallow<T extends object>(obj: T): T {
    if (obj === null || typeof obj !== "object") {
        return obj; // 如果不是对象或数组，直接返回
    }

    // 创建一个新对象或数组
    const copy: T = Array.isArray(obj) ? [] as unknown as T : ({} as T);

    // 拷贝属性，注意函数的处理
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = obj[key];
        }
    }

    return copy;
}
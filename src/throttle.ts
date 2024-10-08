/**
 * 截流函数，用于控制指定函数的执行频率。
 *
 * @param func - 需要截流的函数。该函数的参数和返回值类型将被推断。
 * @param limit - 函数调用之间的时间限制，单位为毫秒。
 * @param options - 可选配置对象。
 * @param options.leading - 是否在开始时立即调用函数，默认为 true。
 * @param options.trailing - 是否在时间限制结束后调用函数，默认为 true。
 *
 * @returns A throttled version of the provided function that will execute at most once
 *          in the specified time limit.
 *
 * @example
 * // 创建一个滚动事件处理函数
 * const logScroll = () => {
 *     console.log('Scroll event triggered!');
 * };
 *
 * // 使用截流函数，允许首次调用，禁止最后一次调用
 * window.addEventListener('scroll', throttle(logScroll, 1000, { leading: true, trailing: false }));
 *
 * // 只在最后一次触发时调用
 * window.addEventListener('scroll', throttle(logScroll, 1000, { leading: false, trailing: true }));
 */
export default function throttle<T extends (..._args: any[]) => void>(
    func: T,
    limit: number,
    options: {
        leading?: boolean; // 是否在开始时调用函数
        trailing?: boolean; // 是否在结束时调用函数
    } = { leading: true, trailing: true }
) {
    let lastFunc: ReturnType<typeof setTimeout> | null = null;
    let lastRan: number | null = null;

    return function (this: any, ...args: Parameters<T>) {
        // 是否允许首次执行
        const shouldCallNow = options.leading && lastRan === null;

        if (shouldCallNow) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc as NodeJS.Timeout);
            lastFunc = setTimeout(() => {
                // 是否允许最后一次执行
                if (options.trailing) {
                    func.apply(this, args);
                }
                lastRan = Date.now();
            }, limit - (Date.now() - (lastRan || 0)));
        }
    };
}
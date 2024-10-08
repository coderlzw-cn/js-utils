/**
 * 防抖函数，用于限制函数的执行频率，防止函数被频繁调用。
 *
 * @param fn - 需要防抖的函数。该函数的参数和返回值类型将被推断。
 * @param delay - 延迟执行的时间，单位为毫秒。
 * @param immediate - 是否在第一次调用时立即执行函数，默认为 false。
 *
 * @returns 返回一个防抖版本的函数，该函数将在指定的延迟后执行，以防止快速连续的调用。
 *
 * @example
 * // 创建一个输入事件处理函数
 * const handleInput = (event: Event) => {
 *     console.log('输入值:', (event.target as HTMLInputElement).value);
 * };
 *
 * // 使用防抖函数，设置延迟为 300 毫秒
 * const debouncedInputHandler = debounce(handleInput, 300);
 *
 * // 在输入框中监听输入事件
 * const inputElement = document.getElementById('myInput') as HTMLInputElement;
 * inputElement.addEventListener('input', debouncedInputHandler);
 */
export default function debounce<T extends (..._args: any[]) => void>(
    fn: T,
    delay: number,
    immediate: boolean = false
) {
    let timer: ReturnType<typeof setTimeout> | null;

    const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        const callNow = immediate && !timer;

        // 清除之前的计时器
        if (timer) clearTimeout(timer);

        // 设置新的定时器
        timer = setTimeout(() => {
            console.log(this);
            timer = null;
            if (!immediate) fn.apply(this, args);
        }, delay);

        if (callNow) fn.apply(this, args);
    };

    // 添加取消功能，手动清除计时器
    debounced.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
    };

    return debounced;
}
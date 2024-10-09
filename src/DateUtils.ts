/**
 * 日期工具类
 * 提供了一系列用于日期操作和格式化的静态方法
 */
export default class DateUtils {
    /**
     * 将日期格式化为指定的字符串格式
     * @param date 要格式化的日期
     * @param format 格式字符串（支持：YYYY-年份，MM-月份，DD-日期，HH-小时，mm-分钟，ss-秒）
     * @returns 格式化后的日期字符串
     *
     * @example
     * const date = new Date(2023, 0, 1, 14, 30, 0);
     * DateUtils.format(date, 'YYYY-MM-DD HH:mm:ss'); // 返回 "2023-01-01 14:30:00"
     * DateUtils.format(date, 'YYYY年MM月DD日'); // 返回 "2023年01月01日"
     */
    static format(date: Date, format: string): string {
        const pad = (n: number): string => n < 10 ? `0${n}` : n.toString();

        const replacements: { [key: string]: string } = {
            YYYY: date.getFullYear().toString(),
            MM: pad(date.getMonth() + 1),
            DD: pad(date.getDate()),
            HH: pad(date.getHours()),
            mm: pad(date.getMinutes()),
            ss: pad(date.getSeconds())
        };

        return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => replacements[match]);
    }

    /**
     * 计算两个日期之间的差异
     * @param date1 第一个日期
     * @param date2 第二个日期
     * @returns 包含天、小时、分钟和秒差异的对象
     *
     * @example
     * const date1 = new Date(2023, 0, 1);
     * const date2 = new Date(2023, 0, 5, 12, 30, 45);
     * DateUtils.dateDiff(date1, date2);
     * // 返回 { days: 4, hours: 12, minutes: 30, seconds: 45 }
     */
    static dateDiff(date1: Date, date2: Date): { days: number; hours: number; minutes: number; seconds: number } {
        const diffMs = Math.abs(date1.getTime() - date2.getTime());
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        return {days, hours, minutes, seconds};
    }

    /**
     * 检查给定的日期是否为闰年
     * @param date 要检查的日期
     * @returns 如果是闰年则返回 true，否则返回 false
     *
     * @example
     * DateUtils.isLeapYear(new Date(2020, 0, 1)); // 返回 true
     * DateUtils.isLeapYear(new Date(2021, 0, 1)); // 返回 false
     */
    static isLeapYear(date: Date): boolean {
        const year = date.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    /**
     * 获取给定日期所在月份的天数
     * @param date 日期
     * @returns 月份的天数
     *
     * @example
     * DateUtils.getDaysInMonth(new Date(2023, 1, 1)); // 返回 28 (二月)
     * DateUtils.getDaysInMonth(new Date(2023, 0, 1)); // 返回 31 (一月)
     */
    static getDaysInMonth(date: Date): number {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * 将天数添加到给定日期
     * @param date 原始日期
     * @param days 要添加的天数（可以是负数）
     * @returns 新的日期
     *
     * @example
     * const date = new Date(2023, 0, 1);
     * DateUtils.addDays(date, 5); // 返回 2023-01-06
     * DateUtils.addDays(date, -1); // 返回 2022-12-31
     */
    static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    /**
     * 获取两个日期之间的所有日期
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @returns 日期数组
     *
     * @example
     * const start = new Date(2023, 0, 1);
     * const end = new Date(2023, 0, 5);
     * DateUtils.getDatesBetween(start, end);
     * // 返回 [2023-01-01, 2023-01-02, 2023-01-03, 2023-01-04, 2023-01-05]
     */
    static getDatesBetween(startDate: Date, endDate: Date): Date[] {
        const dates: Date[] = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    /**
     * 检查两个日期是否是同一天
     * @param date1 第一个日期
     * @param date2 第二个日期
     * @returns 如果是同一天则返回 true，否则返回 false
     *
     * @example
     * const date1 = new Date(2023, 0, 1, 10, 30);
     * const date2 = new Date(2023, 0, 1, 15, 45);
     * DateUtils.isSameDay(date1, date2); // 返回 true
     *
     * const date3 = new Date(2023, 0, 2);
     * DateUtils.isSameDay(date1, date3); // 返回 false
     */
    static isSameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }
}
type LogLevel = "error" | "warn" | "success" | "info" | "debug";

class Logger {
    levels: { [key in LogLevel]: number };
    styles: { [key in LogLevel]: string };
    timestampStyle: { [key in LogLevel]: string };
    textStyle: string;
    currentLevel: LogLevel;

    constructor(level: LogLevel = "info") {
        this.levels = {
            error: 0,
            warn: 1,
            success: 2,
            info: 3,
            debug: 4
        };
        this.styles = {
            error: "color: white; background-color: red; font-weight: bold; padding: 2px 4px; border-radius: 3px;",
            warn: "color: white; background-color: orange; font-weight: bold; padding: 2px 4px; border-radius: 3px;",
            success: "color: white; background-color: #2FCC71; font-weight: bold; padding: 2px 4px; border-radius: 3px;",
            info: "color: white; background-color: #1677ff; font-weight: bold; padding: 2px 4px; border-radius: 3px;",
            debug: "color: white; background-color: gray; font-weight: bold; padding: 2px 4px; border-radius: 3px;"
        };
        this.timestampStyle = {
            error: "color: red;",
            warn: "color: orange;",
            success: "color: #2FCC71;",
            info: "color: #1677ff;",
            debug: "color: gray;"
        };
        this.textStyle = "color: #FFFFFF;"; // 默认的文本样式
        this.currentLevel = level;
    }

    // 格式化时间为 xxxx-xx-xx xx:xx:xx
    formatTime(timestamp: Date): string {
        const year = timestamp.getFullYear();
        const month = String(timestamp.getMonth() + 1).padStart(2, "0");
        const day = String(timestamp.getDate()).padStart(2, "0");
        const hours = String(timestamp.getHours()).padStart(2, "0");
        const minutes = String(timestamp.getMinutes()).padStart(2, "0");
        const seconds = String(timestamp.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    private log(level: LogLevel, message: any, ...args: unknown[]): void {
        if (this.levels[level] <= this.levels[this.currentLevel]) {
            const timestamp = this.formatTime(new Date());
            console.log(
                `%c[${level.toUpperCase()}]%c ${timestamp}:`,
                this.styles[level],
                this.timestampStyle[level],
                message,
                ...args
            );
        }
    }

    error(message: any, ...args: unknown[]): void {
        this.log("error", message, ...args);
    }

    warn(message: any, ...args: unknown[]): void {
        this.log("warn", message, ...args);
    }

    success(message: any, ...args: unknown[]): void {
        this.log("success", message, ...args);
    }

    info(message: any, ...args: unknown[]): void {
        this.log("info", message, ...args);
    }

    debug(message: any, ...args: unknown[]): void {
        this.log("debug", message, ...args);
    }

    setLevel(level: LogLevel): void {
        if (this.levels[level] !== undefined) {
            this.currentLevel = level;
        } else {
            console.warn(`Unknown log level: ${level}`);
        }
    }
}

export default Logger;
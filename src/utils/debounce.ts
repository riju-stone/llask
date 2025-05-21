export default function debounce(func: (...args: any[]) => void, delay: number) {
    let timeout : ReturnType<typeof setTimeout> | undefined;
    return  function(this: unknown, ...args: any[]) {
        clearTimeout(timeout);
        const context = this;
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
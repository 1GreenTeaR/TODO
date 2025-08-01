// 2025-07-30
export function formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth()+1;

    const dayString = day<10 ? "0" + day : day;
    const monthString = month<10 ? "0" + month : month;

    return `${date.getFullYear()}-${monthString}-${dayString}`
}
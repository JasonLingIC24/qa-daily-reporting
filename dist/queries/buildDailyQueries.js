export function buildDailyWindow(reportDate) {
    const start = reportDate;
    const endDate = new Date(reportDate);
    endDate.setDate(endDate.getDate() + 1);
    const end = endDate
        .toISOString()
        .substring(0, 10);
    return {
        start,
        end,
    };
}

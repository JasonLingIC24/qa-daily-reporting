export function getReportConfig() {
    return {
        reportDate: process.env.REPORT_DATE ??
            "2026-10-08",
    };
}

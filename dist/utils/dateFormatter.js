export function formatReportDate(reportDate) {
    const date = new Date(`${reportDate}T00:00:00`);
    const day = date.getDate();
    const suffix = day === 1 ||
        day === 21 ||
        day === 31
        ? "st"
        : day === 2 ||
            day === 22
            ? "nd"
            : day === 3 ||
                day === 23
                ? "rd"
                : "th";
    const weekday = date.toLocaleDateString("en-GB", {
        weekday: "long",
    });
    const month = date.toLocaleDateString("en-GB", {
        month: "long",
    });
    const year = date.getFullYear();
    return `${weekday} ${day}${suffix} ${month} ${year}`;
}

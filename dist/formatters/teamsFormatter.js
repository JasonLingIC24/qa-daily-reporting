import { formatReportDate, } from "../utils/dateFormatter.js";
export function buildTeamsMessage(reportDate, report, confluenceUrl) {
    return `
# Elevate Team (EQA) - Daily QA Summary

### Report Date: ${formatReportDate(reportDate)}

${activityOverview(report)}

${qaCompleted(report)}

${newDefects(report)}

${returnedFromQa(report)}

${enteredQa(report)}

${prDone(report)}

${commentary(report)}

## Full Report

${confluenceUrl}
`;
}
function activityOverview(report) {
    return `
## QA Activity Overview

Today's QA activity resulted in:

- ✅ ${report.qaToDone.length} ticket(s) completing QA and moving to Done
- ⚙️ ${report.prToDone.length} ticket(s) moving from PR → Done
- 🧪 ${report.enteredQa.length} ticket(s) entering QA
- 🐞 ${report.newBugs.length} new defect(s) being raised
- ↩️ ${report.returnedFromQa.length} ticket(s) being returned for further work
`;
}
function qaCompleted(report) {
    if (report.qaToDone.length === 0) {
        return "";
    }
    return `
## ✅ Completed QA

${report.qaToDone
        .map(issue => `
- [${issue.key}](${issue.jiraUrl}) - ${issue.summary} (${issue.assignee ?? "Unassigned"})
`)
        .join("\n")}
`;
}
function newDefects(report) {
    if (report.newBugs.length === 0) {
        return "";
    }
    return `
## 🐞 New Defects

${report.newBugs
        .map(issue => `
- [${issue.key}](${issue.jiraUrl}) - ${issue.summary} (${issue.assignee ?? "Unassigned"})
`)
        .join("\n")}
`;
}
function returnedFromQa(report) {
    if (report.returnedFromQa.length === 0) {
        return "";
    }
    return `
## ↩ Returned From QA

${report.returnedFromQa
        .map(issue => `
- [${issue.key}](${issue.jiraUrl}) - ${issue.summary} (${issue.assignee ?? "Unassigned"})
`)
        .join("\n")}
`;
}
function enteredQa(report) {
    if (report.enteredQa.length === 0) {
        return "";
    }
    return `
## 🧪 Entered QA

${report.enteredQa
        .map(issue => `
- [${issue.key}](${issue.jiraUrl}) - ${issue.summary} (${issue.assignee ?? "Unassigned"})
`)
        .join("\n")}
`;
}
function prDone(report) {
    if (report.prToDone.length === 0) {
        return "";
    }
    return `
## ⚙️ Completed PR

${report.prToDone
        .map(issue => `
- [${issue.key}](${issue.jiraUrl}) - ${issue.summary} (${issue.assignee ?? "Unassigned"})
`)
        .join("\n")}
`;
}
function commentary(report) {
    return `
## QA Commentary

QA Completed: ${report.qaToDone.length}

PR → Done: ${report.prToDone.length}

Entered QA: ${report.enteredQa.length}

New Defects: ${report.newBugs.length}

Returned From QA: ${report.returnedFromQa.length}
`;
}

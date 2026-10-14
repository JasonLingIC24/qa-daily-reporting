import type {
  JiraIssue,
} from "../models/jiraIssue.js";

import type {
  DailyReport,
} from "../services/dailyReportBuilder.js";
import {
  formatReportDate,
} from "../utils/dateFormatter.js";

export function buildConfluenceReport(
  reportDate: string,
  report: DailyReport,
): string {

  return `
<p>
<strong>Report Date:</strong>
${formatReportDate(reportDate)}
</p>

${healthSummary(report)}

<h2>Summary</h2>

${section(
    "✅ QA Completed",
    report.qaToDone,
  )}

${section(
    "↩ Returned From QA",
    report.returnedFromQa,
  )}

${section(
    "⚙️ PR Completed",
    report.prToDone,
  )}

${section(
    "🧪 Entered QA",
    report.enteredQa,
  )}

${section(
    "🐞 New Bugs",
    report.newBugs,
  )}

${section(
    "⏳ QA → Awaiting Approval",
    report.qaToAwaitingApproval,
  )}

${section(
    "✅ Awaiting Approval → Done",
    report.awaitingApprovalToDone,
  )}
`;
}

function healthSummary(
  report: DailyReport,
): string {

  return `
<h2>Release Health</h2>

<table>
<tbody>

<tr>
<th>QA Completed</th>
<th>Awaiting Approval</th>
<th>Returned From QA</th>
<th>PR Completed</th>
<th>Entered QA</th>
<th>New Bugs</th>
</tr>

<tr>
<td>${report.qaToDone.length}</td>
<td>${report.qaToAwaitingApproval.length}</td>
<td>${report.returnedFromQa.length}</td>
<td>${report.prToDone.length}</td>
<td>${report.enteredQa.length}</td>
<td>${report.newBugs.length}</td>
</tr>

</tbody>
</table>
`;
}

function section(
  title: string,
  issues: JiraIssue[],
): string {

  if (
    issues.length === 0
  ) {
    return "";
  }

  return `
<h2>${title} (${issues.length})</h2>

${table(issues)}
`;
}

function table(
  issues: JiraIssue[],
): string {

  return `
<table>
<tbody>

<tr>
<th width="12%">Ticket</th>
<th width="68%">Summary</th>
<th width="20%">Owner</th>
</tr>

${issues
      .map(
        issue => `
<tr>
<td>
<a href="${issue.jiraUrl}">
<strong>${issue.key}</strong>
</a>
</td>

<td>
${escapeHtml(issue.summary)}
</td>

<td>
${escapeHtml(
          issue.assignee ??
          "Unassigned",
        )}
</td>
</tr>
`,
      )
      .join("")}

</tbody>
</table>
`;
}

function escapeHtml(
  value: string,
): string {

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
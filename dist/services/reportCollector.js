import { JiraClient } from "../clients/jiraClient.js";
import { qaDailyQueries, } from "../queries/qaDailyQueries.js";
export class ReportCollector {
    jiraClient = new JiraClient();
    async collect() {
        return {
            reportDate: new Date().toISOString(),
            qaToDone: await this.runQuery(qaDailyQueries.qaToDone),
            qaToAwaitingApproval: await this.runQuery(qaDailyQueries.qaToAwaitingApproval),
            awaitingApprovalToDone: await this.runQuery(qaDailyQueries.awaitingApprovalToDone),
            qaToAwaitingApprovalToDone: await this.runQuery(qaDailyQueries.qaToAwaitingApprovalToDone),
            qaReturnedToInProgress: await this.runQuery(qaDailyQueries.qaReturnedToInProgress),
            newBugs: await this.runQuery(qaDailyQueries.newBugs),
            prToDone: await this.runQuery(qaDailyQueries.prToDone),
            enteredQaToday: await this.runQuery(qaDailyQueries.enteredQaToday),
        };
    }
    async runQuery(jql) {
        const response = await this.jiraClient.search(jql);
        return response.issues.map((issue) => ({
            key: issue.key,
            summary: issue.fields.summary,
            issueType: issue.fields.issuetype?.name ??
                "Unknown",
            priority: issue.fields.priority?.name ??
                "None",
            status: issue.fields.status?.name ??
                "Unknown",
            assignee: issue.fields.assignee
                ?.displayName,
        }));
    }
}

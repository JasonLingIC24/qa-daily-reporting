export class DailyReportBuilder {
    build(transitions, newBugs) {
        const qaToDone = this.uniqueIssues(transitions.filter(t => t.fromStatus === "In QA" &&
            t.toStatus === "Done"));
        const qaToAwaitingApproval = this.uniqueIssues(transitions.filter(t => t.fromStatus === "In QA" &&
            t.toStatus === "Awaiting Approval"));
        const awaitingApprovalToDone = this.uniqueIssues(transitions.filter(t => t.fromStatus === "Awaiting Approval" &&
            t.toStatus === "Done"));
        const returnedFromQa = this.uniqueIssues(transitions.filter(t => t.fromStatus === "In QA" &&
            t.toStatus === "In Progress"));
        const enteredQa = this.uniqueIssues(transitions.filter(t => t.toStatus === "In QA"));
        const prToDone = this.uniqueIssues(transitions.filter(t => t.fromStatus === "PR" &&
            t.toStatus === "Done"));
        const qaToAwaitingApprovalToDone = qaToAwaitingApproval.filter(qaTicket => awaitingApprovalToDone.some(doneTicket => doneTicket.key === qaTicket.key));
        return {
            qaToDone,
            qaToAwaitingApproval,
            awaitingApprovalToDone,
            qaToAwaitingApprovalToDone,
            returnedFromQa,
            enteredQa,
            prToDone,
            newBugs,
        };
    }
    uniqueIssues(transitions) {
        const map = new Map();
        for (const transition of transitions) {
            map.set(transition.issueKey, {
                key: transition.issueKey,
                summary: transition.summary,
                assignee: transition.assignee,
                priority: transition.priority,
                jiraUrl: transition.jiraUrl,
                issueType: "",
                status: "",
            });
        }
        return [...map.values()];
    }
}

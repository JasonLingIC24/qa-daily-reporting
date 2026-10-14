export interface StatusTransition {
    issueKey: string;
    summary: string;

    assignee: string;
    priority: string;
    jiraUrl: string;

    fromStatus: string;
    toStatus: string;
    transitionedAt: Date;
}
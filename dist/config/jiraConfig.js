export function getJiraConfig() {
    return {
        baseUrl: process.env.JIRA_BASE_URL ?? "",
        email: process.env.JIRA_USER_EMAIL ?? "",
        apiToken: process.env.JIRA_API_TOKEN ?? "",
    };
}

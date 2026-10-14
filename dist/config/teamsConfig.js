export function getTeamsConfig() {
    return {
        webhookUrl: process.env.TEAMS_WEBHOOK_URL ?? "",
    };
}

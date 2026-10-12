export interface TeamsConfig {
  webhookUrl: string;
}

export function getTeamsConfig(): TeamsConfig {
  return {
    webhookUrl: process.env.TEAMS_WEBHOOK_URL ?? "",
  };
}

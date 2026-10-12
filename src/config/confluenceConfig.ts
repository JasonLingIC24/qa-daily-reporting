export interface ConfluenceConfig {
  baseUrl: string;
  email: string;
  apiToken: string;
  spaceKey: string;
}

export function getConfluenceConfig(): ConfluenceConfig {
  return {
    baseUrl: process.env.CONFLUENCE_BASE_URL ?? "",
    email: process.env.CONFLUENCE_USER_EMAIL ?? "",
    apiToken: process.env.CONFLUENCE_API_TOKEN ?? "",
    spaceKey: process.env.CONFLUENCE_SPACE_KEY ?? "",
  };
}
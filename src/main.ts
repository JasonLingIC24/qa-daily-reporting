import "dotenv/config";

import { getJiraConfig } from "./config/jiraConfig.js";
import { getConfluenceConfig } from "./config/confluenceConfig.js";
import { getTeamsConfig } from "./config/teamsConfig.js";

const jiraConfig = getJiraConfig();
const confluenceConfig = getConfluenceConfig();
const teamsConfig = getTeamsConfig();

console.log("Jira URL:", jiraConfig.baseUrl);
console.log("Confluence Space:", confluenceConfig.spaceKey);
console.log(
  "Teams Webhook Configured:",
  teamsConfig.webhookUrl.length > 0,
);
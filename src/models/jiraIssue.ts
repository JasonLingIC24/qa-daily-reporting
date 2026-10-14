export interface JiraIssue {
  key: string;
  summary: string;

  issueType: string;
  priority: string;
  status: string;

  assignee?: string;
  jiraUrl?: string;
}
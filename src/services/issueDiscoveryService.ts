import { JiraClient }
  from "../clients/jiraClient.js";

export class IssueDiscoveryService {

  private readonly jira =
    new JiraClient();

  async discoverIssueKeys(
    reportDate: string,
  ): Promise<string[]> {

    const start =
      `${reportDate} 00:00`;

    const endDate =
      new Date(reportDate);

    endDate.setDate(
      endDate.getDate() + 1,
    );

    const end =
      `${endDate
        .toISOString()
        .substring(0, 10)} 00:00`;

    const result =
      await this.jira.searchAll(`
    project = EVA
    AND updated >= -7d
  `);

    const keys =
      result.issues.map(
        issue => issue.key,
      );

    return keys;
  }

  async discoverNewBugs(
    reportDate: string,
  ) {

    const start =
      `${reportDate} 00:00`;

    const endDate =
      new Date(reportDate);

    endDate.setDate(
      endDate.getDate() + 1,
    );

    const end =
      `${endDate
        .toISOString()
        .substring(0, 10)} 00:00`;

    const result =
      await this.jira.searchAll(`
      project = EVA
      AND issuetype = Bug
      AND created >= "${start}"
      AND created < "${end}"
    `);

    return result.issues.map(
      issue => ({
        key: issue.key,

        summary:
          issue.fields.summary,

        issueType:
          issue.fields.issuetype.name,

        priority:
          issue.fields.priority?.name ?? "",

        status:
          issue.fields.status.name,

        assignee:
          issue.fields.assignee?.displayName ??
          "Unassigned",

        jiraUrl:
          `https://cleosystems.atlassian.net/browse/${issue.key}`,
      }),
    );
  }
}

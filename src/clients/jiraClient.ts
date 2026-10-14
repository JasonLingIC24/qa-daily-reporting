import axios from "axios";

import { getJiraConfig } from "../config/jiraConfig.js";
import type {
  JiraSearchResponse,
} from "../models/jiraSearchResponse.js";

export class JiraClient {

  private readonly config = getJiraConfig();

  private get authHeader(): string {

    return Buffer
      .from(
        `${this.config.email}:${this.config.apiToken}`,
      )
      .toString("base64");
  }

  async search(
    jql: string,
  ): Promise<JiraSearchResponse> {
    const response =
      await axios.post<JiraSearchResponse>(
        `${this.config.baseUrl}/rest/api/3/search/jql`,
        {
          jql,
          maxResults: 1000,

          fields: [
            "summary",
            "issuetype",
            "priority",
            "status",
            "assignee",
          ],
        },
        {
          headers: {
            Authorization:
              `Basic ${this.authHeader}`,
            Accept: "application/json",
            "Content-Type":
              "application/json",
          },
        },
      );

    return response.data;
  }

  async searchAll(
    jql: string,
  ): Promise<JiraSearchResponse> {

    const allIssues =
      [] as JiraSearchResponse["issues"];

    let nextPageToken:
      string | undefined = undefined;

    let isLast = false;

    while (!isLast) {

      const response: {
        data: JiraSearchResponse;
      } = await axios.post(
        `${this.config.baseUrl}/rest/api/3/search/jql`,
        {
          jql,
          maxResults: 100,
          nextPageToken,
          fields: [
            "summary",
            "issuetype",
            "priority",
            "status",
            "assignee",
          ],
        },
        {
          headers: {
            Authorization: `Basic ${this.authHeader}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      allIssues.push(
        ...response.data.issues,
      );

      nextPageToken =
        response.data.nextPageToken;

      isLast =
        response.data.isLast ?? true;

    }
    console.log(
      `Collected ${allIssues.length} issues `,
    );

    return {
      issues: allIssues,
      isLast: true,
    };
  }

  async getIssue(
    key: string,
  ): Promise<any> {

    const response =
      await axios.get(
        `${this.config.baseUrl}/rest/api/3/issue/${key}?expand=changelog`,
        {
          headers: {
            Authorization:
              `Basic ${this.authHeader}`,
            Accept: "application/json",
          },
        },
      );

    return response.data;
  }
}


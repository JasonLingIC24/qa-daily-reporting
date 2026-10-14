export interface JiraSearchResponse {

  issues: JiraIssueResponse[];

  nextPageToken?: string;

  isLast?: boolean;
}

export interface JiraIssueResponse {

  key: string;

  fields: {
    summary: string;

    issuetype: {
      name: string;
    };

    priority?: {
      name: string;
    };

    status: {
      name: string;
    };

    assignee?: {
      displayName: string;
    };
  };
}
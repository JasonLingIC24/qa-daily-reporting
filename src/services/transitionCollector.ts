import { JiraClient }
  from "../clients/jiraClient.js";

import type {
  StatusTransition,
} from "../models/statusTransition.js";

export class TransitionCollector {

  private readonly jira =
    new JiraClient();

  async collectTransitions(
    issueKeys: string[],
    reportDate: string,
  ): Promise<StatusTransition[]> {

    const transitions:
      StatusTransition[] = [];

    console.log(
      `Discovered ${issueKeys.length} candidate issues`,
    );

    for (
      const issueKey of issueKeys
    ) {

      const issue =
        await this.jira.getIssue(
          issueKey,
        );

      for (
        const history of
        issue.changelog.histories
      ) {

        const changedDate =
          history.created
            .substring(0, 10);

        if (
          changedDate !== reportDate
        ) {
          continue;
        }

        for (
          const item of
          history.items
        ) {

          if (
            item.field !== "status"
          ) {
            continue;
          }

          transitions.push({
            issueKey,

            summary:
              issue.fields.summary,

            assignee:
              issue.fields.assignee?.displayName ??
              "Unassigned",

            priority:
              issue.fields.priority?.name ??
              "",

            jiraUrl:
              `https://cleosystems.atlassian.net/browse/${issueKey}`,

            fromStatus:
              item.fromString ?? "",

            toStatus:
              item.toString ?? "",

            transitionedAt:
              new Date(
                history.created,
              ),
          });
        }
      }
    }

    return transitions;
  }
}
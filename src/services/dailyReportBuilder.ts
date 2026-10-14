import type { JiraIssue } from "../models/jiraIssue.js";
import type { StatusTransition } from "../models/statusTransition.js";

export interface DailyReport {

  qaToDone: JiraIssue[];

  qaToAwaitingApproval: JiraIssue[];

  awaitingApprovalToDone: JiraIssue[];

  qaToAwaitingApprovalToDone: JiraIssue[];

  returnedFromQa: JiraIssue[];

  enteredQa: JiraIssue[];

  prToDone: JiraIssue[];

  newBugs: JiraIssue[];
}

export class DailyReportBuilder {

  build(
    transitions: StatusTransition[],
    newBugs: JiraIssue[],
  ): DailyReport {

    const qaToDone =
      this.uniqueIssues(
        transitions.filter(
          t =>
            t.fromStatus === "In QA" &&
            t.toStatus === "Done",
        ),
      );

    const qaToAwaitingApproval =
      this.uniqueIssues(
        transitions.filter(
          t =>
            t.fromStatus === "In QA" &&
            t.toStatus === "Awaiting Approval",
        ),
      );

    const awaitingApprovalToDone =
      this.uniqueIssues(
        transitions.filter(
          t =>
            t.fromStatus === "Awaiting Approval" &&
            t.toStatus === "Done",
        ),
      );

    const returnedFromQa =
      this.uniqueIssues(
        transitions.filter(
          t =>
            t.fromStatus === "In QA" &&
            t.toStatus === "In Progress",
        ),
      );

    const enteredQa =
      this.uniqueIssues(
        transitions.filter(
          t =>
            t.toStatus === "In QA",
        ),
      );

    const prToDone =
      this.uniqueIssues(
        transitions.filter(
          t =>
            t.fromStatus === "PR" &&
            t.toStatus === "Done",
        ),
      );

    const qaToAwaitingApprovalToDone =
      qaToAwaitingApproval.filter(
        qaTicket =>
          awaitingApprovalToDone.some(
            doneTicket =>
              doneTicket.key === qaTicket.key,
          ),
      );

    return {

      qaToDone,
      qaToAwaitingApproval,
      awaitingApprovalToDone,
      qaToAwaitingApprovalToDone,
      returnedFromQa,
      enteredQa,
      prToDone,
      newBugs,
    };
  }

  private uniqueIssues(
    transitions: StatusTransition[],
  ): JiraIssue[] {

    const map =
      new Map<string, JiraIssue>();

    for (
      const transition of transitions
    ) {

      map.set(
        transition.issueKey,
        {
          key:
            transition.issueKey,

          summary:
            transition.summary,

          assignee:
            transition.assignee,

          priority:
            transition.priority,

          jiraUrl:
            transition.jiraUrl,

          issueType: "",

          status: "",
        },
      );
    }

    return [...map.values()];
  }
}
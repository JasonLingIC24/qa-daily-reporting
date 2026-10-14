import "dotenv/config";

import { TransitionCollector }
  from "./services/transitionCollector.js";

import { DailyReportBuilder }
  from "./services/dailyReportBuilder.js";

import { buildConfluenceReport }
  from "./formatters/confluenceFormatter.js";

import { buildTeamsMessage }
  from "./formatters/teamsFormatter.js";

import { writeReport }
  from "./services/reportWriter.js";

import {
  IssueDiscoveryService,
} from "./services/issueDiscoveryService.js";

import {
  ConfluencePublisher,
} from "./services/confluencePublisher.js";

async function main(): Promise<void> {

  const reportDate =
    getReportDate();

  console.log(
    `Generating report for ${reportDate}`,
  );

  const collector =
    new TransitionCollector();

  const discovery =
    new IssueDiscoveryService();

  const issueKeys =
    await discovery.discoverIssueKeys(
      reportDate,
    );

  const transitions =
    await collector.collectTransitions(
      issueKeys,
      reportDate,
    );

  const newBugs =
    await discovery.discoverNewBugs(
      reportDate,
    );

  const builder =
    new DailyReportBuilder();

  const report =
    builder.build(
      transitions,
      newBugs,
    );

  const confluence =
    buildConfluenceReport(
      reportDate,
      report,
    );

  const publisher =
    new ConfluencePublisher();

  const pageId =
    await publisher.publish(
      reportDate,
      confluence,
    );

  const pageUrl =
    `${process.env.CONFLUENCE_BASE_URL}/pages/viewpage.action?pageId=${pageId}`;

  const teams =
    buildTeamsMessage(
      reportDate,
      report,
      pageUrl,
    );

  writeReport(
    reportDate,
    confluence,
    teams,
  );

  console.log();
  console.log(
    "QA Daily Report Generated",
  );
  console.log(
    "=========================",
  );

  console.log(
    `QA → Done: ${report.qaToDone.length}`,
  );

  console.log(
    `QA → Awaiting Approval: ${report.qaToAwaitingApproval.length}`,
  );

  console.log(
    `Approval → Done: ${report.awaitingApprovalToDone.length}`,
  );

  console.log(
    `Returned From QA: ${report.returnedFromQa.length}`,
  );

  console.log(
    `New Bugs: ${report.newBugs.length}`,
  );

  console.log(
    `PR → Done: ${report.prToDone.length}`,
  );

  console.log(
    `Entered QA: ${report.enteredQa.length}`,
  );

  console.log();
  console.log(
    "Files Created:",
  );

  console.log();
  console.log(
    `Confluence Page: ${pageUrl}`,
  );

  console.log(
    `reports/${reportDate}/teams.md`,
  );
}

function getReportDate(): string {

  const dateArgIndex =
    process.argv.indexOf(
      "--date",
    );

  const reportDate =
    dateArgIndex >= 0
      ? process.argv[
      dateArgIndex + 1
      ]
      : new Date()
        .toISOString()
        .substring(0, 10);

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      reportDate,
    )
  ) {
    throw new Error(
      "Date must be in YYYY-MM-DD format",
    );
  }

  const parsedDate =
    new Date(
      `${reportDate}T00:00:00Z`,
    );

  if (
    Number.isNaN(
      parsedDate.getTime(),
    )
  ) {
    throw new Error(
      `Invalid date: ${reportDate}`,
    );
  }

  const normalisedDate =
    parsedDate
      .toISOString()
      .substring(0, 10);

  if (
    normalisedDate !== reportDate
  ) {
    throw new Error(
      `Invalid calendar date: ${reportDate}`,
    );
  }

  return reportDate;
}

main().catch((error) => {

  console.error(
    error.response?.data ??
    error.message,
  );

  process.exit(1);
});
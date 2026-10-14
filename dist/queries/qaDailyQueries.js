export const qaDailyQueries = {
    qaToDone: `
    project = EVA
    AND status CHANGED
    FROM "In QA"
    TO "Done"
    AFTER startOfDay()
  `,
    qaToAwaitingApproval: `
    project = EVA
    AND status CHANGED
    FROM "In QA"
    TO "Awaiting Approval"
    AFTER startOfDay()
  `,
    awaitingApprovalToDone: `
    project = EVA
    AND status CHANGED
    FROM "Awaiting Approval"
    TO "Done"
    AFTER startOfDay()
  `,
    qaToAwaitingApprovalToDone: `
    project = EVA
    AND status CHANGED
    FROM "In QA"
    TO "Awaiting Approval"
    AFTER startOfDay()
    AND status CHANGED
    FROM "Awaiting Approval"
    TO "Done"
    AFTER startOfDay()
  `,
    qaReturnedToInProgress: `
    project = EVA
    AND status CHANGED
    FROM "In QA"
    TO "In Progress"
    AFTER startOfDay()
  `,
    newBugs: `
    project = EVA
    AND issuetype = Bug
    AND created >= startOfDay()
  `,
    prToDone: `
    project = EVA
    AND status CHANGED
    FROM "PR"
    TO "Done"
    AFTER startOfDay()
  `,
    enteredQaToday: `
    project = EVA
    AND status CHANGED
    TO "In QA"
    AFTER startOfDay()
  `,
};

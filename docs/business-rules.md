# QA Daily Reporting Business Rules

## QA → Done

Status transition:

FROM In QA
TO Done

during report date.

## QA → Awaiting Approval

Status transition:

FROM In QA
TO Awaiting Approval

during report date.

## Awaiting Approval → Done

Status transition:

FROM Awaiting Approval
TO Done

during report date.

## QA → Awaiting Approval → Done

Issue contains BOTH transitions
during report date:

In QA → Awaiting Approval

Awaiting Approval → Done

## Returned From QA

Status transition:

FROM In QA
TO In Progress

during report date.

## Entered QA

Status transition:

TO In QA

during report date.

## PR → Done

Status transition:

FROM PR
TO Done

during report date.

## New Bugs

Issue type = Bug

created during report date.
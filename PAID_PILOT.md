# Project Controls Close Integrity Pilot

**A fixed-scope paid diagnostic for one project and one reporting period.**

The pilot is designed for a project-controls leader who needs to decide whether a monthly close is internally consistent, where the material contradictions are, and what must be addressed before the position is relied upon.

## Inputs

### Required

- project and reporting-period identity, status date, and reporting currency;
- a Primavera P6 XER file or an agreed schedule export;
- a cost and forecast export containing the available budget, actual, remaining forecast, and submitted EAC fields at an appropriate control-account or work-package grain; and
- enough mapping information to identify records, fields, units, and scope.

### Optional

- approved and pending change registers;
- risk or risk-adjusted forecast summaries;
- prior-period evidence for a separately scoped movement review;
- project-specific control equations or delegated-authority rules; and
- inherited SQL or reporting-model logic where the report itself may be part of the problem.

Only sanitized or properly authorized evidence should be supplied. Do not send credentials, production access, or confidential files through the public EQ-Proof demonstration, LinkedIn, or a public GitHub issue.

## Process

1. **Scope the decision.** Confirm the buyer, reporting period, decision date, evidence boundary, materiality, and controls to be evaluated.
2. **Map the evidence.** Inspect file structure, field definitions, identifiers, units, cut-off assumptions, and known limitations before analysis.
3. **Run the diagnostic.** Reconstruct supported positions, execute the agreed controls, preserve source identity, and separate deterministic contradictions from declared exposure or unsupported assumptions.
4. **Review findings.** Validate the material exceptions with the client, identify missing context, and distinguish data defects from governance or process questions.
5. **Handoff.** Deliver the final evidence package and conduct a working session focused on decision, remediation, and next steps.

## Deliverables

- **Executive close brief:** decision posture, material contradictions, unresolved assumptions, and priority actions.
- **Submitted-versus-reconstructed forecast bridge:** available arithmetic reconciliation without silently overwriting reported values.
- **Exception register:** source record, control, status, severity, residual, affected domain, and required remediation.
- **Evidence record:** source manifest, executed-control manifest, and traceable path from evidence to finding and close conclusion.
- **Review session:** walkthrough with the accountable project-controls or PMO team.

Machine-readable JSON, spreadsheet-safe CSV, and readable Markdown outputs are supplied where supported by the agreed workflow. A client-specific template, custom adapter, second reporting period, or production integration is a separate scope.

## Boundaries

- The diagnostic is based only on the supplied evidence, mappings, and agreed controls.
- It is not an audit or assurance opinion, contractual certification, legal opinion, home-office validation, schedule-engine replacement, or probabilistic risk calculation.
- A reconstructed arithmetic position is not automatically the commercially correct forecast.
- No production records are changed, no macros are executed, and no generated SQL is run against a client database during the standard pilot.
- Files are processed locally where the agreed workflow supports it. Retention, deletion, transfer, and access terms are agreed before intake.
- Client names, data, findings, and case material remain confidential unless written publication permission is granted.
- Pre-existing tools and general methods remain the consultant's intellectual property. Client use rights, client-specific deliverables, confidentiality, and any reusable improvements are defined in the written statement of work.

## Commercial structure

The pilot is quoted as a fixed-fee engagement after a short, non-confidential scope and schema review. No unpaid custom integration is included. Material scope changes are documented and priced before work continues.

## Contact

[Contact Florian Stuettgen on LinkedIn](https://www.linkedin.com/in/florian-stuettgen) with:

- your role and organization type;
- project type and reporting period;
- available file formats;
- the decision or problem you need resolved; and
- the date by which the result is needed.

Do not attach confidential project files to the first message.

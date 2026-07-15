# Florian Stuettgen

**Data Systems Engineer for Capital Projects**

> I build evidence-bound project controls systems that turn messy schedules, forecasts, workbooks, and SQL into defensible decisions.

I work where capital-project delivery meets data engineering: inconsistent source records, inherited reporting logic, competing forecasts, and decisions that still need to make sense after review. My systems keep the evidence, transformations, assumptions, and unresolved conflicts attached to the answer.

**Start with [EQ-Proof](https://github.com/FlorianStuettgen/EQ-Proof)** — the current public project-controls assurance system. It reconstructs a reported position from governed records, executes project-specific equations as controls, and preserves contradictions as traceable findings instead of spreadsheet exceptions.

[Open the live control room](https://florianstuettgen.github.io/EQ-Proof/) · [Inspect the architecture](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/PRODUCT_ARCHITECTURE.md) · [Review the v1.5.0 evidence](https://github.com/FlorianStuettgen/EQ-Proof/releases/tag/v1.5.0) · [LinkedIn](https://www.linkedin.com/in/florian-stuettgen/)

The public surface below is deliberately limited to evidence a signed-out reviewer can inspect today.

## Public portfolio

### EQ-Proof

Project-controls assurance through governed equations, deterministic reconstruction, provenance, and close-gate semantics.

[Live application](https://florianstuettgen.github.io/EQ-Proof/) · [Worked case](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/SHOWCASE.md) · [Verification record](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/VERIFICATION.md)

### SOC_Replay

Reproducible pipeline engineering, indexed/full-scan equivalence, evidence integrity, strict typing, and deterministic artifacts.

[Evidence walkthrough](https://github.com/FlorianStuettgen/SOC_Replay#see-the-evidence-before-reading-the-theory) · [Engineering review](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/16-Engineering-Review.md) · [v3.3.0](https://github.com/FlorianStuettgen/SOC_Replay/releases/tag/v3.3.0)

### Real Estate Decision Desk

Design-stage decision-product case study for mandatory gates, explicit criteria, uncertainty, and traceable rationale.

[Review the documented model](https://github.com/FlorianStuettgen/real-estate-decision-desk)

These repositories provide complementary evidence; they are not presented as direct technical dependencies or shared-code claims.

EQ-Proof's maintained synthetic case separates a reported **$407M** EAC from a reconstructed **$418M** position, preserves the **$11M** difference, and exposes the records and control logic behind the close gate. Its v1.5.0 release records **132 tests** and **95.59% branch coverage**.

SOC_Replay addresses a different proof problem: an alert is easy to generate, but a result another analyst can reproduce is harder. Its typed stages produce deterministic bundles; source-bound verification reproduces those artifacts from the supplied scenario, while differential checks require indexed and full-scan agreement across all four maintained scenarios. Its v3.3.0 release records **51 tests**, **93% branch coverage**, strict type checking, and reproducible-wheel verification.

Real Estate Decision Desk remains explicitly design-stage. Its public repository documents the decision model and intended interaction; it is not presented as a released application.

## Engineering evidence

| Outcome | Public evidence |
| --- | --- |
| **Data systems** | Typed pipeline stages and event contracts in the [SOC_Replay implementation register](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/14-Implementation-State.md); canonical project-control records in the [EQ-Proof architecture](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/PRODUCT_ARCHITECTURE.md) |
| **Analytical integrity** | Submitted and reconstructed positions remain separate in the [EQ-Proof semantic model](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/SEMANTIC_MODEL.md); indexed and full-scan evaluation must agree in [SOC_Replay](https://github.com/FlorianStuettgen/SOC_Replay) |
| **Reproducibility** | Maintained reference evidence and a hash-linked ledger in [SOC_Replay](https://github.com/FlorianStuettgen/SOC_Replay/tree/main/reference/network-scan); deterministic reconstruction and controlled outputs in [EQ-Proof](https://github.com/FlorianStuettgen/EQ-Proof) |
| **Testing** | Release-backed unit, integration, adversarial, differential, browser, and reproducibility checks in [EQ-Proof v1.5.0](https://github.com/FlorianStuettgen/EQ-Proof/releases/tag/v1.5.0) and [SOC_Replay v3.3.0](https://github.com/FlorianStuettgen/SOC_Replay/releases/tag/v3.3.0) |
| **Automation and security** | Public [EQ-Proof workflows](https://github.com/FlorianStuettgen/EQ-Proof/tree/main/.github/workflows) and [SOC_Replay workflows](https://github.com/FlorianStuettgen/SOC_Replay/tree/main/.github/workflows) cover CI, Ruff, mypy, CodeQL, deterministic evidence regeneration, and reproducible-wheel checks |
| **Release governance** | [EQ-Proof v1.5.0](https://github.com/FlorianStuettgen/EQ-Proof/releases/tag/v1.5.0) and the [SOC_Replay implementation register](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/14-Implementation-State.md) use versioned records, limitations, and changelogs to distinguish demonstrated behavior from roadmap work |

Together, these releases show how I structure ambiguous analytical work: define a bounded input contract, normalize records, preserve source identities, run explicit controls, compare independent execution paths, and publish evidence another reviewer can rerun. The design-stage case study stays separate so documentation is never mistaken for implementation.

## Capital-project context

This portfolio is grounded in schedule status, cost and forecast reconciliation, change and risk exposure, contractor submissions, workbook logic, SQL transformations, and executive reporting. The goal is not another dashboard. A useful result should show what evidence was supplied, how the conclusion was derived, which assumptions were introduced, what remains unresolved, and whether another reviewer can reproduce the analysis.

The public examples use maintained synthetic scenarios. They expose no employers, clients, production datasets, internal systems, or proprietary methods.

## Technical stack

| Function | Demonstrated tools and methods |
| --- | --- |
| **Data and analysis** | Python, SQL, Primavera P6/XER, structured contracts, deterministic parsers, and evidence graphs |
| **Application development** | Browser and loopback interfaces, local processing, typed models, and accessible review surfaces |
| **Automation** | GitHub Actions, repository auditors, deterministic regeneration, and release checks |
| **Testing** | Pytest, browser/UI checks, corruption cases, equivalence tests, golden evidence, and reproducible-build verification |
| **Security and provenance** | CodeQL, bounded inputs, content-addressed evidence, checksums, explicit trust boundaries, and least-privilege workflows |

## Professional context

My background combines more than ten years in project delivery and controls, an MBA, and MIT Applied Data Science training. I focus on data systems for large capital programs, SQL-based analytical workflows, cost/schedule/risk integration, and executive decision support. LinkedIn contains the full employment and education history.

## Contact

For senior technical roles, data engineering or project-controls opportunities, technical collaboration, enterprise evaluation, or commercial licensing discussions, connect with me on [LinkedIn](https://www.linkedin.com/in/florian-stuettgen/).

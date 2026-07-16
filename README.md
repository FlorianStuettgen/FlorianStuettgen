# Florian Stuettgen

**I build evidence-first software for high-stakes operations.**

**Start with [EQ-Proof](https://github.com/FlorianStuettgen/EQ-Proof)** — a working, local-first project-controls assurance system with a functional browser workbench and release-backed verification.

> I build evidence-bound project controls systems that turn messy schedules, forecasts, workbooks, and SQL into defensible decisions.

Project-controls assurance and deterministic security validation—built with Python, SQL, typed data contracts, and reproducible evidence.

[Open the live control room](https://florianstuettgen.github.io/EQ-Proof/) · [Review the worked case](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/SHOWCASE.md) · [Inspect the v1.5.0 release](https://github.com/FlorianStuettgen/EQ-Proof/releases/tag/v1.5.0) · [LinkedIn](https://www.linkedin.com/in/florian-stuettgen/)

I work where capital-project delivery meets data engineering: inconsistent source records, inherited reporting logic, competing forecasts, and decisions that still need to survive review. In broader engineering terms, this is data-quality and provenance work—preserving source identity, transformations, assumptions, and unresolved conflicts so another reviewer can reproduce the answer.

## Public portfolio

### EQ-Proof

The current public project-controls product. It reconstructs a submitted position from governed records, runs project-specific equations as controls, and preserves contradictions as findings instead of silently correcting them.

Its maintained synthetic case separates a reported **$407M** EAC from a reconstructed **$418M** position. The **$11M** difference remains attached to the records and control logic that block the close.

[Live application](https://florianstuettgen.github.io/EQ-Proof/) · [Architecture](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/PRODUCT_ARCHITECTURE.md) · [Semantic model](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/SEMANTIC_MODEL.md) · [Verification](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/VERIFICATION.md)

### SOC_Replay

The data-pipeline and correctness case study. Typed stages compile inspectable rules, evaluate stored telemetry, require indexed and full-scan agreement, and emit deterministic bundles that can be verified independently.

The [v3.3.0 release record](https://github.com/FlorianStuettgen/SOC_Replay/releases/tag/v3.3.0) reports **51 tests**, **93% branch coverage**, strict type checking, four maintained scenarios, and reproducible-wheel verification.

[Inspect the reference result](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/reference/network-scan/report.md) · [Review implementation state](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/14-Implementation-State.md) · [Read the engineering review](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/16-Engineering-Review.md)

These two repositories provide complementary public evidence; they are not presented as direct technical dependencies or shared-code claims. Private products remain outside this review path until each has an independently accessible publication surface.

## Engineering evidence

| Outcome | Public proof |
| --- | --- |
| **Data systems** | Typed stages and contracts in the [SOC_Replay implementation register](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/14-Implementation-State.md); canonical project-control records in the [EQ-Proof architecture](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/PRODUCT_ARCHITECTURE.md) |
| **Analytical integrity** | Submitted and reconstructed positions remain distinct in the [EQ-Proof semantic model](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/SEMANTIC_MODEL.md); indexed and full-scan paths must agree in [SOC_Replay](https://github.com/FlorianStuettgen/SOC_Replay) |
| **Reproducibility** | A checked-in reference bundle and hash-linked execution ledger in [SOC_Replay](https://github.com/FlorianStuettgen/SOC_Replay/tree/main/reference/network-scan); controlled regeneration in [EQ-Proof](https://github.com/FlorianStuettgen/EQ-Proof) |
| **Testing** | Release-backed unit, integration, adversarial, differential, browser, accessibility, and corruption checks in [EQ-Proof v1.5.0](https://github.com/FlorianStuettgen/EQ-Proof/releases/tag/v1.5.0) and [SOC_Replay v3.3.0](https://github.com/FlorianStuettgen/SOC_Replay/releases/tag/v3.3.0) |
| **Automation and security** | Public [EQ-Proof workflows](https://github.com/FlorianStuettgen/EQ-Proof/tree/main/.github/workflows) and [SOC_Replay workflows](https://github.com/FlorianStuettgen/SOC_Replay/tree/main/.github/workflows) cover CI, Ruff, mypy, CodeQL, regeneration, and build checks |
| **Release governance** | [EQ-Proof v1.5.0](https://github.com/FlorianStuettgen/EQ-Proof/releases/tag/v1.5.0) and the [SOC_Replay implementation register](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/14-Implementation-State.md) use versioned records, limitations, and changelogs to separate demonstrated behavior from roadmap work |

The public releases make these claims inspectable rather than résumé assertions. A technical reviewer can move from architecture to implementation state, tests, workflows, generated artifacts, and current limitations without relying on private code. That review path is intentional: the portfolio should show both what the systems do and the conditions under which their conclusions remain trustworthy.

Across the implemented systems, I define a bounded input contract, normalize records without losing source identity, execute explicit controls, compare independent paths where practical, and publish outputs another reviewer can inspect or rerun.

## Capital-project context

The portfolio is grounded in schedule status, cost and forecast reconciliation, change and risk exposure, contractor submissions, workbook logic, SQL transformations, and executive reporting. The objective is not another dashboard. A useful result should show what was supplied, how the conclusion was derived, which assumptions were introduced, what remains unresolved, and whether the analysis can be repeated.

The public examples use maintained synthetic scenarios and expose no employers, clients, production datasets, internal systems, or proprietary methods.

## Technical stack

| Function | Demonstrated tools and methods |
| --- | --- |
| **Data and analysis** | Python, SQL, Primavera P6/XER, structured contracts, deterministic parsers, and evidence graphs |
| **Applications** | Browser and loopback interfaces, local processing, typed models, and accessible review surfaces |
| **Automation** | GitHub Actions, repository auditors, controlled regeneration, and release checks |
| **Testing** | Pytest, browser/UI checks, corruption cases, differential tests, golden outputs, and reproducible-build verification |
| **Security and provenance** | CodeQL, bounded inputs, content-addressed records, checksums, explicit trust boundaries, and least-privilege workflows |

## Professional context

My background combines more than ten years in project delivery and controls, an MBA, and MIT Applied Data Science training. I focus on data systems for large capital programs, SQL-based analytical workflows, cost/schedule/risk integration, and executive decision support. LinkedIn contains the full employment and education history.

## Contact

For senior technical roles, data engineering or project-controls opportunities, technical collaboration, enterprise evaluation, or commercial licensing discussions, connect with me on [LinkedIn](https://www.linkedin.com/in/florian-stuettgen/).

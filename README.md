<h1 align="center">Evidence-first software for high-stakes operations</h1>

<p align="center"><strong>TypeScript · React · Python · SQL</strong></p>

<p align="center">
  <a href="https://florianstuettgen.github.io/EQ-Proof/">Open EQ-Proof</a> ·
  <a href="https://github.com/FlorianStuettgen/SOC_Replay/blob/main/reference/network-scan/report.md">Inspect SOC_Replay</a> ·
  <a href="https://www.linkedin.com/in/florian-stuettgen/">LinkedIn</a>
</p>

I build software that keeps source evidence, transformations, assumptions, and unresolved contradictions attached to important decisions. Another reviewer should be able to inspect how a conclusion was reached, trace it back to its inputs, and reproduce the result without relying on undocumented judgment.

## Working in public

### EQ-Proof

EQ-Proof is my current public project-controls application and the working predecessor to Schrödinger’s Close. Running locally in the browser, it demonstrates domain modeling and analytical-system engineering by reconstructing a reported $407M EAC to $418M while preserving the $11M contradiction.

[Live application](https://florianstuettgen.github.io/EQ-Proof/) · [Worked case](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/SHOWCASE.md) · [Immutable v1.5.0 release](https://github.com/FlorianStuettgen/EQ-Proof/releases/tag/v1.5.0)

### SOC_Replay

SOC_Replay is my public deterministic systems-engineering proof: an offline Python pipeline built around typed rules and contracts. Its indexed execution is checked against a full-scan reference path, making disagreements explicit. Each run emits a portable, verifiable evidence bundle for independent inspection.

[Reference result](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/reference/network-scan/report.md) · [Engineering review](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/16-Engineering-Review.md) · [Immutable v3.3.0 release](https://github.com/FlorianStuettgen/SOC_Replay/releases/tag/v3.3.0)

## Building next

### Schrödinger’s Close

Schrödinger’s Close is the planned commercial successor to EQ-Proof and is currently under private development. It is intended to add persistent reporting periods, reconciliation, remediation, review, approval, signoff, and portfolio workflow—moving from a single analytical close toward an operated product.

### Query Cartographer

Query Cartographer is a private, local-first SQL comprehension and change-impact product for inherited analytical models. It is under development and intended to become a commercial flagship, helping reviewers understand lineage, dependencies, and change consequences before editing complex reporting logic.

Public product demonstrations will follow only after their security, release, and publication gates pass.

## About

More than ten years in project delivery and controls, an MBA, and MIT Applied Data Science training shape how I build for high-stakes environments. I’m open to senior engineering roles, enterprise evaluation, and licensing or product discussions. Connect with me on [LinkedIn](https://www.linkedin.com/in/florian-stuettgen/).

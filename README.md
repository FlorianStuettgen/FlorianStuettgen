Most of the systems here began with an answer that looked reasonable.

The interesting part starts when two reasonable answers cannot both be true.

I build tools that make those disagreements visible, test the relationships underneath them, and preserve enough evidence for someone else to revisit the decision later.

## [EQ-Proof](https://github.com/FlorianStuettgen/EQ-Proof)

A project can report an EAC of **$407M** while its own governed detail reconstructs to **$418M**. Both views may be polished. Both may have passed through several reviews. They still cannot both describe the same position.

EQ-Proof does not try to predict which number feels more credible. It rebuilds the close from ordinary Primavera P6, cost, change, and risk exports, then executes the relationships the project says should hold.

The unusual part is that user-written equations become working controls. When one fails, the result is not just a red indicator. The system retains the failed relationship, the affected records, the reconstructed position, and the path from source data to the close decision.

That makes it useful before a forecast is accepted, circulated, or quietly inherited by the next reporting cycle.

[Open the synthetic Control Room](https://florianstuettgen.github.io/EQ-Proof/) · [Follow the worked case](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/SHOWCASE.md) · [See how it is built](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/PRODUCT_ARCHITECTURE.md)

<p align="center">
  <a href="https://florianstuettgen.github.io/EQ-Proof/">
    <img src="assets/eq-proof-aperture.svg" alt="EQ-Proof evidence aperture showing a blocked monthly close and the reconstructed decision position" width="100%" />
  </a>
</p>

## [SOC_Replay](https://github.com/FlorianStuettgen/SOC_Replay)

A detector can become faster and still become wrong.

SOC_Replay keeps a deliberately slower full-scan implementation beside its optimized indexed path. The optimized path has to produce the same semantic result, not merely finish sooner. Every rule leaves a trace, including rules that correctly detect nothing, and the resulting reports are bound together as a verifiable evidence bundle.

This turns optimization into something that must preserve meaning. It also makes defensive experiments repeatable: the same scenario can be executed again, inspected at each stage, and checked for the exact result it claimed to produce.

The project is intentionally less interested in dramatic alerts than in whether an alert can be explained and reproduced.

[Run the 90-second proof](https://github.com/FlorianStuettgen/SOC_Replay#the-90-second-proof) · [Read the engineering review](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/16-Engineering-Review.md) · [Inspect the execution core](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/22-Execution-Core.md)

## Other threads

### Query Cartographer

Inherited SQL often becomes risky long before it becomes visibly broken. Query Cartographer is a private project for mapping query structure, dependencies, lineage, and likely change impact before modification.

The aim is not to make a large model look simple. It is to make the consequences of touching it less mysterious.

### [Real Estate Decision Desk](https://github.com/FlorianStuettgen/real-estate-decision-desk)

A property ranking can be precise and still be fragile.

This design-stage project separates hard constraints from preferences, known costs from assumptions, and strong evidence from weak evidence. Sensitivity analysis then shows whether the preferred option survives when those assumptions move.

It is a household-scale problem, but the underlying question is the same: does the decision remain defensible when the inputs are challenged?

## The common thread

These projects are variations on one question:

> What would a system need to preserve so that its answer could be challenged without becoming impossible to reconstruct?

I arrived at that question through field execution and project controls, where schedule, cost, risk, procurement, and site reality rarely agree cleanly. That background is why assumptions, exceptions, lineage, and reproducibility tend to become part of the product rather than documentation added afterward.
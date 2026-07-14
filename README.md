Most failures announce themselves.

The expensive ones arrive as polished answers everyone has already started using.

These projects begin where the answer still looks reasonable, but the evidence underneath it no longer agrees.

## [EQ-Proof](https://github.com/FlorianStuettgen/EQ-Proof)

<table>
<tr>
<td width="43%" valign="top">
  <a href="https://florianstuettgen.github.io/EQ-Proof/">
    <img src="assets/eq-proof-aperture.svg" alt="EQ-Proof showing a blocked monthly close and the difference between reported and reconstructed positions" width="100%" />
  </a>
</td>
<td width="57%" valign="top">
  <p><strong>$407M in the report. $418M in the governed detail.</strong></p>
  <p>No prediction. No competing methodology. The same monthly close, reconstructed two ways.</p>
  <p>EQ-Proof rebuilds the position from Primavera P6, cost, change, and risk records, then executes the relationships the project itself says must hold. When one breaks, the contradiction remains tied to the equation, the source records, and the decision it reaches.</p>
  <p><a href="https://florianstuettgen.github.io/EQ-Proof/">Open the Control Room</a> · <a href="https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/SHOWCASE.md">Follow the worked case</a> · <a href="https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/PRODUCT_ARCHITECTURE.md">See how it is built</a></p>
</td>
</tr>
</table>

<table>
<tr>
<td width="33%" valign="top"><strong>Rebuild first</strong><br/><sub>Reported values are preserved, not silently trusted or overwritten.</sub></td>
<td width="33%" valign="top"><strong>Controls are executable</strong><br/><sub>Project equations run beside the built-in assurance checks.</sub></td>
<td width="33%" valign="top"><strong>Exceptions keep their route home</strong><br/><sub>Every failure retains the records and relationship behind it.</sub></td>
</tr>
</table>

## [SOC_Replay](https://github.com/FlorianStuettgen/SOC_Replay)

<table>
<tr>
<td width="44%" valign="top">
  <a href="https://github.com/FlorianStuettgen/SOC_Replay">
    <img src="https://github.com/user-attachments/assets/7388aa89-6603-4772-b960-438a4a78339b" alt="The physical SOC_Replay server rack" width="100%" />
  </a>
</td>
<td width="56%" valign="top">
  <p><strong>Most security demos end when the alert fires. SOC_Replay starts there.</strong></p>
  <p>The rack supplies the controlled environment. The software runs each scenario through an optimized path and a slower reference path. A speedup only survives if the meaning does.</p>
  <p>Silence is recorded too. A rule that correctly detects nothing still leaves an execution trace, and the report, ledger, manifest, and artifacts must verify as one bundle.</p>
  <p><a href="https://github.com/FlorianStuettgen/SOC_Replay#the-90-second-proof">Run the 90-second proof</a> · <a href="https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/16-Engineering-Review.md">Read the engineering review</a> · <a href="https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/22-Execution-Core.md">Inspect the execution core</a></p>
</td>
</tr>
</table>

<table>
<tr>
<td width="33%" valign="top"><strong>One scenario</strong><br/><sub>Executed through two independent paths.</sub></td>
<td width="33%" valign="top"><strong>Zero detections</strong><br/><sub>Still leave evidence of how the rule arrived there.</sub></td>
<td width="33%" valign="top"><strong>One bundle</strong><br/><sub>Or verification fails.</sub></td>
</tr>
</table>

## Query Cartographer

<sub>PRIVATE DEVELOPMENT</sub>

> **Not:** What does this query do?  
> **Instead:** What else does it hold together?

A query can be readable, tested, and still be dangerous to touch. Query Cartographer is built for inherited SQL where the code is visible but the consequences are not.

Only the problem statement is public for now. The implementation is not.

`local-first` · `inherited SQL` · `private development`

## [Real Estate Decision Desk](https://github.com/FlorianStuettgen/real-estate-decision-desk)

<table>
<tr>
<td width="47%" valign="top">
  <a href="https://github.com/FlorianStuettgen/real-estate-decision-desk">
    <img src="assets/real-estate-decision-desk.svg" alt="Real Estate Decision Desk comparison workspace" width="100%" />
  </a>
</td>
<td width="53%" valign="top">
  <p><strong>Most property tools rank the listings. This one tries to break the winner.</strong></p>
  <p>Hard constraints are applied before preferences can compensate. Known costs remain separate from estimates and assumptions. Then repair exposure, commute weight, financing, documentation confidence, and other uncertain inputs are moved until the preferred option either holds or changes.</p>
  <p>The repository is still design-stage. The decision logic is being made explicit before the interface is allowed to hide it.</p>
  <p><a href="https://github.com/FlorianStuettgen/real-estate-decision-desk">Explore the decision model</a></p>
</td>
</tr>
</table>

<table>
<tr>
<td width="33%" valign="top"><strong>Reject before scoring</strong><br/><sub>Non-negotiables cannot be rescued by attractive preferences.</sub></td>
<td width="33%" valign="top"><strong>Facts ≠ estimates</strong><br/><sub>Observed amounts, assumptions, and uncertainty remain visibly separate.</sub></td>
<td width="33%" valign="top"><strong>Shake the winner</strong><br/><sub>Move the uncertain inputs and see whether the decision survives.</sub></td>
</tr>
</table>

## One pattern

Different domains, same failure mode: a polished answer becomes difficult to challenge because the path behind it disappeared.

Field execution and project controls taught me to expect disagreement between schedule, cost, risk, procurement, and site reality. The software is built around preserving that disagreement long enough to inspect it.
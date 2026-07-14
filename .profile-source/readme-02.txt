| Does it solve a real controls problem? | [Control Room demo](https://florianstuettgen.github.io/EQ-Proof/) and [five-minute playbook](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/DEMO_PLAYBOOK.md) |
| Can it ingest native project files? | [Primavera P6 XER and cost/control inputs](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/PROJECT_CONTROLS.md) |
| Is the rule engine constrained? | [Product architecture](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/PRODUCT_ARCHITECTURE.md) and [threat model](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/THREAT_MODEL.md) |
| Is the output reproducible? | [Demo regeneration script](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/scripts/regenerate_control_room_demo.py) and [CI workflow](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/.github/workflows/ci.yml) |
| Is behaviour tested? | [Controls tests](https://github.com/FlorianStuettgen/EQ-Proof/blob/main/tests/test_controls.py) and 92% coverage gate |

```text
REPORTED EAC      $407M
DEFENSIBLE EAC    $418M
DEFENSIBLE P80    $483M
HIDDEN EXPOSURE    $76M
CLOSE DECISION    BLOCKED
```

</details>

<details>
<summary><strong>SOC_Replay — transferable engineering discipline</strong></summary>
<br>

| Review question | Direct evidence |
| --- | --- |
| Is execution explicit? | [Five-stage execution core](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/22-Execution-Core.md) |
| Are scenario outcomes exact? | [Contract validation](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/24-Contract-Validation.md) |
| Can internal tampering be detected? | [Execution-ledger design](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/23-Execution-Ledger.md) |
| Are boundaries explicit? | [Implementation state](https://github.com/FlorianStuettgen/SOC_Replay/blob/main/docs/14-Implementation-State.md) and simulation-only response model |
| Is quality enforced? | [Test suite](https://github.com/FlorianStuettgen/SOC_Replay/tree/main/tests), 42 tests, 93% branch coverage, schema validation, self-audit, and wheel build |

```text
LOAD → COMPILE → INDEX → EVALUATE → VERIFY
                ↓
      exact positive and zero-result traces
                ↓
       ledger root → bundle identity
```

</details>

<details>
<summary><strong>Technical toolkit and operating methods</strong></summary>
<br>

| Domain | Tools and methods |
| --- | --- |
| Project controls | Primavera P6, forecasting, EVM, variance analysis, schedule assurance, change, risk, stage-gate readiness |
| Data engineering | SQL, Python, ETL, data modelling, validation, automation, deterministic processing, schemas |
| Analytics | Power BI, Excel, Power Query, VBA, executive reporting, scenario and sensitivity analysis |
| Enterprise/project systems | SAP, Oracle, Smartsheet, Procore, SharePoint, Microsoft Project |
| Engineering workflow | Git, GitHub Actions, tests, static analysis, architecture records, reproducible evidence |
| Field/design context | Heavy industrial construction, piping systems, AutoCAD, Navisworks, Revit |

</details>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/principles-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/principles-light.svg">
    <img src="assets/principles-dark.svg" alt="Operating principles for transparent and reproducible decision systems" width="100%">
  </picture>
</p>

<p align="center">

# Licensing and Launch Decisions

**Decision date:** July 20, 2026  
**Objective:** create consulting revenue now while preserving the option to develop proprietary commercial software later.

This is an operating decision record, not legal advice. The final customer agreement and any proprietary software license should be reviewed by qualified counsel before external distribution.

## Decisions

### 1. EQ-Proof remains public under Apache-2.0

EQ-Proof will remain the public reference implementation, working demonstration, and lead-generation asset.

- Keep the existing Apache-2.0 license.
- Keep the browser workbench and synthetic case publicly accessible.
- Sell professional outcomes around it: evidence mapping, field normalization, project-specific controls, interpretation, remediation planning, training, and recurring close reviews.
- Do not imply that open-source access includes consulting, support, client-specific adapters, hosted service, or accountability for a client decision.

### 2. Schrödinger's Close remains private and becomes the proprietary commercial core

The repository should remain private. Its application, core packages, workflow, persistence, and future enterprise capabilities should not be published as an open-source repository.

Before any source distribution, customer evaluation package, or commercial release:

- replace the root Apache-2.0 declaration with counsel-reviewed proprietary terms;
- set npm package metadata for the private packages to `UNLICENSED` or the final approved commercial identifier;
- retain `private: true` on every non-publishable package;
- define evaluation, internal-use, support, warranty, liability, and termination terms in the customer agreement; and
- confirm the rights and contribution history before changing the license.

A later license change does not withdraw rights from any copy already received under an earlier license. That history should be reviewed before external release.

### 3. Launch only the sanitized static showcase

The first public Close surface should be the existing sanitized, deterministic showcase—not the private workbench or source tree.

The launch boundary is:

- publish only the approved static showcase artifact;
- expose no client-file intake, authentication, database, telemetry, payment, or production integration;
- keep the private repository private;
- retain the exact-head build, manifest, browser, accessibility, and signed-out smoke gates; and
- describe the result as a demonstration and technically verified candidate, not as a production SaaS platform.

If public source is later desirable, create a separate showcase repository with its own explicit license. Do not make the private monorepo public merely to host the demonstration.

### 4. GitHub Pages is a demonstration surface, not the commercial transaction surface

GitHub Pages may host the static product demonstration and portfolio narrative. It should not process payments, credentials, confidential inquiries, or client files, and it should not become the operating SaaS platform.

GitHub states that Pages is not intended for a website primarily directed at facilitating commercial transactions or providing commercial SaaS. See [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

Commercial contact should route to LinkedIn initially and later to a dedicated business domain, email, CRM, and contracting/payment workflow.

### 5. Query Cartographer remains private until its publication gate passes

Query Cartographer should remain a private consulting tool and secondary service line for inherited SQL and reporting-model review.

Do not launch it as a second flagship while the project-controls offer is still seeking its first repeat customers. When its authentic screenshot, public fixture, malicious-rendering, performance, release, metadata, and deployment gates pass, use the same pattern as Close: proprietary core with a separately governed public demonstration.

### 6. Paid-pilot intellectual-property and data terms

Every pilot statement of work should state that:

- client data and confidential business information remain the client's;
- pre-existing software, reusable controls, methods, libraries, and general know-how remain the consultant's;
- the client receives the agreed internal-use rights to the engagement deliverables;
- client-specific facts or identifiable case material cannot be published without written permission;
- generalized improvements may be retained only when they contain no client confidential information and the agreement permits it;
- retention, deletion, transfer, and access controls are agreed before data intake; and
- custom adapters, production integrations, ongoing support, and additional reporting periods require separate scope and fees.

## Launch sequence

1. Publish the buyer-focused profile and paid-pilot brief.
2. Prepare a standard mutual NDA, statement of work, data-handling schedule, and invoice/payment process.
3. Implement the proprietary-license change in Schrödinger's Close through a separate reviewed pull request before any external source distribution.
4. Publish the sanitized static showcase only after its existing owner gates, exact-head verification, and signed-out smoke test pass.
5. Sell and deliver the first fixed-scope paid pilot using authorized or sanitized client evidence.
6. Seek a repeat engagement before expanding the product or launching a second commercial offer.
7. Publish a customer case only with written permission and appropriate anonymization.

## Explicitly not selected

- Making the Schrödinger's Close repository public.
- Open-sourcing the commercial core before external demand is validated.
- Launching Close as a hosted SaaS product now.
- Collecting client files through GitHub Pages, GitHub issues, or LinkedIn.
- Processing payments or confidential transactions on GitHub Pages.
- Building additional consumer applications before the first repeat consulting customer.

## Review checkpoint

GitHub notes that without a license, default copyright applies, while an existing open-source license grants defined reuse rights. License changes and mixed public/proprietary boundaries should therefore be explicit and professionally reviewed. See [Licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).

import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const markdown = readFileSync(resolve(root, "README.md"), "utf8");
const failures = [];
const fail = (message) => failures.push(message);
const count = (pattern, value = markdown) => [...value.matchAll(pattern)].length;

const assetDefinitions = [
  {
    path: "assets/eq-proof-case.svg",
    tokens: [
      "SYNTHETIC MONTHLY-CLOSE CASE",
      "ONE CONTROL ROOM VIEW",
      "CLOSE BLOCKED",
      "$407M",
      "$418M",
      "$11M",
      "SOURCE RECORDS → EXECUTABLE CONTROLS → CLOSE BLOCKED",
    ],
  },
  {
    path: "assets/soc-replay-case.svg",
    tokens: [
      "SOC_REPLAY / MAINTAINED REFERENCE CASE",
      "7 STORED EVENTS",
      "THE ALERT IS ONLY ONE ARTIFACT",
      "1 HIGH-SEVERITY CASE",
      "HASH-LINKED EXECUTION LEDGER",
      "ZERO-RESULT TRACES PRESERVED",
      "INDEXED RESULT = FULL-SCAN REFERENCE",
      "VERIFICATION PASS",
      "686f91bca3c385b6",
    ],
  },
  {
    path: "assets/schroedingers-close-teaser.svg",
    tokens: [
      "PRIVATE DEVELOPMENT",
      "CLOSED ≠ RESOLVED",
      "SCHRÖDINGER’S CLOSE",
      "CLOSE STATUS",
      "CLOSED",
      "EVIDENCE STATE",
      "UNRESOLVED",
      "BOTH STATES",
      "ACTIVE",
    ],
  },
];

const expectedLinks = [
  {
    label: "Enter the Control Room →",
    target: "https://florianstuettgen.github.io/EQ-Proof/",
  },
  {
    label: "Open the reference case →",
    target:
      "https://github.com/FlorianStuettgen/SOC_Replay/blob/2745a95c0d285d11678ce297e5e8468d6b4b9f2e/reference/network-scan/report.md",
  },
];

function proseWordCount(value) {
  const text = value
    .replace(/<[^>]+>/gu, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, "$1")
    .replace(/https?:\/\/[^\s<>")']+/giu, " ")
    .replace(/[#>*_|`~:·/→–—$();,≠]/gu, " ");
  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)?.length ?? 0;
}

function linksIn(value) {
  return [...value.matchAll(/\[([^\]]+)\]\(([^)]+)\)/gu)].map((match) => ({
    label: match[1].trim(),
    target: match[2].trim(),
  }));
}

function attribute(markup, name) {
  return markup.match(new RegExp(`${name}=["']([^"']+)["']`, "iu"))?.[1] ?? "";
}

const htmlHeadings = [...markdown.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/giu)];
const markdownHeadings = [...markdown.matchAll(/^\s{0,3}(#{1,6})\s+(.+)$/gmu)];
const setextHeadings = [...markdown.matchAll(/^(?!\s*$)(?!#{1,6}\s)(.+)\r?\n\s*(?:=+|-+)\s*$/gmu)];
const expectedH2s = ["EQ-Proof", "SOC_Replay", "Closed ≠ resolved"];
const h2s = markdownHeadings.filter((match) => match[1].length === 2).map((match) => match[2].trim());

if (
  htmlHeadings.length !== 1 ||
  htmlHeadings[0]?.[1] !== "1" ||
  htmlHeadings[0]?.[2] !== "The result is not the proof."
) {
  fail("the profile must open with the exact centered thesis H1");
}
if (!/^<h1\s+align=["']center["']>The result is not the proof\.<\/h1>/u.test(markdown)) {
  fail("the thesis H1 must remain centered and first");
}
if (setextHeadings.length > 0 || markdownHeadings.some((match) => match[1].length !== 2)) {
  fail("only the centered H1 and three level-two Markdown headings are permitted");
}
if (h2s.join("|") !== expectedH2s.join("|")) {
  fail(`expected the three pitch sections in order; found ${h2s.join(", ") || "none"}`);
}

const exactIntro =
  '<p align="center">A forecast can be reported. A detection can fire. A close can be signed.<br>The interesting part begins when one is questioned.</p>';
if (!markdown.includes(exactIntro)) fail("the centered tension-setting introduction has changed");

const images = [...markdown.matchAll(/<img\b[^>]*>/giu)].map((match) => match[0]);
const expectedImages = [
  {
    src: "assets/eq-proof-case.svg",
    altChecks: [/Synthetic EQ-Proof monthly-close case/iu, /one Control Room view/iu, /reported \$407M/iu, /defensible \$418M/iu, /\$11M contradiction/iu],
  },
  {
    src: "assets/soc-replay-case.svg",
    altChecks: [/SOC_Replay reference case/iu, /source events/iu, /rule and execution traces/iu, /verified evidence bundle/iu, /standalone alert/iu],
  },
  {
    src: "assets/schroedingers-close-teaser.svg",
    altChecks: [/Schrödinger’s Close/iu, /private-development teaser/iu, /marked closed/iu, /evidence remains unresolved/iu],
  },
];
if (images.length !== expectedImages.length) fail(`expected three purpose-built visuals; found ${images.length}`);
for (const [index, expected] of expectedImages.entries()) {
  const markup = images[index] ?? "";
  const src = attribute(markup, "src");
  const alt = attribute(markup, "alt");
  if (src !== expected.src) fail(`visual ${index + 1} must use ${expected.src}; found ${src || "none"}`);
  if (!/width=["']100%["']/iu.test(markup)) fail(`visual ${index + 1} must render at full README width`);
  for (const pattern of expected.altChecks) {
    if (!pattern.test(alt)) fail(`visual ${index + 1} is missing descriptive alt-text detail: ${pattern}`);
  }
}
if (new Set(images.map((image) => attribute(image, "src"))).size !== images.length) {
  fail("each visual must be a distinct asset rather than a repeated image");
}

for (const definition of assetDefinitions) {
  const assetPath = resolve(root, definition.path);
  if (!existsSync(assetPath)) {
    fail(`missing profile asset: ${definition.path}`);
    continue;
  }
  const asset = readFileSync(assetPath, "utf8");
  if (!/^<svg\b/iu.test(asset) || !/<title\b/iu.test(asset) || !/<desc\b/iu.test(asset)) {
    fail(`${definition.path} must be an accessible SVG with title and description`);
  }
  for (const token of definition.tokens) {
    if (!asset.includes(token)) fail(`${definition.path} is missing proof token: ${token}`);
  }
  if (/<script\b|<foreignObject\b|(?:href|src)=["']https?:/iu.test(asset)) {
    fail(`${definition.path} must remain self-contained and script-free`);
  }
  if (statSync(assetPath).size > 50_000) fail(`${definition.path} exceeds the 50 KB profile-asset budget`);
}

const eqAsset = readFileSync(resolve(root, "assets/eq-proof-case.svg"), "utf8");
const socAsset = readFileSync(resolve(root, "assets/soc-replay-case.svg"), "utf8");
const closeAsset = readFileSync(resolve(root, "assets/schroedingers-close-teaser.svg"), "utf8");
if (count(/<use\s+href=["']#controlRoom["']/gu, eqAsset) !== 1) {
  fail("EQ-Proof must use exactly one Control Room view, not a repeated collage");
}
if (/<use\b|<image\b/iu.test(socAsset) || /<use\b|<image\b/iu.test(closeAsset)) {
  fail("SOC_Replay and Schrödinger’s Close must use their own compositions, not recycled imagery");
}
if (existsSync(resolve(root, "assets/eq-proof-processional.svg"))) {
  fail("the superseded repeated-dashboard processional asset must be removed");
}

const links = linksIn(markdown);
if (
  links.length !== expectedLinks.length ||
  links.some((link, index) => link.label !== expectedLinks[index].label || link.target !== expectedLinks[index].target)
) {
  fail("the profile must contain only the two precise public proof actions in order");
}

const requiredCopy = [
  "Every number looked plausible. Together, they were impossible.",
  "**EQ-Proof** rebuilds the close from source records and executable controls, leaving the contradiction attached to the evidence that exposed it.",
  "Most detection demos stop at the alert. SOC_Replay preserves the case.",
  "Each run accounts for the events it saw, every rule trace—including zero results—the execution path it took, and the bundle it left behind.",
  "The close is finished. The evidence has not agreed.",
  "**Schrödinger’s Close** · Private development.",
];
for (const copy of requiredCopy) {
  if (!markdown.includes(copy)) fail(`missing approved pitch copy: ${copy}`);
}

if (/Query Cartographer|real-estate|meal[- ]planner|TikTok|tiktok|LinkedIn|mailto:|@/iu.test(markdown)) {
  fail("secondary projects and contact routing are outside this pitch");
}
if (/github\.com\/FlorianStuettgen\/(?:query-cartographer|schroedingers-close|meal-planner-web-app|tiktok-profile-to-text)/iu.test(markdown)) {
  fail("private repository URLs are forbidden");
}
if (/\bcoming soon\b|\broadmap\b|\bfeature(?:s)?\b|\brelease date\b/iu.test(markdown)) {
  fail("the private-development teaser must not disclose roadmap or feature claims");
}

const tableCount = count(/^\s*\|.+\|\s*$/gmu);
const badgeCount = count(/shields\.io|github-readme-stats|streak-stats|github-profile-trophy/giu);
const listCount = count(/^\s{0,3}(?:[-+*]|\d+[.)])\s+/gmu);
const blockquoteCount = count(/^\s{0,3}>/gmu);
const detailsCount = count(/<details\b|<summary\b/giu);
const mermaidCount = count(/```mermaid/giu);
const wordCount = proseWordCount(markdown);

if (tableCount > 0) fail("tables are outside the pitch grammar");
if (badgeCount > 0) fail("badges are outside the pitch grammar");
if (listCount > 0) fail("lists are outside the pitch grammar");
if (blockquoteCount > 0) fail("blockquotes are outside the pitch grammar");
if (detailsCount > 0) fail("collapsed sections are outside the pitch grammar");
if (mermaidCount > 0) fail("Mermaid is outside the pitch grammar");
if (wordCount > 120) fail(`README exceeds the 120-word pitch ceiling; found ${wordCount}`);

if (failures.length) {
  console.error("Profile verification failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `Profile verification passed: ${wordCount} prose words, ${h2s.length} pitch sections, ${images.length} distinct visuals, ${links.length} public actions.`,
);

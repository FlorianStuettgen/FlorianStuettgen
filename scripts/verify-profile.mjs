import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const markdown = readFileSync(resolve(root, "README.md"), "utf8");
const assetPath = resolve(root, "assets", "eq-proof-processional.svg");
const asset = existsSync(assetPath) ? readFileSync(assetPath, "utf8") : "";
const failures = [];
const fail = (message) => failures.push(message);
const count = (pattern, value = markdown) => [...value.matchAll(pattern)].length;

const expectedHeadings = [
  "[EQ-Proof](https://github.com/FlorianStuettgen/EQ-Proof)",
  "[SOC_Replay](https://github.com/FlorianStuettgen/SOC_Replay)",
  "Query Cartographer",
];

const expectedLinks = new Map([
  ["Control Room", "https://florianstuettgen.github.io/EQ-Proof/"],
  ["Repository:EQ", "https://github.com/FlorianStuettgen/EQ-Proof"],
  ["90-second case study", "https://github.com/FlorianStuettgen/EQ-Proof/blob/main/docs/SHOWCASE.md#the-90-second-demonstration"],
  ["Reference evidence", "https://github.com/FlorianStuettgen/SOC_Replay/blob/2745a95c0d285d11678ce297e5e8468d6b4b9f2e/reference/network-scan/report.md"],
  ["Repository:SOC", "https://github.com/FlorianStuettgen/SOC_Replay"],
]);

function proseWordCount(value) {
  const text = value
    .replace(/<[^>]+>/gu, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, "$1")
    .replace(/https?:\/\/[^\s<>\")']+/giu, " ")
    .replace(/[#>*_|`~:·/→–—$();,]/gu, " ");
  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)?.length ?? 0;
}

function linksIn(value) {
  return [...value.matchAll(/\[([^\]]+)\]\(([^)]+)\)/gu)].map((match) => ({
    label: match[1].trim(),
    target: match[2].trim(),
  }));
}

const headings = [...markdown.matchAll(/^##\s+(.+)$/gmu)].map((match) => match[1].trim());
if (headings.join("|") !== expectedHeadings.join("|")) {
  fail(`expected EQ-Proof, SOC_Replay, and Query Cartographer in order; found ${headings.join(", ") || "none"}`);
}
if (/^#\s+/gmu.test(markdown) || /^###/gmu.test(markdown) || /<h[1-6]\b/iu.test(markdown)) {
  fail("only the three level-two project headings are permitted");
}

const images = [...markdown.matchAll(/<img\b([^>]*)>/giu)];
if (images.length !== 1) fail(`expected one authentic lead image; found ${images.length}`);
const imageMarkup = images[0]?.[0] ?? "";
if (!/src=["']assets\/eq-proof-processional\.svg["']/iu.test(imageMarkup)) {
  fail("lead image must use the repository-local EQ-Proof processional strip");
}
if (!/alt=["'][^"']*(?:system view)[^"']*(?:blocked monthly-close decision)[^"']*(?:reconstructed evidence)[^"']*["']/iu.test(imageMarkup)) {
  fail("lead image needs descriptive system, decision, and evidence alt text");
}
if (!existsSync(assetPath)) {
  fail("the repository-local EQ-Proof processional strip is missing");
} else {
  for (const proofToken of ["CLOSE BLOCKED", "$407M", "$418M", "$11M", "$483M", "CLOSE RECONSTRUCTION"]) {
    if (!asset.includes(proofToken)) fail(`lead image is missing authentic EQ-Proof proof token: ${proofToken}`);
  }
  if (count(/<use\s+href=["']#controlRoom["']/gu, asset) !== 3) {
    fail("lead image must preserve the three-view processional sequence");
  }
  if (/<script\b|<foreignObject\b|(?:href|src)=["']https?:/iu.test(asset)) {
    fail("lead image must remain self-contained and script-free");
  }
  if (statSync(assetPath).size > 100_000) fail("lead image exceeds the 100 KB profile budget");
}

const links = linksIn(markdown);
for (const [key, target] of expectedLinks) {
  const label = key.replace(/:(?:EQ|SOC)$/u, "");
  if (!links.some((link) => link.label === label && link.target === target)) {
    fail(`missing precise link: ${label} -> ${target}`);
  }
}
if (links.length !== 7) {
  fail(`expected seven links including the two linked project headings; found ${links.length}`);
}

if (!/Executable monthly-close assurance for Primavera P6, cost, change,\s+risk, and project-specific controls\./u.test(markdown)) {
  fail("EQ-Proof description must state the executable monthly-close assurance scope");
}
if (!/Deterministic defensive-telemetry replay with exact scenario contracts,\s+indexed\/full-scan comparison, and verifiable evidence bundles\./u.test(markdown)) {
  fail("SOC_Replay description must state contracts, reference comparison, and evidence");
}
if (!/A local-first system for reasoning about large inherited SQL models\./u.test(markdown)) {
  fail("Query Cartographer must remain at Level-2 disclosure");
}
if (/Schrödinger|real-estate|meal[- ]planner|TikTok|tiktok|LinkedIn|mailto:|@/iu.test(markdown)) {
  fail("secondary projects and contact routing are outside the processional profile");
}
if (/github\.com\/FlorianStuettgen\/(?:query-cartographer|schroedingers-close|meal-planner-web-app|tiktok-profile-to-text)/iu.test(markdown)) {
  fail("private repository URLs are forbidden");
}

const requiredMetadata = [
  "<sub>PUBLIC BETA / PYTHON / PROJECT CONTROLS</sub>",
  "<sub>PUBLIC / PYTHON / EVIDENCE ENGINEERING</sub>",
  "<sub>PRIVATE DEVELOPMENT / SQL SYSTEMS</sub>",
  "<sub>Field execution → project controls → data systems · Edmonton, Alberta</sub>",
];
for (const line of requiredMetadata) {
  if (!markdown.includes(line)) fail(`missing restrained metadata line: ${line}`);
}

const tableCount = count(/^\s*\|.+\|\s*$/gmu);
const badgeCount = count(/shields\.io|github-readme-stats|streak-stats|github-profile-trophy/giu);
const listCount = count(/^\s{0,3}(?:[-+*]|\d+[.)])\s+/gmu);
const detailsCount = count(/<details\b|<summary\b/giu);
const mermaidCount = count(/```mermaid/giu);
const wordCount = proseWordCount(markdown);

if (tableCount > 0) fail("tables are outside the profile grammar");
if (badgeCount > 0) fail("badges are outside the profile grammar");
if (listCount > 0) fail("lists are outside the profile grammar");
if (detailsCount > 0) fail("collapsed sections are outside the profile grammar");
if (mermaidCount > 0) fail("Mermaid is outside the profile grammar");
if (wordCount > 120) fail(`README exceeds the 120-word ceiling; found ${wordCount}`);

if (failures.length) {
  console.error("Profile verification failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Profile verification passed: ${wordCount} prose words, ${headings.length} project headings, ${links.length} links, one lead image.`);

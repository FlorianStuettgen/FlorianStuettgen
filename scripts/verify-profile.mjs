import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const markdown = readFileSync(resolve(root, "README.md"), "utf8");
const failures = [];
const fail = (message) => failures.push(message);
const count = (pattern) => [...markdown.matchAll(pattern)].length;

const h1Count = count(/^# [^#].+$/gmu);
if (h1Count !== 1) fail(`expected exactly one H1; found ${h1Count}`);

const requiredSections = [
  "## Public portfolio",
  "## Engineering evidence",
  "## Capital-project context",
  "## Technical stack",
  "## Professional context",
  "## Contact",
];

let previousIndex = -1;
for (const heading of requiredSections) {
  const index = markdown.indexOf(heading);
  if (index === -1) fail(`missing required section: ${heading}`);
  else if (index <= previousIndex) fail(`section is out of order: ${heading}`);
  previousIndex = index;
}

const firstSection = markdown.slice(0, markdown.indexOf("## "));
for (const required of [
  "# Florian Stuettgen",
  "I build evidence-first software for high-stakes operations.",
  "evidence-bound project controls systems",
  "EQ-Proof",
  "LinkedIn",
]) {
  if (!firstSection.includes(required)) fail(`first screen is missing: ${required}`);
}

const plainText = markdown
  .replace(/```[\s\S]*?```/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
  .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
  .replace(/https?:\/\/\S+/g, " ")
  .replace(/[#>*_|`~:·–—]/g, " ");
const wordCount = plainText.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)?.length ?? 0;
if (wordCount < 700 || wordCount > 1200) fail(`README must contain 700–1200 words; found ${wordCount}`);

const images = [...markdown.matchAll(/!\[([^\]]+)\]\(([^)]+)\)/g)];
if (images.length > 3) fail(`profile may contain at most three images; found ${images.length}`);
for (const [, alt, target] of images) {
  if (!alt.trim()) fail(`image is missing meaningful alt text: ${target}`);
  if (!/^https?:/i.test(target) && !existsSync(resolve(root, target))) fail(`local image target does not exist: ${target}`);
}

const badges = count(/(?:shields\.io|badge\.svg|github-readme-stats|streak-stats|github-profile-trophy)/giu);
if (badges > 6) fail(`profile may contain at most six badges; found ${badges}`);

for (const [pattern, label] of [
  [/query-cartographer/iu, "private repository reference"],
  [/schroedingers-close/iu, "private flagship reference"],
  [/private development/iu, "private-development teaser"],
  [/working build|\/pull\/1|feat\/salvage/iu, "unverified Real Estate build link"],
  [/mailto:/iu, "email contact route"],
  [/visitor count|profile views|contribution streak|github trophies/iu, "decorative profile metric"],
  [/revolutionary|cutting-edge|AI-powered|enterprise-ready/iu, "unsupported marketing language"],
]) {
  if (pattern.test(markdown)) fail(`forbidden content detected: ${label}`);
}

const portfolio = markdown.slice(markdown.indexOf("## Public portfolio"), markdown.indexOf("## Engineering evidence"));
previousIndex = -1;
for (const repository of ["### EQ-Proof", "### SOC_Replay"]) {
  const index = portfolio.indexOf(repository);
  if (index === -1) fail(`portfolio is missing: ${repository}`);
  else if (index <= previousIndex) fail(`portfolio order is wrong at: ${repository}`);
  previousIndex = index;
}

if (/^### Real Estate Decision Desk$/mu.test(portfolio)) {
  fail("Real Estate Decision Desk must not occupy interim flagship placement");
}
if (!/complementary public evidence; they are not presented as direct technical dependencies/u.test(markdown)) {
  fail("missing no-direct-dependency qualification");
}
if (!/Private products remain outside this review path until each has an independently accessible publication surface/u.test(markdown)) {
  fail("missing inaccessible-product publication boundary");
}
if (!/expose no employers, clients, production datasets, internal systems, or proprietary methods/u.test(markdown)) {
  fail("missing confidentiality boundary");
}

const contact = markdown.slice(markdown.indexOf("## Contact"));
const targets = [...contact.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
const linkedIn = "https://www.linkedin.com/in/florian-stuettgen/";
if (targets.length !== 1 || targets[0] !== linkedIn) fail("Contact must contain exactly one link: LinkedIn");

if (failures.length) {
  console.error("Profile verification failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Profile verification passed: ${wordCount} words, ${images.length} image, ${badges} badges.`);

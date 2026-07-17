import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const markdown = readFileSync(resolve(root, "README.md"), "utf8");
const failures = [];
const fail = (message) => failures.push(message);
const count = (pattern, value = markdown) => [...value.matchAll(pattern)].length;
const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");

const requiredLinks = [
  {
    label: "Try EQ-Proof →",
    target: "https://florianstuettgen.github.io/EQ-Proof/",
  },
  {
    label: "Open SOC evidence →",
    target:
      "https://github.com/FlorianStuettgen/SOC_Replay/blob/2745a95c0d285d11678ce297e5e8468d6b4b9f2e/reference/network-scan/report.md",
  },
  {
    label: "LinkedIn",
    target: "https://www.linkedin.com/in/florian-stuettgen/",
  },
];

function proseWordCount(value) {
  const text = value
    .replace(/```[\s\S]*?```/gu, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, "$1")
    .replace(/https?:\/\/[^\s<>"')]+/giu, " ")
    .replace(/<[^>]+>/gu, " ")
    .replace(/&[a-z]+;/giu, " ")
    .replace(/[#>*_|`~:·–—$();,]/gu, " ");

  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)?.length ?? 0;
}

function linksIn(value) {
  const links = [];
  const pattern = /(!?)\[([^\]]+)\]\(([^)]+)\)|<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/giu;

  for (const match of value.matchAll(pattern)) {
    if (match[1] === "!") continue;
    links.push({
      label: (match[2] ?? match[5] ?? "").replace(/<[^>]+>/gu, "").trim(),
      target: (match[3] ?? match[4] ?? "").trim(),
    });
  }

  return links;
}

function between(start, end) {
  const startIndex = markdown.indexOf(start);
  if (startIndex === -1) return "";
  const contentStart = startIndex + start.length;
  const endIndex = end ? markdown.indexOf(end, contentStart) : markdown.length;
  return markdown.slice(contentStart, endIndex === -1 ? markdown.length : endIndex);
}

const blocks = markdown.split(/\r?\n\s*\r?\n/u).map((block) => block.trim()).filter(Boolean);
const htmlHeadings = [...markdown.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/giu)];
const markdownHeadings = [...markdown.matchAll(/^\s{0,3}(#{1,6})\s+(.+)$/gmu)];
const setextHeadings = [...markdown.matchAll(/^(?!\s*$)(?!#{1,6}\s)(.+)\r?\n\s*(?:=+|-+)\s*$/gmu)];
const headingCount = htmlHeadings.length + markdownHeadings.length + setextHeadings.length;
const h2Headings = markdownHeadings
  .filter((match) => match[1].length === 2)
  .map((match) => match[2].trim());

const headlineBlock = blocks[0] ?? "";
const headlineMatch = headlineBlock.match(/^<h1\s+align=["']center["']>([^<]+)<\/h1>$/iu);
if (!headlineMatch) fail("the profile must open with one concise centered H1");
if (htmlHeadings.length !== 1 || htmlHeadings[0]?.[1] !== "1") {
  fail("the centered H1 must be the only HTML heading");
}
if (setextHeadings.length > 0 || markdownHeadings.some((match) => match[1].length !== 2)) {
  fail("only the centered H1 and level-two Markdown sections are permitted");
}
if (headingCount !== 2 || h2Headings.join("|") !== "Working products") {
  fail(`expected the compact working/private structure; found ${headingCount} headings (${h2Headings.join(", ") || "no H2s"})`);
}
const headlineWords = proseWordCount(headlineMatch?.[1] ?? "");
if (headlineWords < 4 || headlineWords > 10) fail(`headline must contain 4–10 words; found ${headlineWords}`);

const workingHeading = "## Working products";
const openingEnd = markdown.indexOf(workingHeading);
const opening = openingEnd === -1 ? "" : markdown.slice(0, openingEnd);
const working = between(workingHeading);
const productBlocks = working.split(/\r?\n\s*\r?\n/u).map((block) => block.trim()).filter(Boolean);
const eqBlock = productBlocks.find((block) => /\bEQ-Proof\b/iu.test(block)) ?? "";
const socBlock = productBlocks.find((block) => /\bSOC_Replay\b/iu.test(block)) ?? "";
const privateBlock = productBlocks.find((block) => /^\*\*Private development:\*\*/u.test(block)) ?? "";
const links = linksIn(markdown);
const openingLinks = linksIn(opening);

const openingProse = blocks.filter(
  (block) => opening.includes(block) && !/^<h1\b/iu.test(block) && linksIn(block).length === 0,
);
if (openingProse.length !== 1) fail(`opening must contain one brief thesis; found ${openingProse.length}`);
const thesisWords = proseWordCount(openingProse[0] ?? "");
if (thesisWords < 8 || thesisWords > 30) fail(`opening thesis must contain 8–30 words; found ${thesisWords}`);
if (!/\b(?:engineer|build)\w*\b[^\n]*\b(?:software|systems?|products?)\b/iu.test(openingProse[0] ?? "")) {
  fail("opening thesis must make the engineering specialization clear");
}

if (
  openingLinks.length !== requiredLinks.length ||
  openingLinks.some(
    (link, index) =>
      link.label !== requiredLinks[index].label || link.target !== requiredLinks[index].target,
  )
) {
  fail("opening calls to action must be Try EQ-Proof, Open SOC evidence, and LinkedIn in that order");
}
if (links.length !== requiredLinks.length) {
  fail(`only the three primary calls to action are permitted; found ${links.length} links`);
}
for (const requiredLink of requiredLinks) {
  if (!links.some((link) => link.target === requiredLink.target)) {
    fail(`required public link is missing: ${requiredLink.target}`);
  }
}
if (count(/<strong>\s*<a\b/giu, opening) !== 2) {
  fail("the two working-product calls to action must be visually dominant");
}
if (count(/<p\s+align=["']center["']>/giu, opening) !== 2) {
  fail("the thesis and three primary calls to action must remain centered");
}

if (productBlocks.length !== 3) {
  fail(`working products must use two outcome blocks and one private-development block; found ${productBlocks.length}`);
}
if (count(/\bEQ-Proof\b/giu, working) !== 1 || count(/\bSOC_Replay\b/gu, working) !== 1) {
  fail("the working-products section must name EQ-Proof and SOC_Replay once each");
}
if (!/(?:finds?|flags?|exposes?)[^\n]*forecast[^\n]*contradiction|forecast[^\n]*contradiction[^\n]*(?:finds?|flags?|exposes?)/iu.test(eqBlock)) {
  fail("EQ-Proof needs a concise contradiction-finding outcome");
}
if (!/monthly close/iu.test(eqBlock)) fail("EQ-Proof outcome must identify the before-close benefit");
if (!/(?:checks?|compares?|verifies?)[^\n]*indexed[^\n]*full-scan reference path/iu.test(socBlock)) {
  fail("SOC_Replay needs the indexed/full-scan verification outcome");
}
if (!/\bevidence\b/iu.test(socBlock)) fail("SOC_Replay outcome must point to inspectable evidence");
if (proseWordCount(eqBlock) > 14) fail("EQ-Proof outcome exceeds 14 words");
if (proseWordCount(socBlock) > 18) fail("SOC_Replay outcome exceeds 18 words");

for (const product of ["Schrödinger’s Close", "Query Cartographer"]) {
  if (count(new RegExp(product.replace(/[’']/gu, "[’']"), "giu")) !== 1) {
    fail(`${product} must appear exactly once in the private-development line`);
  }
  if (!new RegExp(product.replace(/[’']/gu, "[’']"), "iu").test(privateBlock)) {
    fail(`${product} must remain inside the shared private-development line`);
  }
}
if (!/^\*\*Private development:\*\*/u.test(privateBlock)) {
  fail("future products must share one compact private-development line");
}
if (!/\bprivate\b/iu.test(privateBlock) || !/\bdevelopment\b/iu.test(privateBlock)) {
  fail("future products must be explicitly identified as private development");
}
if (linksIn(privateBlock).length > 0) fail("private products may not have profile links");
if (proseWordCount(privateBlock) > 25) fail("private-development copy exceeds 25 words");
const currentAvailabilityClaim =
  /\b(?:is|are|now|currently|already)\s+(?:publicly\s+)?(?:available|live|public|released|launched|shipping|deployed|operational|in production)\b|\b(?:try|open|use)\s+(?:Schrödinger[’']s Close|Query Cartographer)\b/iu;
const privateProductAvailabilityClaim =
  /(?:Schrödinger[’']s Close|Query Cartographer|private products?)[^.\n]{0,60}\b(?:available|accessible|live|public|released|launched|shipping|open|in production|today)\b|\b(?:available|accessible|live|public|released|launched|shipping|open|in production|today)\b[^.\n]{0,60}(?:Schrödinger[’']s Close|Query Cartographer|private products?)/iu;
if (
  currentAvailabilityClaim.test(markdown) ||
  privateProductAvailabilityClaim.test(markdown) ||
  /\b(?:can be|ready to be)\s+(?:used|tried|opened|viewed|demoed)\b|\b(?:users|customers)\s+can\s+(?:use|try|open)\b/iu.test(markdown)
) {
  fail("a private product is represented as currently usable or public");
}

const lines = markdown.split(/\r?\n/u);
const technologyInventoryCount = blocks.filter((block) => {
  const technologies = [
    "TypeScript",
    "JavaScript",
    "React",
    "Python",
    "SQL",
    "Node.js",
    "Go",
    "Rust",
    "Java",
    "C#",
    "C++",
    ".NET",
    "Docker",
    "Kubernetes",
    "Terraform",
    "AWS",
    "Azure",
    "GCP",
  ];
  return technologies.filter((technology) =>
    new RegExp(`(?:^|[^\\p{L}\\p{N}_])${escapePattern(technology)}(?:$|[^\\p{L}\\p{N}_])`, "iu").test(block),
  ).length >= 2;
}).length;
const genericInventoryCount = blocks.filter(
  (block) =>
    linksIn(block).length === 0 &&
    /(?:[\p{L}\p{N}+#.]+\s*(?:·|\||\/|,)\s*){2,}[\p{L}\p{N}+#.]+/u.test(block),
).length;
if (technologyInventoryCount > 0 || genericInventoryCount > 0) {
  fail(`technology inventory lines are forbidden; found ${technologyInventoryCount + genericInventoryCount}`);
}
if (/\bevidence-first\b|\bhigh-stakes operations\b/iu.test(markdown)) {
  fail("former sidebar wording is duplicated in the README");
}

const tableSeparator = /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/u;
let markdownTableCount = 0;
for (let index = 0; index < lines.length - 1; index += 1) {
  if (lines[index].includes("|") && tableSeparator.test(lines[index + 1])) markdownTableCount += 1;
}
const tableCount = markdownTableCount + count(/<table\b/giu);
const badgeCount = count(/(?:shields\.io|badge\.svg|github-readme-stats|streak-stats|github-profile-trophy)/giu);
const imageCount =
  count(/!\[[^\]]*\]\([^)]*\)/gu) +
  count(/!\[[^\]]+\]\s*\[[^\]]*\]/gu) +
  count(/!\[[^\]]+\](?![([])/gu) +
  count(/<img\b/giu);
const emailAddressCount = count(/mailto:|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/giu);
const markupWithoutDeclaredLinks = markdown
  .replace(/<a\b[^>]*>[\s\S]*?<\/a>/giu, " ")
  .replace(/!?\[[^\]]+\]\([^)]*\)/gu, " ");
const bareUrlCount = count(/https?:\/\/[^\s<>"')]+/giu, markupWithoutDeclaredLinks);
const bareWwwUrlCount = count(/\bwww\.[^\s<>"')]+/giu, markupWithoutDeclaredLinks);
const referenceLinkCount =
  count(/!?\[[^\]]+\]\s*\[[^\]]*\]/gu) + count(/^\s{0,3}\[[^\]]+\]:\s+\S+/gmu);
const ownerRepositoryUrls = [...markdown.matchAll(/https:\/\/(?:www\.)?github\.com\/FlorianStuettgen\/([^/\s<>"')]+)/giu)];
const approvedPublicRepositories = new Set(["eq-proof", "soc_replay"]);
const privateRepositoryUrlCount = ownerRepositoryUrls.filter(
  (match) => !approvedPublicRepositories.has(match[1].toLowerCase()),
).length;
const wordCount = proseWordCount(markdown);

if (wordCount > 100) fail(`README exceeds the 100-word first-viewport ceiling; found ${wordCount}`);
if (tableCount > 0) fail(`tables are forbidden; found ${tableCount}`);
if (badgeCount > 0) fail(`badge walls are forbidden; found ${badgeCount} badge references`);
if (imageCount > 0) fail(`images are outside this compact profile package; found ${imageCount}`);
if (privateRepositoryUrlCount > 0) {
  fail(`private repository URLs are forbidden; found ${privateRepositoryUrlCount}`);
}
if (emailAddressCount > 0) fail(`email addresses are forbidden; found ${emailAddressCount}`);
if (bareUrlCount > 0 || bareWwwUrlCount > 0 || referenceLinkCount > 0) {
  fail("unparsed, bare, and reference-style links are forbidden");
}
if (/Real Estate Decision Desk|meal[- ]planner|TikTok profile(?: to text)?|\bflagship\b/iu.test(markdown)) {
  fail("secondary-project flagship content is forbidden");
}
const approvedBoldLabels = new Set([
  "EQ-Proof",
  "SOC_Replay",
  "Private development:",
  "Schrödinger’s Close",
  "Query Cartographer",
]);
const unapprovedBoldLabelCount = [...markdown.matchAll(/\*\*([^*]+)\*\*/gu)].filter(
  (match) => !approvedBoldLabels.has(match[1]),
).length;
if (unapprovedBoldLabelCount > 0) {
  fail(`secondary emphasis is forbidden; found ${unapprovedBoldLabelCount} unapproved bold labels`);
}
const bodyWithoutApprovedNames = [openingProse[0] ?? "", ...productBlocks]
  .join("\n")
  .replace(/EQ-Proof|SOC_Replay|Private development:|Schrödinger[’']s Close|Query Cartographer|\bI\b/gu, " ")
  .replace(/<[^>]+>|\*\*/gu, " ");
const unexpectedNamedTokenCount = count(/\b[A-Z][\p{L}\p{N}_+#.-]*\b/gu, bodyWithoutApprovedNames);
if (unexpectedNamedTokenCount > 0) {
  fail(`unapproved named project or technology terms are forbidden; found ${unexpectedNamedTokenCount}`);
}
const secondaryPitch =
  /\b(?:launch(?:ing|ed)?|introduc(?:ing|ed)?|ship(?:ping|ped)?|unveil(?:ing|ed)?|promot(?:ing|ed)?)\b[^.\n]{0,80}\b(?:product|project|application|app|tool|platform|repository|repo)\b|\b(?:new|another|other|additional|secondary)\b[^.\n]{0,50}\b(?:product|project|application|app|tool|platform|repository|repo)\b/iu;
if (secondaryPitch.test(markdown)) {
  fail("secondary-project promotional content is forbidden");
}
if (
  /\b(?:all|always|any|every|perfect(?:ly)?|guarantee[sd]?|flawless|infallible|exhaustive|definitive|never|independent implementation|zero false positives?|without (?:error|exception|miss(?:es)?))\b|\b100\s*%/iu.test(working)
) {
  fail("working-product outcomes contain an unsupported absolute or independence claim");
}
if (/\bimmutable\b/iu.test(markdown)) fail("mutable releases must not be described as immutable");

const containerCount = count(/^\s{0,3}(?:>|(?:[-+*]|\d+[.)])\s+)/gmu);
const fencedCodeCount = count(/^\s{0,3}(?:`{3,}|~{3,})/gmu);
if (containerCount > 0 || fencedCodeCount > 0) {
  fail("lists, blockquotes, and fenced code are outside the compact profile grammar");
}

if (failures.length) {
  console.error("Profile verification failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `Profile verification passed: ${wordCount} prose words, ${headingCount} headings, ${links.length} links, ` +
    `${tableCount} tables, ${badgeCount} badges, ${imageCount} images, ${privateRepositoryUrlCount} private repository URLs, ` +
    `${emailAddressCount} email addresses.`,
);

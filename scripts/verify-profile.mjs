import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const markdown = readFileSync(resolve(root, "README.md"), "utf8");
const failures = [];
const fail = (message) => failures.push(message);
const count = (pattern, value = markdown) => [...value.matchAll(pattern)].length;

function proseWordCount(value, { excludeLinkText = false } = {}) {
  let text = value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ");

  if (excludeLinkText) {
    text = text
      .replace(/\[[^\]]+\]\([^)]*\)/g, " ")
      .replace(/<a\b[^>]*>[\s\S]*?<\/a>/giu, " ");
  } else {
    text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  }

  text = text
    .replace(/https?:\/\/[^\s<>"')]+/giu, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/giu, " ")
    .replace(/[#>*_|`~:·–—$();,]/g, " ");

  return text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)?.length ?? 0;
}

function linksIn(value) {
  const links = [];
  const pattern = /(!?)\[([^\]]+)\]\(([^)]+)\)|<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/giu;
  for (const match of value.matchAll(pattern)) {
    if (match[1] === "!") continue;
    links.push({
      label: (match[2] ?? match[5] ?? "").replace(/<[^>]+>/g, "").trim(),
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

function proseParagraphs(value) {
  return value
    .split(/\r?\n\s*\r?\n/u)
    .map((block) => block.trim())
    .filter(
      (block) =>
        block &&
        !/^#{1,6}\s/u.test(block) &&
        !/^<h1\s+align=["']center["']>Evidence-first software for high-stakes operations<\/h1>$/iu.test(block) &&
        !/^<p\s+align=["']center["']><strong>TypeScript[^<]*React[^<]*Python[^<]*SQL<\/strong><\/p>$/iu.test(block) &&
        proseWordCount(block, { excludeLinkText: true }) > 0,
    );
}

const markdownHeadings = [...markdown.matchAll(/^(#{1,6})\s+(.+)$/gmu)];
const htmlHeadings = [...markdown.matchAll(/<h([1-6])\b[^>]*>[\s\S]*?<\/h\1>/giu)];
const setextHeadings = [...markdown.matchAll(/^(?!\s*$)(?!#{1,6}\s)(.+)\r?\n\s*(?:=+|-+)\s*$/gmu)];
const headingCount = markdownHeadings.length + htmlHeadings.length + setextHeadings.length;
const h2Headings = markdownHeadings.filter((match) => match[1].length === 2).map((match) => match[2].trim());
const h3Headings = markdownHeadings.filter((match) => match[1].length === 3).map((match) => match[2].trim());

if (!/<h1\s+align=["']center["']>Evidence-first software for high-stakes operations<\/h1>/iu.test(markdown)) {
  fail("missing the approved centered evidence-first headline");
}
if (htmlHeadings.length !== 1 || htmlHeadings[0]?.[1] !== "1") {
  fail("the approved centered H1 is the only permitted HTML heading");
}
if (markdownHeadings.some((match) => match[1].length === 1) || setextHeadings.length > 0 || headingCount !== 8) {
  fail(`expected exactly eight approved headings with no Markdown H1 or Setext variants; found ${headingCount}`);
}
if (markdownHeadings.some((match) => match[1].length > 3) || htmlHeadings.some((match) => Number(match[1]) > 3)) {
  fail("headings may not be deeper than level three");
}
if (h2Headings.length !== 3 || h2Headings.join("|") !== "Working in public|Building next|About") {
  fail(`expected exactly the three approved H2 headings in order; found ${h2Headings.join(", ") || "none"}`);
}
if (h3Headings.join("|") !== "EQ-Proof|SOC_Replay|Schrödinger’s Close|Query Cartographer") {
  fail(`unexpected H3 structure: ${h3Headings.join(", ") || "none"}`);
}

const opening = markdown.slice(0, markdown.indexOf("## Working in public"));
for (const technology of ["TypeScript", "React", "Python", "SQL"]) {
  if (!opening.includes(technology)) fail(`technology line is missing ${technology}`);
}
const openingLinks = linksIn(opening);
const expectedOpeningLinks = [
  ["Open EQ-Proof", "https://florianstuettgen.github.io/EQ-Proof/"],
  ["Inspect SOC_Replay", "https://github.com/FlorianStuettgen/SOC_Replay/blob/main/reference/network-scan/report.md"],
  ["LinkedIn", "https://www.linkedin.com/in/florian-stuettgen/"],
];
if (openingLinks.length !== 3 || openingLinks.some((link, index) => link.label !== expectedOpeningLinks[index][0] || link.target !== expectedOpeningLinks[index][1])) {
  fail("centered opening must contain exactly the three approved links in order");
}
const openingHtmlTags = [...opening.matchAll(/<\/?([a-z][a-z0-9]*)\b[^>]*>/giu)].map((match) => match[1].toLowerCase());
const expectedOpeningHtmlTags = ["h1", "h1", "p", "strong", "strong", "p", "p", "a", "a", "a", "a", "a", "a", "p"];
if (openingHtmlTags.join("|") !== expectedOpeningHtmlTags.join("|")) {
  fail("the centered opening may contain only the approved headline, technology line, and three-link HTML structure");
}
if (count(/<p\s+align=["']center["']>/giu, opening) !== 2) {
  fail("the technology line and three-link opening must both remain centered");
}
const bodyHtmlTagCount = count(/<\/?[a-z][a-z0-9]*\b[^>]*>/giu, markdown.slice(markdown.indexOf("## Working in public")));
if (bodyHtmlTagCount > 0) fail(`HTML is forbidden outside the approved centered opening; found ${bodyHtmlTagCount} tags`);

const thesisParagraphs = proseParagraphs(opening);
if (thesisParagraphs.length !== 1) fail(`opening must contain exactly one thesis paragraph; found ${thesisParagraphs.length}`);
const thesis = thesisParagraphs[0] ?? "";
const thesisWords = proseWordCount(thesis);
if (thesisWords === 0 || thesisWords > 45) fail(`thesis must contain 1–45 prose words; found ${thesisWords}`);
for (const term of ["source evidence", "transformations", "assumptions", "unresolved contradictions", "inspect", "reproduce"]) {
  if (!thesis.toLowerCase().includes(term)) fail(`thesis is missing: ${term}`);
}

const working = between("## Working in public", "## Building next");
const eqSection = working.slice(working.indexOf("### EQ-Proof") + "### EQ-Proof".length, working.indexOf("### SOC_Replay"));
const socSection = working.slice(working.indexOf("### SOC_Replay") + "### SOC_Replay".length);
const eqParagraphs = proseParagraphs(eqSection);
const socParagraphs = proseParagraphs(socSection);
if (eqParagraphs.length !== 1) fail(`EQ-Proof must contain exactly one prose paragraph; found ${eqParagraphs.length}`);
if (socParagraphs.length !== 1) fail(`SOC_Replay must contain exactly one prose paragraph; found ${socParagraphs.length}`);
const eqParagraph = eqParagraphs[0] ?? "";
const socParagraph = socParagraphs[0] ?? "";
const eqWords = proseWordCount(eqParagraph, { excludeLinkText: true });
const socWords = proseWordCount(socParagraph, { excludeLinkText: true });
if (eqWords > 70) fail(`EQ-Proof description exceeds 70 prose words; found ${eqWords}`);
if (socWords > 65) fail(`SOC_Replay description exceeds 65 prose words; found ${socWords}`);
if (linksIn(eqSection).length > 3) fail(`EQ-Proof may contain at most three links; found ${linksIn(eqSection).length}`);
if (linksIn(socSection).length > 3) fail(`SOC_Replay may contain at most three links; found ${linksIn(socSection).length}`);
if (!/current public project-controls application/iu.test(eqParagraph)) fail("EQ-Proof is not identified as the current public project-controls application");
if (!/working predecessor to Schrödinger’s Close/iu.test(eqParagraph)) fail("EQ-Proof predecessor wording is missing");
for (const amount of ["$407M", "$418M", "$11M"]) {
  if (!eqParagraph.includes(amount)) fail(`EQ-Proof example is missing ${amount}`);
}
for (const claim of ["offline Python pipeline", "typed rules", "contracts", "indexed execution", "full-scan reference path", "verifiable evidence bundle"]) {
  if (!socParagraph.includes(claim)) fail(`SOC_Replay description is missing: ${claim}`);
}

const building = between("## Building next", "## About");
const closeSection = building.slice(building.indexOf("### Schrödinger’s Close") + "### Schrödinger’s Close".length, building.indexOf("### Query Cartographer"));
const querySection = building.slice(building.indexOf("### Query Cartographer") + "### Query Cartographer".length);
const closeParagraphs = proseParagraphs(closeSection);
const queryParagraphs = proseParagraphs(querySection);
if (closeParagraphs.length !== 1) fail(`Schrödinger’s Close must contain exactly one prose paragraph; found ${closeParagraphs.length}`);
if (queryParagraphs.length !== 2) fail(`Query Cartographer must contain one product paragraph and one publication-gate paragraph; found ${queryParagraphs.length}`);
const closeParagraph = closeParagraphs[0] ?? "";
const queryParagraph = queryParagraphs[0] ?? "";
const closeWords = proseWordCount(closeParagraph, { excludeLinkText: true });
const queryWords = proseWordCount(queryParagraph, { excludeLinkText: true });
if (closeWords > 45) fail(`Schrödinger’s Close statement exceeds 45 prose words; found ${closeWords}`);
if (queryWords > 40) fail(`Query Cartographer statement exceeds 40 prose words; found ${queryWords}`);
if (!/planned commercial successor to EQ-Proof/iu.test(closeParagraph) || !/private development/iu.test(closeParagraph)) {
  fail("Schrödinger’s Close must be the planned commercial successor under private development");
}
if (!/private, local-first SQL comprehension and change-impact product/iu.test(queryParagraph) || !/under development/iu.test(queryParagraph)) {
  fail("Query Cartographer must be a private local-first product under development");
}
const publicationGate = "Public product demonstrations will follow only after their security, release, and publication gates pass.";
const unavailableClaim = /\b(?:available|deployed|live|public|publicly|released|shipping|launched|demo|preview|production[- ]ready)\b|\bopen to (?:the )?public\b/iu;
if (unavailableClaim.test(closeSection)) fail("Schrödinger’s Close is presented as currently available");
if (unavailableClaim.test(querySection.replace(publicationGate, ""))) fail("Query Cartographer is presented as currently available");
if (!building.includes(publicationGate)) {
  fail("missing the shared future-publication gate statement");
}
if (queryParagraphs[1] !== publicationGate) {
  fail("the Query Cartographer section must end with the exact shared publication-gate statement");
}

const about = between("## About");
const aboutParagraphs = proseParagraphs(about);
if (aboutParagraphs.length !== 1) fail(`About must contain exactly one prose paragraph; found ${aboutParagraphs.length}`);
const aboutParagraph = aboutParagraphs[0] ?? "";
const aboutWords = proseWordCount(aboutParagraph, { excludeLinkText: true });
if (aboutWords > 50) fail(`About paragraph exceeds 50 prose words; found ${aboutWords}`);
for (const term of ["More than ten years", "MBA", "MIT Applied Data Science", "senior engineering roles", "enterprise evaluation", "licensing or product discussions", "LinkedIn"]) {
  if (!aboutParagraph.includes(term)) fail(`About paragraph is missing: ${term}`);
}

const links = linksIn(markdown);
const markdownLines = markdown.split(/\r?\n/u);
const tableSeparator = /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/u;
let markdownTableSyntaxCount = 0;
for (let index = 0; index < markdownLines.length - 1; index += 1) {
  if (markdownLines[index].includes("|") && tableSeparator.test(markdownLines[index + 1])) markdownTableSyntaxCount += 1;
}
const htmlTableCount = count(/<table\b/giu);
const tableCount = markdownTableSyntaxCount + htmlTableCount;
const referenceUseCount = count(/!?\[[^\]]+\]\s*\[[^\]]*\]/gu);
const referenceDefinitionCount = count(/^\s{0,3}\[[^\]]+\]:\s+\S+/gmu);
const autolinkCount = count(/<(?:https?:\/\/|mailto:)[^ >]+>/giu);
const markupWithoutDeclaredLinks = markdown
  .replace(/<a\b[^>]*>[\s\S]*?<\/a>/giu, " ")
  .replace(/!?\[[^\]]+\]\([^)]*\)/gu, " ");
const bareUrlCount = count(/https?:\/\/[^\s<>"')]+/giu, markupWithoutDeclaredLinks);
const bareWwwUrlCount = count(/\bwww\.[^\s<>"')]+/giu, markupWithoutDeclaredLinks);
const referenceImageCount = count(/!\[[^\]]+\]\s*\[[^\]]*\]/gu);
const imageCount = count(/!\[[^\]]*\]\([^)]*\)/gu) + referenceImageCount + count(/<img\b/giu);
const badgeCount = count(/(?:shields\.io|badge\.svg|github-readme-stats|streak-stats|github-profile-trophy)/giu);
const approvedPublicRepositories = new Set(["eq-proof", "soc_replay"]);
const resolvedLinkTargets = links.map((link) => {
  try {
    return new URL(link.target, "https://github.com");
  } catch {
    return null;
  }
});
const nonAbsoluteHttpsLinkCount = links.filter((link) => !/^https:\/\/[^\s]+$/iu.test(link.target)).length;
const ownerRepositoryUrls = resolvedLinkTargets.filter(
  (target) =>
    target &&
    target.hostname.toLowerCase() === "github.com" &&
    target.pathname.split("/").filter(Boolean)[0]?.toLowerCase() === "florianstuettgen" &&
    target.pathname.split("/").filter(Boolean).length >= 2,
);
const privateUrlCount = ownerRepositoryUrls.filter((target) => {
  const repository = target.pathname.split("/").filter(Boolean)[1]?.toLowerCase() ?? "";
  return !approvedPublicRepositories.has(repository);
}).length;
const emailAddressCount = count(/mailto:|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/giu);
const wordCount = proseWordCount(markdown);

if (wordCount < 300 || wordCount > 425) fail(`README must contain 300–425 prose words; found ${wordCount}`);
if (wordCount > 450) fail(`README exceeds the 450-word hard safety ceiling; found ${wordCount}`);
if (links.length > 10) fail(`README may contain at most ten links; found ${links.length}`);
if (tableCount > 0) fail(`tables are forbidden; found ${tableCount}`);
if (referenceUseCount > 0 || referenceDefinitionCount > 0) fail("reference-style links and images are forbidden; use explicit inline links");
if (autolinkCount > 0 || bareUrlCount > 0 || bareWwwUrlCount > 0) fail("autolinks and bare URLs are forbidden; use explicit labeled links");
if (nonAbsoluteHttpsLinkCount > 0) fail(`all links must use absolute HTTPS targets; found ${nonAbsoluteHttpsLinkCount}`);
if (badgeCount > 0) fail(`badges are forbidden; found ${badgeCount}`);
if (imageCount > 0) fail(`images are forbidden; found ${imageCount}`);
if (privateUrlCount > 0) fail(`private repository URLs are forbidden; found ${privateUrlCount}`);
if (emailAddressCount > 0) fail(`email addresses are forbidden; found ${emailAddressCount}`);
if (/Real Estate Decision Desk/iu.test(markdown)) fail("Real Estate Decision Desk must not appear in the profile");

for (const [label, paragraph] of [
  ["thesis", thesis],
  ["EQ-Proof", eqParagraph],
  ["SOC_Replay", socParagraph],
  ["Schrödinger’s Close", closeParagraph],
  ["Query Cartographer", queryParagraph],
  ["About", aboutParagraph],
]) {
  if (paragraph.length > 330) fail(`${label} paragraph exceeds the three-line density guard of 330 characters; found ${paragraph.length}`);
}

for (const forbiddenHeading of ["Engineering evidence", "Technical stack", "Capital-project context", "Professional context", "Background", "Contact"]) {
  if (new RegExp(`^## ${forbiddenHeading}$`, "mu").test(markdown)) fail(`obsolete section remains: ${forbiddenHeading}`);
}
for (const requiredTarget of [
  "https://florianstuettgen.github.io/EQ-Proof/",
  "https://github.com/FlorianStuettgen/SOC_Replay/blob/main/reference/network-scan/report.md",
  "https://www.linkedin.com/in/florian-stuettgen/",
]) {
  if (!links.some((link) => link.target === requiredTarget)) fail(`required public evidence link is missing: ${requiredTarget}`);
}

for (const paragraph of markdown.split(/\r?\n\s*\r?\n/u).map((block) => block.trim()).filter(Boolean)) {
  if (
    /^#{1,6}\s/u.test(paragraph) ||
    /^<h1\s+align=["']center["']>Evidence-first software for high-stakes operations<\/h1>$/iu.test(paragraph) ||
    /^<p\s+align=["']center["']><strong>TypeScript[^<]*React[^<]*Python[^<]*SQL<\/strong><\/p>$/iu.test(paragraph)
  ) continue;
  const words = proseWordCount(paragraph);
  if (words > 70) fail(`paragraph exceeds the density guard of 70 prose words; found ${words}: ${paragraph.slice(0, 60)}…`);
}

if (failures.length) {
  console.error("Profile verification failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `Profile verification passed: ${wordCount} prose words, ${headingCount} headings, ${links.length} links, ` +
  `${tableCount} tables, ${badgeCount} badges, ${imageCount} images, ${privateUrlCount} private repository URLs, ` +
  `${emailAddressCount} email addresses.`,
);

import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const markdown = readFileSync(resolve(root, "README.md"), "utf8").replace(/\r\n/gu, "\n").trim();
const failures = [];
const fail = (message) => failures.push(message);
const expectedLinks = [
  ["EQ-Proof", "https://github.com/FlorianStuettgen/EQ-Proof"],
  ["SOC_Replay", "https://github.com/FlorianStuettgen/SOC_Replay"],
  ["LinkedIn", "https://www.linkedin.com/in/florian-stuettgen/"],
];
const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/gu;
const links = [...markdown.matchAll(linkPattern)].map((match) => [match[1], match[2]]);
const bannerMarkup = '<img src="assets/profile-banner.svg" alt="" width="100%">';
const bannerPath = resolve(root, "assets/profile-banner.svg");
const prose = markdown.replace(bannerMarkup, "").replace("<br>", "").replace("<br>", "");

function wordCount(value) {
  return value.replace(/<[^>]*>/gu, " ").replace(linkPattern, "$1").match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)?.length ?? 0;
}

if (!markdown.startsWith(`${bannerMarkup}\n\n# Florian Stuettgen\n`)) {
  fail("open with the local banner followed by the name heading");
}
const headings = markdown.match(/^ {0,3}#{1,6} +.+$/gmu) ?? [];
if (headings.join("|") !== "# Florian Stuettgen|## Selected work") {
  fail("use only the name heading and Selected work heading");
}

const intro = markdown.match(/# Florian Stuettgen\n+([\s\S]*?)\n+## Selected work/u)?.[1] ?? "";
if (intro.includes("\n") || !/[.!?]$/u.test(intro) || (intro.match(/[.!?](?:\s|$)/gu)?.length ?? 0) !== 1 || wordCount(intro) > 25) {
  fail("keep the introduction to one sentence of at most 25 words");
}
const projectEntries = [...markdown.matchAll(/^\*\*\[([^\]]+)\]\([^)]+\)\*\*<br>\n[^\n]+$/gmu)];
if (projectEntries.map((entry) => entry[1]).join("|") !== "EQ-Proof|SOC_Replay") {
  fail("present each project as a bold link followed by a description on the next line");
}
if (!markdown.endsWith(`\n\n---\n\n[LinkedIn](${expectedLinks[2][1]})`)) {
  fail("finish with a divider and a single LinkedIn link");
}
if (JSON.stringify(links) !== JSON.stringify(expectedLinks) || /https?:\/\/|www\.|mailto:/iu.test(markdown.replace(linkPattern, "$1"))) {
  fail("include only the EQ-Proof, SOC_Replay, and LinkedIn links in that order");
}
if (/!\[|<[^>]*>|shields\.io|github-readme-stats|streak-stats|github-profile-trophy/iu.test(prose)) {
  fail("allow only the local banner and two project line breaks as HTML; omit other images and badges");
}
if (/PAID[_ -]?PILOT|\b(?:services?|consulting|freelanc(?:e|ing)|paid pilots?|pilot offers?|hire me|available for|contact me for|book (?:a |an )?(?:call|consultation)|let['’]s work together)\b/iu.test(markdown)) {
  fail("remove service pitches and pilot offers");
}

if (!existsSync(bannerPath)) {
  fail("the profile banner asset is missing");
} else {
  const banner = readFileSync(bannerPath, "utf8");
  if (!/^<svg\b[^>]*\bviewBox\s*=/iu.test(banner) || !/<title\b[^>]*>[^<]+<\/title>/iu.test(banner) || !/<desc\b[^>]*>[^<]+<\/desc>/iu.test(banner)) {
    fail("the banner must be an SVG with a viewBox, title, and description");
  }
  const externalCss = [...banner.matchAll(/url\(([^)]*)\)/giu)].some((match) => !/^["']?#[^"']+["']?$/u.test(match[1].trim()));
  if (/<(?:script|foreignObject)\b|\bon[a-z]+\s*=|\b(?:href|src)\s*=\s*["'](?!#)|@import|<!DOCTYPE|<!ENTITY/iu.test(banner) || externalCss) {
    fail("the banner must be self-contained and free of scripts, events, and foreignObject elements");
  }
  if (statSync(bannerPath).size > 20_000) fail("keep the banner within 20 KB");
}

const words = wordCount(markdown);
if (words >= 80) fail(`keep the profile under 80 words; found ${words}`);

if (failures.length) {
  console.error("Profile verification failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Profile verification passed: ${words} words, one local banner, two projects, and one LinkedIn link.`);

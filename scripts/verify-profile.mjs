import { existsSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const markdown = readFileSync(resolve(root, "README.md"), "utf8").replace(/\r\n/gu, "\n").trim();
const failures = [];
const fail = (message) => failures.push(message);
const links = [...markdown.matchAll(/!?\[([^\]]*)\]\(([^)]+)\)/gu)];
const requiredDestinations = [
  "https://github.com/FlorianStuettgen/EQ-Proof",
  "https://florianstuettgen.github.io/EQ-Proof/",
  "https://github.com/FlorianStuettgen/SOC_Replay",
  "https://www.linkedin.com/in/florian-stuettgen/",
];

if (!markdown.startsWith("# Florian Stuettgen\n")) fail("open with the profile name");
if (!/^## Selected work$/mu.test(markdown)) fail("include a Selected work section");
for (const project of ["EQ-Proof", "Schrödinger’s Close", "Query Cartographer", "SOC_Replay"]) {
  const section = markdown.split(/^### /mu).find((part) => part.startsWith(project));
  if (!section) {
    fail("include " + project + " in the selected work");
    continue;
  }
  if (!/\[[^\]]+\]\(https:\/\//u.test(section)) fail(project + " needs a public review path");
  if (["Schrödinger’s Close", "Query Cartographer"].includes(project) && !section.includes("Private source")) {
    fail("disclose the source boundary for " + project);
  }
}

for (const destination of requiredDestinations) {
  if (!links.some((link) => link[2] === destination)) fail("missing public destination: " + destination);
}
for (const [, label, destination] of links) {
  if (!label.trim()) fail("give each link a descriptive label");
  if (destination.startsWith("https://")) {
    const url = new URL(destination);
    if (!["github.com", "florianstuettgen.github.io", "www.linkedin.com"].includes(url.hostname)) {
      fail("unexpected external host: " + url.hostname);
    }
    if (url.hostname === "github.com" && /^\/FlorianStuettgen\/(?:schroedingers-close|query-cartographer|query-cartographer-pages)(?:\/|$)/iu.test(url.pathname)) {
      fail("send visitors to a public demonstration, not a private repository");
    }
  } else if (!destination.startsWith("#")) {
    const path = resolve(root, destination.split("#")[0]);
    const local = relative(root, path);
    if (local.startsWith("..") || isAbsolute(local) || !existsSync(path)) fail("invalid local link: " + destination);
  }
}

if (/shields\.io|github-readme-stats|streak-stats|github-profile-trophy|<script\b/iu.test(markdown)) {
  fail("keep the profile free of dynamic badges, counters, and scripts");
}
if (/PAID[_ -]?PILOT|\b(?:consulting|freelanc(?:e|ing)|paid pilots?|hire me|book (?:a |an )?(?:call|consultation))\b/iu.test(markdown)) {
  fail("keep commercial pitches outside the portfolio introduction");
}
if (!markdown.includes("synthetic")) fail("identify demonstration evidence as synthetic");
const words = markdown.replace(/\[([^\]]+)\]\([^)]+\)/gu, "$1").match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)?.length ?? 0;
if (words > 500) fail("keep the profile within 500 words; found " + words);

if (failures.length) {
  console.error("Profile verification failed:\n" + failures.map((failure) => "- " + failure).join("\n"));
  process.exit(1);
}
console.log("Profile verification passed: " + words + " words, four projects, public review paths, and explicit source boundaries.");

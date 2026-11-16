import puppeteer, { type Browser } from "puppeteer";
import { existsSync } from "node:fs";

const githubData = await fetch(
  "https://api.github.com/users/howardchung/repos?per_page=100",
);
const odotaData = await fetch(
  "https://api.github.com/users/odota/repos?per_page=100",
);
const githubJson = await githubData.json();
const odotaJson = await odotaData.json();
const combined: Repos = [...githubJson, ...odotaJson];

let browser: Browser | undefined;
try {
  for (const repo of combined) {
    const fileName = `./public/${repo.full_name.replace("/", "_")}.png`;
    if (
      repo.homepage &&
      !repo.fork &&
      !repo.homepage.endsWith(".jpg") &&
      !existsSync(fileName)
    ) {
      let picUrl = repo.homepage;
      if (picUrl.startsWith("https://www.npmjs.com")) {
        // Screenshot the GitHub page for npm packages
        picUrl = repo.html_url;
      }
      console.log("capturing %s", picUrl);
      browser ??= await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      try {
        await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
        await page.emulateMediaFeatures([
          { name: "prefers-color-scheme", value: "dark" },
        ]);
        await page.goto(picUrl, { waitUntil: "load", timeout: 60000 });
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await page.screenshot({ path: fileName as `${string}.png` });
      } finally {
        await page.close();
      }
    }
  }
} finally {
  await browser?.close();
}

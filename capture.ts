import captureWebsite from "capture-website";
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

for (let repo of combined) {
  const fileName = `./public/${repo.full_name.replace("/", "_")}.png`;
  if (
    repo.homepage &&
    !repo.fork &&
    !repo.homepage.startsWith("https://www.npmjs.com") &&
    !repo.homepage.endsWith(".jpg") &&
    !existsSync(fileName)
  ) {
    await captureWebsite.file(repo.homepage, fileName, {
      launchOptions: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });
  }
}

import captureWebsite from "capture-website";

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
  if (repo.homepage && !repo.fork) {
    await captureWebsite.file(
      repo.homepage,
      `./public/${repo.full_name.replace("/", "_")}.png`,
      {
        launchOptions: {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
      },
    );
  }
}

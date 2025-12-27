import React, { useEffect, useState } from "react";
import "./App.css";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => (response.ok ? response.json() : []))
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}

const colors = [
  "is-primary",
  "is-link",
  "is-info",
  "is-warning",
  "is-danger",
  "is-success",
];

const App = () => {
  const data = useFetch<{ facts: string[] } & any>("/data.json");
  const howardData =
    useFetch<Repos>(
      "https://api.github.com/users/howardchung/repos?per_page=100",
    ) ?? [];
  const odotaData =
    useFetch<Repos>("https://api.github.com/users/odota/repos?per_page=100") ??
    [];
  const githubRepos = [...howardData, ...odotaData].filter(
    (repo) => repo.full_name !== "odota/web" && repo.full_name !== "odota/docs",
  );
  githubRepos.sort((a: Repo, b: Repo) => {
    const aScore = a.stargazers_count;
    // + (a.homepage?.startsWith("https://www.npmjs.com") ? -1000000 : 0);
    const bScore = b.stargazers_count;
    // + (b.homepage?.startsWith("https://www.npmjs.com") ? -1000000 : 0);
    return bScore - aScore;
  });
  // setInterval(
  //   () =>
  //     this.setState({
  //       factIndex: (this.state.factIndex + 1) % data.facts.length
  //     }),
  //   2000
  // );
  if (!data) {
    return null;
  }
  const json = {
    full_name: data.full_name,
    phone: data.phone,
    email: data.email,
    url: data.url,
    gender: data.gender,
    height_cm: data.height_cm,
    right_handed: data.right_handed,
    hand_span_cm: data.hand_span_cm,
    shoe_size: data.shoe_size,
    birth_time: data.birth_time,
    birth_latlng: data.birth_latlng,
    languages: data.languages,
    activities: data.activities,
    skills: data.skills,
  };
  return (
    <div data-theme="dark" className="columns">
      <div className="column">
        <div style={{ padding: "10px" }}>
          <p className="title">{data.full_name}</p>
          <p className="subtitle">{data.occupation}</p>
          <div style={{ textAlign: "center" }}>
            {data.links.map((l: any) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                title={l.name}
              >
                <i
                  style={{ fontSize: "40px", marginRight: "16px" }}
                  className={l.fa}
                />
              </a>
            ))}
          </div>
          <figure className="image">
            <img
              alt="howard"
              src="./profile.jpg"
              style={{
                height: "400px",
                width: "initial",
                paddingTop: "10px",
                margin: "0 auto",
              }}
            />
          </figure>
          <div style={{ textAlign: "center" }}>{data.caption}</div>
          <br />
          <pre
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            {data.bio}
          </pre>
        </div>
      </div>
      <div className="column">
        <div style={{ padding: "10px" }}>
          <p className="title">{data.projects.title}</p>
          <p className="subtitle">{data.projects.subtitle}</p>
          <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
            {githubRepos
              .filter((repo: Repo) => repo.homepage && !repo.fork)
              .map((repo: Repo) => {
                return (
                  <div
                    key={repo.id}
                    style={{
                      position: "relative",
                      height: 300,
                      backgroundColor: "black",
                      backgroundRepeat: "no-repeat",
                      backgroundImage: `url(${
                        repo.homepage?.endsWith(".jpg")
                          ? repo.homepage
                          : `${repo.full_name.replace("/", "_")}.png`
                      })`,
                      backgroundSize: "contain",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        padding: "4px",
                        width: "100%",
                        background: "black",
                      }}
                    >
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <a href={repo?.homepage ?? ""}>
                          {(repo.description?.includes(":") &&
                            repo.description?.split(":")[0]) ||
                            repo.full_name}
                        </a>
                        {repo.language && (
                          <span
                            className={`tag ${colors[cyrb53(repo.language ?? "") % colors.length]}`}
                          >
                            {repo.language}
                          </span>
                        )}
                        <span className="tag is-dark">
                          <a href={repo.html_url} target="_blank">
                            ★{repo?.stargazers_count}
                          </a>
                        </span>
                      </div>
                      <div>
                        {repo.description?.split(":")[1] || repo.description}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="column">
        <div style={{ padding: "10px" }}>
          <p className="title">{data.json.title}</p>
          <p className="subtitle">{data.json.subtitle}</p>
          <div>
            <pre>{JSON.stringify(json, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// cyrb53 (c) 2018 bryc (github.com/bryc). License: Public domain. Attribution appreciated.
// A fast and simple 64-bit (or 53-bit) string hash function with decent collision resistance.
// Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
// See https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/52171480#52171480
// https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
export const cyrb53 = (str: string, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
// If we want all 64 bits of the output:
/*
return [h2>>>0, h1>>>0];
// or
return (h2>>>0).toString(16).padStart(8,0)+(h1>>>0).toString(16).padStart(8,0);
// or 
return 4294967296n * BigInt(h2) + BigInt(h1);
*/

export default App;

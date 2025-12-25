import React, { useEffect, useState } from "react";
import "./App.css";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => response.ok ? response.json() : [])
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

const App = () => {
  const data = useFetch<{ facts: string[] } & any>("/data.json");
  const howardData =
    useFetch<Repos>(
      "https://api.github.com/users/howardchung/repos?per_page=100",
    ) ?? [];
  const odotaData =
    useFetch<Repos>("https://api.github.com/users/odota/repos?per_page=100") ?? [];
  const githubRepos = [...howardData, ...odotaData].filter(repo => repo.full_name !== 'odota/web' && repo.full_name !== 'odota/docs');
  githubRepos.sort(
    (a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count,
  );
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
          <div style={{ textAlign: 'center' }}>
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
          <div style={{ textAlign: 'center' }}>{data.caption}</div>
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
          <ul>
            {githubRepos
              .filter((repo: Repo) => repo.homepage && !repo.fork)
              .map((repo: Repo) => {
                return (
                  <li key={repo.id}>
                    <span>
                      <a href={repo?.homepage ?? ""}>
                        {(repo.description?.includes(":") &&
                          repo.description?.split(":")[0]) ||
                          repo.full_name}
                      </a>
                    </span>
                    <span> - </span>
                    <span>
                      {repo.description?.split(":")[1] || repo.description}
                    </span>
                    <span> </span>
                    <span>
                      <a href={repo.html_url} target="_blank">
                        (★{repo?.stargazers_count})
                      </a>
                    </span>
                    <div>
                      <img src={`${repo.full_name.replace("/", "_")}.png`} />
                    </div>
                  </li>
                );
              })}
          </ul>
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

export default App;

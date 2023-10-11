import React, { Component } from "react";

class App extends Component {
  state = {
    data: null,
    factIndex: 0
  };

  componentDidMount() {
    window
      .fetch("./data.json")
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          data,
          factIndex: Math.floor(Math.random() * data.facts.length)
        });
        // setInterval(
        //   () =>
        //     this.setState({
        //       factIndex: (this.state.factIndex + 1) % data.facts.length
        //     }),
        //   2000
        // );
      });
  }

  render() {
    const data = this.state.data;
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
      skills: data.skills
    };
    return (
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-4">
          <div className="tile">
            <div style={{ textAlign: 'center' }} className="tile is-parent is-vertical">
              <article className="tile is-child notification is-primary">
                <p className="title">{data.full_name}</p>
                <p className="subtitle">{data.occupation}</p>
                <div>
                  {data.links.map((l) => (
                    <a
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
                <div>Howard in 2009</div>
                <br />
                <div>
                {data.bio}
                </div>
              </article>
            </div>
          </div>
        </div>
        <div className="tile is-vertical is-4">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child notification is-danger">
                <p className="title">{data.projects.title}</p>
                <p className="subtitle">{data.projects.subtitle}</p>
                <ul>
                  {data.projects.content.map((side) => (
                    <li>
                      <a href={side.url} target="_blank" rel="noreferrer">{side.name}</a>
                      <span> - </span>
                      <span>{side.description}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification is-success">
            <p className="title">JSON</p>
            <div>
              <pre style={{ background: "black", color: "white" }}>
                {JSON.stringify(json, null, 2)}
              </pre>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default App;

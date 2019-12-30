import React, { Component } from 'react';

class App extends Component {
  state = {};

  componentDidMount() {
    window
      .fetch('./data.json')
      .then(resp => resp.json())
      .then(data => {
        this.setState(data);
      });
  }

  render() {
    const data = this.state;
    if (Object.keys(data).length === 0) {
      return null;
    }
    const fact = data.facts[Math.floor(Math.random() * data.facts.length)];
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
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child notification is-primary">
                <p className="title">{data.full_name}</p>
                <p className="subtitle">
                  {data.occupation}
                </p>
                <div>
                  {data.links.map(l => (
                    <a href={l.url} target="_blank" title={l.name}>
                      <i
                        style={{ fontSize: '40px', marginRight: '16px' }}
                        className={l.fa}
                      />
                    </a>
                  ))}
                </div>
                <figure className="image">
                  <img
                    src="./profile.jpg"
                    style={{
                      height: '250px',
                      width: 'initial',
                      paddingTop: '10px',
                    }}
                  />
                </figure>
                {/*
                <h2>Did you know?</h2>
                <blockquote>{fact}</blockquote>
                */}
              </article>
              <article className="tile is-child notification is-warning">
                <p className="title">{data.projects.title}</p>
                <p className="subtitle">{data.projects.subtitle}</p>
                <ul>
                  {data.projects.content.map(p => (
                    <li>
                      <span
                        className={
                          'tag' +
                          (p.end_date && p.end_date.year
                            ? ' is-info'
                            : ' is-success')
                        }
                        style={{ minWidth: '100px', marginRight: '5px' }}
                      >
                        {(p.start_date && p.start_date.year) +
                          ' - ' +
                          ((p.end_date && p.end_date.year) || '')}
                      </span>
                      <a href={p.url || '#'} target="_blank">
                        {p.name}
                      </a>
                      <span> - </span>
                      <span>{p.title}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-info">
                <p className="title">{data.bio.title}</p>
                <p className="subtitle">{data.bio.subtitle}</p>
                <div>
                  <p
                    className="is-size-6 box"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {data.bio.content.join('\n\n')}
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-danger">
              <p className="title">{data.sides.title}</p>
              <p className="subtitle">{data.sides.subtitle}</p>
              <ul>
                {data.sides.content.map(side => (
                  <li>
                    <a href={side.url}>{side.name}</a>
                    <span> - </span>
                    <span>{side.description}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification is-success">
            <p className="title">{data.json.title}</p>
            <p className="subtitle">{data.json.subtitle}</p>
            <div>
              <pre style={{ background: 'black', color: 'white' }}>
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

import React, { Component } from "react";

class App extends Component {
    state = {}

    componentDidMount() {
        window.fetch('./data.json').then((resp) => resp.json()).then(data => {
            this.setState(data);
        });
    }

    render() {
        const data = this.state;
        if (Object.keys(data).length === 0) {
            return null;
        }
        // var fact = data.facts[Math.floor(Math.random() * data.facts.length)];
        var links = React.createElement("div", {
            className: '',
        }, React.createElement('div', { className: 'field is-grouped', style: { flexWrap: 'wrap' } },
            data.links.map(function(l) {
                return React.createElement('p', { className: 'control', style: { marginBottom: '.75em' } }, React.createElement('a', {
                    href: l.url,
                    target: '_blank',
                    className: 'button is-link'
                }, [l.name]));
            })
        ));
        var projects = React.createElement('ul', { className: '' },
            data.projects.content.map(function(project) {
                return React.createElement('li', {}, [
                    React.createElement('span', { className: 'tag' + ((project.end_date && project.end_date.year) ? ' is-info' : ' is-success'), style: { minWidth: '100px' } }, (project.start_date && project.start_date.year) + ' - ' + ((project.end_date && project.end_date.year) || '')),
                    React.createElement('span', {}, ' '),
                    React.createElement('a', { href: project.url, target: '_blank' }, project.name),
                    React.createElement('span', {}, ' - '),
                    React.createElement('span', {}, project.title)
                ]);
            })
        );
        var sides = React.createElement('ul', {},
            data.sides.content.map(function(side) {
                return React.createElement('li', {},
                    React.createElement('a', { href: side.url }, side.name)
                );
            })
        );
        var img = React.createElement('img', {
            className: '',
            src: './profile.jpg',
            style: { height: '250px', width: 'initial', paddingTop: '10px' },
        });
        var sideContent = [
            React.createElement('p', { className: 'title' }, data.sides.title),
            React.createElement('p', { className: 'subtitle' }, data.sides.subtitle),
            sides,
        ];
        var projectContent = [
            React.createElement('p', { className: 'title' }, data.projects.title),
            React.createElement('p', { className: 'subtitle' }, data.projects.subtitle),
            projects,
        ];
        var json = {
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
            <div className="tile is-vertical is-8">
                <div className="tile">
                    <div className="tile is-parent is-vertical">
                      <article className="tile is-child notification is-primary">
                        <p className="title">{data.full_name}</p>
                        <p className="subtitle">{data.projects.content[0].title + ", " + data.projects.content[0].name}</p>
                        {links}
                        <figure className="image">{img}</figure>
                      </article>
                      <article className="tile is-child notification is-warning">
                      {projectContent}
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child notification is-info">
                        <p className="title">{data.bio.title}</p>
                        <p className="subtitle">{data.bio.subtitle}</p>
                        <div>
                          <p className="is-size-6 box" style={{ whiteSpace: 'pre-wrap' }}>{data.bio.content.join('\n\n')}</p>
                        </div>
                      </article>
                    </div>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child notification is-danger">{sideContent}</article>
                </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-success">
                <p className="title">{data.json.title}</p>
                <p className="subtitle">{data.json.subtitle}</p>
                <div>
                  <pre style={{ background: 'black', color: 'white' }}>{JSON.stringify(json, null, 2)}</pre>
                </div>
              </article>
            </div>
      </div>
        );
    }
}

export default App;

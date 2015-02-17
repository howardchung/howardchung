function httpGet(theUrl, cb) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            cb(JSON.parse(xmlHttp.responseText));
        }
    };
}

function fromNow(date) {
    return moment(date).fromNow();
}

function generateResume(data) {
    function textWithPad(doc, size, text, indent) {
        y += size / 2
        indent = 20 + (indent || 0);
        doc.setFontSize(size)
        doc.text(indent, y, text)
    }
    var doc = new jsPDF();
    var y = 0;
    textWithPad(doc, 20, data.json.content.full_name);
    [data.contact.email, data.links["github"].url, data.contact.url].forEach(function(f) {
        textWithPad(doc, 10, f)
    })
    textWithPad(doc, 18, data.educations.heading)
    data.educations.all.forEach(function(e) {
        textWithPad(doc, 12, [e.school_name, e.end_date.year].join())
        textWithPad(doc, 10, [e.degree, e.field_of_study].join(), 10)
    })
    textWithPad(doc, 18, data.positions.heading)
    data.positions.all.forEach(function(e) {
        textWithPad(doc, 12, [e.title, e.company.name, e.start_date.year].join())
        e.summary.forEach(function(f) {
            textWithPad(doc, 10, f, 10)
        })
    })
    textWithPad(doc, 18, data.projects.heading)
    data.projects.all.forEach(function(e) {
        textWithPad(doc, 12, [e.name, e.html_url].join(" - "))
        textWithPad(doc, 10, e.description, 10)
    })
    textWithPad(doc, 18, data.skills.heading)
    data.skills.all.forEach(function(e) {
        textWithPad(doc, 10, e.skill.name)
    })
    doc.output('dataurlnewwindow');
}

var site = React.createClass({
    getInitialState: function() {
        httpGet("public/data.json", function(data) {
            httpGet("https://api.github.com/users/howardc93/starred", function(projects) {
                console.log(data, projects);
                projects.sort(function(a, b) {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                data.projects = {
                    "heading": "Projects",
                    "all": projects
                };
                this.setState({
                    data: data,
                    json: JSON.stringify(data.json.content, null, 4),
                    fact: data.facts[Math.floor(Math.random() * data.facts.length)]
                });
                document.title = data.json.content.full_name;
            }.bind(this));
        }.bind(this));
        return null;
    },
    render: function() {
        return (
            React.createElement('div', {
                className: "container"
            }, [
                React.createElement('div', {
                        className: "row"
                    },
                    React.createElement('div', {
                        className: "col-md-12"
                    }, [
                        React.createElement('img', {
                            className: "img-rounded profile"
                        }),
                        React.createElement('h1', {},
                            this.state ? this.state.data.json.content.full_name : ""
                        ),
                        React.createElement('small', {},
                            this.state ? this.state.fact : ""
                        )
                    ])
                ),
                React.createElement('hr'),
                React.createElement('div', {
                        className: "row"
                    },
                    React.createElement('div', {
                            className: "col-md-4"
                        } //json here
                    ),
                    React.createElement('div', {
                            className: "col-md-8"
                        } //projects here
                    )
                ),
                React.createElement('hr')
                //footer
            ])
        );
    }
});
/*
var json = React.createClass({
  render: function() {
    return (<div class="row">
            <div class="col-md-4">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3 class="panel-title">{data.json.heading}</h3>
                    </div>
                    <div class="panel-body">
                        <pre class="text-left">{json}</pre>
                    </div>
                </div>
            </div>);
  }
});

var projects = React.createClass({
  render: function() {
            <div class="col-md-8">
                <div class="panel panel-success">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{data.projects.heading}}</h3>
                    </div>
                    <div class="panel-body">
                        <ul>
                            <li data-ng-repeat="x in data.projects.all">
                                <a data-ng-href="{{x.homepage || x.html_url}}">{{x.name}}</a>
                                <small> {{x.description}}</small>
                                <span class="label label-warning"><a href="{{x.html_url}}">{{x.language}}</a></span>
                                <span class="label label-success">{{x.pushed_at | fromNow}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
  }
});

var footer = React.createClass({
  render: function() {
            for (var key in data.links) {
            var l = data.links[key]
            $("#links").append($("<a>", {
                href: l.url,
                class: "btn btn-default",
                html: "<i class='" + l.icon + "'></i>",
                id: key,
                title: l.name,
                "data-toggle": "tooltip"
            }));
        }
    return (        <footer>
            <div id="links" class="text-center"></div>
        </footer>);  }
});
*/

//todo add click handler for resume
React.render(React.createElement(site),
    document.getElementById('container')
);
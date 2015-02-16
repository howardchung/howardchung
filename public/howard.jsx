var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

var header = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

var json = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

var projects = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

var footer = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(
  <HelloMessage name="John" />,
  document.getElementById('container')
);

/*
        <div class="row">
            <div class="col-md-12">
                <img class="img-rounded profile" height=100 src="public/profile.jpg" alt="{{data.json.full_name}}" title="{{data.profilejpg}}">
                <h1>{{data.json.content.full_name}}
                <br>
                <small id="random"></small></h1>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-4">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{data.json.heading}}</h3>
                    </div>
                    <div class="panel-body">
                        <pre class="text-left">{{json}}</pre>
                    </div>
                </div>
            </div>
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
        </div>
        <hr>
        <footer>
            <div id="links" class="text-center"></div>
        </footer>
        */
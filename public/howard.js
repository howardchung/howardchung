var data = httpGet("public/data.json");
var projects = httpGet("https://api.github.com/users/howardc93/starred");

function httpGet(theUrl) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

projects.sort(function(a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
});
data.projects = {
    "heading": "Projects",
    "all": projects
};
var json = JSON.stringify(data.json.content, null, 4);
var fact = data.facts[Math.floor(Math.random() * data.facts.length)];
var resume = document.getElementById("resume");
resume.addEventListener("click", generateResume, false);

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

function fromNow(date) {
    return moment(date).fromNow()
}

function generateResume(e) {
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
    return false;
}
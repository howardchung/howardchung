angular.module('howard', []).controller('howardController', function($scope, $http) {
    $http.get("data.json").success(function(data) {
        $http.get("https://api.github.com/users/howardc93/subscriptions").success(function(projects) {
            projects.sort(function(a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            })
            data.projects = {
                "heading": "Projects",
                "all": projects
            };
            $scope.data = data;
            $scope.random = data.facts[Math.floor(Math.random() * data.facts.length)];
            $scope.json = JSON.stringify(data.json.content, null, 4)
            $('#resume').click(function(e) {
                function textWithPad(doc, size, text, indent) {
                    y += size / 2
                    indent = 20 + (indent || 0);
                    doc.setFontSize(size)
                    doc.text(indent, y, text)
                }
                e.preventDefault();
                var doc = new jsPDF();
                var y = 0;
                var secBreak = 10;
                textWithPad(doc, 20, data.json.content.full_name);
                [data.contact.email, data.links["github"].url, data.contact.url].forEach(function(f) {
                    textWithPad(doc, 10, f)
                })
                textWithPad(doc, 18, data.educations.heading)
                data.educations.all.forEach(function(e) {
                    textWithPad(doc, 14, [e.school_name, e.end_date.year].join())
                    textWithPad(doc, 10, [e.degree, e.field_of_study].join())
                })
                textWithPad(doc, 18, data.positions.heading)
                data.positions.all.forEach(function(e) {
                    textWithPad(doc, 14, [e.title, e.company.name, e.start_date.year].join())
                    e.summary.forEach(function(f) {
                        textWithPad(doc, 10, f, 10)
                    })
                })
                textWithPad(doc, 18, data.projects.heading)
                data.projects.all.forEach(function(e) {
                    textWithPad(doc, 14, [e.name, e.html_url].join())
                    textWithPad(doc, 10, e.description, 10)

                })
                textWithPad(doc, 18, data.skills.heading)
                data.skills.all.forEach(function(e) {
                    textWithPad(doc, 10, e.skill.name, 10)
                })
                doc.output('dataurlnewwindow');
            });
        })

    });
})
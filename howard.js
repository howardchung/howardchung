        angular.module('howard', []).controller('howardController', function($scope, $http) {
            $http.get("public/data.json").success(function(data) {
                console.log(data)
                $scope.data = data;
                $scope.random = data.facts[Math.floor(Math.random() * data.facts.length)];
                $scope.json = JSON.stringify(data.json, null, 4)
                $('#resume').click(function(e) {
                    function textWithPad(doc, pad, text, indent, size) {
                        doc.setFontSize(size || 16)
                        doc.text(20 + (indent || 0), y, text)
                        y += pad
                    }
                    e.preventDefault();
                    console.log("clicked")
                    var doc = new jsPDF();
                    var x = 20;
                    var y = 20;
                    var pad = 5;
                    textWithPad(doc, pad, data.json.full_name);
                    [data.email, data.links["github"].url, data.links["website"].url].forEach(function(f) {
                        textWithPad(doc, pad, f, 10, 10)
                    })
                    y += pad * 2
                    data.educations.all.forEach(function(e) {
                        textWithPad(doc, pad, [e.school_name, e.end_date.year].join())
                        textWithPad(doc, pad, [e.degree, e.field_of_study].join(), 10, 10)
                    })
                    y += pad * 2
                    data.positions.all.forEach(function(e) {
                        textWithPad(doc, pad, [e.title, e.company.name, e.start_date.year].join())
                        e.summary.forEach(function(f) {
                            textWithPad(doc, pad, f, 10, 10)
                        })
                    })
                    y += pad * 2
                    data.projects.all.forEach(function(e) {
                        textWithPad(doc, pad, [e.name, e.url].join())
                        e.summary.forEach(function(f) {
                            textWithPad(doc, pad, f, 10, 10)
                        })
                    })
                    y += pad * 2
                    data.skills.all.forEach(function(e) {
                        textWithPad(doc, pad, e.skill.name, 0, 10)
                    })
                    doc.output('dataurlnewwindow');
                });
            });
        })

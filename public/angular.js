function howardController($scope, $http) {
    $http.get("public/data.json")
    .success(function(response) {
        data=JSON.parse(response)
        console.log(data)
        $scope.data = data;
        $scope.random = Math.floor(Math.random() * data.facts.length;
    });
}

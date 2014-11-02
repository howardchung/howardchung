function howardController($scope, $http) {
    $http.get("public/data.json")
    .success(function(response) {$scope.data = JSON.parse(response);});
}

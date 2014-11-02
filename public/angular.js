function howardController($scope, $http) {
    $http.get("public/data.json")
    .success(function(response) {
        console.log(response)
        $scope.data = JSON.parse(response);
        
    });
}

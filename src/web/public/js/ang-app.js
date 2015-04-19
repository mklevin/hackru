var app = angular.module("mploy", []);

// This controll controls the home page!!!
app.controller("HomeController", ["$scope", "$location", "$http",
  function($scope, $location, $http) {
    $scope.title = "Tinder Thing";
    $scope.loggedin = false;
    $http.get("/api/users/me").success(function(data) {
      $scope.loggedin = data.loggedin;
    });
  }
]);

app.controller("ProfileController", ["$scope", "$location", "$http",
  function($scope, $location, $http) {
  }
]);

// Simple logging to make sure everything loaded correctly
console.log("Angular has been loaded!");
console.log("Test lint");

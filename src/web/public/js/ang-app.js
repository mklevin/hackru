var app = angular.module("mploy", ["ngAnimate"]);

app.controller("NavController", ["$scope", "$http",
  function($scope, $http) {
    $scope.loggedin = false;
    $scope.signedin = "You are not signed in"
    $http.get("/api/users/me").success(function(data) {
      $scope.loggedin = data.loggedin;
      if($scope.loggedin) {
        $scope.signedin = "You are signed in as " + data.displayName;
      }
    });
  }
]);

app.controller("SignupController", ["$scope", "$http",
  function($scope, $http) {
    $scope.position = "start";

    $scope.updatePosition = function(newposition) {
      $scope.position = newposition;
    };
  }
]);

// Simple logging to make sure everything loaded correctly
console.log("Angular has been loaded!");

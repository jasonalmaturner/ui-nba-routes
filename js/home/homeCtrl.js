var app = angular.module('nbaRoutes');

app.controller('homeCtrl', function ($scope, homeService, teamsData) {
  $scope.teamsData = teamsData;
});

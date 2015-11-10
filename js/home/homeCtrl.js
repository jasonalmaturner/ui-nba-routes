angular.module('nbaRoutes').controller('homeCtrl', function($scope, homeService, teamsData) {
  $scope.teamsData = teamsData;
});

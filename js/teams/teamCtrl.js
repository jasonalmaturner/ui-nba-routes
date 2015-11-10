angular.module('nbaRoutes').controller('teamCtrl', function($scope, $stateParams, teamService, teamData) {
  $scope.teamData = teamData;
  $scope.newGame = {};
  $scope.showNewGameForm = false;
  $scope.toggleNewGameForm = function() {
    $scope.showNewGameForm = !$scope.showNewGameForm;
  };

  $scope.submitGame = function() {
    $scope.newGame.homeTeam = $scope.teamData.homeTeam.split(' ').join('').toLowerCase();
    teamService.addNewGame($scope.newGame).then(function(res) {
      return teamService.getTeamData($stateParams.team);
    }).then(function(res) {
      $scope.teamData = res;
      $scope.newGame = {};
      $scope.showNewGameForm = false;
    }).catch(function(err) {
      console.log(err);
    });
  };

});

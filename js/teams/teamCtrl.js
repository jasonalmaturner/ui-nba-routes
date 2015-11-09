angular.module('nbaRoutes').controller('teamCtrl', function($scope, $stateParams, teamService, teamData) {
  $scope.teamData = teamData;
  $scope.newGame = {};
  $scope.showNewGameForm = false;
  $scope.toggleNewGameForm = function() {
    $scope.showNewGameForm = !$scope.showNewGameForm;
  };

  switch ($stateParams.team) {
    case 'utahjazz':
      $scope.homeTeam  = 'Utah Jazz';
      $scope.logoPath = 'images/jazz-logo.png';
      break;
    case 'losangeleslakers':
      $scope.homeTeam = 'Los Angeles Lakers';
      $scope.logoPath = 'images/lakers-logo.png';
      break;
    case 'miamiheat':
      $scope.homeTeam = 'Miami Heat';
      $scope.logoPath = 'images/heat-logo.png';
      break;
  }

  $scope.submitGame = function() {
    $scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
    teamService.addNewGame($scope.newGame).then(function(res) {
      teamService.getTeamData().then(function(resp) {
        $scope.teamData = resp;
        $scope.newGame = {};
        $scope.showNewGameForm = false;
      });
    })
  };

});

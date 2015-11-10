angular.module('nbaRoutes', ['ui.router']).config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/homeTmpl.html',
    controller: 'homeCtrl',
    resolve: {
      teamsData: function(teamService, $q) {
        var promise1 = teamService.getTeamData('losangeleslakers');
        var promise2 = teamService.getTeamData('utahjazz');
        var promise3 = teamService.getTeamData('miamiheat');
        return $q.all([promise1, promise2, promise3]);
      },
    },
  }).state('teams', {
    url: '/teams/:team',
    templateUrl: 'js/teams/teamTmpl.html',
    controller: 'teamCtrl',
    resolve: {
      teamData: function(teamService, $stateParams) {
        return teamService.getTeamData($stateParams.team);
      },
    },
  });

  $urlRouterProvider.otherwise('/');
});

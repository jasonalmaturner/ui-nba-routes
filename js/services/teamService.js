angular.module('nbaRoutes').service('teamService', function($http, $q) {

  this.addNewGame = function(gameObj) {
    var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
    if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
      gameObj.won = true;
    } else {
      gameObj.won = false;
    }

    return $http({
      method: 'POST',
      url: url,
      data: gameObj,
    });
  };

  this.getTeamData = function(team) {
    var dfd = $q.defer();
    var url = 'https://api.parse.com/1/classes/' + team + '?order=-createdAt';
    $http({
      method: 'GET',
      url: url,
    }).then(function(res) {
      var results = res.data.results;
      var wins = 0;
      var losses = 0;
      for (var i = 0; i < results.length; i++) {
        if (results[i].won) {
          wins++;
        } else {
          losses++;
        }
      }

      switch (team) {
        case 'utahjazz':
          results.homeTeam  = 'Utah Jazz';
          results.logoPath = 'images/jazz-logo.png';
          break;
        case 'losangeleslakers':
          results.homeTeam = 'Los Angeles Lakers';
          results.logoPath = 'images/lakers-logo.png';
          break;
        case 'miamiheat':
          results.homeTeam = 'Miami Heat';
          results.logoPath = 'images/heat-logo.png';
          break;
      }
      results.wins = wins;
      results.losses = losses;
      dfd.resolve(results);
    }, function(err) {

      dfd.reject(err);
    }, function(notify) {

      dfd.notify(notify);
    });

    return dfd.promise;
  };
});

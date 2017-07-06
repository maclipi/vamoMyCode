angular.module('starter.controllers')

.controller('mutitrackCtrl', function(CONSTANTS,$scope, $ionicHistory,$state, $window){


$scope.init = function(){

      $window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();

    $state.go('login');
}


})

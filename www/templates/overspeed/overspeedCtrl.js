angular.module('starter.controllers')


.controller('overspeedCtrl',function($scope,Data){

$scope.contentLine = "Set VEHICLE as Default";
$scope.contentType = 1;

  $scope.$on('$ionicView.enter', function(){

      if (window.localStorage.getItem("defaultPage") == 1)
      {
          $scope.value = true;
      }
  })

    $scope.toggleChange = function(v){


          if (v == true)
          {
              $scope.contentLine = "Set GROUP  as Default";
              Data.setSetPage(1);
              window.localStorage.setItem("defaultPage",1);
          }
          else if (v == false)
          {
                $scope.contentLine = "Set VEHICLE  as Default";
                 Data.setSetPage(2);
                 window.localStorage.setItem("defaultPage",2);

          }
    }
})

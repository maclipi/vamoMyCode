angular.module('starter.controllers')

.controller('kmssummryCtrl', function($scope,$ionicLoading,getKMsummry,getGroupVehiclesDetail,Data){
 $scope.userId = Data.getFirstName();
$scope.$on('$ionicView.enter', function(){


    var getSomething;
 getGroupVehiclesDetail.all($scope.userId).then(function (data){

            console.log(data.data);
            $scope.getAllDetails = data.data;
             $scope.getSomething = data.data[0].group;

              getKMsummry.all($scope.userId, $scope.getSomething).then(function(data){


         $scope.getKmDetails = data.data.execReportData;
        console.log("group Details");
         console.log($scope.getKmDetails);
     })


        })


})

 $scope.getKmDetails  = [];
  $scope.getVehicleInfo = function(val,indexVal){

  $ionicLoading.show();
getGroupVehiclesDetail.all($scope.userId).then(function (data){

           $ionicLoading.hide();
            $scope.getAllDetails = data.data;
             $scope.getSomething = data.data[indexVal].group;

              getKMsummry.all($scope.userId, $scope.getSomething).then(function(data){


         $scope.getKmDetails = data.data.execReportData;
        console.log("group Details");
         console.log($scope.getKmDetails);
     })


        })




  }

    $scope.currentDate = new Date ();
    $scope.nextMonthDate = new Date ();
    $scope.nextMonthDate =   $scope.nextMonthDate.setDate($scope.nextMonthDate.getDate()+30);




})

angular.module('starter.controllers')

.controller('kmssummryCtrl', function($scope,$ionicLoading,getKMsummry,getGroupVehiclesDetail,Data){
 $scope.userId = Data.getFirstName();
$scope.$on('$ionicView.enter', function(){
   
    alert($scope.userId);
    var getSomething;
 getGroupVehiclesDetail.all($scope.userId).then(function (data){
           
            console.log(data.data);
            $scope.getAllDetails = data.data;
             $scope.getSomething = data.data[0].group;
             alert($scope.getSomething);
              getKMsummry.all($scope.userId, $scope.getSomething).then(function(data){


         $scope.getKmDetails = data.data.execReportData;
        console.log("group Details");
         console.log($scope.getKmDetails);
     })


        })

        
})

 $scope.getKmDetails  = [];
  $scope.getVehicleInfo = function(val,indexVal){
 
     console.log(+indexVal+" Dynamic Group Name"+val);

getGroupVehiclesDetail.all($scope.userId).then(function (data){
           
            console.log(data.data);
            $scope.getAllDetails = data.data;
             $scope.getSomething = data.data[indexVal].group;
             alert($scope.getSomething);
              getKMsummry.all($scope.userId, $scope.getSomething).then(function(data){


         $scope.getKmDetails = data.data.execReportData;
        console.log("group Details");
         console.log($scope.getKmDetails);
     })


        })
    

     alert( $scope.getKmDetails );

  }

    $scope.currentDate = new Date ();
    $scope.nextMonthDate = new Date ();
    $scope.nextMonthDate =   $scope.nextMonthDate.setDate($scope.nextMonthDate.getDate()+30);




})

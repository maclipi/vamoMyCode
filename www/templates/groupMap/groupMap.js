angular.module('starter.controllers')

.controller('groupmapCtrl',function($scope,$state,Data,getUserData,$ionicNavBarDelegate,$ionicLoading,getGroupVehiclesDetail, $timeout,NgMap){
    
    console.log("let's work on the Map in better way");
    
     $ionicNavBarDelegate.showBackButton(false);
    $scope.$on('$ionicView.enter', function(){
        $scope.user =Data.getFirstName();
       console.log( $scope.user);
         if ($scope.user != null){
        getGroupVehiclesDetail.all($scope.user).then(function (data){
             $ionicLoading.hide(); 
            console.log(data.data);
            $scope.getAllDetails = data.data;

            

//    totalMovingVehicles: 11,
// totalIdleVehicles: 2,
// totalParkedVehicles: 6,
// totalNoDataVehicles: 5,
            var  totalMovingVehicles =$scope.getAllDetails[0].totalMovingVehicles;
            var totalIdleVehicles = $scope.getAllDetails[0].totalIdleVehicles;
            var totalParkedVehicles = $scope.getAllDetails[0].totalParkedVehicles;
            var totalNoDataVehicles = $scope.getAllDetails[0].totalNoDataVehicles;
            $scope.labels = ["Moving", "Idle", "Parked","No Data"];

            // group detatil to displayed on the card on the group page START ***********************

            $scope.totalVehicles = $scope.getAllDetails[0].totalVehicles;
            $scope.onlineVehicles = $scope.getAllDetails[0].online;
            $scope.attention = $scope.getAllDetails[0].attention;
            $scope.topSpeed = $scope.getAllDetails[0].topSpeed;
            $scope.topSpeedVehicleId = $scope.getAllDetails[0].topSpeedVehicleId;
            $scope.group = $scope.getAllDetails[0].group;
            $scope.totalMovingVehicles =$scope.getAllDetails[0].totalMovingVehicles;
            $scope.totalIdleVehicles = $scope.getAllDetails[0].totalIdleVehicles;
            $scope.totalParkedVehicles = $scope.getAllDetails[0].totalParkedVehicles;
            $scope.totalNoDataVehicles = $scope.getAllDetails[0].totalNoDataVehicles;




            // group detatil to displayed on the card on the group page START ***********************

            $scope.data = [totalMovingVehicles,totalIdleVehicles, totalParkedVehicles, totalNoDataVehicles];
        })
         }
    // alert(Data.getFirstName());
    $scope.user =Data.getFirstName();

   
     $scope.username =  $scope.user;
        $scope.test = [];
        var lat ;

    //    *********************************************************** API DATA FOR USER START *******************************************
                                    //    calling userdetail service to get all the data 
    
     getUserData.all($scope.user).then(function(data){

         
            console.log(data.data);
            $scope.getAllDetails = data.data;
            console.log($scope.getAllDetails);
            
            })
     
     
//    *********************************************************** API DATA FOR USER END ******************************************
    


$scope.hide= false;
  $scope.toggle = function(){
      $scope.hide = !$scope.hide
       $scope.vehicle = '';
}

$scope.search= true;
    $scope.change = function(){
     
       $scope.search = !$scope.search;
       $scope.vehicle = '';

}

    // selecting charttype
        $scope.chartPieShowType = false;
        $scope.chartBarShowType = true ;
        $scope.chartLineShowType = false;

    $scope.pieChartType = function (){
        $scope.chartPieShowType = true;
        $scope.chartBarShowType = false;
        $scope.chartLineShowType = false;
        console.log ( "Activate Pie Chart");
    }
     $scope.barChartType = function (){
        $scope.chartPieShowType = false;
        $scope.chartBarShowType = true;
        $scope.chartLineShowType = false;
          console.log ( "Activate Bar Chart");
    }
     $scope.lineChartType = function (){
        $scope.chartPieShowType = false;
        $scope.chartBarShowType = false;
        $scope.chartLineShowType = true;
          console.log ( "Activate Line Chart");
    }
     
      $scope.listGroup = function(val,count){
         $ionicLoading.show({
      template: '<p>Please Wait..</p><ion-spinner></ion-spinner>'
    });
        
        console.log(val);
        
        
        getGroupVehiclesDetail.all($scope.user,val).then(function (data){
             $ionicLoading.hide();
            console.log(data.data);
            $scope.getAllDetails = data.data;
        })
          var getVehicleCount = $scope.getAllDetails;

            console.log( $scope.getAllDetails[count].vehicleLocations[1]);
//        for ( var i = 0; i < getVehicleCount.vehicleLocations.length)
    }
     
    
    })
    
    $scope.getVehicleInfo = function(val,indexVal){
 
        
         var getVehicleCount = $scope.getAllDetails;
         
          console.log(+indexVal+" Dynamic Group Name"+val);
           getGroupVehiclesDetail.all($scope.user,val).then(function (data){
             $ionicLoading.hide(); 
            console.log(data.data);
            $scope.getAllDetails = data.data;

          

//    totalMovingVehicles: 11,
// totalIdleVehicles: 2,
// totalParkedVehicles: 6,
// totalNoDataVehicles: 5,
            var  totalMovingVehicles =$scope.getAllDetails[indexVal].totalMovingVehicles;
            var totalIdleVehicles = $scope.getAllDetails[indexVal].totalIdleVehicles;
            var totalParkedVehicles = $scope.getAllDetails[indexVal].totalParkedVehicles;
            var totalNoDataVehicles = $scope.getAllDetails[indexVal].totalNoDataVehicles;
            
            $scope.totalVehicles = $scope.getAllDetails[indexVal].totalVehicles;
            $scope.onlineVehicles = $scope.getAllDetails[indexVal].online;
            $scope.attention = $scope.getAllDetails[indexVal].attention;
            $scope.topSpeed = $scope.getAllDetails[indexVal].topSpeed;
            $scope.topSpeedVehicleId = $scope.getAllDetails[indexVal].topSpeedVehicleId;
            $scope.group = $scope.getAllDetails[indexVal].group;
            $scope.totalMovingVehicles =$scope.getAllDetails[indexVal].totalMovingVehicles;
            $scope.totalIdleVehicles = $scope.getAllDetails[indexVal].totalIdleVehicles;
            $scope.totalParkedVehicles = $scope.getAllDetails[indexVal].totalParkedVehicles;
            $scope.totalNoDataVehicles = $scope.getAllDetails[indexVal].totalNoDataVehicles;

            console.log("Moving Vehicle - "+totalMovingVehicles);
            console.log("Idle Vehicle - "+totalIdleVehicles);
            console.log("Parked Vehicle - "+totalParkedVehicles);
            console.log("No Data Vehicle - "+totalNoDataVehicles);
            console.log("Top Speed"+ $scope.topSpeed);
            $scope.labels = ["Moving", "Idle", "Parked","No Data"];
            $scope.data = [totalMovingVehicles,totalIdleVehicles, totalParkedVehicles, totalNoDataVehicles,0];
        })
    }
    
})
    
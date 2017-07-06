angular.module('starter.controllers')

.controller('homeCtrl',function ($scope,$interval,$state,$timeout,$ionicNavBarDelegate,getUserData,getGroupVehiclesDetail,Data,$ionicLoading,$ionicModal){


$scope.limitItem = 1;
 
     $ionicNavBarDelegate.showBackButton(false);
    $scope.$on('$ionicView.enter', function(){

$scope.limitItem = 25;
        $ionicLoading.show({
      template: '<p>Please Wait..</p><ion-spinner></ion-spinner>'
    });
    // alert(Data.getFirstName());
    $scope.user =      Data.getFirstName();

   
     $scope.username =  $scope.user;

    
//    *********************************************************** API DATA FOR USER START *******************************************
                                    //    calling userdetail service to get all the data 
    
     getUserData.all($scope.user).then(function(data){

         
         console.log(data.data);
//         console.log(data.data[0].vehicleLocations.length);
//            for(var i =0; i< data.data[0].vehicleLocations.length; i++)
//                {
//             console.log(data.data[0].vehicleLocations[i].address);
//                }
                $scope.getAllDetails = data.data;
                $ionicLoading.hide();
            console.log($scope.getAllDetails);




     
            })
     

 $scope.loadMore = function() {
    $scope.getAllDetails.vehicleLocations.push({ id: $scope.getAllDetails.vehicleLocations.length});
   
    if ( $scope.getAllDetails.vehicleLocations.length == 99 ) {
      $scope.noMoreItemsAvailable = true;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
  
  $scope.getAllDetails = [];

//    *********************************************************** API DATA FOR USER END ******************************************
    
    $scope.map = function()
    {
       NgMap.getMap({id:"map"}).then(function(map) {
   
    map.showInfoWindow('bar', 'marker1');
  })
    };
    

// pullup code to implememnt on the map modal STRAT

$scope.footerExpand = function() {
    console.log('Footer expanded');
  };
  $scope.isEnergized = true;
  $scope.toggleEnergized = function(){
    $scope.isEnergized =  !$scope.isEnergized;
  }
  $scope.footerCollapse = function() {
    console.log('Footer collapsed');
  };



// pullup code to implememnt on the map modal END


// Refresh code to the Pull up START
    $scope.doRefresh = function() {
    
    console.log('Refreshing!');
    $scope.limitItem = 20;
    $timeout( function() {
      //simulate async response
      getUserData.all($scope.user).then(function(data){

         
         console.log(data.data);
//         console.log(data.data[0].vehicleLocations.length);
//            for(var i =0; i< data.data[0].vehicleLocations.length; i++)
//                {
//             console.log(data.data[0].vehicleLocations[i].address);
//                }
                $scope.getAllDetails = data.data;
                $ionicLoading.hide();
            console.log($scope.getAllDetails);


            
            })

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    
    }, 1000);
      
  };

// Refresh code to the Pull up START
// getAllDetails
// vehicleLocations
 $scope.noMoreItemsAvailable = false;


//     making site address if site than showing home START
     
      console.log($scope.getAllDetails);
//     making site address if site than showing home END
     
     
    $scope.showDetailForm = function(){
        
        $scope.IsVisible = $scope.IsVisible ? false : true;
        
    }
},500);





$ionicModal.fromTemplateUrl('templates/mylongform.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
  $scope.openModal = function(lat,long){
    $scope.modal.show();
    $scope.lat = lat;
    $scope.long = long;
  }
  $scope.closeModal = function(){
   
    $scope.modal.hide();
  }

    
    $scope.listGroup = function(val){
         $ionicLoading.show({
      template: '<p>Please Wait..</p><ion-spinner></ion-spinner>'
    });
        
        console.log(val);
        
        
        getGroupVehiclesDetail.all($scope.user,val).then(function (data){
             $ionicLoading.hide();
            console.log(data.data);
            $scope.getAllDetails = data.data;
        })
    }
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

 $interval(function () {}, 1000);

$scope.Moving = function () {

   
    $scope.vehicle = "ON";
}
})

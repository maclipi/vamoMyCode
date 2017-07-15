angular.module('starter.controllers')

.controller('homeCtrl',function ($scope,$interval,$state,$timeout,$ionicPopup,$ionicNavBarDelegate,$ionicScrollDelegate,getUserData,getGroupVehiclesDetail,Data,getVehicleHistory,$ionicLoading,$ionicModal){


            $scope.limitItem = 1;

            $ionicNavBarDelegate.showBackButton(false);
            $scope.$on('$ionicView.enter', function(){

                       $scope.limitItem = 25;
                       $ionicLoading.show({
                                          template: '<p>Please Wait..</p><ion-spinner></ion-spinner>'
                                          });

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

                                                        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                                                            $ionicLoading.hide();

                                                          });
                                                         console.log($scope.getAllDetails);


                                                          Data.setTotalNumber(data.data[0].vehicleLocations.length);


                                                         })



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


            $scope.openModal = function(showValue,vehicleId,lat,long){

               $scope.showMap = showValue;



                  Data.setVehicleNumber(vehicleId);

              $scope.modal.show();
              $scope.lat = lat;
              $scope.long = long;






            }
            $scope.closeModal = function(){

            $scope.modal.hide();
            }





              Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
              if(!Date.now) Date.now = function() { return new Date(); }
              Date.time = function() { return Date.now().getUnixTime(); }










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


            $scope.getVehicleReport = function (FromDate, ToDate){


                       $ionicLoading.show({
                                          template: '<p>Please Wait..</p><ion-spinner></ion-spinner>'
                                          });

              getVehicleHistory.all(Data.getFirstName(),Data.getVehicleNumber(),FromDate.getUnixTime(),ToDate.getUnixTime()).then(function(res){

                 $ionicLoading.hide();

                 if (res.data.vehicleLocations == null)
                                  {
                                   $ionicPopup.alert({

                                     title: ' Nothing Found ! Please change the Dates and Try Again',
                                     okType: 'button-assertive'
                                   });
                                }
                console.log("Get Vehicle Report");
                console.log(res.data.vehicleLocations);


                $scope.historyData = res.data.vehicleLocations;


              })

            }

            $scope.showAll = 'none';
            $scope.movingvehicle = 'none';
            $scope.parkedVehicle = 'none';
            $scope.vehicleOff = 'none';




            $scope.showAllVehicle = function(){
            $scope.showAll = 'show';
            $scope.movingvehicle = 'none';
            $scope.parkedVehicle = 'none';
            $ionicScrollDelegate.scrollTop();



            }

            $scope.showMovingVehicle = function(){
            $scope.showAll = 'none';
            $scope.movingvehicle = 'show';
            $scope.parkedVehicle = 'none';
            $ionicScrollDelegate.scrollTop();

            }
            $scope.showParkedVehicle = function(){
            $scope.showAll = 'none';
            $scope.movingvehicle = 'none';
            $scope.parkedVehicle = 'show';
            $ionicScrollDelegate.scrollTop();

            }

            $scope.vehicleOffMeter = function(){
            $scope.showAll = 'none';
            $scope.movingvehicle = 'none';
            $scope.parkedVehicle = 'none';
            $scope.vehicleOff = 'show';
            $ionicScrollDelegate.scrollTop();

            }



$scope.fun = 25;
var limit = 25;
$scope.loadMoreStatus = false;
$scope.loadMore = function (){

if (limit <=  Data.getTotalNumber())
{

    $scope.fun += 25;
    limit += 25;
}
else{
    $scope.loadMoreStatus = true;

}



}



             $ionicNavBarDelegate.showBackButton(false);





            })

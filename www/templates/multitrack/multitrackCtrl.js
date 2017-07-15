angular.module('starter.controllers')

.controller('mutitrackCtrl', function(CONSTANTS,$scope,Data, $ionicHistory,$state,logoutUser, $window){




 $scope.logoutFn = function(){
Data.getFirstName();

var username = Data.getFirstName();
var deviceToken = window.localStorage.getItem("token");

       var push = PushNotification.init({
             android: {
               senderID: "1084877565753",
               icon:"icon"
             },
             ios: {
               alert: "true",
               badge: "true",
               sound: "true",
               clearBadge: "true"
             }
           });

           push.unregister(function(){
           window.localStorage.clear();
               $state.go('login');
           },function(){
               alert('unregistering failed');
               $state.go('login');
           });

$state.go('login');
 }

})

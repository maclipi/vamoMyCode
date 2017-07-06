// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.directive', 'starter.services','starter.filters','ionic-sidemenu','ngMap','ngAnimate','chart.js','ionic-pullup','starter.PushHandler'])

.run(function($ionicPlatform,RequestsService) {
  $ionicPlatform.ready(function(LoginService,$scope,getUserData,Data) {



    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(window.Connection) {
if(navigator.connection.type == Connection.NONE) {
$ionicPopup.confirm({
title: "Internet Disconnected",
content: "The internet is disconnected on your device."
})
.then(function(result) {
if(!result) {
ionic.Platform.exitApp();
}
});
}
}
// alert(Data.getLoginStatus());
// alert("hello");
var push = PushNotification.init({
      android: {
        senderID: "1084877565753",
        icon:"icon"
      },
      ios: {
        alert: "true",
        badge: "false",
        sound: "true",
        clearBadge: "true"
      }
    });

    push.on('registration', function(data){

      window.localStorage.setItem("token", data.registrationId);

    });

    push.on('notification', function(data){

      if (data.additionalData.foreground) {

        $ionicPopup.alert({

          title: data.message,
          okType: 'button-assertive'
        });
      }      
    });

    push.on('error', function(err){
      alert("PNR Error", JSON.stringify(err));
    });
                
  });
})

.config(function($stateProvider, $urlRouterProvider,ChartJsProvider) {


     ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('login',{
      url:'/login',
      templateUrl: 'templates/login/login.html',
      controller: 'loginCtrl'
  })

.state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home/home.html"
        }
      }
    })
   .state('home',{
      url:'/home',
      templateUrl: 'templates/home/home.html',
      controller: 'homeCtrl'
  })

  .state('groupMap',{

      url:'/groupMap',
      templateUrl:'templates/groupMap/groupMap.html',
      controller: 'groupmapCtrl'
  })

  .state('history',{
      url:'/history',
      templateUrl: 'templates/history/history.html',
      controller: 'historyCtrl'
  })

  .state('kmssummry',{
      url:'/kmssummry',
      templateUrl:'templates/kmssummry/kmssummry.html',
      controller:'kmssummryCtrl'
  })

  .state('multitrack',{
         url: '/multitrack',
         templateUrl:'templates/multitrack/multitrack.html',
        controller:'mutitrackCtrl'
         })

  .state('routes',{
         url:'/routes',
         templateUrl:'templates/routes/routes.html',
        controller:'routesCtrl'
    })
  .state('addsites',{
      url:'/addsites',
      templateUrl:'templates/addsites/addsite.html',
      controller:'addsiteCtrl'
  })
  .state('movement',{
      url:'/movement',
      templateUrl:'templates/movement/movement.html',
      controller:'movementCtrl'
  })
  .state('overspeed',{
      url:'/overspeed',
      templateUrl:'templates/overspeed/overspeed.html',
      controller:'overspeedCtrl'
  })
  .state('parkedidle',{
      url:'/parkedidle',
      templateUrl:'templates/parkedidle/parkedidle.html',
      controller:'parkedidleCtrl'
  })
  .state('eventsite',{
      url:'/eventsite',
      templateUrl:'templates/eventsite/eventsite.html',
      controller:'eventsiteCtrl'
  })

  .state('multiplesite',{
      url:'/multiplesite',
      templateUrl:'templates/multiplesite/multiplesite.html',
      controller:'multiplesiteCtrl'
  })
  .state('sitetrip',{
      url:'/sitetrip',
      templateUrl:'templates/sitetrip/sitetrip.html',
      controller:'sitetripCtrl'
  })
  .state('triptime',{
      url:'/triptime',
      templateUrl:'templates/triptime/triptime.html',
      controller:'triptimeCtrl'
  })
  .state('tripsummry',{
      url:'/tripsummry',
      templateUrl:'templates/tripsummry/tripsummry.html',
      controller:'tripsummryCtrl'
  })
  .state('alarm',{
      url:'/alarm',
      templateUrl:'templates/alarm/alarm.html',
      controller:'alarmCtrl'
  })
  .state('acstoppage',{
      url:'/acstoppage',
      templateUrl:'templates/acstoppage/acstoppage.html',
      controller:'acstoppageCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

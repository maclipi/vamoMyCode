angular.module('starter.controllers', [])



.controller('loginCtrl', function($scope,$stateParams,LoginService,Data,getUserData,$state,$ionicLoading,$ionicPopup,$timeout){

    console.log("Login Ctrl");

    $scope.user = {

        username:'',
        userpassword:''
    }


     $scope.final_Obj = [

             $scope.user,

        ];



    var storedUsername = window.localStorage.getItem("username");
    var storedPassword = window.localStorage.getItem("password");
    var deviceToken =   window.localStorage.getItem("token");

    if (storedUsername != null || storedUsername != "" || storedUsername != undefined)
    {
    console.log("userName is "+ storedUsername+" and Pass"+storedPassword);




     LoginService.all( storedUsername, storedPassword,deviceToken).then(function(data){

            console.log(data.data);

            $scope.getData = data.data;
            // call the details for the user
            console.log(data.data.authUser);

            // Data.setLoginStatus(true);



            getUserData.all(storedUsername).then(function(data){

                Data.setFirstName(storedUsername);
                Data.setImagePath($scope.getData.logo);
                 console.log(data.data);
                if($scope.getData.authUser == "Success")
            {
                window.localStorage.setItem("username",storedUsername);
                window.localStorage.setItem("password",storedPassword);
                $ionicLoading.hide();



               if (Data.getSetPage() == 1 || window.localStorage.getItem("defaultPage")==1)
                                  {
                                          $state.go('home');
                                  }
                                  else
                              $state.go('groupMap');

            }



            })



        })


    }











    $scope.login = function ()

    {

         $ionicLoading.show({
      template: '<p>Please Wait..</p><ion-spinner></ion-spinner>'
    });
        // this function will call the login api and then game begins





        LoginService.all(  $scope.user.username,$scope.user.userpassword,deviceToken).then(function(data){

            console.log(data.data);

            $scope.getData = data.data;
            // call the details for the user
            console.log(data.data.authUser);

            if($scope.getData.authUser == "failure")
            {
                console.log("User Login Failed");
                 $ionicLoading.hide();
                    $ionicPopup.alert({

                  content: 'Wrong UserName/Password'
                }).then(function(res) {
                    $state.go('login');
                });

            }

            else {
            getUserData.all($scope.user.username).then(function(data){

                Data.setFirstName($scope.user.username);
                Data.setImagePath($scope.getData.logo);
                 console.log(data.data);
                if($scope.getData.authUser == "Success")
            {
                window.localStorage.setItem("username",$scope.user.username);
                window.localStorage.setItem("password",$scope.user.userpassword);
                $ionicLoading.hide();
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

                $state.go('groupMap');
            }

            // else{
            //        $ionicLoading.hide();
            //      $ionicPopup.alert({
            //       title: '',
            //       content: 'Wrong UserName/Password'
            //     }).then(function(res) {
            //         $state.go('login');
            //     });


            // }

            })


            }
        })


    }
})

.controller('AppController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();

  };
})



.controller('SideMenuCtrl', function($scope,$timeout,$ionicSideMenuDelegate,Data) {

      $timeout(function() {
        // Watch for changes to the openRatio which is a value between 0 and 1 that says how "open" the side menu is

        $scope.$watch(function() {
          return $ionicSideMenuDelegate.getOpenRatio();
        },
          function(ratio) {
            $scope.data=ratio;
            if( ratio == 1){
                 $scope.user =Data.getFirstName();
                 $scope.imageUrl = Data.getImagePath();

             $scope.username =Data.getFirstName();;
            }else{}

          });
      });

  $scope.theme = 'ionic-sidemenu-dark';
  $scope.tree =
    [{
      id: 1,
      level: 0,
      name: 'Group Details',
      icon: "ion-map",
      state:'groupMap'

    },{
        id:3,
        level:0,
        name:'Vehicles Details',
        icon:'ion-crop',
        state:'home'

    },{
        id:4,
        level:0,
        name:'Settings',
        icon:'ion-gear-a',
        state:'overspeed'


},{
          id:5,
          level:0,
          name:'KM Summry',
          icon:'ion-calculator',
          state:'kmssummry',
  },{
        id:6,
        level:0,
        name:'Logout',
        icon:'ion-log-out',
        state:'multitrack'


}];

});

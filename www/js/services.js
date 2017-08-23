angular.module('starter.services', [])



.factory('LoginService', function ($http, $q,CONSTANTS) {

    return {
      all: function (username,password,deviceId) {

      console.log("token Service"+deviceId);
          return $http.get(''+CONSTANTS.baseUrl+'/verifyUser',
           {
            params: {
                userId: username,
                password:password,
                  gcmId :deviceId,
                  notifyEnable:true
                    }
            })
      }
  };
})

.factory('getUserData',function ($http,$q,CONSTANTS) {


    return{
        all: function (username) {

            return $http.get(''+CONSTANTS.baseUrl+'/getVehicleLocations',{

                params: {
                    userId: username
                }
            })

        }
    }
})


.factory('logoutUser',function($http,$q,CONSTANTS){

    return{
        all:function(username,deviceTOken){


            return $http.get(''+CONSTANTS.baseUrl+'/logOutUser',{

                params:{

                    gcmId:deviceTOken,
                    userId:username
                }
            })
        }
    }
})

.factory('getKMsummry',function ($http,$q,CONSTANTS){

    return {

        all: function (username,masterGroup){

            return $http.get(''+CONSTANTS.baseUrl+'/getKmsSummary',{

                params :{
                    userId : username,
                    groupId : masterGroup
                }
            })
        }
    }
})

.factory('getGroupVehiclesDetail',function ($http,$q,CONSTANTS){

    return {
        all: function (username,groupname){

            return $http.get(''+CONSTANTS.baseUrl+'/getVehicleLocations',{

                params: {
                    userId : username,
                    group : groupname
                }
            })
        }
    }
})

// api for getting current vehical location 

.factory('getCurrentVehicleStatus',function ($http,$q,CONSTANTS){


    return {

        all : function(vehicleid){

            return $http.get(''+CONSTANTS.baseUrl+'/getSelectedVehicleLocation?vehicleId='+vehicleid+'&track=single&maps=single',{

                params:{


                }
            })
        }
    }
     console.log("Hello");
},100000)


.factory('getVehicleHistory', function ($http,$q,CONSTANTS){

        return {

                all: function (userId,vehicleId,fromDate,toDate){

                        return $http.get(''+CONSTANTS.baseUrl+'/getVehicleHistory?userId='+userId+'&vehicleId='+vehicleId+'&interval=1&fromDateUTC='+fromDate+'000&toDateUTC='+toDate+'000',{

                            // return $http.get(''+CONSTANTS.baseUrl+'/getVehicleHistory?userId='+userId+'&vehicleId=ULTRA-TN66S5503&interval=1&fromDateUTC=1501905850000&toDateUTC=1502035390000',{

                            params:{

                            }
                        });
                }
        }

})
.factory('Data', function () {

    var data = {
        FirstName: ''
    };
    var imageData = {
        ImagePath :''
    };
    var loginStatus = {
        loginValue : ''
    };

    var TotalNumber = {

        totalNumber:''
    };
     var vehicleNumber = {

        VehicleNumber: ''
    };

    var deviceToken = {

        DeviceToken : ''

    };

    var setPage = {

            SetPage : ''
        }


    return {
        getFirstName: function () {
            return data.FirstName;
        },
        setFirstName: function (firstName) {
            data.FirstName = firstName;

        },
                  getSetPage: function(){
                      return setPage.SetPage;
                  },
                  setSetPage:function(pageVal){

                          setPage.SetPage = pageVal;
                  },
        getDeviceToken : function (){

            return deviceToken.DeviceToken;
        },
        setDeviceToken : function (deviceId){

            deviceToken.DeviceToken = deviceId;
        },

        getVehicleNumber: function(){

            return vehicleNumber.VehicleNumber;
        },
        setVehicleNumber: function(vehicleNumberId)
        {
                vehicleNumber.VehicleNumber = vehicleNumberId;
        },

        getImagePath: function(){

            return data.ImagePath;
        },
        setImagePath: function(imagePath){
            data.ImagePath = imagePath;
        },
        getLoginStatus: function (){
            return loginStatus.loginValue;
        },
        setLoginStatus: function(loginValue){

            loginStatus.loginValue = loginValue;
        },
        getTotalNumber : function (){

            return  TotalNumber.totalNumber;
        },
        setTotalNumber : function (totalNumber){

            TotalNumber.totalNumber = totalNumber;

        }
    };
})
;

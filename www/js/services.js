angular.module('starter.services', [])



.factory('LoginService', function ($http, $q,CONSTANTS) {

    return {
      all: function (username,password) {
          return $http.get(''+CONSTANTS.baseUrl+'/verifyUser',
           {
           	params: {
          		userId: username,
          		password:password
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

.factory('getKMsummry',function ($http,$q,CONSTANTS){

    return {

        all: function (username,masterGroup){
                alert("username"+username+" password"+masterGroup);
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

    return {
        getFirstName: function () {
            return data.FirstName;
        },
        setFirstName: function (firstName) {
            data.FirstName = firstName;
          
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
        }
    };
})
;

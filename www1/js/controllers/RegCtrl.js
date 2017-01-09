/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')


    .controller('RegCtrl', function ($scope, $state, $ionicLoading, $timeout, $ionicHistory, $cordovaGeolocation, $localstorage,
                                     PhoneContactsFactory, $ionicPlatform, $cordovaDevice, $window, $cordovaLocalNotification, $cordovaNetwork, $cordovaCamera, BlueTeam ,TimeBoard) {


        console.log("regcont started");

        //photo,name,mobile,password,address,experience,services,city,area

        $scope.user = {};
        $scope.data = {};

        $scope.registered = true;
        $scope.checked = false;

        $scope.user.profile_pic_id = 0;
        $scope.user.area_id = 0;
        $scope.user.city_id = 0;



        $scope.position = {
            "coords": {
                "longitude": null,
                "latitude": null
            }
        };

        var posOptions = {
            "enableHighAccuracy": false,
            "timeout": 60000,
            "maximumAge": 0
        };



        $scope.show = function () {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide();
        };


        $scope.getAreas = function(){

            console.log($scope.user.city_id);
            BlueTeam.getCityAreas($scope.user.city_id).then(function (d) {

                $scope.areas = d.areas;
                console.log(JSON.stringify($scope.areas));

            });
        };

        $scope.login = function () {


            $scope.show();
            TimeBoard.loginUser({

                    "gps_location": $scope.position.coords.latitude + ',' + $scope.position.coords.longitude,
                    "mobile": $scope.user.mobile,
                    "password": $scope.user.password,
                    "device_id": $cordovaDevice.getUUID()


                })
                .then(function (d) {

                    //setObject
                    $scope.hide();

                    if (d.user.id) {

                        $localstorage.set('user', JSON.stringify(d.user));
                        $localstorage.set('user_id', d.user.id);
                        $localstorage.set('services', JSON.stringify(d.user.services));

                        $timeout(function () {
                            $window.location.reload(true);
                        }, 5000);
                        $state.go('tab.service-list');



                    } else {
                        $scope.pwdError = true;
                    }

                });


        }
        $scope.checkReg = function () {
            console.log("trying to check");
            if ($scope.checked == false && $scope.user.mobile != undefined) {
                $scope.checked = true;
                TimeBoard.checkMobile($scope.user.mobile)
                    .then(function (d) {

                        console.log(d.status);
                        if(d.status == false){
                          
                              BlueTeam.getCities().then(function (d) {
                                console.log($scope.position.coords.latitude + ',' + $scope.position.coords.longitude);
                                if($scope.position.coords.latitude)
                                    BlueTeam.getLocationDetails($scope.position.coords.latitude + ',' + $scope.position.coords.longitude).then(function (d) {
                                        $scope.user.city_id = d.location_details.city.id;
                                        $scope.user.area_id = d.location_details.area.id;
                                        BlueTeam.getCityAreas($scope.user.city_id).then(function (d) {

                                            $scope.areas = d.areas;

                                            console.log(JSON.stringify($scope.areas));

                                        });

                                    });

                                $scope.cities = d.cities;
                                console.log(JSON.stringify($scope.serviceProviders));

                            });
                        }
                        $scope.registered = d.status;

                    });


            }
            /*else $scope.data.password = "";*/
        };
        $scope.pwdError = false;
        $scope.checkSamePwd = function () {

            if ($scope.user.password != $scope.user.conf_password) {
                $scope.pwdError = true;
            }
            $scope.pwdError = false;


        };

        /*$scope.geolocation = false;
        if(navigator.geolocation) {
            $scope.geolocation = navigator.geolocation;
        }*/

        $ionicPlatform.ready(function () {
           /* if($scope.geolocation) {
                var locationService = $scope.geolocation; // native HTML5 geolocation
            }
            else {
                var locationService = navigator.geolocation; // cordova geolocation plugin
            }

            locationService.getCurrentPosition(
                function(pos) {
                    console.log("location inv",JSON.stringify(pos));

                },
                function(error) {
                    console.log("location inv",JSON.stringify(error.__proto__.message))

                },
                {enableHighAccuracy: false, timeout: 15000}
            );

            var options = { enableHighAccuracy: false };

            console.log("location by nav",JSON.stringify(
            navigator.geolocation.getCurrentPosition(function (position) {


                $scope.position = position;
                console.log("location by navigator",JSON.stringify(position));


            }, function (err) {

                console.log("error in geting location by navigator",err,JSON.stringify(err.message));
                $scope.position = {
                    "coords": {
                        "longitude": null,
                        "latitude": null
                    }
                };


            }, options)));

           */
            cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
                console.log("Location setting is " + (enabled ? "enabled" : "disabled"));
            }, function(error){
                console.error("The following error occurred: "+error);
            });
            cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
                console.log("Location is " + (authorized ? "authorized" : "unauthorized"));
            }, function(error){
                console.error("The following error occurred: "+error);
            });
            cordova.plugins.diagnostic.isLocationAvailable(function(available){
                console.log("Location is " + (available ? "available" : "not available"));
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {


                        $scope.position = position;
                        console.log("location",JSON.stringify(position));


                    }, function (err) {

                        console.log("error in geting location",err,JSON.stringify(err.message));
                        $scope.position = {
                            "coords": {
                                "longitude": null,
                                "latitude": null
                            }
                        };


                    });
                /*var watchOptions = {
                    timeout : 3000,
                    enableHighAccuracy: true // may cause errors if true
                };

                var watch = $cordovaGeolocation.watchPosition(watchOptions);
                watch.then(
                    null,
                    function(err) {
                        console.log("error in geting location",err,JSON.stringify(err));
                        // error
                    },
                    function(position) {
                        $scope.position = position;

                        console.log("location",JSON.stringify(position));
                        var lat  = position.coords.latitude;
                        var long = position.coords.longitude;
                        watch.clearWatch();
                    });

*/

            }, function(error){
                console.error("The following error occurred: "+error);
            });

            if ($cordovaNetwork.isOffline()) {

                $ionicPopup.confirm({

                    title: "Internet is not working",

                    content: "Internet is not working on your device."

                });

            }
    
            };

            //$scope.scheduleSingleNotification();

            $scope.findContact = function () {
                // var fields = ["id", "displayName", "name", "nickname", "phoneNumbers", "emails", "addresses", "ims", "organizations", "birthday", "note", "photos", "categories", "urls"];

                PhoneContactsFactory.find().then(function (contacts) {
                    $arr = [];
                    $buff = [];
                    if ($localstorage.get('lastContactId'))
                        lastContactId = parseInt($localstorage.get('lastContactId'));
                    else
                        lastContactId = -1;
                    var newlastContactId = lastContactId;
                    console.log("Last Id saved ", lastContactId);
                    var j = 0;
                    var i = 0
                    for (i = 0; i < contacts.length; i++) {

                        if (lastContactId < contacts[i].id) {
                            $arr.push({
                                //name: contacts[i].name.formatted,
                                id: contacts[i].id,
                                all: JSON.stringify(contacts[i])
                            });


                            $buff.push({
                                //name: contacts[i].name.formatted,
                                id: contacts[i].id,
                                all: contacts[i]
                            });

                            if (lastContactId < contacts[i].id)
                                newlastContactId = contacts[i].id;

                            j++;

                            if (j > 20) {

                                TimeBoard.postRaw({
                                        "root": {
                                            "gps_location": $scope.position.coords.latitude + ',' + $scope.position.coords.longitude,
                                            "raw": $buff,

                                            "device_id": $cordovaDevice.getUUID()
                                        }
                                    }, "contacts")
                                    .then(function (d) {


                                    });
                                j = 0;
                                $buff = [];

                            }
                        }
                    }


                    $localstorage.set('lastContactId', newlastContactId);
                    if ($buff.length > 0) {
                        BlueTeam.postRaw({
                                "root": {
                                    "gps_location": $scope.position.coords.latitude + ',' + $scope.position.coords.longitude,
                                    "raw": $buff,

                                    "device_id": $cordovaDevice.getUUID()
                                }
                            }, "contacts")
                            .then(function (d) {


                            });

                    }
                    //$scope.contacts = $arr;
                    //console.log(JSON.stringify($scope.contacts));


                });
            };
            //$scope.findContact();


        });


        if ($localstorage.get('name') === undefined || $localstorage.get('mobile') === undefined || $localstorage.get('email') === undefined ||
            $localstorage.get('name') === "" || $localstorage.get('mobile') === "") {

        } else {
            $ionicHistory.clearHistory();
            if ($localstorage.get('type') == "worker")
                $state.go('tab.worker-timer');
            else
                $state.go('tab.service-list');
        }


   
        $scope.regUser = function () {
            if ($scope.checked == false) {
                $scope.checkReg();
                return;
            }
            if ($scope.registered) {
                $scope.login();
                return;
            }

            if($scope.user.name == ""){
                $scope.error = "please enter your name";
                return;
            }
            if($scope.user.mobile == 0){
                $scope.error = "please enter your phoneNumber";
                return;
            }

            if($scope.user.email.length == 0){
                $scope.error = "enter your mobile";
                return;
            }
        
            $scope.error = null;


            if ($scope.user.password == $scope.user.conf_password) {

                $scope.show();

                $scope.user.location = $scope.position.coords.latitude + ',' + $scope.position.coords.longitude;
                $scope.user.device = null;
                $scope.user.device = $cordovaDevice.getUUID();

                TimeBoard.regUser($scope.user)
                    .then(function (d) {

                        $scope.hide();
                        //setObject
                        $localstorage.set('user', JSON.stringify(d.service_providers));
                        $localstorage.set('user_id', d.service_providers.id);

                        $scope.basicRegDone = true;

                     

                           

                     
                        console.log(JSON.stringify($scope.userServices));

                        console.log(JSON.stringify(d.service_providers));
                        d.service_providers.mobile = d.service_providers.mobile*1;
                        d

                        $scope.user = d.user_id;


                        if(d.error){

                            $scope.error = d.error;

                        }


                        /*$timeout(function () {
                         $window.location.reload(true);
                         }, 5000);


                         $state.go('tab.service-list');*/

                    });
            }
            else
                $scope.pwdError = true;
        };
    })

;
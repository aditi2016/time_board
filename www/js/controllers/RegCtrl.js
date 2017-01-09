/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')


    .controller('RegCtrl', function ($scope, $state, $ionicLoading, $timeout, $ionicHistory, $cordovaGeolocation, $localstorage,
                                     PhoneContactsFactory, $ionicPlatform, $window, $cordovaLocalNotification, $cordovaNetwork,TimeBoard) {


     

        //photo,name,mobile,password,address,experience,services,city,area

        $scope.user = {};
        $scope.data = {};

        $scope.registered = true;
        $scope.checked = false;

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

        $scope.login = function () {

            $scope.show();
            TimeBoard.loginUser({

                    "gps_location": $scope.position.coords.latitude + ',' + $scope.position.coords.longitude,
                    "mobile": $scope.user.mobile,
                    "password": $scope.user.password
                })
                .then(function (d) {

                    //setObject
                    $scope.hide();

                    if  (d.user) {

                        $localstorage.set('user', JSON.stringify(d.user));
                        $localstorage.set('user_id', d.user.id);

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
         /*   console.log("trying to check")*/;
            if ($scope.checked == false && $scope.user.mobile != undefined) {
                $scope.checked = true;
                TimeBoard.checkMobile($scope.user.mobile)
                    .then(function (d) {
                        $scope.registered = d.user;

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

        


        if ($localstorage.get('name') === undefined || $localstorage.get('mobile') === undefined || $localstorage.get('email') === undefined ||
            $localstorage.get('name') === "" || $localstorage.get('mobile') === "") {

        } else {
            $ionicHistory.clearHistory();
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
            if($scope.user.email == ""){
                $scope.error = "please enter your email";
                return;
            }
            $scope.error = null;

            if ($scope.user.password == $scope.user.conf_password) {
                $scope.show();
                $scope.user.location = $scope.position.coords.latitude + ',' + $scope.position.coords.longitude;
                
                TimeBoard.regUser($scope.user)
                    .then(function (d) {

                        $scope.hide();
                        //setObject
                        $localstorage.set('user', JSON.stringify(d.user));
                        $localstorage.set('user_id', d.user.id);
                      
                        d.user.mobile = d.user.mobile*1;
                        $scope.user = d.user;

                        if(d.error){
                            $scope.error = d.error;
                        }
                    });
            }
            else
                $scope.pwdError = true;
        };
    })

;
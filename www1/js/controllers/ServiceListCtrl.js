/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')

    .controller('ServiceListCtrl',
        [ '$scope', '$state', '$ionicPopup', '$ionicLoading', '$ionicHistory', '$localstorage', '$ionicSlideBoxDelegate', 
        '$cordovaToast','$cordovaDevice','TimeBoard','BlueTeam',
            function ($scope, $state, $ionicPopup, $ionicLoading, $ionicHistory, $localstorage, $ionicSlideBoxDelegate,
             $cordovaToast, $cordovaDevice, TimeBoard, BlueTeam) {



                 if ($localstorage.get('user_id') === undefined || $localstorage.get('user_id') === "") {
                    $ionicHistory.clearHistory();
                    console.log('hi');
                    $state.go('reg');
                    return;
                }

        console.log($localstorage.get('user'));
        $scope.user = JSON.parse($localstorage.get('user'));
        $scope.user_id = $localstorage.get('user_id');
       

                //JSON.parse()
        $scope.user = {};

                /*if ($localstorage.get('user_id') === undefined || $localstorage.get('user_id') === "") {
                    $ionicHistory.clearHistory();
                    $state.go('reg');
                    return;=
                    _}(tga  QAET0-754321`   `   )
                }*/

                /*console.log($localstorage.get('user'));
                $scope.user = JSON.parse($localstorage.get('user'));
                $scope.user_id = $localstorage.get('user_id');
                $scope.services = JSON.parse($localstorage.get('services'));
                $scope.campaignRequest = {};*/

                $scope.registerChallenge = function() {
                    $state.go('tab.register-challenge');
                }
                //$scope.campaignRequest.device = $cordovaDevice.getUUID();

                //registerChallenge();





function getChallengesResult() {
                    TimeBoard.getChallengesResult().then(function (d) {
                            if(d.result[0].name) {
                                console.log(d.result);
                                $scope.result = d.result;
                                
                            } else {
                               console.log(d); 
                            }

                        });
                }
                //$scope.campaignRequest.device = $cordovaDevice.getUUID();

                getChallengesResult();
$scope.timeT = [];
 function getUserChallenges() {
                    TimeBoard.getUserChallenges().then(function (d) {
                            if(d.challagens_owneship[0].name) {
                                console.log(d.challagens_owneship);
                                $scope.challanges = d.challagens_owneship;
                                for(var i=0;i<$scope.challanges.length;i++){
                                    $scope.timeT[i]=$scope.challanges[i].tm*1;    
                                }
                                
                                //$scope.timeT = "1483798400000";
                                //$scope.clock = initializeClock(2,d.challagens_owneship[0].complation_time)
                            } else {
                               console.log("error"); 
                            }

                        });
                }
                //$scope.campaignRequest.device = $cordovaDevice.getUUID();

                getUserChallenges();

                $scope.show = function () {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                };
                $scope.hide = function () {
                    $ionicLoading.hide();
                };

                
                
            }]);

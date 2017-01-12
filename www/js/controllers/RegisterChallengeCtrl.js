/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')

    .controller('RegisterChallengeCtrl',  function ($scope, $state, $ionicLoading, TimeBoard ,$localstorage) {

           if ($localstorage.get('user_id') === undefined || $localstorage.get('user_id') === "") {
            $ionicHistory.clearHistory();
            $state.go('reg');
            return;
        }

        console.log($localstorage.get('user'));
        $scope.user = JSON.parse($localstorage.get('user'));
        $scope.user_id = $localstorage.get('user_id');
             //JSON.parse()
                $scope.user = {};
                $scope.data = {};
                $scope.data.hours = "";
                $scope.data.minutes = "";

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
             


        $scope.complation_time = new Date();
        $scope.complation_time.setHours(7);
        $scope.complation_time.setMinutes(0);


      

        $scope.data.startTimeSet = false;

        $scope.takeStartTime = function () {
            console.log($scope.complation_time.toString(), $scope.data.drv.toString());
            $scope.data.startTimeSet = true;
        };



                $scope.addChallenge = function (){
                    var challenge = {"root" :
                                                    { "name": $scope.data.challengeName,
                                                        "deadline":$scope.data.drv,
                                                        "description":$scope.data.descrption_of_challenge,
                                                        "user_id": $scope.user_id
                                                    }
                                                } ;
                    console.log(challenge);
                    TimeBoard.registerChallenge(challenge).then(function (d) 
                                                        {
                                                            if(d.instance.root.challenge_id) {
                                                                $state.go('tab.service-list');    
                                                            } else {
                                                               alert("error"); 
                                                            }
                                                            
                                                        });
                                                    };

                $scope.show = function () {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                };
                $scope.hide = function () {
                    $ionicLoading.hide();
                };

               
            });

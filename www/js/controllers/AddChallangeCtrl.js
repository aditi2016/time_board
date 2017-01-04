/**
 * Created by spider-ninja on 11/27/16.
 */
angular.module('starter.controllers')

    .controller('AddChallangeCtrl',
        [ '$scope', '$state', '$ionicPopup', '$ionicLoading', '$ionicHistory', '$localstorage', '$ionicSlideBoxDelegate', 
        '$cordovaToast','$cordovaDevice','TimeBoard','BlueTeam',
            function ($scope, $state, $ionicPopup, $ionicLoading, $ionicHistory, $localstorage, $ionicSlideBoxDelegate,
             $cordovaToast, $cordovaDevice, TimeBoard, BlueTeam) {

                //JSON.parse()
                $scope.user = {};
                $scope.data = {};

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
             


        $scope.datetimeValue = new Date();
        $scope.datetimeValue.setHours(7);
        $scope.datetimeValue.setMinutes(0);

        $scope.data.startTimeSet = false;

        $scope.takeStartTime = function () {
            console.log($scope.datetimeValue.toString(), $scope.data.drv.toString());
            $scope.data.startTimeSet = true;
        };



                $scope.addChallenge = function (){
                    //console.log($scope.search.keywords);
                    TimeBoard.registerChallenge({
                        "name": $scope.data.name,
                        "mobile": "" + $scope.data.mobile,
                        "email": $scope.data.email,
                        "challenge_name": $scope.data.challenge_name,
                        "challenge_name": $scope.data.challenge_name,
                        "complation_time": $scope.data.complation_time,
                        "creation_time": $scope.data.creation_time,
                        "descrption_of_challenge":$scope.data.descrption_of_challenge
                    }).then(function (d) {
                        if(d.instance.challange_id) {
                            $state.go('service-list');    
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

                $scope.search = function (){
                    console.log($scope.search.keywords);
                    BlueTeam.search($scope.search.keywords).then(function (d) {

                        $scope.searchResults = d.allServices;
                        console.log(JSON.stringify($scope.searchResults));
                        $scope.hide();
                    });
                };

                $scope.createCampaigning = function(type){

                    $scope.campaignRequest.type = type;
                    var sendInfoPopup = $ionicPopup.show({
                        template: '<input type="number" ng-model="campaignRequest.amount"/>',
                        title: '<h4><b>'+type.toUpperCase() +' Campaigning</b></h4>',
                        subTitle: '<h5>You have '+ $scope.serviceProviderD[type+'_credit'] + ' created<br/> How much you want to us?</h5>',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancel'},
                            {
                                text: '<b>USE</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    if (!$scope.campaignRequest.amount) {
                                        //don't allow the user to close unless he enters wifi password
                                        e.preventDefault();

                                    } else {

                                        return $scope.campaignRequest.amount;
                                    }
                                }
                            }
                        ]
                    });

                    sendInfoPopup.then(function (res) {
                        console.log("tep", res);
                        if (res) {
                            $scope.sendCampaigning();
                        }
                    });

                };
                $scope.sendCampaigning = function () {

                    $scope.show();


                    console.log(JSON.stringify($scope.position));
                    //$scope.campaignRequest.location = $scope.position.coords.latitude + ',' + $scope.position.coords.longitude;
                    BlueTeam.createCampaigningRequest($scope.user_id,$scope.campaignRequest)
                        .then(function (d) {
                            $scope.hide();

                            $scope.campaignRequest = {};
                            console.log(d.campaign_request.id);
                            if(d.campaign_request.id) {

                                $cordovaToast.showLongBottom('Request for Campaigning Sent, Successfully').then(function (success) {
                                    // success
                                }, function (error) {
                                    // error
                                });
                            } else {
                                $cordovaToast.showLongBottom('Sorry, Something went wrong!').then(function (success) {
                                    // success
                                }, function (error) {
                                    // error
                                });
                            }

                        });
                };
                //scope.show();


                BlueTeam.getServiceProvider($scope.user_id).then(function (d) {

                    $scope.serviceProviderD = d.service_provider[0];
                    $scope.serviceProviderD.reliability_score += 3;
                    $scope.serviceProviderD.reliability_score *= 1;
                    $scope.serviceProviderD.reliability_count += 1;
                    console.log(JSON.stringify($scope.serviceProviderD));

                });
                //getServiceProviderScore
                BlueTeam.getServiceProviderScore($scope.user_id).then(function (d) {

                    $scope.serviceProviderQuility = d.counts;
                    //'complain','suggestion','appreciation','marvelous'
                    var add = 0;
                    $scope.serviceProviderQuilityScore = 3;
                    $scope.serviceProviderQuilityScoreTotal = 4;
                    for(var i = 0; i < $scope.serviceProviderQuility.length; i++ ) {
                        if($scope.serviceProviderQuility[i].type == "complain")
                            add = 1;
                        if($scope.serviceProviderQuility[i].type == "suggestion")
                            add = 2;
                        if($scope.serviceProviderQuility[i].type == "appreciation")
                            add = 3;
                        if($scope.serviceProviderQuility[i].type == "marvelous")
                            add = 4;
                        $scope.serviceProviderQuilityScore += add*$scope.serviceProviderQuility[i].count;
                        $scope.serviceProviderQuilityScoreTotal += 4*$scope.serviceProviderQuility[i].count;
                    }
                    console.log(JSON.stringify($scope.serviceProviderD));

                });


            }]);

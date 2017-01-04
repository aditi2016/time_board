angular.module('starter.services', [])
 .factory('TimeBoard', function ($http) {
        // Might use a resource here that returns a JSON array

        var url = "http://loc.api.time-board.shatkonlabs.com";
                 return {
            getChallengesResult: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/objects/result').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    //console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            registerChallenge: function (user) {
                  console.log(JSON.stringify(user));
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.post(url + '/objects',user).then(function (response) {
                    // console.log(JSON.stringify(response))
                    // The then function here is an opportunity to modify the response
                    //console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.user;
                });
                // Return the promise to the controller
                return promise;
            },

            getUserChallenges: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/objects').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    //console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
                  }
        };
    })
        
 .factory('BlueTeam', function ($http) {
        // Might use a resource here that returns a JSON array

        var url = "https://blueteam.in/api";
        var urlSP = "https://blueteam.in/sp_api";
        var urlWazir = "https://blueteam.in/wazir_api";
        return {
            getServices: function (type) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/services' + (type ? type : "")).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    //console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getWork: function (worker_id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/work/' + worker_id + "?current_time=" + new Date()).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getUserById: function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/workers/' + id ).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getRefWorkers: function (user_id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/workers?user_id=' + user_id ).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            postWork: function (worker_id, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/work/' + worker_id, data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            calPrice: function (service, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/cal-price/' + service, data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            checkMobile: function (mobile) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/service_provider?mobile=' + mobile).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getPrice: function (service) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/pricings/' + service).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getMysr: function (mobile) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/mysr/' + mobile).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getMysrByCEMId: function (cem_user_id, status) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/cem_mysr/' + cem_user_id + '?status=' + status).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getFaq: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/FAQ').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getTnc: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/tnc').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getServiceProviderServices: function (filter) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/services'+filter).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getCities: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/cities').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            getCityAreas: function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/cities/'+id+'/areas').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getServiceProviders: function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/service/'+ id).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getMonthlyIncome: function (id) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/service_provider/'+ id + '/invoice').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            search: function (keywords) {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(urlSP + '/search/'+ keywords).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },



            getVerification: function () {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url + '/verification_process').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            makeServiceRequest: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/service_request', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            feedbackRequest: function (id, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/service_provider/'+id+'/feedback_request', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            sendInvoice: function (id,data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/service_provider/'+id+'/invoice', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            createCampaigningRequest: function (id,data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/service_provider/'+ id +'/campaigning_request', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            getServiceProvider: function (id) {
                var promise = $http.get(urlSP + '/service_provider/'+ id).then(function (response) {

                    console.log(JSON.stringify(response));

                    return response.data;
                });

                return promise;
            },
            //api.wazir.shatkonlabs.com/feedbacks/1/bt-sp-2/count

            getServiceProviderScore: function (id) {
                var promise = $http.get(urlWazir + '/feedbacks/1/bt-sp-'+id+'/count').then(function (response) {

                    console.log(JSON.stringify(response));

                    return response.data;
                });

                return promise;
            },

            getLocationDetails: function (id) {
                var promise = $http.get(urlWazir + '/location/-'+id).then(function (response) {

                    console.log(JSON.stringify(response));

                    return response.data;
                });

                return promise;
            },


            meetingRequest: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/meetings', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            postWorker: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/workers/addNew', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            updateSR: function (sr_id, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log("request set by ", sr_id, JSON.stringify(data));
                var promise = $http.post(url + '/service_request/sr_id', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            updateRating: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/ratings', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            makePayment: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/payment', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            postFeedback: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/feedback', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            postRaw: function (data, type) {
                // $http returns a promise, which has a then function, which also returns a promise
                console.log(JSON.stringify(data));
                var promise = $http.post(url + '/raw?type=' + type, data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            regUser: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise

                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/service_provider', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            regUserServices: function (userId, data) {
                // $http returns a promise, which has a then function, which also returns a promise
                var services = {"services":data};

                console.log(JSON.stringify(services));
                var promise = $http.post(urlSP + '/service_provider/'+userId+'/services', services).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            loginUser: function (data) {
                // $http returns a promise, which has a then function, which also returns a promise

                console.log(JSON.stringify(data));
                var promise = $http.post(urlSP + '/auth', data).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(JSON.stringify(response.data));
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            }
        };
    })

    .factory('CallLogService', ['$q', function ($q) {
        return {

            list: function (days) {
                var q = $q.defer();
                // days is how many days back to go
                window.plugins.calllog.list(days, function (response) {
                    q.resolve(response.rows);
                }, function (error) {
                    q.reject(error)
                });
                return q.promise;
            },

            contact: function (phoneNumber) {
                var q = $q.defer();
                window.plugins.calllog.contact(phoneNumber, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                });
                return q.promise;
            },

            show: function (phoneNumber) {
                var q = $q.defer();
                window.plugins.calllog.show(phoneNumber, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                });
                return q.promise;
            },

            delete: function (phoneNumber) {
                var q = $q.defer();
                window.plugins.calllog.delete(id, function (response) {
                    q.resolve(response);
                }, function (error) {
                    q.reject(error)
                });
                return q.promise;
            }
        }
    }])

    .factory('$localstorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])

    .factory('Contactlist', function () {
        return {
            getAllContacts: function () {
                return [
                    {name: 'Contact 1'},
                    {name: 'Contact 2'},
                    {name: 'Contact 3'},
                    {name: 'Contact 4'}
                ];
            }
        };
    })
    .directive('timer', ['$compile', function ($compile) {
    return  {
      restrict: 'EAC',
      replace: false,
      scope: {
        interval: '=interval',
        startTimeAttr: '=startTime',
        endTimeAttr: '=endTime',
        countdownattr: '=countdown',
        autoStart: '&autoStart',
        maxTimeUnit: '='
      },
      controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {

        // Checking for trim function since IE8 doesn't have it
        // If not a function, create tirm with RegEx to mimic native trim
        if (typeof String.prototype.trim !== 'function') {
          String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
          };
        }

        //angular 1.2 doesn't support attributes ending in "-start", so we're
        //supporting both "autostart" and "auto-start" as a solution for
        //backward and forward compatibility.
        $scope.autoStart = $attrs.autoStart || $attrs.autostart;

        if ($element.html().trim().length === 0) {
          $element.append($compile('<span>{{millis}}</span>')($scope));
        } else {
          $element.append($compile($element.contents())($scope));
        }

        $scope.startTime = null;
        $scope.endTime = null;
        $scope.timeoutId = null;
        $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) >= 0 ? parseInt($scope.countdownattr, 10) : undefined;
        $scope.isRunning = false;

        $scope.$on('timer-start', function () {
          $scope.start();
        });

        $scope.$on('timer-resume', function () {
          $scope.resume();
        });

        $scope.$on('timer-stop', function () {
          $scope.stop();
        });

        $scope.$on('timer-clear', function () {
          $scope.clear();
        });

        $scope.$on('timer-set-countdown', function (e, countdown) {
          $scope.countdown = countdown;
        });

        function resetTimeout() {
          if ($scope.timeoutId) {
            clearTimeout($scope.timeoutId);
          }
        }

        $scope.start = $element[0].start = function () {
          $scope.startTime = $scope.startTimeAttr ? new Date($scope.startTimeAttr) : new Date();
          $scope.endTime = $scope.endTimeAttr ? new Date($scope.endTimeAttr) : null;
          if (!$scope.countdown) {
            $scope.countdown = $scope.countdownattr && parseInt($scope.countdownattr, 10) > 0 ? parseInt($scope.countdownattr, 10) : undefined;
          }
          resetTimeout();
          tick();
          $scope.isRunning = true;
        };

        $scope.resume = $element[0].resume = function () {
          resetTimeout();
          if ($scope.countdownattr) {
            $scope.countdown += 1;
          }
          $scope.startTime = new Date() - ($scope.stoppedTime - $scope.startTime);
          tick();
          $scope.isRunning = true;
        };

        $scope.stop = $scope.pause = $element[0].stop = $element[0].pause = function () {
          var timeoutId = $scope.timeoutId;
          $scope.clear();
          $scope.$emit('timer-stopped', {timeoutId: timeoutId, millis: $scope.millis, seconds: $scope.seconds, minutes: $scope.minutes, hours: $scope.hours, days: $scope.days});
        };

        $scope.clear = $element[0].clear = function () {
          // same as stop but without the event being triggered
          $scope.stoppedTime = new Date();
          resetTimeout();
          $scope.timeoutId = null;
          $scope.isRunning = false;
        };

        $element.bind('$destroy', function () {
          resetTimeout();
          $scope.isRunning = false;
        });

        function calculateTimeUnits() {

          // compute time values based on maxTimeUnit specification
          if (!$scope.maxTimeUnit || $scope.maxTimeUnit === 'day') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            $scope.days = Math.floor((($scope.millis / (3600000)) / 24));
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'second') {
            $scope.seconds = Math.floor($scope.millis / 1000);
            $scope.minutes = 0;
            $scope.hours = 0;
            $scope.days = 0;
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'minute') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor($scope.millis / 60000);
            $scope.hours = 0;
            $scope.days = 0;
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'hour') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor($scope.millis / 3600000);
            $scope.days = 0;
            $scope.months = 0;
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'month') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
            $scope.months = Math.floor((($scope.millis / (3600000)) / 24) / 30);
            $scope.years = 0;
          } else if ($scope.maxTimeUnit === 'year') {
            $scope.seconds = Math.floor(($scope.millis / 1000) % 60);
            $scope.minutes = Math.floor((($scope.millis / (60000)) % 60));
            $scope.hours = Math.floor((($scope.millis / (3600000)) % 24));
            $scope.days = Math.floor((($scope.millis / (3600000)) / 24) % 30);
            $scope.months = Math.floor((($scope.millis / (3600000)) / 24 / 30) % 12);
            $scope.years = Math.floor(($scope.millis / (3600000)) / 24 / 365);
          }

          // plural - singular unit decision
          $scope.secondsS = $scope.seconds == 1 ? '' : 's';
          $scope.minutesS = $scope.minutes == 1 ? '' : 's';
          $scope.hoursS = $scope.hours == 1 ? '' : 's';
          $scope.daysS = $scope.days == 1 ? '' : 's';
          $scope.monthsS = $scope.months == 1 ? '' : 's';
          $scope.yearsS = $scope.years == 1 ? '' : 's';
          //add leading zero if number is smaller than 10
          $scope.sseconds = $scope.seconds < 10 ? '0' + $scope.seconds : $scope.seconds;
          $scope.mminutes = $scope.minutes < 10 ? '0' + $scope.minutes : $scope.minutes;
          $scope.hhours = $scope.hours < 10 ? '0' + $scope.hours : $scope.hours;
          $scope.ddays = $scope.days < 10 ? '0' + $scope.days : $scope.days;
          $scope.mmonths = $scope.months < 10 ? '0' + $scope.months : $scope.months;
          $scope.yyears = $scope.years < 10 ? '0' + $scope.years : $scope.years;

        }

        //determine initial values of time units and add AddSeconds functionality
        if ($scope.countdownattr) {
          $scope.millis = $scope.countdownattr * 1000;

          $scope.addCDSeconds = $element[0].addCDSeconds = function (extraSeconds) {
            $scope.countdown += extraSeconds;
            $scope.$digest();
            if (!$scope.isRunning) {
              $scope.start();
            }
          };

          $scope.$on('timer-add-cd-seconds', function (e, extraSeconds) {
            $timeout(function () {
              $scope.addCDSeconds(extraSeconds);
            });
          });

          $scope.$on('timer-set-countdown-seconds', function (e, countdownSeconds) {
            if (!$scope.isRunning) {
              $scope.clear();
            }

            $scope.countdown = countdownSeconds;
            $scope.millis = countdownSeconds * 1000;
            calculateTimeUnits();
          });
        } else {
          $scope.millis = 0;
        }
        calculateTimeUnits();

        var tick = function () {

          $scope.millis = new Date() - $scope.startTime;
          var adjustment = $scope.millis % 1000;

          if ($scope.endTimeAttr) {
            $scope.millis = $scope.endTime - new Date();
            adjustment = $scope.interval - $scope.millis % 1000;
          }


          if ($scope.countdownattr) {
            $scope.millis = $scope.countdown * 1000;
          }

          if ($scope.millis < 0) {
            $scope.stop();
            $scope.millis = 0;
            calculateTimeUnits();
            return;
          }
          calculateTimeUnits();

          //We are not using $timeout for a reason. Please read here - https://github.com/siddii/angular-timer/pull/5
          $scope.timeoutId = setTimeout(function () {
            tick();
            $scope.$digest();
          }, $scope.interval - adjustment);

          $scope.$emit('timer-tick', {timeoutId: $scope.timeoutId, millis: $scope.millis});

          if ($scope.countdown > 0) {
            $scope.countdown--;
            $scope.countdownattr = $scope.countdown.toString();
          }
          else if ($scope.countdown <= 0) {
            $scope.stop();
          }
        };

        if ($scope.autoStart === undefined || $scope.autoStart === true) {
          $scope.start();
        }
      }]
    };
  }]);
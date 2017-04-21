'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        $scope.dishes = [];

        menuFactory.getDishes()
            .then(function (success) {
                $scope.dishes = success.data;
                $scope.showMenu = true;
            }, function (err) {
                $scope.message = "Error: " + err.status + " " + err.statusText;
            });


        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };

        var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', function ($scope) {

        $scope.sendFeedback = function () {

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";
        menuFactory.getDish(parseInt($stateParams.id, 10))
            .then(function (success) {
                $scope.dish = success.data;
                $scope.showDish = true;
            },
            function (err) {
                $scope.message = "Error: " + err.status + " " + err.statusText;
            });
    }])

    .controller('DishCommentController', ['$scope', function ($scope) {
        $scope.ratings = [1, 2, 3, 4, 5];
        $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };

        $scope.submitComment = function () {

            $scope.mycomment.date = new Date().toISOString();

            $scope.dish.comments.push($scope.mycomment);

            $scope.commentForm.$setPristine();

            $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };
        };
    }])

    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
        var promotion = menuFactory.getPromotion(0);
        $scope.promotion = promotion;

        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";
        menuFactory.getDish(0)
            .then(function (success) {
                $scope.dish = success.data;
                $scope.showDish = true;
            },
            function (err) {
                $scope.message = "Error: " + err.status + " " + err.statusText;
            });

        var leader = corporateFactory.getLeader(3);
        $scope.leader = leader;
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        var leaders = corporateFactory.getLeaders();
        $scope.leaders = leaders;
    }]);
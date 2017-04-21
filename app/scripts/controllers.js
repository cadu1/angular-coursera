'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        $scope.dishes = [];
        menuFactory.getDishes().query(
            function (success) {
                $scope.dishes = success;
                $scope.showMenu = true;
            },
            function (err) {
                $scope.message = "Error: " + err.status + " " + err.statusText;
            }
        );

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
        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = {};
        menuFactory.getDishes()
            .get({ id: parseInt($stateParams.id, 10) })
            .$promise.then(
            function (success) {
                $scope.showDish = true;
                $scope.dish = success;
            },
            function (err) {
                $scope.message = "Error: " + err.status + " " + err.statusText;
            });
    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.ratings = [1, 2, 3, 4, 5];
        $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };

        $scope.submitComment = function () {

            $scope.mycomment.date = new Date().toISOString();

            $scope.dish.comments.push($scope.mycomment);

            menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);

            $scope.commentForm.$setPristine();

            $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };
        };
    }])

    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
        var promotion = menuFactory.getPromotion(0);
        $scope.promotion = promotion;

        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = {};
        menuFactory.getDishes()
            .get({ id: 0 })
            .$promise.then(
            function (success) {
                $scope.dish = success;
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
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

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

        $scope.sendFeedback = function () {

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                feedbackFactory.sendFeedback().save($scope.feedback);
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
        $scope.showPromo = false;
        $scope.promoMsg = "Loading ...";
        $scope.promotion = {};
        menuFactory.getPromotion()
            .get({ id: 0 })
            .$promise.then(
            function (success) {
                $scope.promotion = success;
                $scope.showPromo = true;
            },
            function (err) {
                $scope.promoMsg = "Error: " + err.status + " " + err.statusText;
            });

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

        $scope.showLeader = false;
        $scope.leaderMsg = "Loading ...";
        $scope.leader = {};
        corporateFactory.getLeaders()
            .get({ id: 3 })
            .$promise.then(
            function (success) {
                $scope.leader = success;
                $scope.showLeader = true;
            },
            function (err) {
                $scope.leaderMsg = "Error: " + err.status + " " + err.statusText;
            });

    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.showLeader = false;
        $scope.leaderMsg = "Loading ...";
        $scope.leaders = [];
        corporateFactory.getLeaders()
            .query(
            function (success) {
                $scope.leaders = success;
                $scope.showLeader = true;
            },
            function (err) {
                console.log(err);
                $scope.leaderMsg = "Error: " + err.status + " " + err.statusText;
            });

    }]);
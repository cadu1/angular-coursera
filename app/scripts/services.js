'use strict';

angular.module('confusionApp')

    .constant("baseURL", "http://localhost:3000/")

    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getDishes = function () {
            return $resource(baseURL + 'dishes/:id', null, { 'update': { method: 'PUT' } });
        };

        // implement a function named getPromotion
        // that returns a selected promotion.
        this.getPromotion = function () {
            return $resource(baseURL + 'promotions/:id', null, { 'get': { method: 'GET' } });
        };

    }])

    .service('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.sendFeedback = function () {
            return $resource(baseURL + 'feedback/:id', null, { 'update': { method: 'PUT' } });
        };

    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        var corpfac = {};

        // the other named getLeader(index)
        corpfac.getLeaders = function () {
            return $resource(baseURL + 'leadership/:id', null, { 'get': { method: 'GET' } });
        };
        // Remember this is a factory not a service

        return corpfac;
    }]);
var app = angular.module('inventoryTracker', ['ngRoute', 'ngResource', 'ui.bootstrap'])
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/app/views/inventory.html'
        });
});
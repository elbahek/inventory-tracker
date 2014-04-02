var app = angular.module('inventoryTracker', ['ngRoute', 'ngResource', 'ui.bootstrap', 'angular-carousel'])
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/app/views/inventory.html'
        });
});
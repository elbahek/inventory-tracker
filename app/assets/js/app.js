angular.module('inventoryTracker', ['ngRoute', 'ui.bootstrap'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/inventory.html'
            })
            .when('/rpg-settings', {
                templateUrl: '/views/game_settings.html'
            })
    })
    .controller('MainController', function($scope, $location, $routeParams) {
        $scope.go = function(path) {
            $location.path(path);
        }
    })
    /*.directive('navigationMenu', function() {
        return {
            templateUrl: '/views/menu.html'
        };
    })*/;
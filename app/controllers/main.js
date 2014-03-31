var app = angular.module('inventoryTracker')
app.controller('MainController', function($scope, $location) {
    $scope.go = function(path) {
        $location.path(path);
    }
});
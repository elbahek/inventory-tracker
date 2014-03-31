var app = angular.module('inventoryTracker');
app.factory('inventoryFactory', function($resource){
    return $resource('/app/test-data/inventory.json');
});
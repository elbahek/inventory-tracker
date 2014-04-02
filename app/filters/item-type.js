var app = angular.module('inventoryTracker');
app.filter('itemTypeFilter', function() {
    return function(items, itemTypesFilterState) {
        var filteredItems = [];
        for (var i in items) {
            if (itemTypesFilterState[items[i].type]) {
                filteredItems.push(items[i]);
            }
        }

        return filteredItems;
    }
});
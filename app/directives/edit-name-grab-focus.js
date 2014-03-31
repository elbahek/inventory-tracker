var app = angular.module('inventoryTracker');
app.directive('itEditNameGrabFocus', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$watch('[editingNameCharacterId, editingNameItemId]', function(newValues) {
                var characterId = newValues[0];
                var itemId = newValues[1];
                if (scope.$parent.character.id === characterId && scope.item.id === itemId && characterId !== null && itemId !== null) {
                    $timeout(function(){
                        element[0].focus();
                    },0);
                }
            }, true);
        }
    }
});
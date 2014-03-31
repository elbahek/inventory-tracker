var app = angular.module('inventoryTracker');
app.directive('itEnter', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.itEnter);
                    });
                    event.preventDefault();
                    $timeout(function(){
                        element[0].blur();
                    },0);
                }
            });
        }
    }
});
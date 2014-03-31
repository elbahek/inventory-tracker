var app = angular.module('inventoryTracker');
app.directive('itEsc', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 27) {
                    scope.$apply(function () {
                        scope.$eval(attrs.itEsc);
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
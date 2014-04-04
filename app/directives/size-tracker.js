var app = angular.module('inventoryTracker');
app.directive('itSizeTracker', function($window) {
    return {
        restrict: 'AE',
        link: function(scope) {
            scope.setViewportInfo = function() {
                scope.viewportWidth = $window.innerWidth;
                scope.viewportHeight = $window.innerHeight;
                if (scope.viewportWidth < 768)
                    scope.viewportType = 'xs';
                else if (scope.viewportWidth >= 768 && scope.viewportWidth < 992)
                    scope.viewportType = 'sm';
                else if (scope.viewportWidth >= 992 && scope.viewportWidth < 1200)
                    scope.viewportType = 'md';
                else
                    scope.viewportType = 'lg';
            };
            scope.setViewportInfo();
            return angular.element($window).bind('resize', function() {
                scope.setViewportInfo();
                scope.$apply();
            });
        }
    }
});
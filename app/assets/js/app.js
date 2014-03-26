angular.module('inventoryTracker', ['ngRoute', 'ui.bootstrap'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/inventory.html'
            })
    })
    .directive('itEnter', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.itEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        }
    })
    .directive('itEsc', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 27) {
                        scope.$apply(function () {
                            scope.$eval(attrs.itEsc);
                        });
                        event.preventDefault();
                    }
                });
            }
        }
    })
    .directive('itEditNameGrabFocus', function($timeout) {
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
    })
    .directive('itEditQtyGrabFocus', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch('[editingQtyCharacterId, editingQtyItemId]', function(newValues) {
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
    })
    .controller('MainController', function($scope, $location, $routeParams) {
        $scope.go = function(path) {
            $location.path(path);
        }
    })
    .controller('InventoryController', function($scope) {
        $scope.itemTypes = ['weapon', 'ammo', 'other'];
        $scope.editingNameCharacterId = null;
        $scope.editingNameItemId = null;
        $scope.oldItemName = null;
        $scope.editingQtyCharacterId = null;
        $scope.editingQtyItemId = null;
        $scope.oldItemQty = null;
        $scope.inventory = [
            {
                id: 1,
                characterName: 'bahek',
                playerName: 'bahek',
                position: 0,
                items: [
                    { id: 1, position: 0, name: 'Plasma rifle', type: 'weapon', quantity: 1 },
                    { id: 2, position: 1, name: 'MFC', type: 'ammo', quantity: 30 },
                    { id: 3, position: 2, name: 'Laptop', type: 'other', quantity: 1 }
                ]
            },
            {
                id: 2,
                characterName: 'bahek evil twin',
                playerName: 'bahek evil twin',
                position: 1,
                items: [
                    { id: 1, position: 0, name: 'PM', type: 'weapon', quantity: 1 },
                    { id: 2, position: 1, name: '9mm', type: 'ammo', quantity: 5 },
                    { id: 3, position: 2, name: 'Shiv', type: 'weapon', quantity: 1 }
                ]
            }
        ];

        $scope.calculateBootstrapClasses = function(isFirstColumn) {
            var classes = '';
            switch (Object.keys($scope.inventory).length) {
                case 1:
                    classes += 'col-lg-6';
                    classes += isFirstColumn ? ' col-lg-offset-3' : '';
                    break;
                case 2:
                    classes += 'col-lg-4';
                    classes += isFirstColumn ? ' col-lg-offset-2' : '';
                    break;
                case 3:
                    classes += 'col-lg-4';
                    break;
                default:
                    classes += 'col-lg-3';
                    break;
            }
            
            return classes;
        }

        $scope.deleteItem = function(characterId, itemId) {
            findItemById(characterId, itemId, function(item, character) {
                character.items.splice(item.position, 1);
                fixPositionProperties(character.items);
            });
        }

        $scope.changeItemType = function(characterId, itemId) {
            findItemById(characterId, itemId, function(item) {
                var itemTypeIndex = $scope.itemTypes.indexOf(item.type);
                if (itemTypeIndex === -1) return;
                itemTypeIndex++;
                if (itemTypeIndex === $scope.itemTypes.length) {
                    itemTypeIndex = 0;
                }
                item.type = $scope.itemTypes[itemTypeIndex];
            });
        }

        $scope.startEditItemName = function(characterId, itemId, event) {
            findItemById(characterId, itemId, function(item) {
                $scope.editingNameCharacterId = characterId;
                $scope.editingNameItemId = itemId;
                $scope.oldItemName = item.name;
            });
        }

        $scope.isEditingItemName = function(characterId, itemId) {
            return $scope.editingNameCharacterId === characterId && $scope.editingNameItemId === itemId;
        }

        $scope.saveItemName = function(characterId, itemId) {
            if ($scope.editingNameCharacterId === characterId && $scope.editingNameItemId === itemId) {
                $scope.editingNameCharacterId = null;
                $scope.editingNameItemId = null;
                $scope.oldItemName = null;
            }
        }

        $scope.cancelEditItemName = function(characterId, itemId) {
            findItemById(characterId, itemId, function(item) {
                if ($scope.editingNameCharacterId === characterId && $scope.editingNameItemId === itemId) {
                    $scope.editingNameCharacterId = null;
                    $scope.editingNameItemId = null;
                    item.name = $scope.oldItemName;
                    $scope.oldItemName = null;
                }
            });
        }

        $scope.startEditItemQty = function(characterId, itemId) {
            findItemById(characterId, itemId, function(item) {
                $scope.editingQtyCharacterId = characterId;
                $scope.editingQtyItemId = itemId;
                $scope.oldItemQty = item.quantity;
            });
        }

        $scope.isEditingItemQty = function(characterId, itemId) {
            return $scope.editingQtyCharacterId === characterId && $scope.editingQtyItemId === itemId;
        }

        $scope.saveItemQty = function(characterId, itemId) {
            if ($scope.editingQtyCharacterId === characterId && $scope.editingQtyItemId === itemId) {
                $scope.editingQtyCharacterId = null;
                $scope.editingQtyItemId = null;
                $scope.oldItemQty = null;
            }
        }

        $scope.cancelEditItemQty = function(characterId, itemId) {
            findItemById(characterId, itemId, function(item) {
                if ($scope.editingQtyCharacterId === characterId && $scope.editingQtyItemId === itemId) {
                    $scope.editingQtyCharacterId = null;
                    $scope.editingQtyItemId = null;
                    item.quantity = $scope.oldItemQty;
                    $scope.oldItemQty = null;
                }
            });
        }

        var findItemById = function(characterId, itemId, itemCallback) {
            inventoryLoop:
            for (var i in $scope.inventory) {
                if ($scope.inventory[i].id !== characterId) continue;
                for (var j in $scope.inventory[i].items) {
                    if ($scope.inventory[i].items[j].id !== itemId) continue;
                    itemCallback($scope.inventory[i].items[j], $scope.inventory[i]);
                    break inventoryLoop;
                }
            }
        }

        var fixPositionProperties = function(list) {
            for (var i in list) {
                if (!list[i].hasOwnProperty('position')) continue;
                list[i].position = parseInt(i);
            }
        }
    });
ProjectOWASP.directive('ngInitialDate', function ($parse) {
    return {
        restrict: "A",
        compile: function ($element, $attrs) {
            var initialValue = $attrs.value || $element.val();
            return {    
                pre: function ($scope, $element, $attrs) {
                    if (initialValue != null && initialValue != undefined) {
                        let result = initialValue.replace('/', '-').replace('/', '-');
                        $parse($attrs.ngModel).assign($scope, new Date(result));
                    }
                }
            }
        }
    }
});

ProjectOWASP.directive('ngInitial', function ($parse) {
    return {
        restrict: "A",
        compile: function ($element, $attrs) {
            var initialValue = $attrs.value || $element.val();
            return {
                pre: function ($scope, $element, $attrs) {
                    $parse($attrs.ngModel).assign($scope, initialValue);
                }
            }
        }
    }
});

ProjectOWASP.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})
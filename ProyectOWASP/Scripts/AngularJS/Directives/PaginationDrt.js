//Directiva de paginación
//Autor: Michael Vallejo
//Version 0.0.1.0
//Ultima modificación: 28/05/2018

ProjectOWASP.directive('pagination', function () {
    return {
        restrict: 'E',
        templateUrl: baseUrl + '/Scripts/AngularJS/Template/Pagination.html',
        scope: {
            ngModel: '=',
            pages: '=paPages',
            step: '@paStep',
            paChange: '='
        },
        link: function ($scope, element, attrs) {

            var minPage, maxPage, step, ref;

            $scope.$watch('ngModel', function (newValue, oldValue) {

                if ($scope.ngModel != undefined && $scope.ngModel != null) {
                    $scope.paChange($scope.ngModel);
                    $scope.totalPages = getTotalPages();
                    $scope.getPages();
                }

            }, true);

            $scope.$watch('pages', function (newValue, oldValue) {
                $scope.LoadDirective();
                $scope.getPages();
            }, true);

            $scope.pages = $scope.pages > 0 ? $scope.pages : 1;

            $scope.LoadDirective = function () {
                minPage = 1;
                maxPage = Number($scope.pages);

                if ($scope.step == null) {
                    if (maxPage >= 5) {
                        $scope.step = 5;
                    }
                    else {
                        $scope.step = 1;
                    }
                }

                step = Number($scope.step);
                ref = (Math.ceil(step / 2));

                $scope.ngModel = minPage;
                $scope.totalPages = getTotalPages();
            }


            function getTotalPages() {
                let arr = [];
                for (let i = minPage; i <= maxPage; i++) {
                    arr.push(i);
                }
                return arr;
            };

            $scope.getPages = function () {
                let start = 0;
                let end = step;
                if (maxPage >= step) {
                    if ($scope.ngModel > ref) {
                        let subs = step % 2 == 0 ? 0 : 1;
                        end = $scope.ngModel + ref - subs;
                        start = $scope.ngModel - ref;
                    }

                    if (end >= maxPage) {
                        end = maxPage;
                        start = end - step;
                    }
                }

                let result = $scope.totalPages.slice(start, end);
                $scope.StepPages = result;
                return result;
            };

            $scope.selectPage = function (page) {
                $scope.ngModel = page;
            };

            $scope.previous = function () {
                if ($scope.ngModel > minPage) {
                    $scope.ngModel--;
                    $scope.selectPage($scope.ngModel);
                }
            };

            $scope.next = function () {
                if ($scope.ngModel < maxPage) {
                    $scope.ngModel++;
                    $scope.selectPage($scope.ngModel);
                }
            }

            $scope.first = function () {
                $scope.selectPage(minPage);
            };

            $scope.last = function () {
                $scope.selectPage(maxPage);
            };
        }
    };
});


ProjectOWASP.directive('paginationV2', function () {
    return {
        restrict: 'E',
        templateUrl: baseUrl + '/Scripts/AngularJS/Template/Pagination.html',
        scope: {
            ngModel: '=',
            pages: '=paPages',
            step: '@paStep',
            paChange: '=',
            firstSearch: '@'
        },
        link: function ($scope, element, attrs) {

            var minPage, maxPage, step, ref;

            $scope.$watch('ngModel', function (newValue, oldValue) {
            }, true);


            $scope.$watch('pages', function (newValue, oldValue) {
                $scope.LoadDirective();
                $scope.getPages();
            }, true);

            $scope.pages = $scope.pages > 0 ? $scope.pages : 1;

            $scope.LoadDirective = function () {
                minPage = 1;
                maxPage = Number($scope.pages);

                if ($scope.step == null) {
                    if (maxPage >= 5) {
                        $scope.step = 5;
                    }
                    else {
                        $scope.step = 1;
                    }
                }

                step = Number($scope.step);
                ref = (Math.ceil(step / 2));

                $scope.ngModel = $scope.ngModel == null ? minPage : $scope.ngModel;
                $scope.totalPages = getTotalPages();

                if (!$scope.firstSearch) {
                    $scope.selectPage($scope.ngModel);
                    $scope.firstSearch = false;
                }
            }


            function getTotalPages() {
                let arr = [];
                for (let i = minPage; i <= maxPage; i++) {
                    arr.push(i);
                }
                return arr;
            };

            $scope.getPages = function () {
                let start = 0;
                let end = step;
                if (maxPage >= step) {
                    if ($scope.ngModel > ref) {
                        let subs = step % 2 == 0 ? 0 : 1;
                        end = $scope.ngModel + ref - subs;
                        start = $scope.ngModel - ref;
                    }

                    if (end >= maxPage) {
                        end = maxPage;
                        start = end - step;
                    }
                }

                let result = $scope.totalPages.slice(start, end);
                $scope.StepPages = result;
                return result;
            };

            $scope.selectPage = function (page) {
                $scope.ngModel = page;
                $scope.paChange($scope.ngModel);
                $scope.totalPages = getTotalPages();
                $scope.getPages();
            };

            $scope.previous = function () {
                if ($scope.ngModel > minPage) {
                    $scope.ngModel--;
                    $scope.selectPage($scope.ngModel);
                }
            };

            $scope.next = function () {
                if ($scope.ngModel < maxPage) {
                    $scope.ngModel++;
                    $scope.selectPage($scope.ngModel);
                }
            }

            $scope.first = function () {
                $scope.selectPage(minPage);
            };

            $scope.last = function () {
                $scope.selectPage(maxPage);
            };
        }
    };
});
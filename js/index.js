var module = angular.module('AngularJS', ['ngRoute']);


module.factory('featuresFactory', function() {


    var text = 'Взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток,';


    return text
        .replace(/\.|\,/gm, '')
        .split(' ');

});


module.service('pricesService', ['$http', function($http) {


    return {
        get: function get(callback) {


            $http.get('data/prices.json')
                .success(function(data) {
                    callback(null, data);
                })
                .error(function(e) {
                    callback(e);
                });

        },
        post: function get(callback) {


            $http.post('data/prices.json')
                .success(function(data) {
                    callback(null, data);
                })
                .error(function(e) {
                    callback(e);
                });

        },
        put: function get(callback) {


            $http.put('data/prices.json')
                .success(function(data) {
                    callback(null, data);
                })
                .error(function(e) {
                    callback(e);
                });

        }
    };

}]);


module.controller('MainController', ['$rootScope', '$scope', '$route', function($rootScope, $scope, $route) {
    $scope.routeInformation = $route;
    $scope.errorHappened = false;
}]);


module.controller('HomeController', ['$scope', function($scope) {
    // TODO
}]);


module.controller('FeaturesController', ['$scope', 'featuresFactory', function($scope, featuresFactory) {

    
    console.log(featuresFactory);


    $scope.$watch('search', function(newValue, oldValue) {


        if (!newValue) {
            $scope.searchResult = [];
        }
        else {


            var matcher = new RegExp(newValue, 'i');


            $scope.searchResult = featuresFactory.filter(function(item) {
                return matcher.test(item);
            });

        }

    });

}]);


module.controller('PricesController', ['$scope', 'pricesService', function($scope, pricesService) {

    
    $scope.prices = [];
    
    
    pricesService.get(function(error, data) {
        
        
        if (error) {
            console.error(error.message);
            return;
        }
        
        
        $scope.prices = data;
        
    });
    
    
     $scope.$watch('search', function(newValue, oldValue) {


        if (!newValue || !$scope.prices) {
            $scope.searchResult = [];
        }
        else {


            var matcher = new RegExp(newValue, 'i');


            $scope.searchResult = $scope.prices.filter(function(item) {
                return matcher.test(item.name);
            });

        }

    });
    
}]);

module.controller('examplesController', ['$scope', function($scope) {
    // TODO
}]);


module.controller('AboutController', ['$scope', function($scope) {
    // TODO
}]);


module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {


    $routeProvider

        .when('/home', {
            templateUrl: './templates/home.html',
            controller: 'HomeController',
            activetab: 'home'
        })

        .when('/features', {
            templateUrl: './templates/features.html',
            controller: 'FeaturesController',
            activetab: 'features'
        })
    
        .when('/prices', {
            templateUrl: './templates/prices.html',
            controller: 'PricesController',
            activetab: 'prices'
        })
        .when('/examples', {
            templateUrl: './templates/examples.html',
            controller: 'examplesController',
            activetab: 'examples'
        })
    
        .when('/about', {
            templateUrl: './templates/about.html',
            controller: 'AboutController',
            activetab: 'about'
        })
    
        .otherwise({
            redirectTo: '/home'
        });

}]);
alight.bootstrap('#dialog', {
    name: 'Привет',
    visible: true
});
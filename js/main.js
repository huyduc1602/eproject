//  Declare Angular
var app = angular.module('app', ['ngRoute']);
// Routers
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'AppController'
        })
        .when('/about', {
            templateUrl: 'page/about.html'
        })
        .when('/gallery', {
            templateUrl: 'page/gallery.html'
        })
        .when('/product', {
            templateUrl: 'page/product.html'
        })
        .when('/faqs', {
            templateUrl: 'page/faqs.html'
        })
        .when('/contact', {
            templateUrl: 'page/contact.html'
        });
});
app.controller('AppController', function($scope, $http) {

    $http.get('data/category.json').then(function(res) {
        $scope.category = res.data;
    });
    $http.get('data/products.json').then(function(res) {
        $scope.products = res.data;
        pros = res.data;
    });

    // get product for galllery function
    $scope.showPro = function(id) {
        var results = [];
        for (i = 0; i < pros.length; i++) {
            if (id == pros[i].cat_id) {
                results.push(pros[i]);
            }
        }

        $scope.products = results;
    };
    $scope.showAll = function() {
            $http.get('data/products.json').then(function(res) {
                $scope.products = res.data;
                pros = res.data;
            });
        }
        // tabGallery function
    $scope.tabGallery = function(idl, idr) {
        // Get the expanded image
        var imgL = document.getElementById(idl).src;
        var imgR = document.getElementById(idr).src;
        console.log(idl, idr);
        document.getElementById(idr).src = imgL;
        document.getElementById(idl).src = imgR;

    }
});
// validation số điện thoại
$.validator.addMethod('check_phone', function(value) {
    return /^[0-9]{8,13}$/.test(value);
}, 'Số điện thoại không đúng định dạng');

// filter search function
app.filter('productfilter', function() {
    return function(items, search) {
        var filtered = [];
        var letterMatch = new RegExp(search, 'i');

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (letterMatch.test(item.name)) {
                filtered.push(item);
            }


        }
        return filtered;
    };
});
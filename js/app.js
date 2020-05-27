/**
*  Module
*
* Description
*/
var app = angular.module("app", []);

app.controller("ProductCtrl", function($scope,$http){
	$http.get('data/product.json').then(function(res){
		$scope.product = res.data;
	});
});
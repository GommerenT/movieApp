'use strict'


angular.module('movieApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'homeCtrl'
	        });
	})
	
	.controller('homeCtrl', function($scope, actorSrv) {
		
	    	$('#searchButton').on('click', function (e) {

	    		$scope.movie = '';

				var actor = $('#actorText').val();
				
				actorSrv.getMovies(actor).then(function(data){
					$scope.movie = data;
				})
	    	});
    })
   
    .service('actorSrv', function($http, $q) {
    		this.getMovies = function(actor) {
	    		var q = $q.defer();
	    		var url = 'http://theimdbapi.org/api/find/person?name=' + encodeURIComponent(actor);

	    		$http.get(url)
	    			.then(function(data){
	    				q.resolve(data);
	    			}, function error(err) {
	    				q.reject(err);
	    			});
	    			
	    			return q.promise;
	    		};
    });
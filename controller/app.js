//angular module
var app = angular.module("ec-backend",['ui-router','angularNotify']);

// configure all route
app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/why');
	// nested views start here
	$stateProvider
	.state('why', {
		url: '/why',
		views: {
			'navbar':{
				templateUrl : 'pages/navbarView.html',
				controller  : 'navbarController'
			},
			'content': {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			}
		}
	})

	.state('product', {
		url: '/product',
		views: {
			'navbar':{
				templateUrl : 'pages/navbarView.html',
				controller  : 'navbarController'
			},
			'content': {
				templateUrl : 'pages/product.html',
				controller  : 'productController'
			}
		}
	})

	.state('about', {
		url: '/about',
		views: {
			'navbar':{
				templateUrl : 'pages/navbarView.html',
				controller  : 'navbarController'
			},
			'content': {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			}
		}
	});
});

// controller 2nd
app.controller("dataController", 
	function($scope,$http){
		$http.get("/api/page")
		.success(function (response){
		// $scope.pages = response;
		// console.log($scope.pages);
		//select 1st object
		$scope.data = response[0];
		// console.log($scope.data);
	});

	// handle event
	// update
	$scope.update =  function(data){
 	// console.log(data);
 	
	$http.post("/api/page/update", data).then(function(response){
		console.log(response);})
		var notify = {
    		type: 'success',
    		title: 'Update Data Successful!',
    		// content: 'Item ( id: 2031 ) has already added to the list.'
			};
			$scope.$emit('notify', notify);
	setTimeout(function () {
       window.location.href = "why.html";
    }, 2000); //will call the function after 2 secs.
	};

	//remove
	// $scope.remove = function(id){
	// 	// alert(id);
	// 	$http.delete("/api/content/" + id)
	// 	.success(function(response){
	// 		$scope.contents = response; 
	// 	})
	// }
});



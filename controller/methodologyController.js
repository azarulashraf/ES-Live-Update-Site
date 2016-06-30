//angular module
var app = angular.module("ec-backend",['angularNotify']);

// controller 2nd
app.controller("dataController", 
	function($scope,$http){
		$http.get("/api/page")
		.success(function (response){
		$scope.pages = response;
		// console.log($scope.pages);
		//select 1st object
		$scope.data = response[1];
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
       window.location.href = "methodology.html";
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



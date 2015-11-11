app.controller('MainController', ['$scope','$http', function($scope, $http) {
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			
			
			$scope.$apply(function(){
				$scope.lat = position.coords.latitude;
				$scope.lon = position.coords.longitude;
			  
			  	$http.jsonp('http://api.openweathermap.org/data/2.5/weather?lat=' + $scope.lat + '&lon=' + $scope.lon + '&units=imperial&APPID=d61db9ac60a1dcdcb0250a3d4ef67107&format=json&callback=JSON_CALLBACK')
				.success(function(data){
					$scope.weatherdata = data;
					$scope.weathericonurl = "http://openweathermap.org/img/w/"+$scope.weatherdata.weather[0].icon+".png";					
					$scope.tempc = (($scope.weatherdata.main.temp-32) * 5 / 9).toFixed(2) + " C";
					$scope.tempf = $scope.weatherdata.main.temp + " F";
					$scope.temp = $scope.tempf;
					$scope.id = $scope.weatherdata.weather[0].id;
					
					
					
					if(200 <= $scope.id && $scope.id < 299){ //thunderstorm
						$scope.bgclass='thunderbg';
					}
					else if (300 <= $scope.id && $scope.id < 399){ //drizzle
						$scope.bgclass='drizzlebg';
					}
					else if (500 <= $scope.id && $scope.id < 599){ //rain
						$scope.bgclass='rainbg';
					}
					else if (600 <= $scope.id && $scope.id < 699){ //snow
						$scope.bgclass='snowbg';
					}
					else if (700 <= $scope.id && $scope.id < 799){ //atmosphere
						$scope.bgclass='atmospherebg';
					}
					else if ($scope.id === 800){ //clear
						$scope.bgclass='clearbg';
					}
					else if (801 <= $scope.id && $scope.id < 899){ //clouds
						$scope.bgclass='cloudbg';
					}
					else if (900 <= $scope.id && $scope.id < 907){ //extreme
						$scope.bgclass='extremebg';
					}
					else {
						$scope.bgclass='stndbg';
					}
					
					
					
					
				});
		  	});
					
			
		});
	  }

}]);
var app = angular.module("app", ["ngRoute"]);
	app.config(['$interpolateProvider', function ($interpolateProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');
	}]);


	// CONTROLLERS -------------------------------

app.controller('courseGenerator', ['$scope', '$http', '$routeParams', 'courseGenData', function($scope, $http, $routeParams, courseGenData){
	
	$http.post('/jsonReceive', $scope.course)
		.then(function(res){
		$scope.course = res.data;

		theCourses = [];
		// eachCourses = {};
		for (var i = 0 ; i < $scope.course.course.length; i++) {
			var eachCourse = $scope.course.course[i];
			theCourses.push(eachCourse);

		};
		// console.log(theCourses);
		$scope.courseGeneratorData = new courseGenData (theCourses);
		console.log($scope.courseGeneratorData);
		});

		$scope.addRubric = function(){
			var addingRubric = function(course){
				console.log(course);
			}
		}



}]);
	// DIRECTIVES --------------------------------
	// CUSTOM HTML TEMPLATES

	app.directive('courses', function(){
		return {
			restrict: 'E',
			scope: {
				payload: '=',
				callback: '&'
			},
			template: '<input type="text" ng-model="searchText">'+
					  '<div ng-repeat="course in payload.course | filter:searchText" >'+
					  '<ul>'+
			              '<li>{[{course.theCourse[0].courseTitle}]}</li>'+
			              '<li>{[{course.theCourse[0].courseDesc}]}</li>'+
			          	  '<li ng-if="course.rubrics"><ul><li ng-repeat="rubrics in course.rubrics">{[{rubrics.title}]}</li>'+
			           								'</ul></li>'+
			           '</ul>'+
			           	  '<button type="button" ng-click="addRubric(course)">Add Rubric</button>'+
						'</div>'
		}
	})

	// SERVICES-----------------------------------
	//  CREATING AND RETURNING NEW OBJECTS 

	app.service('courseGenData', function(){
		var courseGen = function(args){	
			// console.log(args);
			this.course = args || [];
		}
		return courseGen;
	})


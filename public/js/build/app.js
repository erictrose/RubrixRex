var app=angular.module("app",["ngRoute"]);app.config(["$interpolateProvider","$routeProvider",function(e,r){e.startSymbol("{[{"),e.endSymbol("}]}"),r.when("/",{templateUrl:"templates/dashboard.html",controller:"getDegreesCtrl"}).when("/getRubrics",{templateUrl:"templates/dashboard.html",controller:"getRubricsCtrl"}).when("/dashboard",{templateUrl:"templates/dashboard.html",controller:"dashboardCtrl"}).when("/addCourse",{templateUrl:"templates/addCourse.html",controller:"addCourseCtrl"}).when("/courseAdded",{templateUrl:"templates/dashboard.html",controller:"dashboardCtrl"}).when("/changeDegree",{templateUrl:"templates/dashboard.html",controller:"changeDegreeCtrl"}).when("/addRubric",{templateUrl:"templates/rubric.html",controller:"rubricCtrl"}).when("/useRubric",{templateUrl:"templates/useRubric.html",controller:"useRubricCtrl"}).when("/createRubric",{templateUrl:"templates/dashboard.html",controller:"rubricCreateCtrl"}).otherwise({redirectTo:"/"})}]),app.controller("getDegreesCtrl",["$scope","$http","$routeParams","$location","myService",function(e,r,t,c,o){r.post("/getDegrees",e.allDegrees).then(function(e){o.addItem(e.data),c.path("/getRubrics")})}]),app.controller("getRubricsCtrl",["$scope","$rootScope","$http","$location",function(e,r,t,c){t.post("/getRubrics",e.allRubrics).then(function(e){r.rootRubrics=e.data,c.path("/dashboard")})}]),app.controller("dashboardCtrl",["$scope","$rootScope","$http","$routeParams","$location","courseTileGenerator","degreeGenerator","myService",function(e,r,t,c,o,a,s,l){e.courses={},t.post("/getDashboard",e.allCourses).then(function(r){e.courseRubrics=e.rootRubrics.rubrics,e.degrees=l.getItem(),e.courses=r.data,e.degreesData=new s(e.degrees),e.courseTile=new a(e.courses.courses),console.log(e.courses.courses)}),e.rubricSelect=function(e){r.rubric=e,o.path("/useRubric"),console.log(r.rubric)},e.addRubric=function(e){r.test=e,o.path("/addRubric")},e.changeDegree=function(e){r.test=e}}]),app.controller("addCourseCtrl",["$scope","$rootScope","$http","$routeParams","$location","myService",function(e,r,t,c,o,a){e.newCourse={},e.addCourse=function(){e.newCourse.degreeID=e.test,e.newCourse.degreeID?(console.log(e.newCourse),t.post("/addCourseJSON",e.newCourse),o.path("/dashboard")):console.log("Error")}}]),app.controller("rubricCtrl",["$scope","$rootScope","$http","$routeParams","$location",function(e,r,t,c,o){e.newRubric={},e.createRubric=function(){e.newRubric.courseID=e.test._id,console.log(e.newRubric),t.post("/addRubric",e.newRubric),o.path("/")}}]),app.directive("courseElement",function(){return{restrict:"E",scope:{rubrics:"=",payload:"=",select:"&",callback:"&"},template:'<div class="dashsearchcontainer"><input class="dashsearch" type="text" name="search" size="35" placeholder="Search for a Degree, Course or Rubric" ng-model="searchText"></div><div class="dashresults"><ul ng-repeat="course in payload.course | filter:searchText track by $index"><li><p class="degreeAbbr">{[{course.degreeAbbr}]}<span class="degreeName">{[{course.degreeName}]}</span></p><p id="courseAbbr" class="courseAbbr">{[{course.courseAbbr}]}<span id="courseName" class="courseName">{[{course.courseName}]}</span></p><p class="rubricnumber">#</p><div class="rubricholder"><p class="rubric" ng-repeat="theRubrics in rubrics" ng-repeat="theRubrics in rubrics" ng-if="course._id == theRubrics.courseID" ng-click="select({theRubrics:theRubrics})">{[{theRubrics.rubricName}]}</p></div><p class="hideme">{[{course._id}]}</p><p class="hideme">{[{course.degreeID}]}</p><div class="addcontainer"><button class="addrubric" ng-click="callback({course:course})">+</button><img class="dots" width="20" src="img/dots.png"></div></li></ul></div>'}}),app.directive("degrees",function(){return{restrict:"E",scope:{payload:"=",callback:"&"},template:'<div><ul ng-repeat="degree in payload.degree[0].degrees track by $index"><li><p ng-click="callback({degree: degree})">{[{degree._id}]}</p><input ng-hide="true" type="text" ng-model="degreeModel.ID" value="{[{degree._id}]}"/><p ng-click="callback({degree: degree})">{[{degree.degreeAbbr}]}</p><p ng-click="callback({degree: degree})">{[{degree.degreeName}]}</p><br/></li></ul></div>'}}),app.directive("addRubrics",function(){return{restrict:"E",scope:{model:"=",callback:"&"},template:'<form ><div class="form-group"><label>Rubric Name</label><input type="text" class="form-control" name="rubricName" ng-model="model.rubricName"></div><div class="form-group"><label>Rubric Section</label><input type="text" class="form-control" name="sectionName" ng-model="model.rubricSections"></div><button ng-click="callback()" class="btn btn-warning btn-lg">Create Rubric</button></form>'}}),app.service("myService",function(){var e=[];this.getItem=function(){var r=localStorage.getItem("data");return e=JSON.parse(r)||e},this.addItem=function(r){e.push(r);var t=JSON.stringify(e);localStorage.setItem("data",t)}}),app.service("sendData",function(){var e=function(e){};return e}),app.service("degreeGenerator",function(){var e=function(e){this.degree=e||{}};return e}),app.service("courseTileGenerator",function(){var e=function(e){this.course=e||[]};return e});
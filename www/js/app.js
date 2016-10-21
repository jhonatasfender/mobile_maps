var teste = 2;
angular.module('starter', ['ionic', 'ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider,$urlRouterProvider) {
  $stateProvider.state('map',{
    url: '/',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  });
  $urlRouterProvider.otherwise("/");

  $stateProvider.state('search',{
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'SearchCtrl'
  });  
})
.controller('MapCtrl',function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true}, divMap = document.getElementById("map"),
  b = document.getElementById("buttonGEO"), w = window,d = document,e = d.documentElement,g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  b.style.marginLeft = (x - 65) + "px";
  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapOptions = {
          mapTypeControl: false,
          zoomControl: false,
          scaleControl: false,
          center: latLng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    $scope.map = new google.maps.Map(divMap, mapOptions);
    var directionsDisplay = new google.maps.DirectionsRenderer,directionsService = new google.maps.DirectionsService,
    countZoom = 0,interval;
    $scope.buttonGEO = function (){
      countZoom = $scope.map.getZoom();
      interval = window.setInterval(function() {
        if(countZoom >= 10 && countZoom <= 16) { 
          console.log(countZoom++);
          $scope.map.setZoom(countZoom + 1);
          mapOptions.zomm = $scope.map.getZoom();
        } else {
          clearTimeout(interval);
        }
      }, 2000);
      $scope.map = new google.maps.Map(divMap, mapOptions); 
      var marker = new google.maps.Marker({
          map: $scope.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: latLng
      });
    };


    google.maps.event.addDomListener($scope.map,'click',function (e){
      console.log(e.latLng.lat());
      console.log(e.latLng.lng());
    });
  });
   
})
.controller('SearchCtrl',function ($scope){
  console.log(teste);
  teste = 1;
  console.log(teste);
}).controller('HomeCtrl',function ($scope){

  $scope.linkName = "Search";
  var count = 0,link = function() {
    if($scope.linkName == "Search" && window.document.URL.indexOf("search") != -1) { 
      $scope.link = "#/";
    } else {
      $scope.link = "#/search";
    }
    count++;
  };
  $scope.linkHeard = link;
  link();
});

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
        },
        beaches = [
          ['Bondi Beach',    -15.831893364540038, -47.885284423828125],
          ['Coogee Beach',   -15.785646183288632, -47.934722900390625],
          ['Cronulla Beach', -15.80150355021274,  -47.91412353515625 ],
          ['Manly Beach',    -15.812074438278657, -48.028106689453125],
          ['Maroubra Beach', -15.814717074012279, -48.109130859375   ]
        ];
    $scope.map = new google.maps.Map(divMap, mapOptions);
    var markerOther = [], info = [];
    for (var i = 0; i < beaches.length; i++) {
      markerOther.push(new google.maps.Marker({
          position: {lat: beaches[i][1], lng: beaches[i][2]},
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: beaches[i][0]
      }));
      info.push(new google.maps.InfoWindow({
        content: beaches[i][0]
      }));
      markerOther[i].setMap($scope.map);
      google.maps.event.addListener(markerOther[i], 'click', function(i) {
        return function() {
          info[i].open($scope.map, markerOther[i]);
        }
      }(i));
    }
    
    var directionsDisplay = new google.maps.DirectionsRenderer,directionsService = new google.maps.DirectionsService,
    countZoom = 0,interval,marker = new google.maps.Marker();
    $scope.buttonGEO = function (){
      marker.setMap(null);
      countZoom = $scope.map.getZoom();
      interval = window.setInterval(function() {
        if(countZoom >= 10 && countZoom <= 16) { 
          console.log(countZoom++);
          $scope.map.setZoom(countZoom + 1);
          mapOptions.zomm = countZoom;
        } else {
          clearTimeout(interval);
        }
      }, 500);
      marker = new google.maps.Marker({
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

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
.controller('MapCtrl',function($scope, $cordovaGeolocation,$compile,$timeout) {
  var options = {timeout: 3000, enableHighAccuracy: true}, divMap = document.getElementById("map"),
  b = document.getElementById("buttonGEO"), w = window,d = document,e = d.documentElement,g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  b.style.marginLeft = (x - 65) + "px";
  $scope.directionStatus = true;
  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapOptions = {
          mapTypeControl: false,
          zoomControl   : false,
          scaleControl  : false,
          center        : latLng,
          zoom          : 10,
          mapTypeId     : google.maps.MapTypeId.ROADMAP
        },
        beaches = [
          ['Bondi Beach'   , -15.831893364540038, -47.885284423828125],
          ['Coogee Beach'  , -15.785646183288632, -47.934722900390625],
          ['Cronulla Beach', -15.80150355021274 , -47.91412353515625 ],
          ['Manly Beach'   , -15.812074438278657, -48.028106689453125],
          ['Maroubra Beach', -15.814717074012279, -48.109130859375   ],
          ['a test'        , -15.834886679274716, -47.986934781074524]
        ], markerOther = [], info = [];
    $scope.map = new google.maps.Map(divMap, mapOptions);
    $scope.direct = function (i){
      var ltlg = markerOther[i].getPosition();
      directionsDisplay.setMap($scope.map);
      directionsService.route({
        origin: latLng,
        destination: {lat: ltlg.lat(), lng: ltlg.lng()},
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          $scope.directionStatus = false;
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    };
    for (var i = 0; i < beaches.length; i++) {
      markerOther.push(new google.maps.Marker({
        position : {lat: beaches[i][1], lng: beaches[i][2]},
        animation: google.maps.Animation.DROP,
        title    : beaches[i][0]
      }));
      var s = "<div>"+beaches[i][0] + " <a ng-click='direct(" + i + ")'>Clique aqui!</a><div>", l = $compile(s)($scope);
      info.push(new google.maps.InfoWindow({
        content: l[0]
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
      $scope.map.setCenter(latLng);
      countZoom = $scope.map.getZoom();
      interval = $timeout(function() {
        if(countZoom >= 10 && countZoom <= 16) { 
          $scope.map.setZoom(countZoom + 1);
          mapOptions.zomm = countZoom;
        } else {
          $timeout.cancel(interval);
        }
      }, 500);
      if($scope.directionStatus) { 
        marker = new google.maps.Marker({
          map: $scope.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position : latLng
        });
      } 
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

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
.controller('MapCtrl',function($scope, $state, $cordovaGeolocation){
  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    /*document.getElementById('mode').addEventListener('change', function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    });*/
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    for (var i = 0; i < 1; ++i) {
      var others = new google.maps.Marker({
        position: {
          lat: -15.847113651199606,
          lng: -47.98038952052593
        },
        map: $scope.map
      });
      attachSecretMessage(others, "teste");
    }

    function attachSecretMessage(marker, secretMessage) {
      var infowindow = new google.maps.InfoWindow({
        content: secretMessage
      });
      marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
      });
    }
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      directionsService.route({
        origin: latLng,//{lat: 37.77, lng: -122.447},  // Haight.
        destination: {lat: -15.847113651199606,lng: -47.98038952052593},  // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        /*       
            DRIVING     => Driving
            WALKING     => Walking
            BICYCLING   => Bicycling
            TRANSIT     => Transit

         */
        travelMode: google.maps.TravelMode["DRIVING"]
      }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
    directionsDisplay.setMap($scope.map);

    calculateAndDisplayRoute(directionsService, directionsDisplay);

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      var marker = new google.maps.Marker({
          map: $scope.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: latLng
      }), infoWindow = new google.maps.InfoWindow({
          content: "Here I am, go!"
      });
      google.maps.event.addListener(marker, 'click', function () {
        console.log("teste");
        infoWindow.open($scope.map, marker);
      });
      google.maps.event.addDomListener($scope.map,'click',function (e){
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
      });
    });
  }, function(error){
    console.log("Could not get location");
  });
})
/*.controller('MapCtrl',function($scope, $ionicLoading) {
  
  console.log("teste");
  google.maps.event.addDomListener(window, 'load', function() {
    console.log("teste");
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

    var mapOptions = {
        center: myLatlng,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "My Location"
        });
    });

    $scope.map = map;
  });
})*/
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

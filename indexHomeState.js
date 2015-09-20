angular.module('flapperNews')
  .config(indexHomeState);

indexHomeState.$inject = ['$stateProvider', '$urlRouterProvider'];

function indexHomeState ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'indexController as indexCtrl'
    });

  $urlRouterProvider.otherwise('/home');

}
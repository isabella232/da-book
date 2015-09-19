'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'ContactsCtrl as home',
    templateUrl: 'home.html',
    title: 'Contacts'
  })
  .state('Detail', {
    url: '/contact/:contactId',
    controller: 'ContactDetailCtrl as detail',
    templateUrl: 'detail.html',
    title: 'Detail'
  });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;

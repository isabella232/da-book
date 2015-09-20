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
  .state('New', {
    url: '/contact/new',
    controller: 'ContactNewCtrl as new',
    templateUrl: 'new.html',
    title: 'New'
  })
  .state('Detail', {
    url: '/contact/:contactId',
    controller: 'ContactDetailCtrl as detail',
    templateUrl: 'detail.html',
    title: 'Detail'
  })
  .state('Edit', {
    url: '/contact/:contactId/edit',
    controller: 'ContactEditCtrl as edit',
    templateUrl: 'edit.html',
    title: 'Edit'
  });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;

'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ContactsCtrl($http, AppSettings, $log) {

  // ViewModel
  var vm = this;

  vm.contacts = [];
  vm.title = 'All contacts';

  $http.get(AppSettings.apiUrl + 'contacts').
    then(function(response) {
      vm.contacts = response.data.data;
    });
}

function ContactDetailCtrl($http, AppSettings, $log, $stateParams) {

  // ViewModel
  var vm = this;
  var contactId = $stateParams.contactId;

  vm.title = 'Show contact';

  $http.get(AppSettings.apiUrl + 'contacts/' + contactId).
    then(function(response) {
      vm.contact = response.data.data;
    });
}

function ContactEditCtrl($scope, $http, AppSettings, $log, $stateParams, $state) {

  // ViewModel
  var vm = this;
  var contactId = $stateParams.contactId;

  vm.title = 'Edit contact';

  $http.get(AppSettings.apiUrl + 'contacts/' + contactId).
    then(function(response) {
      vm.contact = response.data.data;
    });

  $scope.updateContact = function() {
    var data = {
      contact: {
        name: vm.contact.name,
        phone: vm.contact.phone,
        email: vm.contact.email
      }
    };

    $http.put(AppSettings.apiUrl + 'contacts/' + contactId, data).
      then(function(response) {
        $state.go('Home');
      }, function(response) {
        vm.errorMessage = response.data.error.message;
      });
  };
}

function ContactNewCtrl($scope, $http, $log, AppSettings, $state) {

  // ViewModel
  var vm = this;
  vm.contact = {
    name: 'João Borges',
    email: 'jborges@medianeira.com',
    phone: '4599899930'
  }

  vm.title = 'New contact';
  $scope.addContact = function() {
    var data = { contact: vm.contact };

    $http.post(AppSettings.apiUrl + 'contacts', data).
      then(function(response) {
        $state.go('Home');
      }, function(response) {
        vm.errorMessage = response.data.error.message;
      });
  };
}

controllersModule.controller('ContactNewCtrl', ContactNewCtrl);
controllersModule.controller('ContactEditCtrl', ContactEditCtrl);
controllersModule.controller('ContactDetailCtrl', ContactDetailCtrl);
controllersModule.controller('ContactsCtrl', ContactsCtrl);

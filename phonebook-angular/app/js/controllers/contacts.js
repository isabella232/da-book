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
      //$log.log(response);
    });
}

controllersModule.controller('ContactDetailCtrl', ContactDetailCtrl);
controllersModule.controller('ContactsCtrl', ContactsCtrl);

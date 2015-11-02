'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function contactForm() {

  return {
    restrict: 'EAM',
    templateUrl: function() {
      return 'partials/_form.html';
    },
    scope: {
      contactObject: "=",
      submitValue: "@",
      submitFunction: "&",
      errorMessage: "="
    }
  };

}

directivesModule.directive('contactForm', contactForm);

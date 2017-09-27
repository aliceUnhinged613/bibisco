/*
 * Copyright (C) 2014-2017 Andrea Feccomandi
 *
 * Licensed under the terms of GNU GPL License;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.gnu.org/licenses/gpl-2.0.html
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY.
 * See the GNU General Public License for more details.
 *
 */
angular.
module('bibiscoApp').
component('detailfooterleftbuttonbar', {
  templateUrl: 'components/common/uielements/detail-footer/detail-footer-left-buttonbar.html',
  controller: DetailFooterLeftButtonbarController,
  bindings: {
    editmode: '<',
    imagesenabled: '<',
    showimagesfunction: '&',
    showprojectexplorer: '=',
    revisionactive: '<',
    revisionenabled: '<',
    revisionfunction: '&',
    revisions: '<',
    tagsenabled: '<',
    tagsfunction: '&',
    words: '<'
  }
});

function DetailFooterLeftButtonbarController($location, $translate,
  LoggerService, PopupBoxesService) {

  LoggerService.debug('Start DetailFooterLeftButtonbarController...');

  var self = this;

  self.$onInit = async function() {
    self.revisionactual = self.revisionactive;

    self.translations = await $translate([
      'revision_confirm_new_revision_from_actual',
      'revision_confirm_delete_revision'
    ]);
  }

  self.toggleProjectExplorer = function() {
    self.showprojectexplorer = !self.showprojectexplorer;
  }

  self.selectrevision = function() {
    if (self.revisionactive == 'new') {
      PopupBoxesService.confirm(self.createrevisionfromactual,
        self.translations.revision_confirm_new_revision_from_actual,
        self.callrevisionfunction);
    } else if (self.revisionactive == 'delete') {
      PopupBoxesService.confirm(self.callrevisionfunction,
        self.translations.revision_confirm_delete_revision,
        self.restorerevisionactual);
    } else {
      self.callrevisionfunction();
    }
  }

  self.callrevisionfunction = function() {
    self.revisionfunction({
      'key': self.revisionactive
    });
  }

  self.createrevisionfromactual = function() {
    self.revisionfunction({
      'key': 'new-from-actual'
    });
  }

  self.restorerevisionactual = function() {
    self.revisionactive = self.revisionactual;
  }

  LoggerService.debug('End DetailFooterLeftButtonbarController...');
}

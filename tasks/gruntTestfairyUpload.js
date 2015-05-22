'use strict';

var upload = require('../tools/testfairyUpload');

module.exports = function gruntTestfairyUpload(grunt) {
  grunt.task.registerMultiTask('testfairyUpload', 'Upload IPA or APK to Test Fairy.', function () {
    var done = this.async();

    function fail(reason) {
      grunt.fail.warn('Failed uploading to Test Fairy. Reason: ');
      grunt.fail.warn(reason);

      done();
    }

    var options = this.data;
    if (!options) {
      fail('Missing grunt config options.');
      return;
    }

    if (!options.apiKey) {
      fail('Missing apiKey: ' + JSON.stringify(options));
      return;
    }

    if (!options.artifactPath) {
      fail('Missing artifactPath: ' + JSON.stringify(options));
      return;
    }

    try {
        upload(options).then(function onSuccess(response) {
        grunt.log.ok('Success: Uploaded to Test Fairy.');
        if (!!response) {
          grunt.verbose.oklns(JSON.stringify(response));
        }
        done();
      }, fail);
    } catch (e) {
      fail(e);
    }

  });
};

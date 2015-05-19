'use strict';

var upload = require('../tools/testfairy-upload');

module.exports = function gruntTestfairyUpload(grunt) {
  grunt.task.registerMultiTask('testfairy-upload', 'Upload IPA or APK to Test Fairy.', function () {
    var done = this.async();

    function fail(reason) {
      grunt.fail.warn('Failed uploading to Test Fairy.');

      if (!!reason) {
        grunt.fail.warn(reason);
      }

      done();
    }

    var options = this.data;
    if (!options) {
      fail('Missing grunt config options.');
      return;
    }

    var apiKey = options.apiKey;
    if (!apiKey) {
      fail('Missing apiKey: ' + JSON.stringify(options));
      return;
    }

    var artifactPath = options.artifactPath;
    if (!artifactPath) {
      fail('Missing artifactPath: ' + JSON.stringify(options));
      return;
    }

    try {
      upload(apiKey, artifactPath).then(function onSuccess(response) {
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

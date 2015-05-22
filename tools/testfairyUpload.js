'use strict';

var fs = require('fs-extra');
var q = require('q');
var request = require('request');

/**
 * Returns a promise that resolves when the upload is complete.  Rejects on any kind of failure,
 * including http errors and TestFairy errors.
 *
 * @param options
 */
module.exports = function uploadToTestFairy(options) {
    
  try {
    if (!fs.existsSync(options.artifactPath)) {
      throw new Error('Missing artifact file: ' + options.artifactPath);
    }
  } catch (e) {
    grunt.fail.warn('failed fs.existsSync: ');
    grunt.fail.warn(e);  }

  try {
  	var deferred = q.defer();
  } catch (e) {
    grunt.fail.warn('failed deferred: ');
    grunt.fail.warn(e);
  }
  
  console.log(options);
  
  var formData = {
    api_key: options.apiKey,
    file: fs.createReadStream(options.artifactPath),
    comment: options.comment
  };
  
  console.log(formData);

  try {
    request.post(
      {url: 'https://app.testfairy.com/api/upload/', formData: formData},
      function postCallback(error, httpResponse, body) {
        try {
          var results = {error: error, httpResponse: httpResponse, body: body};
          console.log(results);
          if (!!error) {
            deferred.reject(results);
          } else {
            deferred.resolve(results);
          }
        } catch(e) {
          grunt.fail.warn('failed callback: ');
          grunt.fail.warn(e);  
        }
      }
    );
  } catch(e) {
    grunt.fail.warn('failed request: ');
    grunt.fail.warn(e);
  }

  return deferred.promise;
};

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
module.exports = function uploadToTestFairy(options, onFail) {
  var deferred = q.defer();

  function fail(msg) {
    deferred.reject(msg);

    if (!!onFail) {
      onFail(msg);
    }
  }

  try {
    if (!fs.existsSync(options.artifactPath)) {
      throw new Error('Missing artifact file: ' + options.artifactPath);
    }
  } catch (e) {
    fail('failed fs.existsSync: ');
    fail(e);
    return;
  }

  var formData = {
    api_key: options.apiKey,
    file: fs.createReadStream(options.artifactPath),
    comment: options.comment
  };
  
  try {
    request.post(
      {url: 'https://app.testfairy.com/api/upload/', formData: formData},
      function postCallback(error, httpResponse, body) {
        try {
          var results = {error: error, httpResponse: httpResponse, body: body};
          if (!!error) {
            deferred.reject(results);
          } else {
            deferred.resolve(results);
          }
        } catch(e) {
          fail('failed callback: ');
          fail(e);
        }
      }
    );
  } catch(e) {
    fail('failed request: ');
    fail(e);
  }

  return deferred.promise;
};

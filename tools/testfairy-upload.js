'use strict';

var fs = require('fs-extra');
var q = require('q');
var request = require('request');

/**
 * Returns a promise that resolves when the upload is complete.  Rejects on any kind of failure,
 * including http errors and TestFairy errors.
 *
 * @param apiKey
 * @param artifactFilePath
 */
module.exports = function uploadToTestFairy(apiKey, artifactFilePath) {
  if (!fs.existsSync(artifactFilePath)) {
    throw new Error('Missing artifact file: ' + artifactFilePath);
  }

  var deferred = q.defer();

  var formData = {
    api_key: apiKey,
    file: fs.createReadStream(artifactFilePath)
  };

  request.post(
    {url: 'https://app.testfairy.com/api/upload/', formData: formData},
    function postCallback(error, httpResponse, body) {
      var results = {error: error, httpResponse: httpResponse, body: body};

      if (!!error) {
        deferred.reject(results);
      } else {
        deferred.resolve(results);
      }
    }
  );

  return deferred.promise;
};

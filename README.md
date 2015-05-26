Grunt TestFairy Upload
======================
Upload an APK or IPA file to [Test Fairy](https://www.testfairy.com/), with your grunt build script. This is useful for Cordova or PhoneGap hybrid apps.

Example Gruntfile.js Configuration
==================================

```javascript

    module.exports = function (grunt) {
      // load the grunt plugin
      require('grunt-testfairy-upload')(grunt);

      // configure the grunt plugin
      grunt.initConfig({
        'testfairyUpload': {
          staging: {
           apiKey: 'XYZ123',
           artifactPath: 'platforms/ios/build/staging/MyApp.ipa',
           comment: 'Uploaded on: ' + (new Date())
          },
          testing: {
           apiKey: 'ABC123',
           artifactPath: 'platforms/ios/build/testing/MyApp.ipa',
           comment: 'Uploaded on: ' + (new Date())
          }
        }
      });

    };

```

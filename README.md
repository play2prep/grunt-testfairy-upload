Grunt TestFairy Upload
======================
Upload an APK or IPA file to Test Fairy, with your grunt build script. This is useful for Cordova or PhoneGap hybrid apps.

Example Gruntfile.js Configuration
==================================

```javascript

    module.exports = function (grunt) {
      // load the grunt plugin
      require('grunt-testfairy-upload')(grunt);

      // configure the grunt plugin
      grunt.initConfig({
        'testfairy-upload': {
          staging: {
           apiKey: 'XYZ123',
           artifactFile: 'platforms/ios/build/staging/MyApp.ipa'
          },
          testing: {
           apiKey: 'ABC123',
           artifactFile: 'platforms/ios/build/testing/MyApp.ipa'
          }
        }
      });

    };

```

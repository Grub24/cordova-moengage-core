'use strict';

var fs = require('fs');

module.exports = function (context) {
  var getPreferenceValueFromConfig = function (config, name) {
      var value = config.match(new RegExp('name="' + name + '" value="(.*?)"', "i"))
      if(value && value[1]) {
          return value[1]
      } else {
          return null
      }
  }

  var getPreferenceValueFromPackageJson = function (packageJson, name) {
      var value = packageJson.match(new RegExp('"' + name + '":\\s"(.*?)"', "i"))
      if(value && value[1]) {
          return value[1]
      } else {
          return null
      }
  }
  
  var getPreferenceValue = function (name) {
      var config = fs.readFileSync("config.xml").toString()
      var preferenceValue = getPreferenceValueFromConfig(config, name)
      if(!preferenceValue) {
        var packageJson = fs.readFileSync("package.json").toString()
        preferenceValue = getPreferenceValueFromPackageJson(packageJson, name)
      }
      return preferenceValue
  }

  var MOE_APP_ID = ' '
  if(process.argv.join("|").indexOf("MOE_APP_ID=") > -1) {
  	MOE_APP_ID = process.argv.join("|").match(/MOE_APP_ID=(.*?)(\||$)/)[1]
  } else {
  	MOE_APP_ID = getPreferenceValue("MOE_APP_ID")
  }
  if(!MOE_APP_ID || MOE_APP_ID === ' ') {
    MOE_APP_ID = ''
  }

  var MOE_DATA_CENTER = ' '
  if(process.argv.join("|").indexOf("MOE_APP_ID=") > -1) {
  	MOE_DATA_CENTER = process.argv.join("|").match(/MOE_DATA_CENTER=(.*?)(\||$)/)[1]
  } else {
  	MOE_DATA_CENTER = getPreferenceValue("MOE_DATA_CENTER")
  }
  if(!MOE_DATA_CENTER || MOE_DATA_CENTER === ' ') {
    MOE_DATA_CENTER = 'DATA_CENTER_2'
  }

  var getPlistPath = function () {
    var common = context.requireCordovaModule('cordova-common'), 
    util = context.requireCordovaModule('cordova-lib/src/cordova/util'), 
    projectName = new common.ConfigParser(util.projectConfig(util.isCordova())).name(), 
    plistPath = './platforms/ios/' + projectName + '/' + projectName + '-Info.plist'
    return plistPath
  }

  var plistPath = getPlistPath()

  var updatePlistContent = function () {
    fs.stat(plistPath, function (error, stat) {
      if(error) {
        return
      }

      var plistContent = fs.readFileSync(plistPath, 'utf8')

      plistContent = plistContent.replace(/MOE_APP_ID_PLACEHOLDER/g, MOE_APP_ID).replace(/MOE_DATA_CENTER_PLACEHOLDER/g, MOE_DATA_CENTER)
      


      fs.writeFileSync(plistPath, plistContent, 'utf8')
    })
  }

  updatePlistContent()
}
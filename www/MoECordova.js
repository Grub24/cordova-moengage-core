var exec = require('cordova/exec'),
    MoEJsonProvider = require('./MoEJsonProvider'),
    Constants = require('./MoEConstants');
const { TYPE_PUSH } = require('./MoEConstants');
var moeAppId = "";
var tag = "MoECordova";

var MoECordova = function (appId) {
    moeAppId = appId;
    this._handlers = {
        'onPushClick': [],
        'onPushTokenGenerated': [],
        'onInAppShown': [],
        'onInAppClick': [],
        'onInAppDismiss': [],
        'onInAppCustomAction': [],
        'onInAppSelfHandle': [],
        'onPermissionResult': []
    };
    var that = this;
    var success = function (msg) {
        console.log(tag + "  success() : ");
        if (msg) {
            console.log(JSON.stringify(msg));
            if (msg.type === 'MoEPushClicked') {
                that.emit('onPushClick', msg);
            } else if (msg.type === 'MoEPushTokenGenerated') {
                that.emit('onPushTokenGenerated', msg);
            } else if (msg.type === 'MoEInAppCampaignShown') {
                that.emit('onInAppShown', msg);
            } else if (msg.type === 'MoEInAppCampaignClicked') {
                that.emit('onInAppClick', msg);
            } else if (msg.type === 'MoEInAppCampaignDismissed') {
                that.emit('onInAppDismiss', msg);
            } else if (msg.type === 'MoEInAppCampaignCustomAction') {
                that.emit('onInAppCustomAction', msg);
            } else if (msg.type === 'MoEInAppCampaignSelfHandled') {
                that.emit('onInAppSelfHandle', msg);
            } else if (msg.type === 'MoEOnPermissionResult') {
                that.emit('onPermissionResult', msg);
            }
        }
    }
    var fail = function () {
        console.log(tag + "  fail");
    }
    exec(success, fail, 'MoEngage', 'init', [MoEJsonProvider.getInitJson(moeAppId)]);
}

/**
 * Tells the SDK whether this is a migration or a fresh installation.
 * <b>Not calling this method will STOP execution of INSTALL CAMPAIGNS<b/>.
 * This is solely required for migration to MoEngage Platform
 *
 * @param status if it is an existing user set "update" else set "install"
 */
MoECordova.prototype.setAppStatus = function (status) {
    console.log(tag + " setAppStatus(): status: " + status);
    var success = function (result) {
        console.log(tag + " setAppStatus() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setAppStatus() : fail");
    };
    exec(success, fail, 'MoEngage', 'appStatus', [MoEJsonProvider.getAppStatusJson(status, moeAppId)]);
}


/**
 * Tracks an event.
 * @param {String} eventName event name
 * @param {String} generalAttributes JSON string of general attributes
 * @param {String} locationAttributes JSON string of one or more location attributes JSON
 * @param {String} dateTimeAttributes JSON string of  one or more dateTimeAttributes attributes 
 * @param {String} isNonInteractive if event is interactive set true else false
 */
MoECordova.prototype.trackEvent = function (eventName, generalAttributes, locationAttributes, dateTimeAttributes, isNonInteractive) {
    console.log(tag + " trackEvent() : eventName: " + eventName
        + ",\ngeneralAttributes: " + JSON.stringify(generalAttributes)
        + ",\nlocationAttributes: " + JSON.stringify(locationAttributes)
        + ",\ndateTimeAttribute: " + JSON.stringify(dateTimeAttributes)
        + ",\nisNonInteractive: " + isNonInteractive);

    var success = function (result) {
        console.log(tag + " trackEvent() : success");
    };

    var fail = function (msg) {
        console.log(tag + " trackEvent() : fail");
    };

    var trackEventObj = {};
    trackEventObj.eventName = eventName;

    var eventAttributes = {};

    if (typeof (generalAttributes) == "object") {
        eventAttributes.generalAttributes = generalAttributes;
    }
    if (typeof (locationAttributes) == "object") {
        eventAttributes.locationAttributes = locationAttributes;
    }
    if (typeof (generalAttributes) == "object") {
        eventAttributes.dateTimeAttributes = dateTimeAttributes;
    }

    trackEventObj.eventAttributes = eventAttributes;
    trackEventObj.isNonInteractive = typeof (isNonInteractive) == "boolean" ? isNonInteractive : false;

    console.log(tag + " trackEvent() : event: " + JSON.stringify(trackEventObj));
    exec(success, fail, 'MoEngage', 'trackEvent', [MoEJsonProvider.getTrackEventJson(trackEventObj, moeAppId)]);
}

/**
* Sets the unique id of the user. Should be set on user login.
* 
* @param uniqueId unique id to be set
*/
MoECordova.prototype.setUniqueId = function (uniqueId) {
    console.log(tag + " setUniqueId() : uniqueId: " + uniqueId);

    if (typeof (uniqueId) == "string") {
        var success = function (result) {
            console.log(tag + " setUniqueId() : success");
        };

        var fail = function (msg) {
            console.log(tag + " setUniqueId(): fail");
        };

        exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getUniqueIdJson(uniqueId, moeAppId)]);
    } else {
        console.error("setUniqueId() : invalid uniqueId type.");
    }
}


/**
 * Use this method to update User Attribute Unique ID of a user
 * 
 * @param alias The updated Unique ID for the user 
 */

MoECordova.prototype.setAlias = function (alias) {
    console.log(tag + " setAlias() : alias: " + alias);
    var success = function (result) {
        console.log(tag + " setAlias() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setAlias() : fail");
    };

    exec(success, fail, 'MoEngage', 'setAlias', [MoEJsonProvider.getAliasJson(alias, moeAppId)]);
};


/**
 * Sets the user-name of the user.
 * 
 * @param userName user-name to be set
 */
MoECordova.prototype.setUserName = function (userName) {
    console.log(tag + " setUserName() : userName: " + userName);
    var success = function (result) {
        console.log(tag + " setUserName() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setUserName() : fail");
    };



    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getUserNameJson(userName, moeAppId)]);
}

/**
 * Sets first name of the user.
 * @param firstName user-name to be set
 */
MoECordova.prototype.setFirstName = function (firstName) {
    console.log(tag + " setFirstName() : firstName: " + firstName);
    var success = function (result) {
        console.log(tag + " setFirstName() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setFirstName() : fail");
    };

    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getFirstNameJson(firstName, moeAppId)]);
}

/**
 * Sets last name of the user.
 * 
 * @param userName user-name to be set
 */
MoECordova.prototype.setLastName = function (lastName) {
    console.log(tag + " setLastName() : lastName: " + lastName);
    var success = function (result) {
        console.log(tag + " setLastName() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setLastName() : fail");
    };


    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getLastNameJson(lastName, moeAppId)]);
}

/**
 * Sets the email-id of the user.
 * 
 * @param emailId email-id to be set
 */
MoECordova.prototype.setEmail = function (emailId) {
    console.log(tag + " setEmail() : emailId: " + emailId);

    var success = function (result) {
        console.log(tag + " setEmail() :success");
    }

    var fail = function (result) {
        console.log(tag + " setEmail() : fail");
    }

    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getEmailJson(emailId, moeAppId)]);
}

/**
 * Sets the mobile number of the user.
 * 
 * @param mobileNumber mobile number to be set
 */
MoECordova.prototype.setPhoneNumber = function (mobileNumber) {
    console.log(tag + " setPhoneNumber() : Phone number: " + mobileNumber);

    var success = function (result) {
        console.log(tag + " setPhoneNumber() :success");
    }

    var fail = function (result) {
        console.log(tag + " setPhoneNumber() : fail");
    }


    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getPhoneNumberJson(mobileNumber, moeAppId)]);
}

/**
 * Sets the birthday of the user.
 * 
 * @param birthday birthday to be set in ISO format [yyyy-MM-dd'T'HH:mm:ss'Z'].
 */
MoECordova.prototype.setBirthdate = function (birthday) {
    console.log(tag + " setBirthdate() : birthday: " + birthday);

    var success = function (result) {
        console.log(tag + " setBirthdate() :success");
    }

    var fail = function (result) {
        console.log(tag + " setBirthdate() : fail");
    }

    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getBirthdateJson(birthday, moeAppId)]);
}

/**
* Sets the gender of the user.
* 
* @param gender gender to be set {MALE/FEMALE/OTHER}
*/
MoECordova.prototype.setGender = function (gender) {
    console.log(tag + " setGender() : gender: " + gender);

    var success = function (result) {
        console.log(tag + " setGender() :success");
    }

    var fail = function (result) {
        console.log(tag + " setGender() : fail");
    }

    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getGenderJson(gender, moeAppId)]);
}

/**
 * Sets the location of the user.
 *
 * @param latitude Latitude value corresponding to the location userAttribute
 * @param longitude Longitude value corresponding to the location userAttribute
 */
MoECordova.prototype.setLocation = function (latitude, longitude) {
    console.log(tag + " setLocation() : attributeLatValue: " + latitude +
        " attributeLonValue: " + longitude);
    var success = function (result) {
        console.log(tag + " setLocation() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setLocation() : fail");
    };


    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getLocationJson(latitude, longitude, moeAppId)]);
}

/**
 * Set a user attribute for the current user
 *
 * @param attributeName The attribute which needs to be set
 * @param attributeValue The attribute value corresponding to the userAttribute
 */
MoECordova.prototype.setUserAttribute = function (attributeName, attributeValue) {
    console.log(tag + " setUserAttribute() : attributeName: " + attributeName + ", attributeValue: " + attributeValue);
    var success = function (result) {
        console.log(tag + " setUserAttribute() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setUserAttribute() : fail");
    };


    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getUserAttributeJson(attributeName, attributeValue, moeAppId)]);
}


/**
 * Set a user attribute timestamp for the current user
 * @param attributeName The attribute which needs to be set
 * @param date The value/attribute, in ISO format [yyyy-MM-dd'T'HH:mm:ss'Z'].
 */
MoECordova.prototype.setUserAttributeISODateString = function (attributeName, date) {
    console.log(tag + " setUserAttributeISODateString() : attributeName: " + attributeName + ", date: " + date);
    var success = function (result) {
        console.log(tag + " setUserAttributeISODateString() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setUserAttributeISODateString() : fail");
    };

    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getUserAttributeISODateJson(attributeName, date, moeAppId)]);
}

/**
 * Set a user attribute location.
 *
 * @param attributeName attribute name
 * @param latitude Latitude value corresponding to the location userAttribute
 * @param longitude Longitude value corresponding to the location userAttribute
 */
MoECordova.prototype.setUserAttributeLocation = function (attributeName, latitude, longitude) {
    console.log(tag + " setUserAttributeLocation() : attributeLatValue: " + latitude +
        " attributeLonValue: " + longitude);
    var success = function (result) {
        console.log(tag + " setUserAttributeLocation() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setUserAttributeLocation() : fail");
    };

    exec(success, fail, 'MoEngage', 'setUserAttribute', [MoEJsonProvider.getLocationAttributeJson(attributeName, latitude, longitude, moeAppId)]);
}


/**
 * Notifys the SDK that the user has logged out of the app.
 */
MoECordova.prototype.logout = function () {
    console.log(tag + " logout() ");
    var success = function (result) {
        console.log(tag + " logout() : success");
    };

    var fail = function (msg) {
        console.log(tag + " logout() : fail");
    };
    exec(success, fail, 'MoEngage', 'logout', [MoEJsonProvider.getLogoutJson(moeAppId)]);
}

/**
 *  Show inApp view on the window
 */
MoECordova.prototype.showInApp = function () {
    console.log(tag + " showInApp() : ");
    var success = function (result) {
        console.log(tag + " showInApp() : success");
    };

    var fail = function (msg) {
        console.log(tag + " showInApp() : fail");
    };
    exec(success, fail, 'MoEngage', 'showInApp', [MoEJsonProvider.getInAppJson(moeAppId)]);
}

/**
 * Call this method to get the campaign info for self handled inApps
 */
MoECordova.prototype.getSelfHandledInApp = function () {
    console.log(tag + " getSelfHandledInApp() : ");

    var success = function (result) {
        console.log(tag + " getSelfHandledInApp() : success");
    };

    var fail = function (msg) {
        console.log(tag + " getSelfHandledInApp() : fail");
    };
    exec(success, fail, 'MoEngage', 'selfHandledInApp', [MoEJsonProvider.getSelfHandledJson(moeAppId)]);
}


/**
 * Call this method when you show the self handled in-app so we can update impressions.
 * 
 * @param {JSON} campaignPayload received in-app payload
 */
MoECordova.prototype.selfHandledShown = function (campaignPayload) {
    console.log(tag + " selfHandledShown() : campaign payload: " + JSON.stringify(campaignPayload));

    var success = function (result) {
        console.log(tag + " selfHandledShown() : success");
    };

    var fail = function (msg) {
        console.log(tag + " selfHandledShown() : fail");
    };

    exec(success, fail, 'MoEngage', 'selfHandledCallback', [MoEJsonProvider.getSelfHandledActionJson(campaignPayload, "impression")]);
}

/**
 * Call this method to track when self handled in app widget(other than Primary Widget) is clicked.
 * 
 * @param {JSON} campaignPayload received in-app payload
 */
MoECordova.prototype.selfHandledClicked = function (campaignPayload) {
    console.log(tag + " selfHandledClicked() : campaign payload: " + JSON.stringify(campaignPayload, moeAppId));

    var success = function (result) {
        console.log(tag + " selfHandledClicked() : success");
    };

    var fail = function (msg) {
        console.log(tag + " selfHandledClicked() : fail");
    };

    exec(success, fail, 'MoEngage', 'selfHandledCallback', [MoEJsonProvider.getSelfHandledActionJson(campaignPayload, "click")]);
}
/**
 * Call this method to track dismiss actions on the inApp.
 * 
 * @param {JSON} campaignPayload received in-app payload
 */
MoECordova.prototype.selfHandledDismissed = function (campaignPayload) {
    console.log(tag + " selfHandledDismissed() :  campaign payload: " + JSON.stringify(campaignPayload, moeAppId));

    var success = function (result) {
        console.log(tag + " selfHandledDismissed() : success");
    };

    var fail = function (msg) {
        console.log(tag + " selfHandledDismissed() : fail");
    };

    campaignPayload.type = "dismissed";
    exec(success, fail, 'MoEngage', 'selfHandledCallback', [MoEJsonProvider.getSelfHandledActionJson(campaignPayload, "dismissed")]);
}


/**
* Call this method to the current context for inApp module.
* 
* @param contexts : Array of all the context names
*/
MoECordova.prototype.setCurrentContext = function (contextArray) {
    console.log(tag + " setCurrentContext(): contextArray: " + contextArray);
    var success = function (result) {
        console.log(tag + " setCurrentContext() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setCurrentContext() : fail");
    };

    exec(success, fail, 'MoEngage', 'appContext', [MoEJsonProvider.getCurrentContextJson(contextArray, moeAppId)]);
}

/**
 * Call this method to the reset current context for inApp module.
 */
MoECordova.prototype.resetCurrentContext = function () {
    console.log(tag + " resetCurrentContext():");
    var success = function (result) {
        console.log(tag + " resetCurrentContext() : success");
    };

    var fail = function (msg) {
        console.log(tag + " resetCurrentContext() : fail");
    };

    exec(success, fail, 'MoEngage', 'resetAppContext', [MoEJsonProvider.getResetContextJson(moeAppId)]);
}

/**
 * Optionally opt-out of data tracking. When data tracking is opted no event or user
 * attribute is tracked on MoEngage Platform.
 * 
 * @param {boolean} shouldOptOut true if you don't want to track user data, else false.
 */
MoECordova.prototype.optOutDataTracking = function (shouldOptOut) {
    console.log(tag + " optOutDataTracking() : shouldOptOut: " + shouldOptOut);
    var success = function (result) {
        console.log(tag + " optOutDataTracking() : success");
    };

    var fail = function (msg) {
        console.log(tag + " optOutDataTracking() : fail");
    };

    exec(success, fail, 'MoEngage', 'optOutTracking', [MoEJsonProvider.getOptOutDataTrackingJson(shouldOptOut, Constants.TYPE_DATA, moeAppId)]);
}

/**
 *  Register For Push Notification for iOS
 *  Note : This method is only for iOS
 */

MoECordova.prototype.registerForPushNotification = function () {
    console.log(tag + " registerForPushNotification");
    var success = function (result) {
        console.log(tag + " registerForPushNotification() : success");
    };

    var fail = function (msg) {
        console.log(tag + " registerForPushNotification() : fail");
    };
    exec(success, fail, 'MoEngage', 'registerForPushNotification', [MoEJsonProvider.getPushRegisterJson(moeAppId)]);
}

/**
 * Passes Push Token to the MoEngage SDK
 * Note : This method is only for Android
 * 
 * @param token Push Token
 */
MoECordova.prototype.passFcmToken = function (token) {
    console.log(tag + " passFcmToken() : token: " + token);
    var success = function (result) {
        console.log(tag + " passFcmToken() : success");
    };


    var fail = function (msg) {
        console.log(tag + " passFcmToken() : fail");
    };

    exec(success, fail, 'MoEngage', 'passToken', [MoEJsonProvider.getPushTokenJson(token, moeAppId)]);
}

/**
 * Passes Push payload to the MoEngage SDK
 * Note : This method is only for Android
 * 
 * @param pushPayload JSONObject of the push payload.
 */
MoECordova.prototype.passFcmPayload = function (pushPayload) {
    console.log(tag + " passFcmPayload() : pushPayload: " + JSON.stringify(pushPayload));
    var success = function (result) {
        console.log(tag + " passFcmPayload() : success");
    };


    var fail = function (msg) {
        console.log(tag + " passFcmPayload() : fail");
    };

    exec(success, fail, 'MoEngage', 'passPayload', [MoEJsonProvider.getFcmPayloadJson(pushPayload, moeAppId)]);
}

/**
  Enable  SDK
*/
MoECordova.prototype.enableSdk = function () {
    console.log(tag + " enableSdk(): true");
    var success = function (result) {
        console.log(tag + " enableSdk() : success");
    };

    var fail = function (msg) {
        console.log(tag + " enableSdk() : fail");
    };

    exec(success, fail, 'MoEngage', 'updateSDKState', [MoEJsonProvider.getSdkStateJson(true, moeAppId)]);
}

/**
    Disable  SDK
 */
MoECordova.prototype.disableSdk = function () {
    console.log(tag + " disableSdk(): false");
    var success = function (result) {
        console.log(tag + " disableSdk() : success");
    };

    var fail = function (msg) {
        console.log(tag + " disableSdk() : fail");
    };

    exec(success, fail, 'MoEngage', 'updateSDKState', [MoEJsonProvider.getSdkStateJson(false, moeAppId)]);
}

MoECordova.prototype.emit = function () {
    var args = Array.prototype.slice.call(arguments);
    var eventName = args.shift();

    if (!this._handlers.hasOwnProperty(eventName)) {
        return false;
    }

    for (var i = 0, length = this._handlers[eventName].length; i < length; i++) {
        var callback = this._handlers[eventName][i];
        if (typeof callback === 'function') {
            callback.apply(undefined, args);
        } else {
            console.log('event handler: ' + eventName + ' must be a function');
        }
    }

    return true;
};

MoECordova.prototype.on = function (eventName, callback) {
    if (!this._handlers.hasOwnProperty(eventName)) {
        this._handlers[eventName] = [];
    }
    this._handlers[eventName].push(callback);
};

/**
 * Notifies MoEngage SDK of device orientation change
 * Note : This method is only for Android
 */
MoECordova.prototype.onOrientationChanged = function () {
    console.log(tag + " onOrientationChanged");
    var success = function (result) {
        console.log(tag + " onOrientationChanged() : success");
    };

    var fail = function (msg) {
        console.log(tag + " onOrientationChanged() : fail");
    };
    exec(success, fail, 'MoEngage', 'onOrientationChanged', [MoEJsonProvider.getOrientationJson(moeAppId)]);
}

MoECordova.prototype.enableAdIdTracking = function () {
    console.log(tag + " enableAdIdTracking() : ");
    var success = function (result) {
        console.log(tag + " enableAdIdTracking() : success");
    };

    var fail = function (msg) {
        console.log(tag + " enableAdIdTracking() : fail");
    };

    exec(success, fail, 'MoEngage', 'deviceIdentifierTrackingStatusUpdate', [MoEJsonProvider.getAdIdTrackingStateJson(true, moeAppId)]);
}

MoECordova.prototype.disableAdIdTracking = function () {
    console.log(tag + " disableAdIdTracking() : ");
    var success = function (result) {
        console.log(tag + " disableAdIdTracking() : success");
    };

    var fail = function (msg) {
        console.log(tag + " disableAdIdTracking() : fail");
    };

    exec(success, fail, 'MoEngage', 'deviceIdentifierTrackingStatusUpdate', [MoEJsonProvider.getAdIdTrackingStateJson(false, moeAppId)]);
}

MoECordova.prototype.enableAndroidIdTracking = function () {
    console.log(tag + " enableAndroidIdTracking() : ");
    var success = function (result) {
        console.log(tag + " enableAndroidIdTracking() : success");
    };

    var fail = function (msg) {
        console.log(tag + " enableAndroidIdTracking() : fail");
    };

    exec(success, fail, 'MoEngage', 'deviceIdentifierTrackingStatusUpdate', [MoEJsonProvider.getAndroidIdTrackingJson(true, moeAppId)]);
}

MoECordova.prototype.disableAndroidIdTracking = function () {
    console.log(tag + " disableAndroidIdTracking() : ");
    var success = function (result) {
        console.log(tag + " disableAndroidIdTracking() : success");
    };

    var fail = function (msg) {
        console.log(tag + " disableAndroidIdTracking() : fail");
    };
    exec(success, fail, 'MoEngage', 'deviceIdentifierTrackingStatusUpdate', [MoEJsonProvider.getAndroidIdTrackingJson(false, moeAppId)]);
}

/**
 * API to create notification channels on Android.
 * Note: This API is only for Android Platform.
 */
MoECordova.prototype.setupNotificationChannelsAndroid = function () {
    console.log(tag + " setupNotificationChannelsAndroid() : ");
    var success = function (result) {
        console.log(tag + " setupNotificationChannelsAndroid() : success");
    };

    var fail = function (msg) {
        console.log(tag + " setupNotificationChannelsAndroid() : fail");
    };
    exec(success, fail, 'MoEngage', 'setUpNotificationChannels', [{}]);
}

/**
 * Notify the SDK on notification permission granted to the application.
 * Note: This API is only for Android Platform.
 */
MoECordova.prototype.pushPermissionResponseAndroid = function (isGranted) {
    console.log(tag + " pushPermissionResponseAndroid() : ");
    var success = function (result) {
        console.log(tag + " pushPermissionResponseAndroid() : success");
    };

    var fail = function (msg) {
        console.log(tag + " pushPermissionResponseAndroid() : fail");
    };
    exec(success, fail, 'MoEngage', 'permissionResponse', [MoEJsonProvider.getPermissionResponseJson(isGranted, TYPE_PUSH)]);
}

/**
 * Navigates the user to the Notification settings on Android 8 or above,
 * on older versions the user is navigated the application settings or
 * application info screen.
 * Note: This API is only for Android Platform.
 */
MoECordova.prototype.navigateToSettingsAndroid = function () {
    console.log(tag + " navigateToSettingsAndroid() : ");
    var success = function (result) {
        console.log(tag + " navigateToSettingsAndroid() : success");
    };

    var fail = function (msg) {
        console.log(tag + " navigateToSettingsAndroid() : fail");
    };
    exec(success, fail, 'MoEngage', 'navigateToSettings', [{}]);
}


/**
 * Requests the push permission on Android 13 and above.
 * Note: This API is only for Android Platform.
 */
MoECordova.prototype.requestPushPermissionAndroid = function () {
    console.log(tag + " requestPushPermissionAndroid() : ");
    var success = function (result) {
        console.log(tag + " requestPushPermissionAndroid() : success");
    };

    var fail = function (msg) {
        console.log(tag + " requestPushPermissionAndroid() : fail");
    };
    exec(success, fail, 'MoEngage', 'requestPushPermission', [{}]);
}


/**
 * Enable Device-id tracking. It is enabled by default, and should be called only if tracking is disabled at some point.
 * Note: This API is only for Android Platform
 */
MoECordova.prototype.enableDeviceIdTracking = function () {
    console.log(tag + " enableDeviceIdTracking() : ");
    var success = function (result) {
        console.log(tag + "enableDeviceIdTracking() : success");
    }
    var failure = function (error) {
        console.log(tag + "enableDeviceIdTracking() : failure ",error);
    }
    exec(success,failure,'MoEngage','deviceIdentifierTrackingStatusUpdate',[MoEJsonProvider.getDeviceIdTrackingStateJson(true, moeAppId)]);
}

/**
 * Disables Device-id tracking
 * Note: This API is only for Android Platform
 */
 MoECordova.prototype.disableDeviceIdTracking = function () {
    console.log(tag + " disableDeviceIdTracking() : ");
    var success = function (result) {
        console.log(tag + "disableDeviceIdTracking() : success");
    }
    var failure = function (error) {
        console.log(tag + "disableDeviceIdTracking() : failure ",error);
    }
    exec(success,failure,'MoEngage','deviceIdentifierTrackingStatusUpdate',[MoEJsonProvider.getDeviceIdTrackingStateJson(false, moeAppId)]);
}

/**
 * Requests the push permission on Android 13 and above.
 * Note: This API is only for Android Platform.
 */
MoECordova.prototype.updatePushPermissionRequestCountAndroid = function (count) {
    console.log(tag + " updatePushPermissionRequestCountAndroid() : ");
    var success = function (result) {
        console.log(tag + " updatePushPermissionRequestCountAndroid() : success");
    };

    var fail = function (msg) {
        console.log(tag + " updatePushPermissionRequestCountAndroid() : fail");
    };
    exec(success, fail, 'MoEngage', 'updatePushPermissionRequestCount', [MoEJsonProvider.getUpdatePushCountJsonPayload(count, moeAppId)]);
}

/**
 * Delete User from MoEngage Server
 * Note: This API is only for Android Platform.
 */
MoECordova.prototype.deleteUser = function () {

    return new Promise((resolve, reject) => {
       console.log(tag + " deleteUser() : ");
          var success = function (result) {
          console.log(tag + " deleteUser() : success",result.toString());
          resolve(result);
       };
       var fail = function (msg) {
          console.log(tag + " deleteUser() : fail ",msg.toString());
          reject(msg);
       };
       console.log("Delete User Payload,",MoEJsonProvider.getDeleteUserJsonPayload(moeAppId).toString());
       exec(success, fail, 'MoEngage', 'deleteUser', [MoEJsonProvider.getDeleteUserJsonPayload(moeAppId)]);
      });
}

module.exports = {

    init: function (appId) {
        return new MoECordova(appId);
    },

    MoECordova: MoECordova
}

/* Constants */

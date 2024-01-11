Constants = require('./MoEConstants');

module.exports = {
    // GET ACCOUNT META
    getAccountMeta: (appId) => {
        return {
            accountMeta: {
                appId: appId
            }
        }
    },
    //GET INIT JSON
    getInitJson: (appId) => {
        return MoEJsonProvider.getAccountMeta(appId);
    },

    //GET APP STATUS JSON
    getAppStatusJson: (status, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            appStatus: status
        };
        return payload;
    },
    //GET ALIAS JSON
    getAliasJson: (alias, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            alias: alias
        };
        return payload;
    },

    //GET LOGOUT JSON
    getLogoutJson: (appId) => {
        return MoEJsonProvider.getAccountMeta(appId);
    }
    ,
    //GET CONTEXT JSON
    getCurrentContextJson: (contextArray, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            contexts: contextArray
        };
        return payload;
    },

    //GET RESET CONTEXT JSON
    getResetContextJson: (appId) => {
        return MoEJsonProvider.getAccountMeta(appId);
    },

    //GET SDK STATE JSON
    getSdkStateJson: (isEnabled, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            isSdkEnabled: isEnabled,
        };
        return payload;
    },

    //GET ORIENTATION JSON
    getOrientationJson: (appId) => {
        return MoEJsonProvider.getAccountMeta(appId);
    },
    //GET IN APP JSON
    getInAppJson: (appId) => {
        return MoEJsonProvider.getAccountMeta(appId);
    },

    //GET SELF HANDLED JSON
    getSelfHandledJson: (appId) => {
        return MoEJsonProvider.getAccountMeta(appId);
    }
    ,

    getSelfHandledActionJson: (campaignPayload, type) => {
        campaignPayload["data"].type = type;
        return campaignPayload;
    },

    //GET PUSH REGISTER JSON
    getPushRegisterJson: (appId) => {
        return MoEJsonProvider.getAccountMeta(appId);
    },

    //GET PUSH TOKEN JSON
    getPushTokenJson: (token, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            token: token,
            service: MoEConstants.PUSH_SERVICE_TYPE_FCM
        };
        return payload;
    },

    //GET FCM PAYLOAD JSON
    getFcmPayloadJson: (pushPayload, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            payload: pushPayload,
            service: MoEConstants.PUSH_SERVICE_TYPE_FCM
        };
        return payload;
    },

    //GET OPT OUT DATA JSON
    getOptOutDataTrackingJson: (shouldOptOut, type, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            type: type,
            state: shouldOptOut
        };
        return payload;
    },

    //GET GEOFENCE 
    getGeofenceMonitoringJson: (appId) => {
        return MoEJsonProvider.getAccountMeta(appId);
    },


    //GET UNIQUE ID
    getUniqueIdJson: (uniqueId, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: MoEConstants.USER_ATTRIBUTE_UNIQUE_ID,
            attributeValue: uniqueId,
            type: MoEConstants.GENERAL
        };
        return payload;
    },

    //GET USER NAME
    getUserNameJson: (userName, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: MoEConstants.USER_ATTRIBUTE_USER_NAME,
            attributeValue: userName,
            type: MoEConstants.GENERAL
        };
        return payload;
    },

    //GET FIRST NAME
    getFirstNameJson: (firstName, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: MoEConstants.USER_ATTRIBUTE_USER_FIRST_NAME,
            attributeValue: firstName,
            type: MoEConstants.GENERAL
        };
        return payload;
    },

    //GET LAST NAME
    getLastNameJson: (lastName, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: MoEConstants.USER_ATTRIBUTE_USER_LAST_NAME,
            attributeValue: lastName,
            type: MoEConstants.GENERAL
        };
        return payload;
    },

    //GET EMAIL ID
    getEmailJson: (emailId, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: MoEConstants.USER_ATTRIBUTE_USER_EMAIL,
            attributeValue: emailId,
            type: MoEConstants.GENERAL
        };
        return payload;
    }
    ,
    //GET PHONE NUMBER
    getPhoneNumberJson: (mobileNumber, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: MoEConstants.USER_ATTRIBUTE_USER_MOBILE,
            attributeValue: mobileNumber,
            type: MoEConstants.GENERAL
        };
        return payload;
    },

    //GET BIRTHDAY DATE
    getBirthdateJson: (birthday, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: MoEConstants.USER_ATTRIBUTE_USER_BDAY,
            attributeValue: birthday,
            type: MoEConstants.TIME_STAMP
        };
        return payload;
    },

    //GET GENDER
    getGenderJson: (gender, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: MoEConstants.USER_ATTRIBUTE_USER_GENDER,
            attributeValue: gender,
            type: MoEConstants.GENERAL
        };
        return payload;
    }
    ,
    //GET LOCATION
    getLocationJson: (latitude, longitude, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: MoEConstants.USER_ATTRIBUTE_USER_LOCATION,
            type: MoEConstants.LOCATION,
            locationAttribute: {
                latitude: latitude,
                longitude: longitude
            }
        };
        return payload;
    },

    //GET USER ATTRIBUTE
    getUserAttributeJson: (attributeName, attributeValue, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: attributeName,
            attributeValue: attributeValue,
            type: Constants.GENERAL
        };
        return payload;
    },

    //GET ISO DATE
    getUserAttributeISODateJson: (attributeName, date, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: attributeName,
            attributeValue: date,
            type: Constants.TIME_STAMP
        };
        return payload;
    }
    ,
    //GET LOCATION
    getLocationAttributeJson: (attributeName, latitude, longitude, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            attributeName: attributeName,
            type: Constants.LOCATION,
            locationAttribute: {
                latitude: latitude,
                longitude: longitude
            }
        };
        return payload;
    },

    //GET TRACKING STATE
    getAdIdTrackingStateJson: (isEnabled, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            isAdIdTrackingEnabled: isEnabled,
        };
        return payload;
    },

    //GET ANDROID TRACKING STATE
    getAndroidIdTrackingJson: (isEnabled, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            isAndroidIdTrackingEnabled: isEnabled,
        };
        return payload;
    },

    //GET TRACK EVENTS
    getTrackEventJson: (trackEvent, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = trackEvent;
        return payload;
    },

    //GET PERMISSION STATE JSON
    getPermissionResponseJson: (isPermissionGranted, permissionType) => {
        return {
            isGranted: isPermissionGranted,
            type: permissionType,
        };
    },


    //GET Device Id Tracking State - Android
    getDeviceIdTrackingStateJson: (isEnabled,appId) => {
        let payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            isDeviceIdTrackingEnabled : isEnabled
        }
        return payload
    },


    //UPDATE PUSH PERMISSION COUNT ANDROID
    getUpdatePushCountJsonPayload: (count, appId) => {
        var payload = MoEJsonProvider.getAccountMeta(appId);
        payload.data = {
            pushOptinInAttemptCount: count
        };
        return payload;
    },

    //GET Delete User JSON
    getDeleteUserJsonPayload: (appId) => {
        return MoEJsonProvider.getAccountMeta(appId);
    },
};
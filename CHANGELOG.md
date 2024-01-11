# cordova-moengage-core

## 29-11-2023

### 8.4.0
- iOS
    - Support for iOS SDK version `9.8.0` and above.
- Android
    - Support for Android version `12.10.01` and above
    - Google Policy - Delete User details API
    - BugFix
      - Self Handled InApp delivery controls not working
    
## 16-05-2023

### 8.3.1

- Android
    - Self Handled InApp callback Fix for TestInApp and Event Triggered InApp

## 28-02-2023

### 8.3.0
- Android
    - Device Id enable/disable support
    - Support For Android SDK version `12.6.00` and above
    - Support for Android 13 Opt-in with In-apps Native

## 16-02-2023

### 8.2.0
- iOS
    - Support for iOS SDK version `9.4.0` and above.
    
| Then                                                                                                                                                       | Now                                                                                                                                                              |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| - (void)initializeDefaultSDKConfig:(MOSDKConfig*)sdkConfig andLaunchOptions:(NSDictionary*)launchOptions;                                                  | -(void)initializeDefaultSDKConfig:(MoEngageSDKConfig*)sdkConfig andLaunchOptions:(NSDictionary*)launchOptions;                                                   |
| - (void)initializeDefaultSDKConfigWithState:(MOSDKConfig*)sdkConfig withSDKState:(MoEngageSDKState)sdkState andLaunchOptions:(NSDictionary*)launchOptions; | - (void)initializeDefaultSDKConfigWithState:(MoEngageSDKConfig*)sdkConfig withSDKState:(MoEngageSDKState)sdkState andLaunchOptions:(NSDictionary*)launchOptions; |

## 31-10-2022

### 8.1.0
- Android
    - Support for Android 13 notification permission.
    - Android Gradle Plugin version updated to 7.3.1
    - Gradle version updated to 7.4
    - Build Configuration Updates
        - Compile SDK Version - 31
        - Target SDK version - 31

- iOS
   -  iOS Base plugin version dependency updated to `~>3.1.0`.
   -  Deprecated API

| Then                                                                                                                                      | Now                                                                                                                                                       |
|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| - (void)initializeDefaultSDKConfig:(MOSDKConfig*)sdkConfig withSDKState:(BOOL)isSdkEnabled andLaunchOptions:(NSDictionary*)launchOptions; | - (void)initializeDefaultSDKConfig:(MOSDKConfig*)sdkConfig withMoEngageSDKState:(MoEngageSDKState)sdkState andLaunchOptions:(NSDictionary*)launchOptions; |


## 06-09-2022
### 8.0.0
- Support for Android SDK version `12.2.05` and above.
- Support for iOS SDK version `8.3.1` and above.
- Breaking changes

| Then              | Now                           |
|-------------------|-------------------------------|
| MoECordova.init() | MoECordova.init(YOUR_APP_ID); |
- Removed APIs

| Removed APIs                |
|-----------------------------|
| selfHandledPrimaryClicked() |
| enableSDKLogs()             |
| optOutInAppNotification()   |
| optOutPushNotification()    |
| startGeofenceMonitoring()   |
- Android
  - Build Configuration Updates
    - Minimum SDK version - 21
    - Target SDK version - 30
    - Compile SDK Version - 30
  - Mi SDK update to Version 5.x.x, refer to the [Configuring Xiaomi Push](https://developers.moengage.com/hc/en-us/articles/4403466194708) and update the integration.
  - Removed and replaced APIs

| Then                                                          | Now                                                                           |
|---------------------------------------------------------------|-------------------------------------------------------------------------------|
| MoEInitializer.initialize(Context, MoEngage.Builder)          | MoEInitializer.initialiseDefaultInstance(Context, MoEngage.Builder)           |
| MoEInitializer.initialize(Context, MoEngage.Builder, Boolean) | MoEInitializer.initialiseDefaultInstance(Context, MoEngage.Builder, SdkState) |

- iOS

| Then                                                                                                                                           | Now                                                                                                                                       |
|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| - (void)initializeMoEngageSDKWithConfig:(MOSDKConfig*)sdkConfig andLaunchOptions:(NSDictionary*)launchOptions;                                 | - (void)initializeDefaultSDKConfig:(MOSDKConfig*)sdkConfig andLaunchOptions:(NSDictionary*)launchOptions;                                 |
| - (void)initializeMoEngageSDKWithConfig:(MOSDKConfig*)sdkConfig withSDKState:(BOOL)isSdkEnabled andLaunchOptions:(NSDictionary*)launchOptions; | - (void)initializeDefaultSDKConfig:(MOSDKConfig*)sdkConfig withSDKState:(BOOL)isSdkEnabled andLaunchOptions:(NSDictionary*)launchOptions; |

### 7.3.3 (25-07-2022)
- Device identifier tracking update as per Google's User Data policy. Advertising Id is only tracked after user consent.
- Native Android SDK updated to support version `11.6.02`.

### 7.3.1(29-04-2022)
- iOS 
    - BugFix
      - Fixed the appearance of thin grey line above the label in the InApp when displayed in larger screen devices.

### 7.3.0 (16-09-2021)
- HTML InApp Support Added.
- iOS 
    - Native SDK version updated to `~>7.1.0`.
    - Base plugin version dependency updated to `~>2.1.0`.
- Android
    - Native SDK updated to support version `11.4.00` and above.

### 7.2.0 (11-05-2021)
- Android Multi-Instance Phase 1 update.

### 7.1.1 (31-03-2021)
- iOS
   -  Added support to explicitly initialize the plugin instead of the default Info.plist initialization.

### 7.0.0 (26-02-2021)
- iOS
   -  Support added for Native iOS SDK version `7.0` and above.
   -  iOS Base plugin version dependency updated to `~>2.0.1`.
- Android 
    - Android Native SDK updated to support version `11.0.04` and above.
    - Update the payload structure for Push APIs.
- Added APIs to enable/disable SDK.
- Added push token generated callback listener.

### 6.1.4 (16-02-2021)
- Android artifacts use manven central instead of Jcenter.
    - Android Native SDK version 10.6.01
    - Android Plugin Base 1.2.01

### 6.1.3 (18-01-2021)
- iOS Base plugin version dependency updated to `~>1.2`.

### 6.1.2 (07-12-2020)
- Android Base plugin update for enabling native callback extension.
- Android Native SDK updated to `10.5.00`

### 6.1.1 (23-10-2020)
- Bugfix
    - iOS 
        - Payload sent in callback was incorrect, it was sent inside another "payload" key earlier.
    - Android
        - Events not being marked as non-interactive on Android

### 6.1.0 (21-09-2020)
- Android 
    - SDK updated to `10.4.00`
    - Migration to androidx namespace. 
    - Plugin Base updated to `1.1.00` 

### 6.0.00 (18-09-2020)
- MOEN-1588: Javascript methods for GDPR opt outs in Cordova
- MOEN-8342: Cordova SDK Update
- Removed APIs

|                                           Then                                           	|                                                       Now                                                      	|
|:----------------------------------------------------------------------------------------:	|:--------------------------------------------------------------------------------------------------------------:	|
| MoECordova#passToken(token)                                                              	| MoECardova#passFcmToken(token)                                                                                 	|
| MoECordova#pushPayload(pushPayload)                                                      	| MoECordova#passFcmPayload(pushPayload)                                                                         	|
| MoECordova#setExistingUser(isExisting)                                                   	| MoECordova#setAppStatus(status)                                                                                	|
| MoECordova#trackEvent(eventName, eventAttributes)                                        	| MoECordova#trackEvent(eventName, generalAttributes, locationAttributes, dataTimeAttributes , isNonInteractive) 	|
| MoECordova#setLogLevelForAndroid(loglevel)/setLogLevelForiOS(loglevel)                                               	| MoECordova#enableSDKLogs()                                                                                     	|
| MoECordova#setUserAttributeLocation(attributeName, attributeLatValue, attributeLonValue) 	| MoECordova#setUserLocation(latitude, longitude)                                                                	|
| MoECordova#setUserAttributeTimestamp(attributeName, epochTimeStampVal)                   	| MoECordova#setUserAttributeISODateString(attributeName, date)

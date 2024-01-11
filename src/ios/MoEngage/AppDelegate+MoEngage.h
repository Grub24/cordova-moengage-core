
//
//  AppDelegate+MoEngage.h
//  MoEngage
//
//  Created by Chengappa C D on 18/08/2016.
//  Copyright MoEngage 2016. All rights reserved.
//

#import "AppDelegate.h"
@import MoEngageSDK;
@import MoEngagePluginBase;

@interface AppDelegate (MoEngageCordova) <MoEngagePluginBridgeDelegate>

/// Initialization Methods to setup SDK with MOSDKConfig instance instead of from Info.plist file
/// @param sdkConfig MOSDKConfig instance for SDK configuration
/// @param launchOptions Launch Options dictionary
/// @warning Make sure to call only one of the initialization methods available (set DISABLE_PLIST_INITIALIZATION to true under MoEngage dict in info.plist)
/// @version 7.1.1 and above
- (void)initializeDefaultSDKConfig:(MoEngageSDKConfig*)sdkConfig andLaunchOptions:(NSDictionary*)launchOptions;

/// Initialization Methods to setup SDK with MOSDKConfig instance instead of from Info.plist file
/// @param sdkConfig MOSDKConfig instance for SDK configuration
/// @param isSdkEnabled Bool indicating if SDK is Enabled/Disabled, refer (link)[https://docs.moengage.com/docs/gdpr-compliance-1#enabledisable-sdk] for more info
/// @param launchOptions Launch Options dictionary
/// @warning Make sure to call only one of the initialization methods available (set DISABLE_PLIST_INITIALIZATION to true under MoEngage dict in info.plist)
/// @version 7.1.1 and above
- (void)initializeDefaultSDKConfig:(MoEngageSDKConfig*)sdkConfig withSDKState:(BOOL)isSdkEnabled andLaunchOptions:(NSDictionary*)launchOptions __deprecated_msg("Use initializeDefaultSDKConfig:withMoEngageSDKState:andLaunchOptions: instead.");

/// Initialization Methods to setup SDK with MOSDKConfig instance instead of from Info.plist file
/// @param sdkConfig MOSDKConfig instance for SDK configuration
/// @param sdkState Enum indicating if SDK is Enabled/Disabled
/// @param launchOptions Launch Options dictionary
/// @version 8.1.0 and above
- (void)initializeDefaultSDKConfig:(MoEngageSDKConfig*)sdkConfig withMoEngageSDKState:(MoEngageSDKState)sdkState andLaunchOptions:(NSDictionary*)launchOptions;
@end
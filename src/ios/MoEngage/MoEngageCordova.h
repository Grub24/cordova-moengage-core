
//
//  MoEngageCordova.h
//  MoEngage
//
//  Created by Chengappa C D on 27/07/2016.
//  Copyright MoEngage 2016. All rights reserved.
//

#import <Cordova/CDVPlugin.h>

@interface MoEngageCordova : CDVPlugin

@property (nonatomic, copy) NSString *callbackId;

- (void)appStatus:(CDVInvokedUrlCommand*)command;
- (void)trackEvent:(CDVInvokedUrlCommand*)command;
- (void)setUserAttribute:(CDVInvokedUrlCommand*)command;
- (void)setAlias:(CDVInvokedUrlCommand*)command;
- (void)logout:(CDVInvokedUrlCommand*)command;

- (void)showInApp:(CDVInvokedUrlCommand*)command;
- (void)selfHandledInApp:(CDVInvokedUrlCommand*)command;
- (void)selfHandledCallback:(CDVInvokedUrlCommand*)command;
- (void)appContext:(CDVInvokedUrlCommand*)command;
- (void)resetAppContext:(CDVInvokedUrlCommand*)command;

- (void)optOutTracking:(CDVInvokedUrlCommand*)command;
- (void)registerForPushNotification:(CDVInvokedUrlCommand*)command;
- (void)enableSDKLogs:(CDVInvokedUrlCommand*)command;

- (void)passToken:(CDVInvokedUrlCommand*)command;
- (void)passPayload:(CDVInvokedUrlCommand*)command;
- (void)deviceIdentifierTrackingStatusUpdate:(CDVInvokedUrlCommand*)command;
- (void)setUpNotificationChannels:(CDVInvokedUrlCommand*)command;
- (void)permissionResponse:(CDVInvokedUrlCommand*)command;
- (void)navigateToSettings:(CDVInvokedUrlCommand*)command;
- (void)requestPushPermission:(CDVInvokedUrlCommand*)command;
- (void)updatePushPermissionRequestCount:(CDVInvokedUrlCommand*)command;
@end



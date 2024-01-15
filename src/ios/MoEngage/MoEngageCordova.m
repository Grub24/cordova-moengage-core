
//
//  MoEngageCordova.m
//  MoEngage
//
//  Created by Chengappa C D on 27/07/2016.
//  Copyright MoEngage 2016. All rights reserved.
//

#import "MoEngageCordova.h"
#import "MoEngageCordovaConstants.h"
@import MoEngageSDK;
@import MoEngagePluginBase;

@implementation MoEngageCordova


- (void)init:(CDVInvokedUrlCommand*)command;
{
    [self.commandDelegate runInBackground:^ {
        NSLog(@"MoEngageCordova register called");
        self.callbackId = command.callbackId;
        if ([self isArgumentsPresent:command]) {
            NSDictionary* accountMeta = [command.arguments objectAtIndex:0];
            if (accountMeta != nil) {
                [[MoEngagePluginBridge sharedInstance] pluginInitialized: accountMeta];
            }
        }
    }];
}

-(BOOL)isArgumentsPresent:(CDVInvokedUrlCommand*)command {
    return command.arguments.count >=1;
}

#pragma mark- Set AppStatus INSTALL/UPDATE

- (void)appStatus:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent:command]) {
            NSMutableDictionary* appStatusDict = [command.arguments objectAtIndex:0];
            if (appStatusDict != nil) {
                if (appStatusDict[kData][kAppStatus] != nil) {
                    appStatusDict[kData][kAppStatus] = [appStatusDict[kData][kAppStatus] uppercaseString];
                }
                [[MoEngagePluginBridge sharedInstance] setAppStatus:appStatusDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"App Status tracked"];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"App Status payload was null"];
            }
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark- Track Event

- (void)trackEvent:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent:command]) {
            NSDictionary* trackEventDict = [command.arguments objectAtIndex:0];
            if (trackEventDict != nil) {
                [[MoEngagePluginBridge sharedInstance] trackEvent: trackEventDict];
                NSString* message = [NSString stringWithFormat:@"%@ tracked", trackEventDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Event payload was null"];
            }
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark- Set User Attributes

- (void)setUserAttribute:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent:command]) {
            NSDictionary* userAttributeDict = [command.arguments objectAtIndex:0];
            if (userAttributeDict!=nil) {
                [[MoEngagePluginBridge sharedInstance] setUserAttribute:userAttributeDict];
                NSString* message = [NSString stringWithFormat:@"User attribute tracked %@", userAttributeDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
            }
            else{
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"User Attribute value was null"];
            }
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)setAlias:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent:command]) {
            NSDictionary* aliasDict = [command.arguments objectAtIndex:0];
            if (aliasDict != nil) {
                [[MoEngagePluginBridge sharedInstance] setAlias:aliasDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Set Alias used to update User Attribute Unique ID"];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Alias argument not sent correctly"];
            }
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark- Reset method
- (void)logout:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent: command]) {
            NSDictionary* resetDict = [command.arguments objectAtIndex:0];
            if (resetDict != nil) {
                [[MoEngagePluginBridge sharedInstance] resetUser:resetDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"logout argument not sent correctly"];
            }
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark- Push Registration
- (void)registerForPushNotification:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        [[MoEngagePluginBridge sharedInstance] registerForPush];
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark- Show InApp method
- (void)showInApp:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent: command]) {
            NSDictionary* inappDict = [command.arguments objectAtIndex:0];
            if (inappDict != nil) {
                [[MoEngagePluginBridge sharedInstance] showInApp:inappDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"show inapp argument not sent correctly"];
            }
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)selfHandledInApp:(CDVInvokedUrlCommand*)command{
    NSDictionary* selfHandledDict = [command.arguments objectAtIndex:0];
    [[MoEngagePluginBridge sharedInstance] getSelfHandledInApp: selfHandledDict];
}

- (void)selfHandledCallback:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent: command]) {
            NSDictionary* selfHandledDict = [command.arguments objectAtIndex:0];
            if (selfHandledDict != nil) {
                [[MoEngagePluginBridge sharedInstance] updateSelfHandledImpression:selfHandledDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Self Handled Callback called successfully"];
            }
            else{
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Self Handled Callback argument not sent correctly"];
            }
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)appContext:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent: command]) {
            NSDictionary* appContextDict = [command.arguments objectAtIndex:0];
            if (appContextDict != nil) {
                [[MoEngagePluginBridge sharedInstance] setInAppContext:appContextDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Set InApp Context called successfully"];
            }
            else{
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Set InApp Context argument not sent correctly"];
            }
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)resetAppContext:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent: command]) {
            NSDictionary* contextDict = [command.arguments objectAtIndex:0];
            if (contextDict != nil) {
                [[MoEngagePluginBridge sharedInstance] resetInAppContext:contextDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"reset app context argument not sent correctly"];
            }
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


#pragma mark- OptOut methods

- (void)optOutTracking:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent: command]) {
            NSDictionary* optOutDict = [command.arguments objectAtIndex:0];
            if (optOutDict != nil) {
                [[MoEngagePluginBridge sharedInstance] optOutDataTracking:optOutDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"OptOut Tracking called successfully"];
            }
            else{
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"OptOut Tracking argument not sent correctly"];
            }
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark- Unused methods

- (void)passToken:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        NSString* message = @"Not available for iOS";
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)passPayload:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        NSString* message = @"Not available for iOS";
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)deviceIdentifierTrackingStatusUpdate:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        NSString* message = @"Not available for iOS";
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)setUpNotificationChannels:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        NSString* message = @"Not available for iOS";
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)permissionResponse:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        NSString* message = @"Not available for iOS";
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)navigateToSettings:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        NSString* message = @"Not available for iOS";
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)requestPushPermission:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        NSString* message = @"Not available for iOS";
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)updatePushPermissionRequestCount:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        NSString* message = @"Not available for iOS";
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark- Enable/Disable SDK

- (void)updateSDKState:(CDVInvokedUrlCommand*)command{
    [self.commandDelegate runInBackground:^{
        __block CDVPluginResult* pluginResult = nil;
        if ([self isArgumentsPresent: command]) {
            NSDictionary* sdkStateDict = [command.arguments objectAtIndex:0];
            if (sdkStateDict != nil) {
                [[MoEngagePluginBridge sharedInstance] updateSDKState:sdkStateDict];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"SDK Status tracked"];
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"update sdk state argument not sent correctly"];
            }
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Insufficient arguments"];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }];
}

@end

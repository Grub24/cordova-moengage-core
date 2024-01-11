
//
//  AppDelegate+MoEngage.m
//  MoEngage
//
//  Created by Chengappa C D on 18/08/2016.
//  Copyright MoEngage 2016. All rights reserved.
//


#import "AppDelegate+MoEngage.h"
#import <objc/runtime.h>
#import "MoEngageCordova.h"
#import "MoEngageCordovaConstants.h"
@import MoEngagePluginBase;
@import MoEngageSDK;
@import MoEngageObjCUtils;

@implementation AppDelegate (MoEngageCordova)

#pragma mark- Application LifeCycle methods

- (void)initializeDefaultSDKConfig:(MoEngageSDKConfig*)sdkConfig andLaunchOptions:(NSDictionary*)launchOptions {
    [self initializeDefaultInstanceWithSdkConfig: sdkConfig andLaunchOptions:launchOptions];
}

- (void)initializeDefaultSDKConfig:(MoEngageSDKConfig*)sdkConfig withSDKState:(BOOL)isSdkEnabled andLaunchOptions:(NSDictionary*)launchOptions {
    MoEngageSDKState currentSDKState = isSdkEnabled ? MoEngageSDKStateEnabled: MoEngageSDKStateDisabled;
    [self initializeDefaultSDKConfig:sdkConfig withMoEngageSDKState:currentSDKState andLaunchOptions:launchOptions];
}

- (void)initializeDefaultInstanceWithSdkConfig:(MoEngageSDKConfig*)sdkConfig andLaunchOptions:(NSDictionary*)launchOptions {
    if (sdkConfig.appId == nil || sdkConfig == nil)
    {
        return;
    }
    MoEngagePlugin *plugin = [[MoEngagePlugin alloc] init];
    [plugin initializeDefaultInstanceWithSdkConfig:sdkConfig launchOptions:launchOptions];
    [plugin trackPluginInfo:kCordova version: SDKVersion];
    [[MoEngagePluginBridge sharedInstance] setPluginBridgeDelegate:self identifier: sdkConfig.appId];
}

- (void)initializeDefaultSDKConfig:(MoEngageSDKConfig*)sdkConfig withMoEngageSDKState:(MoEngageSDKState)sdkState andLaunchOptions:(NSDictionary*)launchOptions {
    if (sdkConfig.appId == nil || sdkConfig == nil)
    {
        return;
    }
    MoEngagePlugin *plugin = [[MoEngagePlugin alloc] init];
    [plugin initializeDefaultInstanceWithSdkConfig:sdkConfig sdkState:sdkState launchOptions:launchOptions];
    [plugin trackPluginInfo:kCordova version: SDKVersion];
    [[MoEngagePluginBridge sharedInstance] setPluginBridgeDelegate:self identifier: sdkConfig.appId];
}

#pragma mark- Utility methods

- (id) getCommandInstance:(NSString*)className
{
    return [self.viewController getCommandInstance:className];
}

- (void)sendMessageWithEvent:(NSString *)event message:(NSDictionary<NSString *,id> *)message {
    MoEngageCordova* cordovaHandler = [self getCommandInstance: kMoEngage];
    
    if (cordovaHandler) {
        NSMutableDictionary* dictionary;
        if (message) {
            dictionary = [[NSMutableDictionary alloc] initWithDictionary:message];
        }
        else{
            dictionary = [NSMutableDictionary dictionary];
        }
        [dictionary setObject:event forKey: kType];
        
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictionary];
        [pluginResult setKeepCallbackAsBool:YES];
        [cordovaHandler.commandDelegate sendPluginResult:pluginResult callbackId:cordovaHandler.callbackId];
    }
}
@end
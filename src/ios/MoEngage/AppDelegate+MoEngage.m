
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

static AppDelegate* instance;

+ (AppDelegate*) instance {
    return instance;
}

+ (void)load {
        NSLog(@"MOENGE_G load");
    Method original = class_getInstanceMethod(self, @selector(application:didFinishLaunchingWithOptions:));
    Method swizzled = class_getInstanceMethod(self, @selector(application:swizzledMoeDidFinishLaunchingWithOptions:));
    method_exchangeImplementations(original, swizzled);
}

- (BOOL)application:(UIApplication *)application swizzledMoeDidFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
        NSLog(@"MOENGE_G swizzled load");
    [self application:application swizzledMoeDidFinishLaunchingWithOptions:launchOptions];
    NSString* plistPath = [[NSBundle mainBundle] pathForResource:@"Info" ofType:@"plist"];
    NSDictionary *myDict = [[NSDictionary alloc] initWithContentsOfFile: plistPath];
    NSString* appid = myDict[@"MoengageAppID"];
    NSString* datacenter = myDict[@"MoengageDataCenter"];

    MoEngageDataCenter dc = MoEngageDataCenterData_center_01;
    
    NSArray *items = @[@"DATA_CENTER_1", @"DATA_CENTER_2", @"DATA_CENTER_3",@"DATA_CENTER_4",@"DATA_CENTER_5"];
    int item = [items indexOfObject:datacenter];
    switch (item) {
        case 0:
            dc = MoEngageDataCenterData_center_01;
           break;
        case 1:
            dc = MoEngageDataCenterData_center_02;
           break;
        case 2:
            dc = MoEngageDataCenterData_center_03;
           break;
        case 3:
            dc = MoEngageDataCenterData_center_04;
           break;
        default:
            dc = MoEngageDataCenterData_center_05;
           break;
    }
    NSTimeInterval delayInSeconds = 5.0;
    dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
    dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
    NSLog(@"Do some work");
        NSLog(@"DDDDDataCenter: %@",datacenter);    // dictionary lookup
        NSLog(@"MMMMMoengageAppID: %@",appid);    // dictionary lookup
        MoEngageSDKConfig *sdkConfig = [[MoEngageSDKConfig alloc] initWithAppId:appid dataCenter:dc];
        sdkConfig.enableLogs = true;
        sdkConfig.appGroupID = @"group.com.group24.mobileapp.MoEngage";

        [self initializeDefaultSDKConfig:sdkConfig andLaunchOptions:launchOptions];
    });

    return YES;
}

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
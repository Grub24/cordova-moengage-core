package com.moengage.cordova;

import android.app.Application;
import android.util.Log;
import com.moengage.core.DataCenter;
import com.moengage.core.MoEngage;
import com.moengage.cordova.MoEInitializer;

import com.moengage.core.internal.logger.Logger;
import com.moengage.core.LogLevel;
import com.moengage.cordova.MoEConstants;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.content.res.Resources;

public class MoEngageSampleApplication extends Application {

  private static final String TAG = MoEConstants.MODULE_TAG + "Plugin";

  @Override public void onCreate(){
    super.onCreate();
      Resources res = getResources();
      int appid_id = res.getIdentifier("moe_app_id", "string", this.getPackageName());
      String appid = res.getString(appid_id);
      int datacenter_id = res.getIdentifier("moe_data_center", "string", this.getPackageName());
      String dc = res.getString(datacenter_id);

      DataCenter d;
      switch(dc) {
        case "DATA_CENTER_2":
          d = DataCenter.DATA_CENTER_2;
          break;
        case "DATA_CENTER_3":
          d = DataCenter.DATA_CENTER_3;
          break;
        case "DATA_CENTER_4":
          d = DataCenter.DATA_CENTER_4;
          break;
        case "DATA_CENTER_5":
          d = DataCenter.DATA_CENTER_5;
          break;
        case "DATA_CENTER_100":
          d = DataCenter.DATA_CENTER_100;
          break;
        default:
          d = DataCenter.DATA_CENTER_1;
      }

      
      Log.d( TAG ," INITILIZE MOENGAGE :)");
      Log.d( TAG ," APP ID  : "+appid);
      Log.d( TAG ," DataCenter : "+dc);
      MoEngage.Builder moEngage = new MoEngage.Builder(this,"CMPYE6MSESHFHBKPLIWI8YEP",d);
      MoEInitializer.initialiseDefaultInstance(this, moEngage);
    
  }
  
}
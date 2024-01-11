package com.moengage.cordova;

import com.moengage.core.internal.inapp.InAppManager;
import com.moengage.core.internal.logger.Logger;
import com.moengage.core.LogLevel;
import com.moengage.inapp.MoEInAppHelper;

/**
 * @author Arshiya Khanum
 */
public class MoECordovaHelper {

  private final String TAG = "MoECordovaHelper";
  private static MoECordovaHelper instance;

  public static MoECordovaHelper getInstance() {
    if (instance == null) {
      synchronized (MoECordovaHelper.class) {
        if (instance == null)
          instance = new MoECordovaHelper();
      }
    }
    return instance;
  }

  public void onConfigurationChanged() {
    Logger.print(() -> TAG + " onConfigurationChanged() : ");
    if (!InAppManager.INSTANCE.hasModule()) {
      Logger.print(() -> TAG + " onConfigurationChanged() : InApp module not found.");
      return;
    }
    MoEInAppHelper.getInstance().onConfigurationChanged();
  }
}

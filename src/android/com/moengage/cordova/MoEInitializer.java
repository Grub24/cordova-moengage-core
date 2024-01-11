/*
 * Copyright (c) 2014-2021 MoEngage Inc.
 *
 * All rights reserved.
 *
 *  Use of source code or binaries contained within MoEngage SDK is permitted only to enable use
 * of the MoEngage platform by customers of MoEngage.
 *  Modification of source code and inclusion in mobile apps is explicitly allowed provided that
 * all other conditions are met.
 *  Neither the name of MoEngage nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *  Redistribution of source code or binaries is disallowed except with specific prior written
 * permission. Any such redistribution must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 *  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 *  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

package com.moengage.cordova;

import android.content.Context;
import com.moengage.core.LogLevel;
import com.moengage.core.MoEngage;
import com.moengage.core.internal.logger.Logger;
import com.moengage.core.internal.model.IntegrationMeta;
import com.moengage.cordova.MoEConstants;
import com.moengage.core.model.SdkState;
import com.moengage.plugin.base.internal.PluginInitializer;

public class MoEInitializer {

  private static final String TAG = MoEConstants.MODULE_TAG + "MoEInitializer";

  /**
   * Initialise the default instance of SDK with configuration provided in
   * [MoEngage.Builder]
   *
   * @param builder Instance of [MoEngage.Builder]
   */
  public static void initialiseDefaultInstance(Context context, MoEngage.Builder builder) {
    try {
      Logger.print(() -> TAG + " initialiseDefaultInstance() : Will try to initialize the sdk");

      PluginInitializer.INSTANCE.initialize(
          builder,
          new IntegrationMeta(MoEConstants.INTEGRATION_TYPE, MoEConstants.CORDOVA_PLUGIN_VERSION),
          SdkState.ENABLED);
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + " initialiseDefaultInstance() : ");
    }
  }

  /**
   * Initialise the default instance of SDK with configuration provided in
   * [MoEngage.Builder] and
   * SDK state, i.e. whether the SDK should be in enabled or disabled state.
   *
   * By default the SDK is enabled. Use this API only if you have a requirement to
   * enable/disable SDK, else use [MoEngage.initialiseDefaultInstance].
   *
   * **Note:** State is persisted across session, once the SDK is disabled it will
   * remain
   * in disabled state until enabled again.
   */
  public static void initialiseDefaultInstance(Context context, MoEngage.Builder builder, SdkState sdkState) {
    try {
      Logger.print(() -> TAG + " initialiseDefaultInstance() : Will try to initialize the sdk");

      PluginInitializer.INSTANCE.initialize(
          builder,
          new IntegrationMeta(MoEConstants.INTEGRATION_TYPE, MoEConstants.CORDOVA_PLUGIN_VERSION),
          sdkState);
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + " initialiseDefaultInstance() : ");
    }
  }
}
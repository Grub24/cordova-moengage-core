/*
 * Copyright (c) 2014-2022 MoEngage Inc.
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

import androidx.annotation.NonNull;
import com.moengage.core.LogLevel;
import com.moengage.core.internal.logger.Logger;
import com.moengage.plugin.base.internal.EventEmitter;
import com.moengage.plugin.base.internal.UtilsKt;
import com.moengage.plugin.base.internal.model.events.Event;
import com.moengage.plugin.base.internal.model.events.EventType;
import com.moengage.plugin.base.internal.model.events.inapp.InAppActionEvent;
import com.moengage.plugin.base.internal.model.events.inapp.InAppLifecycleEvent;
import com.moengage.plugin.base.internal.model.events.inapp.InAppSelfHandledEvent;
import com.moengage.plugin.base.internal.model.events.push.PermissionEvent;
import com.moengage.plugin.base.internal.model.events.push.PushClickedEvent;
import com.moengage.plugin.base.internal.model.events.push.TokenEvent;
import java.util.EnumMap;
import org.json.JSONObject;

import static com.moengage.plugin.base.internal.InAppMapperKt.clickDataToJson;
import static com.moengage.plugin.base.internal.InAppMapperKt.inAppDataToJson;
import static com.moengage.plugin.base.internal.InAppMapperKt.selfHandledDataToJson;
import static com.moengage.plugin.base.internal.UtilsKt.permissionResultToJson;
import static com.moengage.plugin.base.internal.UtilsKt.tokenEventToJson;

public class EventEmitterImpl implements EventEmitter {

  private static final String TAG = MoEConstants.MODULE_TAG + "EventEmitterImpl";

  @Override
  public void emit(@NonNull Event event) {
    try {
      Logger.print(() -> TAG + " emit() : " + event);
      if (event instanceof InAppActionEvent) {
        this.emitInAppActionEvent((InAppActionEvent) event);
      } else if (event instanceof InAppLifecycleEvent) {
        this.emitInAppLifeCycleEvent((InAppLifecycleEvent) event);
      } else if (event instanceof InAppSelfHandledEvent) {
        this.emitInAppSelfHandledEvent((InAppSelfHandledEvent) event);
      } else if (event instanceof PushClickedEvent) {
        this.emitPushEvent((PushClickedEvent) event);
      } else if (event instanceof TokenEvent) {
        this.emitPushTokenEvent((TokenEvent) event);
      } else if (event instanceof PermissionEvent) {
        this.emitPermissionEvent((PermissionEvent) event);
      }
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + "  emit() : Exception:  ");
    }
  }

  private void emitInAppActionEvent(InAppActionEvent inAppActionEvent) {
    try {
      Logger.print(() -> TAG
          + " emitInAppActionEvent() : inAppActionEvent: Type: "
          + inAppActionEvent.getEventType()
          + " clickedData : "
          + inAppActionEvent.getClickData());
      String eventType = eventMap.get(inAppActionEvent.getEventType());
      if (eventType == null) {
        return;
      }
      JSONObject campaign = clickDataToJson(inAppActionEvent.getClickData());
      emit(eventType, campaign);
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + " emitInAppActionEvent() : ");
    }
  }

  private void emitInAppLifeCycleEvent(InAppLifecycleEvent inAppLifecycleEvent) {
    try {
      Logger.print(() -> TAG
          + " emitInAppLifeCycleEvent() : inAppLifecycleEvent: Type: "
          + inAppLifecycleEvent.getEventType()
          + " inAppData : "
          + inAppLifecycleEvent.getInAppData());
      String eventType = eventMap.get(inAppLifecycleEvent.getEventType());
      if (eventType == null) {
        return;
      }
      JSONObject campaign = inAppDataToJson(inAppLifecycleEvent.getInAppData());
      emit(eventType, campaign);
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + " emitInAppLifeCycleEvent() : ");
    }
  }

  private void emitInAppSelfHandledEvent(InAppSelfHandledEvent inAppSelfHandledEvent) {
    try {
      Logger.print(() -> TAG
          + " emitInAppSelfHandledEvent() : inAppLifecycleEvent: data: "
          + inAppSelfHandledEvent.getData());
      String eventType = eventMap.get(inAppSelfHandledEvent.getEventType());
      if (eventType == null) {
        return;
      }
      JSONObject campaign = selfHandledDataToJson(inAppSelfHandledEvent.getData());
      emit(eventType, campaign);
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + " emitInAppSelfHandledEvent() : ");
    }
  }

  private void emitPushEvent(PushClickedEvent pushEvent) {
    try {
      Logger.print(() -> TAG + " emitPushEvent() : pushEvent: " + pushEvent);
      String eventType = eventMap.get(pushEvent.getEventType());
      if (eventType == null) {
        return;
      }
      JSONObject payload = UtilsKt.pushPayloadToJson(pushEvent.getPayload());
      emit(eventType, payload);
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + " emitPushEvent() : ");
    }
  }

  private void emitPushTokenEvent(TokenEvent tokenEvent) {
    try {
      Logger.print(() -> TAG + " emitPushTokenEvent() : " + tokenEvent);
      String eventType = eventMap.get(tokenEvent.getEventType());
      if (eventType == null) {
        return;
      }
      JSONObject payload = tokenEventToJson(tokenEvent);
      emit(eventType, payload);
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + " emitPushTokenEvent() : ");
    }
  }

  private void emitPermissionEvent(PermissionEvent event) {
    try {
      Logger.print(() -> TAG + " emitPermissionEvent() :  permission event: " + event);
      String eventType = eventMap.get(event.getEventType());
      JSONObject payload = permissionResultToJson(event.getResult());
      emit(eventType, payload);
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + " emitPermissionEvent() : ");
    }
  }

  private void emit(String eventType, JSONObject payload) {
    try {
      payload.put(MoEConstants.KEY_TYPE, eventType);
      MoECordova.sendEvent(payload);
    } catch (Throwable t) {
      Logger.print(LogLevel.ERROR, t, () -> TAG + " emit() : ");
    }
  }

  private static EnumMap<EventType, String> eventMap = new EnumMap<>(EventType.class);

  static {
    eventMap.put(EventType.PUSH_CLICKED, "MoEPushClicked");
    eventMap.put(EventType.INAPP_SHOWN, "MoEInAppCampaignShown");
    eventMap.put(EventType.INAPP_NAVIGATION, "MoEInAppCampaignClicked");
    eventMap.put(EventType.INAPP_CLOSED, "MoEInAppCampaignDismissed");
    eventMap.put(EventType.INAPP_CUSTOM_ACTION, "MoEInAppCampaignCustomAction");
    eventMap.put(EventType.INAPP_SELF_HANDLED_AVAILABLE, "MoEInAppCampaignSelfHandled");
    eventMap.put(EventType.PUSH_TOKEN_GENERATED, "MoEPushTokenGenerated");
    eventMap.put(EventType.PERMISSION, "MoEOnPermissionResult");
  }
}

package com.wiggle.app;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Arrays;
import java.util.Enumeration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import android.annotation.SuppressLint;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.twilio.conversations.Attributes;
import com.twilio.conversations.CallbackListener;
import com.twilio.conversations.Conversation;
import com.twilio.conversations.Message;
import com.twilio.conversations.Participant;

import org.json.JSONException;

public class Conversations extends ReactContextBaseJavaModule implements ConversationsManagerListener {
    public final static String TAG = "TwilioConversations";

    private final ConversationsManager conversationsManager = new ConversationsManager();
    Conversations(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "Conversations";
    }

    @ReactMethod()
    public void initializeWithAccessToken(String accessToken) {
        Log.d("AccessToken", "accessToken: " + accessToken);
        conversationsManager.setListener(this);
        conversationsManager.initializeWithAccessToken(this.getReactApplicationContext(), accessToken);
    }

    @ReactMethod()
    public void joinConversationWith(String participantId) {
        Log.d("participantId", "participantId: " + participantId);
        conversationsManager.joinConversationWith(participantId);
    }

    @ReactMethod()
    public void setAllMessageRead(String name, String status) {
        conversationsManager.setAllMessageRead();
    }

    @ReactMethod()
    public void sendComment(String message, String storyId) {
        Log.d("message", "message: " + message);
        conversationsManager.updateComment(message, storyId);
    }

    @ReactMethod()
    public void sendMessage(String message) {
        Log.d("message", "message: " + message);
        conversationsManager.sendMessage(message);
    }

    @ReactMethod()
    public void sendMessageWithImage(String storyId, String storyImgUrl) {
        conversationsManager.sendMessageWithImage(storyId, storyImgUrl);
    }

    @ReactMethod()
    public void sendEventMessage(String pathId) {
        conversationsManager.sendEventMessage(pathId);
    }

    @SuppressLint("NewApi")
    @ReactMethod()
    public void getConnectionsAndLastMessage() {
        WritableArray params = Arguments.createArray();
        WritableMap allData = Arguments.createMap();

        if (conversationsManager.conversationsClient.getMyConversations() == null) {
            sendEvent(this.getReactApplicationContext(), "GetConnectionsAndLastMessage", allData);
        } else {
            for (Conversation conversation : conversationsManager.conversationsClient.getMyConversations()) {
                WritableMap temp = Arguments.createMap();
                temp.putString("conversationId", conversation.getSid());
                for (Participant participant : conversation.getParticipantsList()) {
                    if (!participant.getIdentity().equals(conversationsManager.conversationsClient.getMyIdentity())) {
                        temp.putString("participantId", participant.getIdentity().replace("_staging", ""));

                    }
                }

                params.pushMap(temp);
            }
            allData.putArray("allData", params);
            sendEvent(this.getReactApplicationContext(), "GetConnectionsAndLastMessage", allData);
        }
    }

    @Override
    public void receivedNewMessage(Message message) {

        sendEvent(Conversations.this.getReactApplicationContext(), "ReceivedMessageStatus", prepareEmitterData(message));

    }

    @Override
    public void messageSentCallback() {

    }

    @Override
    public void reloadMessages(ArrayList<Message> messages) {
        WritableArray params = Arguments.createArray();

        for (Message message : messages) {


            params.pushMap(prepareEmitterData(message));
        }

        WritableMap allMessages = Arguments.createMap();
        allMessages.putArray("allMessages", params);

        sendEvent(this.getReactApplicationContext(), "PreviousMessages", allMessages);

    }

    @Override
    public void joinStatusReminder(String status) {
        WritableMap params = Arguments.createMap();
        params.putString("eventProperty", status);
        sendEvent(this.getReactApplicationContext(), "JoinEventReminder", params);
    }

    @Override
    public void conversationClientStatusReminder(String status) {
        WritableMap params = Arguments.createMap();
        params.putString("eventProperty", status);
        sendEvent(this.getReactApplicationContext(), "ConversationClientStatusReminder", params);
    }

    @Override
    public void accessTokenAboutToExpire(String status) {
        WritableMap params = Arguments.createMap();
        params.putString("eventProperty", status);
        sendEvent(this.getReactApplicationContext(), "AccessTokenAboutToExpireReminder", params);
    }

    @Override
    public void accessTokenExpired(String status) {
        WritableMap params = Arguments.createMap();
        params.putString("eventProperty", status);
        sendEvent(this.getReactApplicationContext(), "AccessTokenExpiredReminder", params);
    }

    @Override
    public void sendMessageStatus(Message message) {

        sendEvent(this.getReactApplicationContext(), "SendMessageStatus", prepareEmitterData(message));
    }

    @Override
    public void sendMessageWithImageStatus(Message message) {

        sendEvent(this.getReactApplicationContext(), "SendMessageWithImageStatus", prepareEmitterData(message));
    }

    @Override
    public void createdCommentStatus(Message message) {

        sendEvent(this.getReactApplicationContext(), "CreatedCommentStatus", prepareEmitterData(message));
    }

    @Override
    public void sendEventStatus(Message message) {

        sendEvent(this.getReactApplicationContext(), "SendEventMessageStatus", prepareEmitterData(message));
    }

    @Override
    public void createdConversationWithParticipant() {
        WritableMap params = Arguments.createMap();
        params.putString("status", "success");
        sendEvent(this.getReactApplicationContext(), "CreatedConversationWithParticipant", params);
    }

    public void fetchImageStatus(Message message, String result) {
        WritableMap params = Arguments.createMap();

        params.putString("id", message.getSid());
        params.putString("user", message.getAuthor().replace("_staging", ""));
        params.putString("message", message.getBody());
        params.putString("image", result);

        sendEvent(this.getReactApplicationContext(), "FetchImageReminder", params);
    }

    public WritableMap prepareEmitterData(Message message) {
        WritableMap temp = Arguments.createMap();
        temp.putString("id", message.getSid());
        temp.putString("user", message.getAuthor().replace("_staging", ""));
        temp.putString("message", message.getBody());
        temp.putString("createdAt", message.getDateCreated());
        temp.putString("updatedAt", message.getDateUpdated());

        if (message.getAttributes().getJSONObject().length() > 0) {
            try {

                if (message.getAttributes().getJSONObject().get("category") == "event") {
                    temp.putString("eventId", (String) message.getAttributes().getJSONObject().get("event_id"));
                    temp.putString("storyId", "");
                    temp.putString("storyImgUrl", "");
                    temp.putString("category", (String) message.getAttributes().getJSONObject().get("category"));
                } else {
                    if (((String)message.getAttributes().getJSONObject().get("category")).contains("story")) {
                        temp.putString("eventId", "");
                        temp.putString("storyId", (String) message.getAttributes().getJSONObject().get("story_id"));
                        temp.putString("storyImgUrl", (String) message.getAttributes().getJSONObject().get("story_img_url"));
                        temp.putString("category", (String) message.getAttributes().getJSONObject().get("category"));
                    } else {
                        if (!message.getAttributes().getJSONObject().isNull("story_id")) {
                            temp.putString("eventId", "");
                            temp.putString("storyId", (String) message.getAttributes().getJSONObject().get("story_id"));
                            temp.putString("storyImgUrl", "");
                            temp.putString("category", (String) message.getAttributes().getJSONObject().get("category"));
                        } else {
                            temp.putString("eventId", "");
                            temp.putString("storyId", "");
                            temp.putString("storyImgUrl", "");
                            temp.putString("category", "");
                        }

                    }

                }


            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
        } else {
            temp.putString("eventId", "");
            temp.putString("storyId", "");
            temp.putString("storyImgUrl", "");
            temp.putString("category", "");
        }

        return temp;
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}

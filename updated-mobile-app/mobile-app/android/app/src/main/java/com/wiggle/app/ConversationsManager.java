package com.wiggle.app;

import android.content.Context;
import android.util.Base64;
import android.util.Log;

import com.google.gson.Gson;
import com.twilio.conversations.Attributes;
import com.twilio.conversations.CallbackListener;
import com.twilio.conversations.Conversation;
import com.twilio.conversations.ConversationListener;
import com.twilio.conversations.ConversationsClient;
import com.twilio.conversations.ConversationsClientListener;
import com.twilio.conversations.MediaUploadListener;
import com.twilio.util.ErrorInfo;
import com.twilio.conversations.Participant;
import com.twilio.conversations.Message;
import com.twilio.conversations.StatusListener;
import com.twilio.conversations.User;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

interface ConversationsManagerListener {
    void receivedNewMessage(Message message);
    void messageSentCallback();
    void reloadMessages(ArrayList<Message> messages);
    void joinStatusReminder(String status);
    void conversationClientStatusReminder(String status);
    void accessTokenAboutToExpire(String status);
    void accessTokenExpired(String status);
    void sendMessageStatus(Message message);
    void sendMessageWithImageStatus(Message message);
    void createdConversationWithParticipant();
    void createdCommentStatus(Message message);
    void sendEventStatus(Message message);
}

interface TokenResponseListener {
    void receivedTokenResponse(boolean success, @Nullable Exception exception);
}

interface AccessTokenListener {
    void receivedAccessToken(@Nullable String token, @Nullable Exception exception);
}

public class ConversationsManager {
    private final static String DEFAULT_CONVERSATION_NAME = "general";

    final private ArrayList<Message> messages = new ArrayList<>();

    public ConversationsClient conversationsClient;

    private Conversation conversation;

    private ConversationsManagerListener conversationsManagerListener;

    private String tokenURL = "";

    private class TokenResponse {
        String token;
    }

    void retrieveAccessTokenFromServer(final Context context, String identity,
                                       final TokenResponseListener listener) {

        // Set the chat token URL in your strings.xml file
        String chatTokenURL = "context.getString(R.string.chat_token_url)";

        if ("https://YOUR_DOMAIN_HERE.twil.io/chat-token".equals(chatTokenURL)) {
            listener.receivedTokenResponse(false, new Exception("You need to replace the chat token URL in strings.xml"));
            return;
        }

        tokenURL = chatTokenURL + "?identity=" + identity;

        new Thread(new Runnable() {
            @Override
            public void run() {
                retrieveToken(new AccessTokenListener() {
                    @Override
                    public void receivedAccessToken(@Nullable String token,
                                                    @Nullable Exception exception) {
                        if (token != null) {
                            ConversationsClient.Properties props = ConversationsClient.Properties.newBuilder().createProperties();
                            ConversationsClient.create(context, token, props, mConversationsClientCallback);
                            listener.receivedTokenResponse(true,null);
                        } else {
                            listener.receivedTokenResponse(false, exception);
                        }
                    }
                });
            }
        }).start();
    }

    private void retrieveToken(AccessTokenListener listener) {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(tokenURL)
                .build();
        try (Response response = client.newCall(request).execute()) {
            String responseBody = "";
            if (response != null && response.body() != null) {
                responseBody = response.body().string();
            }
            Log.d(Conversations.TAG, "Response from server: " + responseBody);
            Gson gson = new Gson();
            TokenResponse tokenResponse = gson.fromJson(responseBody,TokenResponse.class);
            String accessToken = tokenResponse.token;
            Log.d(Conversations.TAG, "Retrieved access token from server: " + accessToken);
            listener.receivedAccessToken(accessToken, null);

        }
        catch (IOException ex) {
            Log.e(Conversations.TAG, ex.getLocalizedMessage(),ex);
            listener.receivedAccessToken(null, ex);
        }
    }

    void initializeWithAccessToken(final Context context, final String token) {

        ConversationsClient.Properties props = ConversationsClient.Properties.newBuilder().createProperties();
        ConversationsClient.create(context, token, props, mConversationsClientCallback);
    }

    void setAllMessageRead() {

        this.conversation.setAllMessagesUnread(new CallbackListener<Long>() {
            @Override
            public void onSuccess(Long result) {

            }
        });
    }

    void getConnectionsAndLastMessage() {
        if (conversationsClient == null || conversationsClient.getMyConversations() == null) {
            if (conversationsManagerListener != null) {
                conversationsManagerListener.joinStatusReminder("conversationClientFailed");
            }
        } else {

        }
    }

    void sendMessageWithImage(String storyId, String storyImgUrl) {
        if (conversation != null) {

            // Add story_id, story_img_url, category
            JSONObject tempMessageAttr = new JSONObject();
            try {
                tempMessageAttr.put("story_id", storyId);
                tempMessageAttr.put("story_img_url", storyImgUrl);
                tempMessageAttr.put("category", "story");
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
            Attributes messageAttr = new Attributes(tempMessageAttr);

            conversation.prepareMessage()
                    .setBody("Image")
                    .setAttributes(messageAttr)
                    .buildAndSend(new CallbackListener<Message>() {
                        @Override
                        public void onSuccess(Message message) {
                            Log.d(Conversations.TAG,"Message created");
                            conversationsManagerListener.sendMessageWithImageStatus(message);

                        }

                        @Override
                        public void onError(ErrorInfo errorInfo) {
                            Log.d(Conversations.TAG,"Error send message: " + errorInfo);
                        }
                    });
        }
    }

    void sendMessage(String messageBody) {
        if (conversation != null) {

            conversation.prepareMessage()
                    .setBody(messageBody)
                    .buildAndSend(new CallbackListener<Message>() {
                        @Override
                        public void onSuccess(Message message) {
                            Log.d(Conversations.TAG,"Message created");
                            conversation.setAllMessagesRead(new CallbackListener<Long>() {
                                @Override
                                public void onSuccess(Long result) {
                                    conversationsManagerListener.sendMessageStatus(message);
                                }
                            });
                        }

                        @Override
                        public void onError(ErrorInfo errorInfo) {
                            Log.d(Conversations.TAG,"Error send message: " + errorInfo);
                        }
                    });
        }
    }

    void sendEventMessage(String pathId) {
        if (conversation != null) {

            JSONObject tempMessageAttr = new JSONObject();
            try {
                tempMessageAttr.put("event_id", pathId);
                tempMessageAttr.put("category", "event");
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
            Attributes messageAttr = new Attributes(tempMessageAttr);

            conversation.prepareMessage()
                    .setBody("")
                    .setAttributes(messageAttr)
                    .buildAndSend(new CallbackListener<Message>() {
                        @Override
                        public void onSuccess(Message message) {
                            Log.d(Conversations.TAG,"Message created");
                            conversationsManagerListener.sendEventStatus(message);

                        }

                        @Override
                        public void onError(ErrorInfo errorInfo) {
                            Log.d(Conversations.TAG,"Error send message: " + errorInfo);
                        }
                    });
        }
    }

    void updateComment(String messageBody, String storyId) {
        if (conversation != null) {

            JSONObject tempMessageAttr = new JSONObject();
            try {
                tempMessageAttr.put("story_id", storyId);
                tempMessageAttr.put("category", "comment");
            } catch (JSONException e) {
                throw new RuntimeException(e);
            }
            Attributes messageAttr = new Attributes(tempMessageAttr);

            conversation.prepareMessage()
                    .setBody(messageBody)
                    .setAttributes(messageAttr)
                    .buildAndSend(new CallbackListener<Message>() {
                        @Override
                        public void onSuccess(Message message) {
                            Log.d(Conversations.TAG,"Message created");
                            conversationsManagerListener.createdCommentStatus(message);

                        }

                        @Override
                        public void onError(ErrorInfo errorInfo) {
                            Log.d(Conversations.TAG,"Error send message: " + errorInfo);
                        }
                    });
        }
    }

    private void loadChannels() {
        if (conversationsClient == null || conversationsClient.getMyConversations() == null) {
            if (conversationsManagerListener != null) {
                conversationsManagerListener.joinStatusReminder("conversationClientFailed");
            }
            return;
        }
        conversationsClient.getConversation(DEFAULT_CONVERSATION_NAME, new CallbackListener<Conversation>() {
            @Override
            public void onSuccess(Conversation conversation) {
                if (conversation != null) {
                    if (conversation.getStatus() == Conversation.ConversationStatus.JOINED
                            || conversation.getStatus() == Conversation.ConversationStatus.NOT_PARTICIPATING) {
                        Log.d(Conversations.TAG, "Already Exists in Conversation: " + DEFAULT_CONVERSATION_NAME);
                        ConversationsManager.this.conversation = conversation;
                        ConversationsManager.this.conversation.addListener(mDefaultConversationListener);
                        ConversationsManager.this.loadPreviousMessages(conversation);
                        conversationsManagerListener.joinStatusReminder("joined");
                    } else {
                        Log.d(Conversations.TAG, "Joining Conversation: " + DEFAULT_CONVERSATION_NAME);
                        joinConversation(conversation);
                    }
                }
            }

            @Override
            public void onError(ErrorInfo errorInfo) {
                Log.e(Conversations.TAG, "Error retrieving conversation: " + errorInfo.getMessage());
                createConversation();
            }

        });
    }

    void joinConversationWith(String participantId) {
       if (conversationsClient == null) {

        } else {
            if (conversationsClient.getMyConversations() != null) {

                for (Conversation conversation :
                        conversationsClient.getMyConversations()) {

                    if (conversation.getParticipantByIdentity(participantId+"_staging") != null) {
                        joinConversation(conversation);
                        return;
                    }
                }
                createConversation(participantId+"_staging");
            }
        }

    }

    private void createConversation() {
        Log.d(Conversations.TAG, "Creating Conversation: " + DEFAULT_CONVERSATION_NAME);

        conversationsClient.conversationBuilder().withUniqueName("").build(new CallbackListener<Conversation>() {
            @Override
            public void onSuccess(Conversation conversation) {
                if (conversation != null) {
                    Log.d(Conversations.TAG, "Joining Conversation: " + DEFAULT_CONVERSATION_NAME);
                    conversation.addParticipantByIdentity("test4", null, new StatusListener() {
                        @Override
                        public void onSuccess() {
                            Log.d(Conversations.TAG, "addParticipantByIdentity: ");
                        }

                        @Override
                        public void onError(ErrorInfo errorInfo) {
                            Log.d(Conversations.TAG, "ErrorInfo: " + errorInfo);
                        }
                    });
                    joinConversation(conversation);
                }
            }

            @Override
            public void onError(ErrorInfo errorInfo) {
                Log.e(Conversations.TAG, "Error creating conversation: " + errorInfo.getMessage());
            }
        });
    }

    private void createConversation(String participantId) {
        conversationsClient.conversationBuilder().withUniqueName(conversationsClient.getMyUser().getIdentity() + "-" + participantId).build(new CallbackListener<Conversation>() {
            @Override
            public void onSuccess(Conversation conversation) {
                if (conversation != null) {
                    Log.d(Conversations.TAG, "Joining Conversation: " + DEFAULT_CONVERSATION_NAME);
                    conversation.addParticipantByIdentity(participantId, null, new StatusListener() {
                        @Override
                        public void onSuccess() {
                            Log.d(Conversations.TAG, "addParticipantByIdentity: ");
                            conversationsManagerListener.createdConversationWithParticipant();
                        }

                        @Override
                        public void onError(ErrorInfo errorInfo) {
                            Log.d(Conversations.TAG, "ErrorInfo: " + errorInfo);
                        }
                    });
                    joinConversation(conversation);
                }
            }

            @Override
            public void onError(ErrorInfo errorInfo) {
                Log.e(Conversations.TAG, "Error creating conversation: " + errorInfo.getMessage());
                if (errorInfo.getCode() == 50353 ) {
                    conversationsClient.getConversation(conversationsClient.getMyUser().getIdentity() + "-" + participantId, new CallbackListener<Conversation>() {
                        @Override
                        public void onSuccess(Conversation conversation) {
                            if (conversation != null) {
                                if (conversation.getStatus() == Conversation.ConversationStatus.JOINED
                                        || conversation.getStatus() == Conversation.ConversationStatus.NOT_PARTICIPATING) {
                                    Log.d(Conversations.TAG, "Already Exists in Conversation: " + DEFAULT_CONVERSATION_NAME);
                                    ConversationsManager.this.conversation = conversation;
                                    ConversationsManager.this.conversation.addListener(mDefaultConversationListener);
                                    conversation.addParticipantByIdentity(participantId, null, new StatusListener() {
                                        @Override
                                        public void onSuccess() {
                                            Log.d(Conversations.TAG, "addParticipantByIdentity: ");
                                        }

                                        @Override
                                        public void onError(ErrorInfo errorInfo) {
                                            Log.d(Conversations.TAG, "ErrorInfo: " + errorInfo);
                                        }
                                    });
                                    joinConversation(conversation);
                                } else {
                                    Log.d(Conversations.TAG, "Joining Conversation: " + DEFAULT_CONVERSATION_NAME);
                                    joinConversation(conversation);
                                }
                            }
                        }

                        @Override
                        public void onError(ErrorInfo errorInfo) {
                            Log.e(Conversations.TAG, "Error retrieving conversation: " + errorInfo.getMessage());
                        }

                    });
                }
            }
        });

    }

    private void joinConversation(final Conversation conversation) {
        Log.d(Conversations.TAG, "Joining Conversation: " + conversation.getUniqueName());
        if (conversation.getStatus() == Conversation.ConversationStatus.JOINED) {

            ConversationsManager.this.conversation = conversation;
            Log.d(Conversations.TAG, "Already joined default conversation");
            ConversationsManager.this.conversation.addListener(mDefaultConversationListener);
            ConversationsManager.this.loadPreviousMessages(conversation);
            conversationsManagerListener.joinStatusReminder("joined");
            return;
        }


        conversation.join(new StatusListener() {
            @Override
            public void onSuccess() {
                ConversationsManager.this.conversation = conversation;
                Log.d(Conversations.TAG, "Joined default conversation");
                ConversationsManager.this.conversation.addListener(mDefaultConversationListener);
                ConversationsManager.this.loadPreviousMessages(conversation);
                conversationsManagerListener.joinStatusReminder("joined");
            }

            @Override
            public void onError(ErrorInfo errorInfo) {
                Log.e(Conversations.TAG, "Error joining conversation: " + errorInfo.getMessage());
                conversationsManagerListener.joinStatusReminder("joinConversationFailed");
            }
        });
    }

    private void loadPreviousMessages(final Conversation conversation) {
        conversation.getLastMessages(100,
                new CallbackListener<List<Message>>() {
                    @Override
                    public void onSuccess(List<Message> result) {
                        messages.clear();
                        messages.addAll(result);
                        if (conversationsManagerListener != null) {

                            conversationsManagerListener.reloadMessages(messages);
                        }
                    }

                    @Override
                    public void onError(ErrorInfo errorInfo) {
                        Log.e(Conversations.TAG, "Error: " + errorInfo.getMessage());
                        conversationsManagerListener.joinStatusReminder("joinConversationFailed");
                    }
                });
    }

    private final ConversationsClientListener mConversationsClientListener =
            new ConversationsClientListener() {

                @Override
                public void onConversationAdded(Conversation conversation) {

                }

                @Override
                public void onConversationUpdated(Conversation conversation, Conversation.UpdateReason updateReason) {

                }

                @Override
                public void onConversationDeleted(Conversation conversation) {

                }

                @Override
                public void onConversationSynchronizationChange(Conversation conversation) {

                }

                @Override
                public void onError(ErrorInfo errorInfo) {

                }

                @Override
                public void onUserUpdated(User user, User.UpdateReason updateReason) {

                }

                @Override
                public void onUserSubscribed(User user) {

                }

                @Override
                public void onUserUnsubscribed(User user) {

                }

                @Override
                public void onClientSynchronization(ConversationsClient.SynchronizationStatus synchronizationStatus) {
                    if (synchronizationStatus == ConversationsClient.SynchronizationStatus.COMPLETED) {
                        conversationsManagerListener.conversationClientStatusReminder("Success creating ConversationsClient");
                    }
                }

                @Override
                public void onNewMessageNotification(String s, String s1, long l) {

                }

                @Override
                public void onAddedToConversationNotification(String s) {

                }

                @Override
                public void onRemovedFromConversationNotification(String s) {

                }

                @Override
                public void onNotificationSubscribed() {

                }

                @Override
                public void onNotificationFailed(ErrorInfo errorInfo) {

                }

                @Override
                public void onConnectionStateChange(ConversationsClient.ConnectionState connectionState) {

                }

                @Override
                public void onTokenExpired() {
                    conversationsManagerListener.accessTokenExpired("TokenExpired");
                }

                @Override
                public void onTokenAboutToExpire() {
                    conversationsManagerListener.accessTokenAboutToExpire("TokenAboutToExpire");
                }
            };

    private final CallbackListener<ConversationsClient> mConversationsClientCallback =
            new CallbackListener<ConversationsClient>() {
                @Override
                public void onSuccess(ConversationsClient conversationsClient) {
                    ConversationsManager.this.conversationsClient = conversationsClient;
                    conversationsClient.addListener(ConversationsManager.this.mConversationsClientListener);
                    Log.d(Conversations.TAG, "Success creating Twilio Conversations Client");


                }

                @Override
                public void onError(ErrorInfo errorInfo) {
                    Log.e(Conversations.TAG, "Error creating Twilio Conversations Client: " + errorInfo.getMessage());
                    conversationsManagerListener.conversationClientStatusReminder("Error creating Twilio Conversations Client: " + errorInfo.getMessage());
                }
            };

    private final ConversationListener mDefaultConversationListener = new ConversationListener() {


        @Override
        public void onMessageAdded(final Message message) {
            Log.d(Conversations.TAG, "Message added");
            messages.add(message);
            if (conversationsManagerListener != null) {
                if (!message.getAuthor().equals(conversationsClient.getMyIdentity())) {
                    conversationsManagerListener.receivedNewMessage(message);
                }

            }
        }

        @Override
        public void onMessageUpdated(Message message, Message.UpdateReason updateReason) {
            Log.d(Conversations.TAG, "Message updated: " + message.getBody());
        }

        @Override
        public void onMessageDeleted(Message message) {
            Log.d(Conversations.TAG, "Message deleted");
        }

        @Override
        public void onParticipantAdded(Participant participant) {
            Log.d(Conversations.TAG, "Participant added: " + participant.getIdentity());
        }

        @Override
        public void onParticipantUpdated(Participant participant, Participant.UpdateReason updateReason) {
            Log.d(Conversations.TAG, "Participant updated: " + participant.getIdentity() + " " + updateReason.toString());
        }

        @Override
        public void onParticipantDeleted(Participant participant) {
            Log.d(Conversations.TAG, "Participant deleted: " + participant.getIdentity());
        }

        @Override
        public void onTypingStarted(Conversation conversation, Participant participant) {
            Log.d(Conversations.TAG, "Started Typing: " + participant.getIdentity());
        }

        @Override
        public void onTypingEnded(Conversation conversation, Participant participant) {
            Log.d(Conversations.TAG, "Ended Typing: " + participant.getIdentity());
        }

        @Override
        public void onSynchronizationChanged(Conversation conversation) {

        }
    };

    public ArrayList<Message> getMessages() {
        return messages;
    }

    public void setListener(ConversationsManagerListener listener)  {
        this.conversationsManagerListener = listener;
    }
}

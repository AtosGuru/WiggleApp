//
//  Conversations.m
//  Wiggle
//
//  Created by TDG813 on 11/19/23.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Conversations, RCTEventEmitter)
RCT_EXTERN_METHOD(constantsToExport)
RCT_EXTERN_METHOD(initializeWithAccessToken:(NSString *)name token: (NSString *)token)
RCT_EXTERN_METHOD(joinConversationWith:(NSString *)name particiantId: (NSString *)particiantId)
RCT_EXTERN_METHOD(sendMessage:(NSString *)name messageBody: (NSString*)messageBody)
RCT_EXTERN_METHOD(sendMessageWithImage:(NSString *)name storyId: (NSString*)storyId storyImgUrl: (NSString*)storyImgUrl)
RCT_EXTERN_METHOD(sendComment:(NSString *)name message: (NSString*)message storyId: (NSString*)storyId)
RCT_EXTERN_METHOD(sendEventMessage:(NSString *)name pathId: (NSString*)pathId)
RCT_EXTERN_METHOD(setAllMessageRead:(NSString *)name status:(NSString *)status)
@end


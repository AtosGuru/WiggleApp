//
//  ConversationsManager.swift
//  Wiggle
//
//  Created by TDG813 on 11/19/23.
//

import Foundation

import TwilioConversationsClient

protocol ConversationsManagerDelegate: AnyObject {
  func reloadMessages(_ messages: [TCHMessage])
  func receivedNewMessage(_ message: TCHMessage)
  func displayStatusMessage(_ statusMessage:String)
  func displayErrorMessage(_ errorMessage:String)
  func joinStatusReminder(_ status: String)
  func createdConversationWithParticipant()
  
}

protocol ConversationClientDelegate: TwilioConversationsClientDelegate {
}

class ConversationsManager: NSObject {
  
  // the unique name of the conversation you create
  private var uniqueConversationName = "general"

  weak var delegate: ConversationsManagerDelegate?
  
  // MARK: Conversations variables
  private var client: TwilioConversationsClient?
  private var conversation: TCHConversation?
  private(set) var messages: [TCHMessage] = []
  private var identity: String?
  
  func sendMessage(_ messageText: String,
                   completion: @escaping (TCHResult, TCHMessage?) -> Void) {
      
    let messageOptions = TCHMessageOptions().withBody(messageText)
      conversation?.sendMessage(with: messageOptions, completion: { (result, message) in
          completion(result, message)
      })
  
  }
  
  func sendMessageWithImage(storyId: String, storyImgUrl: String,
                   completion: @escaping (TCHResult, TCHMessage?) -> Void) {
    
    let messageAttr = TCHJsonAttributes(dictionary: ["story_id": storyId, "story_img_url": storyImgUrl, "category": "story"])!
    let messageOptions = TCHMessageOptions().withBody("Image").withAttributes(messageAttr)
      conversation?.sendMessage(with: messageOptions!, completion: { (result, message) in
          completion(result, message)
      })
  
  }
  
  func sendComment(message: String, storyId: String,
                   completion: @escaping (TCHResult, TCHMessage?) -> Void) {
    
    let messageAttr = TCHJsonAttributes(dictionary: ["story_id": storyId, "category": "comment"])!
    let messageOptions = TCHMessageOptions().withBody(message).withAttributes(messageAttr)
      conversation?.sendMessage(with: messageOptions!, completion: { (result, message) in
          completion(result, message)
      })
  
  }
  
  func sendEventMessage(eventId: String, completion: @escaping (TCHResult, TCHMessage?) -> Void) {
    let messageAttr = TCHJsonAttributes(dictionary: ["event_id" : eventId, "category": "event"])
    let messageOptions = TCHMessageOptions().withBody("").withAttributes(messageAttr!)
      conversation?.sendMessage(with: messageOptions!, completion: { (result, message) in
          completion(result, message)
      })
  }
      
  func loginWithAccessToken(_ token: String) {
      // Set up Twilio Conversations client
      TwilioConversationsClient.conversationsClient(withToken: token,
       properties: nil,
                                                    delegate: self) { (result, client) in
        
         self.client = client
        
      }
  }
  
  func setAllMessageRead() {
    self.conversation?.setAllMessagesReadWithCompletion({ result, index in
      
    })
  }
  
  func joinConversationWith(participantId: String) {
    guard let client = client else {
      return
    }
    
    if ((client.myConversations()) != nil) {
      let conversations: [TCHConversation] = client.myConversations() ?? []
      for conversation in conversations {
        
        if conversation.participant(withIdentity: participantId+"_staging") != nil {
          joinConversation(conversation)
          return
        }
        
      }

      uniqueConversationName = (self.client?.user?.identity ?? "") + "-" + participantId+"_staging"
      self.createConversation(participantId: participantId, completion: {(success, conversation) in
          if success, let conversation = conversation {
            self.joinConversation(conversation)
            self.delegate?.createdConversationWithParticipant()
          } else {
            self.joinConversationWithClient(client)
          }
        }
      )
    } else {
      
    }
  }

  func shutdown() {
      if let client = client {
          client.delegate = nil
          client.shutdown()
          self.client = nil
      }
  }

  private func createConversation(participantId: String, completion: @escaping (Bool, TCHConversation?) -> Void) {
      guard let client = client else {
          return
      }
      // Create the conversation if it hasn't been created yet
      let options: [String: Any] = [
          TCHConversationOptionUniqueName: (self.client?.user?.identity ?? "") + "-" + participantId+"_staging"
          ]
      client.createConversation(options: options) { (result, conversation) in
          if result.isSuccessful {
            conversation?.addParticipant(byIdentity: participantId+"_staging", attributes: nil, completion: { result in
              
            })
            
          } else {
              
          }
          completion(result.isSuccessful, conversation)
      }
  }

  private func checkConversationCreation(_ completion: @escaping(TCHResult?, TCHConversation?) -> Void) {
      guard let client = client else {
          return
      }
      client.conversation(withSidOrUniqueName: uniqueConversationName) { (result, conversation) in
          completion(result, conversation)
      }
  }

  private func joinConversation(_ conversation: TCHConversation) {
      self.conversation = conversation
      if conversation.status == .joined {
          print("Current user already exists in conversation")
          self.loadPreviousMessages(conversation)
        self.delegate?.joinStatusReminder("joined")
        
      } else {
          conversation.join(completion: { result in
              print("Result of conversation join: \(result.resultText ?? "No Result")")
              if result.isSuccessful {
                  self.loadPreviousMessages(conversation)
                self.delegate?.joinStatusReminder("joined")
              }
          })
      }
  }
  
  private func joinConversationWithClient( _ client: TwilioConversationsClient) {
      client.conversation(withSidOrUniqueName: "general") { result, conversation in
          self.joinConversation(conversation!)
      }
  }
  
  private func loadPreviousMessages(_ conversation: TCHConversation) {
      conversation.getLastMessages(withCount: 100) { (result, messages) in
          if let messages = messages {
              self.messages = messages
            conversation.setAllMessagesReadWithCompletion { result, index in
              self.delegate?.reloadMessages(messages)
            }
            
          }
      }
  }
  
}

// MARK:
extension ConversationsManager: ConversationClientDelegate {
  
  // Called whenever a conversation we've joined receives a new message
  func conversationsClient(_ client: TwilioConversationsClient, conversation: TCHConversation,
                  messageAdded message: TCHMessage) {
      messages.append(message)
    if self.client?.user?.identity != message.author {
      self.delegate?.receivedNewMessage(message)
    }
    
  }
  
  func conversationsClientTokenWillExpire(_ client: TwilioConversationsClient) {
          
  }
      
  func conversationsClientTokenExpired(_ client: TwilioConversationsClient) {
      
  }
}

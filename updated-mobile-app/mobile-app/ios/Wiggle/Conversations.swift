//
//  Conversations.swift
//  Wiggle
//
//  Created by TDG813 on 11/19/23.
//

import Foundation

@objc(Conversations)
class Conversations: RCTEventEmitter {
  
  // Important - this identity would be assigned by your app, for
  // instance after a user logs in
  var identity = "USER_IDENTITY"

  // Convenience class to manage interactions with Twilio Conversations
  var conversationsManager = ConversationsManager()
      
    
  private var count = 0
  
  override init() {
    super.init()
    conversationsManager.delegate = self
  }
  
  @objc (initializeWithAccessToken: token:)
  func initializeWithAccessToken(_ name: String, token: String) {
    
    conversationsManager.loginWithAccessToken(token)
  }
  
  @objc (joinConversationWith: particiantId:)
  func joinConversationWith(_ name: String, particiantId: String) {
    conversationsManager.joinConversationWith(participantId: particiantId)
  }
  
  @objc (setAllMessageRead: status:)
  func setAllMessageRead(_ name: String, status: String) {
    conversationsManager.setAllMessageRead()
  }
  
  @objc (sendComment: message: storyId:)
  func sendComment(_ name: String, message: String, storyId: String) {
    conversationsManager.sendComment(message: message, storyId: storyId, completion: { (result, message) in
      if result.isSuccessful {
        
        let params = self.prepareEmitterData(message: message!)
        
        self.sendEvent(withName: "CreatedCommentStatus", body: params)
      } else {
          
      }
    })
  }
  
  @objc (sendMessage: messageBody:)
  func sendMessage(_name: String, messageBody: String) {
    conversationsManager.sendMessage(messageBody, completion: { (result, message) in
        if result.isSuccessful {
          self.conversationsManager.setAllMessageRead()
          
          let params = self.prepareEmitterData(message: message!)
            
          self.sendEvent(withName: "SendMessageStatus", body: params)
          
          
        } else {
            
        }
    })
  }
  
  @objc (sendMessageWithImage: storyId: storyImgUrl:)
  func sendMessageWithImage(_name: String, storyId: String, storyImgUrl: String) {
    conversationsManager.sendMessageWithImage(storyId: storyId, storyImgUrl: storyImgUrl, completion: { (result, message) in
        if result.isSuccessful {
          
          let params = self.prepareEmitterData(message: message!)
          
          self.sendEvent(withName: "SendMessageWithImageStatus", body: params)
        } else {
            
        }
    })
  }
  
  @objc (sendEventMessage: pathId:)
  func sendEventMessage(_ name: String, pathId: String) {
    conversationsManager.sendEventMessage(eventId: pathId) { result, message in
      if result.isSuccessful {
        
        let params = self.prepareEmitterData(message: message!)
          
        self.sendEvent(withName: "SendEventMessageStatus", body: params)
        
        
      }
    }
  }
  
  // we need to override this method and
  // return an array of event names that we can listen to
  override func supportedEvents() -> [String]! {
    return [
      "ConversationClientStatusReminder",
      "AccessTokenAboutToExpireReminder",
      "AccessTokenExpiredReminder",
      "JoinEventReminder",
      "FetchImageReminder",
      "SendMessageWithImageStatus",
      "SendMessageStatus",
      "ReceivedMessageStatus",
      "PreviousMessages",
      "CreatedConversationWithParticipant",
      "CreatedCommentStatus",
      "SendEventMessageStatus",
      "SetAllMessagesReadListner"
    ]
  }
  
  override func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": 0]
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  func prepareEmitterData(message: TCHMessage) -> [String : String] {
    var testarray = [String : String]()
    testarray.updateValue((message.sid!), forKey: "id")
    testarray.updateValue((message.author!.replacingOccurrences(of: "_staging", with: "")), forKey: "user")
    testarray.updateValue((message.body!), forKey: "message")
    testarray.updateValue((message.dateCreated!), forKey: "createdAt")
    testarray.updateValue((message.dateUpdated!), forKey: "updatedAt")
    
    if (message.attributes()?.dictionary!.count)! > 0 {
      if (message.attributes()?.dictionary?["category"] as! String == "event") {
        testarray.updateValue((message.attributes()?.dictionary?["event_id"] != nil) ? message.attributes()?.dictionary?["event_id"] as! String : "", forKey: "eventId")
        testarray.updateValue("", forKey: "storyId")
        testarray.updateValue("", forKey: "storyImgUrl")
        testarray.updateValue(message.attributes()?.dictionary?["category"] as! String, forKey: "category")
      }else if message.attributes()?.dictionary?["category"] as! String == "story" {
        testarray.updateValue("", forKey: "eventId")
        testarray.updateValue((message.attributes()?.dictionary?["story_id"] != nil) ? message.attributes()?.dictionary?["story_id"] as! String : "", forKey: "storyId")
        testarray.updateValue(message.attributes()?.dictionary?["story_img_url"] as! String, forKey: "storyImgUrl")
        testarray.updateValue(message.attributes()?.dictionary?["category"] as! String, forKey: "category")
      } else if (message.attributes()?.dictionary?["category"] as! String == "comment") {
        testarray.updateValue("", forKey: "eventId")
        testarray.updateValue((message.attributes()?.dictionary?["story_id"] != nil) ? message.attributes()?.dictionary?["story_id"] as! String : "", forKey: "storyId")
        testarray.updateValue("", forKey: "storyImgUrl")
        testarray.updateValue(message.attributes()?.dictionary?["category"] as! String, forKey: "category")
      }
    } else {
      testarray.updateValue("", forKey: "eventId")
      testarray.updateValue("", forKey: "storyId")
      testarray.updateValue("", forKey: "storyImgUrl")
      testarray.updateValue("", forKey: "category")
    }
    
    return testarray
  }
    
}

// MARK: QuickstartConversationsManagerDelegate
extension Conversations: ConversationsManagerDelegate {
  func reloadMessages(_ messages: [TCHMessage]) {
    
    var params = [[String:String]]()
    
    for message in messages {
      var testarray = self.prepareEmitterData(message: message)
      
      params.append(testarray)
    }
    
    sendEvent(withName: "PreviousMessages", body: ["allMessages": params])
  }
  
  func displayStatusMessage(_ statusMessage: String) {

  }
  
  
  func displayErrorMessage(_ errorMessage: String) {

  }
    
    // Scroll to bottom of table view for messages
  func receivedNewMessage(_ message: TCHMessage) {
    
    let params = self.prepareEmitterData(message: message)
      
    self.sendEvent(withName: "ReceivedMessageStatus", body: params)
  }
  
  func joinStatusReminder(_ status: String) {
    sendEvent(withName: "JoinEventReminder", body: ["eventProperty": status])
  }
  
  func createdConversationWithParticipant() {
    sendEvent(withName: "CreatedConversationWithParticipant", body: ["status": "success"])
  }
}

extension String {
    var validURL: Bool {
        get {
            let regEx = "((?:http|https)://)?(?:www\\.)?[\\w\\d\\-_]+\\.\\w{2,3}(\\.\\w{2})?(/(?<=/)(?:[\\w\\d\\-./_]+)?)?"
            let predicate = NSPredicate(format: "SELF MATCHES %@", argumentArray: [regEx])
            return predicate.evaluate(with: self)
        }
    }
}

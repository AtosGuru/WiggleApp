export enum StorageKey {
  CSRFToken = 'CSRFToken',
  XSession = 'X-SESSION',
  APPLE_EMAIL = 'APPLE-EMAIL',
  APPLE_FULLNAME = 'APPLE-FULLNAME'
}

export enum QueryKey {
  csrf = 'csrf',
  register = 'register',
  user = 'user',
  userSearch = 'userSearch',
  connections = 'connections',
  chat = 'chat',
  chats = 'chats',
  chatsSearch = 'chatsSearch',
  notifications = 'notifications',
  userById = 'userById',
  events = 'events',
  event = 'event',
  activeUsers = 'activeUsers',
  searchFollowedUsers = 'searchFollowedUsers',
  myDatingProfile = 'myDatingProfile',
  myDatingProfileScreen = 'myDatingProfileScreen',
  datingProfile = 'datingProfile',
  datings = 'datings',
  nears = 'nears',
  club = 'club'
}

export enum ConnectionType {
  BLOCK = 0,
  REQUESTED = 1,
  CONNECTED = 2,
  LIKE = 4,
  MESSAGE = 8,
  DATING = 9,
  MESSAGE_READ = 16,
  FAVORITE = 32,
  PRECHECK = 64,
  CHECKIN = 128
}

# orbital-sepper
This is the repository of the orbital app sepper.

## To test the application
Install node, npm and expo-cli.

Clone this repository and run npm/yarn install to install the dependencies in this application.

After, run npm/yarn/expo start to start the application. Download the Expo Go app and scan the QR code on your phone to use the app.

## Firebase
For the app to run, create your own .env file and insert the firebase API configuration into the code below.
```
apiKey=""
authDomain=""
projectId=""
storageBucket=""
messagingSenderId=""
appId=""
measurementId=""
```
Then, copy and paste the firestore and storage rules below.
### Firestore rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if uidMatch(userId);
    }
    
    match /rooms/{roomId} {
      allow create: if isAuthenticated();
      allow update: if isChatMember(resource.data.participantsArray);
      allow delete: if false;
      allow read: if isChatMember(resource.data.participantsArray);
      
      match /messages/{messageId} {
        allow create: if isChatMember(getRoom(roomId).data.participantsArray);
        allow read: if !existsRoom(roomId) || isChatMember(getRoom(roomId).data.participantsArray);
        allow update, delete: if false;
      }
    }
    
    function getRoom(roomId) {
      return get(/databases/$(database)/documents/rooms/$(roomId))
    }
    function existsRoom(roomId) {
      return exists(/databases/$(database)/documents/rooms/$(roomId))
    }
    
    function isAuthenticated() {
      return request.auth != null;
    }
    function uidMatch(uid) {
      return isAuthenticated() && uid == request.auth.uid
    }
    function isChatMember(membersList) {
      return isAuthenticated() && request.auth.token.email in membersList;
    }
  }
}
```
### Storage rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
    match /images/{userId}/profilePicture.jpeg {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    match /images/rooms/{roomId}/{imageId} {
      allow write, read: if request.auth.token.email in roomId.split(':')
    }
  }
}
```

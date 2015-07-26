# UploadFS-Local

A file system store for UploadFS.

### Installation

To install the package, execute this command in the root of your project :
```
meteor add jalik:ufs-local
```

If later you want to remove the package :
```
meteor remove jalik:ufs-local
```

### Create a Store

**The code below is available on the client and the server.**

Specify the **path** where you want to save the files.
Be aware that you must not change the path, neither the name of the store
if you have already saved files or you will break the URLs.
```js
Meteor.photos = new Mongo.Collection('photos');

Meteor.photosStore = new UploadFS.store.Local({
    collection: Meteor.photos,
    name: 'photos',
    path: '/uploads/photos'
});
```
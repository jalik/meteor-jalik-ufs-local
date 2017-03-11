# UploadFS Local Store

A local file system store for UploadFS.

## Installation

To install the package, execute this command in the root of your project :
```
meteor add jalik:ufs-local
```

If later you want to remove the package :
```
meteor remove jalik:ufs-local
```

## Creating a Store

**The code below is available on the client and the server.**

Specify the **path** where you want to save the files.
Be aware that you must not change the path, neither the name of the store
if you have already saved files or you will break the URLs.
```js
import {Mongo} from 'meteor/mongo';
import {LocalStore} from 'meteor/jalik:ufs-local';

// Declare store collection
const Photos = new Mongo.Collection('photos');

// Declare store
const PhotoStore = new LocalStore({
    collection: Photos,
    name: 'photos',
    path: '/uploads/photos',
    mode: '0744', // directory permissions
    writeMode: '0744' // file permissions
});
```

## Getting store local path

```js
let path = PhotoStore.getPath();
```

## Getting file path

```js
let path = PhotoStore.getFilePath(fileId);
```

## License

This package is released under the [MIT License](http://www.opensource.org/licenses/MIT).

if (Meteor.isServer) {
    var fs = Npm.require('fs');
    var mkdirp = Npm.require('mkdirp');
}

/**
 * File system store
 * @param options
 * @constructor
 */
UploadFS.store.Local = function (options) {
    // Set default options
    options = _.extend({
        path: 'ufs/uploads'
    }, options);

    // Check options
    if (typeof options.path !== 'string') {
        throw new TypeError('path is not a string');
    }

    // Private attributes
    var path = options.path;

    // Create the upload dir
    if (Meteor.isServer) {
        mkdirp(path, function (err) {
            if (err) {
                console.error('ufs: error creating store ' + path);
            } else {
                console.info('ufs: created store ' + path);
            }
        });
    }

    // Create the store
    var store = new UploadFS.Store(options);

    /**
     * Returns the file path
     * @param fileId
     * @param file
     * @return {string}
     */
    store.getFilePath = function (fileId, file) {
        file = file || store.getCollection().findOne(fileId, {fields: {extension: 1}});
        return file && store.getPath() + '/' + fileId + '.' + file.extension;
    };

    /**
     * Returns the path where files are saved
     * @return {string}
     */
    store.getPath = function () {
        return path;
    };


    if (Meteor.isServer) {
        /**
         * Removes the file
         * @param fileId
         * @param callback
         */
        store.delete = function (fileId, callback) {
            if (typeof callback !== 'function') {
                callback = function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                }
            }
            var path = store.getFilePath(fileId);
            path && fs.unlink(store.getFilePath(fileId), callback);
        };

        /**
         * Returns the file read stream
         * @param fileId
         * @param file
         * @return {*}
         */
        store.getReadStream = function (fileId, file) {
            return fs.createReadStream(store.getFilePath(fileId, file), {
                flags: 'r',
                encoding: null,
                autoClose: true
            });
        };

        /**
         * Returns the file write stream
         * @param fileId
         * @param file
         * @return {*}
         */
        store.getWriteStream = function (fileId, file) {
            return fs.createWriteStream(store.getFilePath(fileId, file), {
                flags: 'a',
                encoding: null
            });
        };
    }

    return store;
};

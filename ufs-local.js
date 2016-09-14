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
        mode: '0744',
        path: 'ufs/uploads',
        writeMode: '0744'
    }, options);

    // Check options
    if (typeof options.mode !== 'string') {
        throw new TypeError('mode is not a string');
    }
    if (typeof options.path !== 'string') {
        throw new TypeError('path is not a string');
    }
    if (typeof options.writeMode !== 'string') {
        throw new TypeError('writeMode is not a string');
    }

    // Private attributes
    var mode = options.mode;
    var path = options.path;
    var writeMode = options.writeMode;

    if (Meteor.isServer) {
        fs.stat(path, function (err) {
            if (err) {
                // Create the directory
                mkdirp(path, {mode: mode}, function (err) {
                    if (err) {
                        console.error('ufs: cannot create store at ' + path + ' (' + err.message + ')');
                    } else {
                        console.info('ufs: store created at ' + path);
                    }
                });
            } else {
                // Set directory permissions
                fs.chmod(path, mode, function (err) {
                    err && console.error('ufs: cannot set store permissions ' + mode + ' (' + err.message + ')');
                });
            }
        });
    }

    // Create the store
    var self = new UploadFS.Store(options);

    /**
     * Returns the file path
     * @param fileId
     * @param file
     * @return {string}
     */
    self.getFilePath = function (fileId, file) {
        file = file || self.getCollection().findOne(fileId, {fields: {extension: 1}});
        return file && self.getPath(fileId + (file.extension ? '.' + file.extension : ''));
    };

    /**
     * Returns the path or sub path
     * @param file
     * @return {string}
     */
    self.getPath = function (file) {
        return path + (file ? '/' + file : '');
    };


    if (Meteor.isServer) {
        /**
         * Removes the file
         * @param fileId
         * @param callback
         */
        self.delete = function (fileId, callback) {
            var path = self.getFilePath(fileId);

            if (typeof callback !== 'function') {
                callback = function (err) {
                    err && console.error('ufs: cannot delete file "' + fileId + '" at ' + path + ' (' + err.message + ')');
                }
            }
            fs.stat(path, Meteor.bindEnvironment(function (err, stat) {
                if (!err && stat && stat.isFile()) {
                    fs.unlink(path, Meteor.bindEnvironment(function(){
                        self.getCollection().remove(fileId);
                        callback.call(this);
                    }));
                }
            }));
        };

        /**
         * Returns the file read stream
         * @param fileId
         * @param file
         * @return {*}
         */
        self.getReadStream = function (fileId, file) {
            return fs.createReadStream(self.getFilePath(fileId, file), {
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
        self.getWriteStream = function (fileId, file) {
            return fs.createWriteStream(self.getFilePath(fileId, file), {
                flags: 'a',
                encoding: null,
                mode: writeMode
            });
        };
    }

    return self;
};

'use strict'

// This module is intended to compress files and folders.
// It should be used with several compression format (at least zip and tar.gz)
// Maybe it isn't necessary to save the compressed file locally, but for
//  now we make it simple.

// compress a file or folder.
// options properties :
//    - source: pathname of file or folder
//    - dest: destination pathname without suffix
//    - format: zip, tar.gz, gzip, ...
// callback(err, pathname)
module.exports.compress = function(options, callback){
}

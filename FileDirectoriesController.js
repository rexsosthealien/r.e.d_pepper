var pathUtils = require('path');
var dirPath = pathUtils.dirname(require.main.filename);
exports.setDefaultHTMLSourcesDirectory = function (path) {
    dirPath += path;
    console.log(dirPath)
};

exports.getHTMLSourcesDirectory = function () {
    return dirPath
};
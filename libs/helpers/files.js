exports.getFileName = function (fileName) {
    const index = fileName.lastIndexOf('.');
    return fileName.substring(0, index);
}
/*global phantom, require, runTests*/
var fs = require('fs'),
    page = require('webpage').create(),
    specFiles;

var loadAllSpecFiles = function (directory) {
    var allFilesAndDirectories = fs.list(directory);

    var allSpecFiles = new Array();

    var allDirectories = allFilesAndDirectories.filter(function (item) {
        return item.indexOf('spec.js') === -1 && item !== "." && item !== "..";
    }).map(function (item) {
        return directory + '/' + item;
    });

    allDirectories.forEach(function (specDirectory) {
        allSpecFiles = allSpecFiles.concat(loadAllSpecFiles(specDirectory));//didn't work with allSpecFiles.push, no idea why
    });

    allSpecFiles = allSpecFiles.concat(allFilesAndDirectories.filter(function (item) { //didn't work with allSpecFiles.push, no idea why
        var takeOnlyFilesThatEndOnSpecJs = (item.indexOf('spec.js') + 7) === item.length;
        return takeOnlyFilesThatEndOnSpecJs;
    }).map(function (item) {
        return directory + '/' + item.substring(0, item.length - 3);
    }));

    return allSpecFiles;
};

specFiles = loadAllSpecFiles('../test/specs');

page.onConsoleMessage = function(msg) {
    console.log(msg);
    if (msg === "Reporter finished: Success")
        phantom.exit();
    if (msg === "Reporter finished: Fail")
        phantom.exit(1);
};

page.onLoadFinished = function () {
    
    page.evaluate(function (specFiles) {
        console.log(specFiles);
        runTests(specFiles);;
    }, specFiles);
};

page.open('spec.html');
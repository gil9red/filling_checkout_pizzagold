// https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/tabs
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies

var DEBUG = false;

function d(mess) {
    DEBUG && console.log(mess);
}

d("Start plugin");

// Импортирование модулей
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

//https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/simple-storage

//https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox?as=u&utm_source=inproduct
// xpinstall.signatures.required

//var ss = require("sdk/simple-storage");
//ss.storage.myArray = [1, 1, 2, 3, 5, 8, 13];
//ss.storage.myBoolean = true;
//ss.storage.myNull = null;
//ss.storage.myNumber = 3.1337;
//ss.storage.myObject = { a: "foo", b: { c: true }, d: null };
//ss.storage.myString = "O frabjous day!";
//d(ss);

//// http://stackoverflow.com/questions/3796084/about-config-preferences-and-js
//let { Cc, Ci } = require('chrome');
//
//// Get the "accessibility." branch
//var prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("accessibility.");
//
//// prefs is an nsIPrefBranch.
//// Look in the above section for examples of getting one.
//var value = prefs.getBoolPref("typeaheadfind"); // get a pref (accessibility.typeaheadfind)
//d('value=' + value)
////prefs.setBoolPref("typeaheadfind", !value); // set a pref (accessibility.typeaheadfind)

//const fileIO = require("sdk/io/file");
//
//let path = "E:/";
//let list = fileIO.list(path);
//
//for (i = 0; i < list.length; i++) {
//  let item = fileIO.join(path, list[i]);
//  if (fileIO.isFile(item)) {
//    console.log(item + " is a file");
//  }
//  else {
//    console.log(item + " is a directory");
//  }
//}
//
////var ss = require("sdk/simple-storage");
//////ss.storage.myArray = [1, 1, 2, 3, 5, 8, 13];
//////ss.storage.myBoolean = true;
//////ss.storage.myNull = null;
//////ss.storage.myNumber = 3.1337;
//////ss.storage.myObject = { a: "foo", b: { c: true }, d: null };
//////ss.storage.myString = "O frabjous day!";
////d(ss);

var URL = 'http://www.pizzagold.ru/basket';
var INCLUDES = ["http://www.pizzagold.ru/basket*", "https://www.pizzagold.ru/basket*"];

URL = 'https://github.com/settings/profile';

if (DEBUG) {
    d("Open debug tab");

//    tabs.open('http://torrent.mgn.ru');
//    tabs.open('http://www.pizzagold.ru/basket/');
//    tabs.open('http://torrent.mgn.ru/viewtopic.php?t=78458');
//    tabs.open('http://www.pizzagold.ru/basket');
//    tabs.open('https://github.com/settings/profile');
//    tabs.open('https://github.com/join?return_to=https%3A%2F%2Fgithub.com%2Fsettings%2Fprofile&source=login');

//    tabs[0].close();
}

//var pref = require("sdk/simple-prefs");
//console.log("simple-pref: " + pref);
//console.log(pref);
//
//console.log("somePreference: " + pref.prefs.somePreference);

//preferences["somePreference"] = "this is the default string value";
//pref.prefs.somePreference = "Vasya!";
//console.log("somePreference: " + pref.prefs.somePreference);

//var preferences = require("sdk/simple-prefs").prefs;
//
//console.log(preferences.somePreference);
//preferences.somePreference = "this is a new value";
//
//console.log(prefs["somePreference"]); // bracket notation
//preferences["somePreference"] = "this is the default string value";

// Ссылка на кнопку плагина
var button_plugin = null;

function createButton() {
    d("Start create button");
    d(button_plugin == null ? "Button not exist, create button" : "Button exist");

    // Создаем кнопку
    if (button_plugin == null) {
        button_plugin = buttons.ActionButton({
            id: "button_plugin",
            label: "Заполнение полей \"Оформление заказа\"",
            icon: "./icon.ico",

            // При клике выполняем скрипт
            onClick: function () {
                // Для активной вкладки вызываем скрипт
                tabs.activeTab.attach({
                    contentScriptFile: "./do_filling.js"
                });
            }
        });
    }

    d("Finish create button");
}


createButton();


function deleteButton() {
    d("Start delete button");
    d(button_plugin != null ? "Button exist, delete button" : "Button not exist");

    if (button_plugin != null) {
        button_plugin.destroy()
        button_plugin = null;
    }

    d("Finish delete button");
}


function checkTab() {
    var tab = tabs.activeTab;
    if (tab == null) {
        d("Start check tab is null. Exit function.");
        return;
    }

    d("Start check tab " + tab.url);

    if (tab.url.startsWith(URL)) {
        createButton();
    } else {
        deleteButton();
    }

    d("Finish check tab " + tab.url);
}


//pageMod.PageMod({
//    include: INCLUDES,
//    // The same is true in the regular expression, but it is harder to understand
//    //include: /https?:\/\/torrent\.mgn\.ru\/?.*/,
//
//    attachTo: ["existing", "top"],
//
//    onAttach: function onAttach(worker) {
//        var tab = worker.tab;
//
//        d('onAttach ' + worker.url + ' (' + tab.title + ')');
//
//        checkTab();
//
//        tab.on('activate', function() {
//            d('on activate tab ' + tab.url + ' start');
//            checkTab();
//            d('on activate tab finish');
//        });
//
//        tab.on('pageshow', function() {
//            d('on pageshow tab ' + tab.url + ' start');
//            checkTab();
//            d('on pageshow tab finish');
//        });
//
//        tab.on('deactivate', function() {
//            d('on deactivate tab ' + tab.url + ' start');
//            deleteButton();
//            d('on deactivate tab finish');
//        });
//        tab.on('close', function() {
//            d('on close tab ' + tab.url + ' start');
//            deleteButton();
//            d('on close tab finish');
//        });
//    }
//});

d("Finish plugin");

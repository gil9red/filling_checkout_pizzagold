// https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/tabs
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies

var DEBUG = true;

function d(mess) {
    DEBUG && console.log(mess);
}

d("Start plugin");

// Импортирование модулей
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

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
    tabs.open('https://github.com/join?return_to=https%3A%2F%2Fgithub.com%2Fsettings%2Fprofile&source=login');

    tabs[0].close();
}

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

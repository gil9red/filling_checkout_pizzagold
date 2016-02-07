var DEBUG = true;

function d(mess) {
    DEBUG && console.log(mess);
}

d("Start plugin");

// Импортирование модулей
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

// Основная часть url раздач, например http://torrent.mgn.ru/viewtopic.php?t=72938
var URL_TORRENT = 'http://www.pizzagold.ru/basket';

if (DEBUG) {
    d("Open debug tab");

    tabs.open('http://torrent.mgn.ru');
    tabs.open('http://www.pizzagold.ru/basket/');
    tabs.open('http://torrent.mgn.ru/viewtopic.php?t=78458');
    tabs.open('http://www.pizzagold.ru/basket');

    tabs[0].close();
}

// Ссылка на кнопку плагина
var download_torrent_mgn_ru = null;

d("Add handlers activate and open tabs");


function createButton() {
    d("Start create button");
    d(download_torrent_mgn_ru == null ? "Button not exist, create button" : "Button exist");

    // Создаем кнопку
    if (download_torrent_mgn_ru == null) {
        // Кнопка клика кнопки скачивания раздачи и кнопки "спасибо" сайта http://torrent.mgn.ru
        download_torrent_mgn_ru = buttons.ActionButton({
            id: "download_torrent_mgn_ru",
            label: "Download and thank torrent from torrent.mgn.ru",
            icon: "./favicon.ico",

            // При клике выполняем скрипт
            onClick: function () {
                // Для активной вкладки вызываем скрипт
                tabs.activeTab.attach({
//                    contentScriptFile: "./download_and_thank.js"
                });
            }
        });
    }

    d("Finish create button");
}

function deleteButton() {
    d("Start delete button");
    d(download_torrent_mgn_ru != null ? "Button exist, delete button" : "Button not exist");

    if (download_torrent_mgn_ru != null) {
        download_torrent_mgn_ru.destroy()
        download_torrent_mgn_ru = null;
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

    if (tab.url.startsWith(URL_TORRENT)) {
        createButton();
    } else {
        deleteButton();
    }

    d("Finish check tab " + tab.url);
}

pageMod.PageMod({
    include: ["http://www.pizzagold.ru/basket",
              "https://www.pizzagold.ru/basket"],
    // The same is true in the regular expression, but it is harder to understand
    //include: /https?:\/\/torrent\.mgn\.ru\/?.*/,

    attachTo: ["existing", "top"],

    onAttach: function onAttach(worker) {
        var tab = worker.tab;

        d('onAttach ' + worker.url + ' (' + tab.title + ')');

        checkTab();

        tab.on('activate', function() {
            d('on activate tab ' + tab.url + ' start');
            checkTab();
            //createButton();
            d('on activate tab finish');
        });

        tab.on('pageshow', function() {
            d('on pageshow tab ' + tab.url + ' start');
            checkTab();
            //createButton();
            d('on pageshow tab finish');
        });

        tab.on('deactivate', function() {
            d('on deactivate tab ' + tab.url + ' start');
            deleteButton();
            d('on deactivate tab finish');
        });
        tab.on('close', function() {
            d('on close tab ' + tab.url + ' start');
            deleteButton();
            d('on close tab finish');
        });
    }
});


d("Finish plugin");

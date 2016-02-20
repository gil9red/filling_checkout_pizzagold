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

//URL = 'https://github.com/settings/profile';

if (DEBUG) {
    d("Open debug tab");

//    tabs.open('http://torrent.mgn.ru');
//    tabs.open('http://www.pizzagold.ru/basket/');
//    tabs.open('http://torrent.mgn.ru/viewtopic.php?t=78458');
    tabs.open('http://www.pizzagold.ru/basket');
//    tabs.open('https://github.com/settings/profile');
//    tabs.open('https://github.com/join?return_to=https%3A%2F%2Fgithub.com%2Fsettings%2Fprofile&source=login');

    tabs[0].close();
}

// Ссылка на кнопку плагина
var button_plugin = null;

var prefs = require("sdk/simple-prefs").prefs;

var order_name = prefs.my_name;
var order_personal_phone = prefs.my_phone;
var order_email = prefs.my_email;
var order_personal_street = prefs.my_street;
var order_personal_pager = prefs.my_pager;
var order_personal_mailbox = prefs.my_mailbox;
var order_personal_notes = prefs.my_notes;

d("order_name: " + order_name);
d("order_personal_phone: " + order_personal_phone);
d("order_email: " + order_email);
d("order_personal_street: " + order_personal_street);
d("order_personal_pager: " + order_personal_pager);
d("order_personal_mailbox: " + order_personal_mailbox);
d("order_personal_notes: " + order_personal_notes);

var contentScript = "function set(id, value) {" +
"    var el = document.getElementById(id);" +
"    if (el != null) el.value = value;" +
"}\n" +

"// Имя\n" +
"set('ORDER_NAME', '<order_name>');\n" +

"// Телефон (обязательный)\n" +
"set('ORDER_PERSONAL_PHONE', '<order_personal_phone>');\n" +

"// Почта\n" +
"set('ORDER_EMAIL', '<order_email>');\n" +

"// Улица\n" +
"set('ORDER_PERSONAL_STREET', '<order_personal_street>');\n" +

"// Дом\n" +
"set('ORDER_PERSONAL_PAGER', '<order_personal_pager>');\n" +

"// Квартира\n" +
"set('ORDER_PERSONAL_MAILBOX', '<order_personal_mailbox>');\n" +

"// Комментарий к заказу\n" +
"set('ORDER_PERSONAL_NOTES', '<order_personal_notes>');\n";

contentScript = contentScript
.replace("<order_name>", order_name)
.replace("<order_personal_phone>", order_personal_phone)
.replace("<order_email>", order_email)
.replace("<order_personal_street>", order_personal_street)
.replace("<order_personal_pager>", order_personal_pager)
.replace("<order_personal_mailbox>", order_personal_mailbox)
.replace("<order_personal_notes>", order_personal_notes);


// TODO: ставить галочку напротив: Я соглашаюсь с условиями оплаты и доставки.
//<input value="Y" name="OFFER" type="checkbox">

d(contentScript);


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
                    contentScript: contentScript
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

var DEBUG = true;
function d(mess) {
    DEBUG && console.log(mess);
}

// Кликаем, если находим на "Спасибо" и "Скачать раздачу"
function getElementByXpath(path) {
    d("getElementByXpath.path: " +  path);
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function do_filling() {
    d("do_filling start.");

    document.getElementById('user_login').value = 'Login';
    document.getElementById('user_email').value = 'Email';
    document.getElementById('user_password').value = 'Password';

//    var download_tag = getElementByXpath('//input[@id="user_login"]');
//    //d(download_tag);
//    download_tag.textContent = 'dfdf';

//    <input data-throttle-wait="300" autocapitalize="off" autofocus="autofocus" data-autocheck-url="/signup_check/username" id="user_login" name="user[login]" size="30" type="text">
//    <input data-throttle-wait="300" autocapitalize="off" data-autocheck-url="/signup_check/email" id="user_email" name="user[email]" size="30" type="text">
//    <input data-throttle-wait="300" data-autocheck-url="/signup_check/password" id="user_password" name="user[password]" size="30" type="password">

//    //var download_tag = document.querySelector("a.genmed");
//    var download_tag = getElementByXpath( '//a[@class="genmed"]' );
//    d("download_tag: " +  download_tag);
//
//    if (download_tag == null) {
//        download_tag = getElementByXpath( '//a[@class="seedmed"]' );
//        d("download_tag: " +  download_tag);
//    }
//
//    if (download_tag == null) {
//        return;
//    }
//
//    var href = download_tag.href
//    d("url download: " +  href);
//
//    var id_torrent = href.split('id=')[1]
//    d("id_torrent: " +  id_torrent);
//
//    var thank_tag = getElementByXpath('//span[@id="VB' + id_torrent + '"]/img');
//    d("thank_tag: " +  thank_tag);
//
//    if (thank_tag != null) {
//        // Благодарим за раздачу
//        d("thank_tag.click()");
//        thank_tag.click()
//    }
//
//    // Кликаем на скачивание
//    d("download_tag.click()");
//    download_tag.click()

    d("do_filling finish.");
}

do_filling()

var DEBUG = true;
function d(mess) {
    DEBUG && console.log(mess);
}

function do_filling() {
    d("do_filling start.");

    // Имя
    document.getElementById('ORDER_NAME').value = 'Имя';

    // Телефон (обязательный)
    document.getElementById('ORDER_PERSONAL_PHONE').value = 'Телефон';

    // Почта
    document.getElementById('ORDER_EMAIL').value = 'Почта';

    // Улица
    document.getElementById('ORDER_PERSONAL_STREET').value = 'Улица';

    // Дом
    document.getElementById('ORDER_PERSONAL_PAGER').value = 'Дом';

    // Квартира
    document.getElementById('ORDER_PERSONAL_MAILBOX').value = 'Квартира';

    // Комментарий к заказу
    document.getElementById('ORDER_PERSONAL_NOTES').value = 'Комментарий к заказу';

    d("do_filling finish.");
}

do_filling()

/* Лінійні іконки вайрфреймів: один спрайт на всі сторінки.
   Малюються з тексту поруч — іконка ніколи не стоїть сама, завжди при підписі.
   Нові іконки додавати тут, не в сторінках. */
(function () {
  var ICONS = {
    home: '<path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    book: '<path d="M4 4h10a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M7 4v13"/><path d="M17 7h3v13H7"/>',
    heart: '<path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9z"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c.8-4 3.9-6 7.5-6s6.7 2 7.5 6"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-3.5-3.5"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    map: '<path d="m9 5 6 2 5-2v12l-5 2-6-2-5 2V7z"/><path d="M9 5v12M15 7v12"/>',
    calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    shield: '<path d="M12 3.5 19 6v6c0 4-3 7.3-7 8.5-4-1.2-7-4.5-7-8.5V6z"/><path d="m9 12 2 2 4-4"/>',
    alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v5M12 16h.01"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    key: '<circle cx="8" cy="12" r="3.5"/><path d="M11.5 12H20l-2 2.5M16 12v2.5"/>',
    road: '<path d="M7 20 9 4M17 20l-2-16M12 6v2M12 11v2M12 16v2"/>',
    chat: '<path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4z"/>',
    arrow: '<path d="M5 12h13M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H6M11 18l-6-6 6-6"/>'
  };

  var sprite = '<svg class="sprite" aria-hidden="true">';
  Object.keys(ICONS).forEach(function (k) {
    sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>';
  });
  document.body.insertAdjacentHTML('afterbegin', sprite + '</svg>');

  function svg(name, cls) {
    return '<svg class="i' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  /* нижнє меню: по іконці на пункт */
  var NAVICON = { 'Оселі': 'home', 'Журнал': 'book', 'Збережені': 'heart', 'Кабінет': 'user' };
  document.querySelectorAll('.tabbar-bottom a').forEach(function (a) {
    /* Лічильник у бейджі теж потрапляє в textContent, тому порівнюємо
       з підписом без цифр — інакше пункт зі значком лишався без іконки. */
    var label = a.textContent.replace(/\d+/g, '').trim();
    var key = Object.keys(NAVICON).filter(function (k) { return label.indexOf(k) === 0; })[0];
    var box = a.querySelector('.box');
    if (key && box) box.outerHTML = svg(NAVICON[key]);
  });

  /* іконка за змістом підпису — іконка завжди при слові, ніколи сама */
  var BY_TEXT = [
    [/^Усі оселі|^Повернутись|^Назад|^Оселі в цій місцевості|^Подивитись оселю/, 'back'],
    [/^Забронювати|^Перейти до оплати|^Оплатити|^Взяти |^Спробувати ще|^Надіслати ще раз|^Інша картка|^Apple Pay|^Зняти |^Скинути /, 'arrow'],
    [/^Шукати оселі/, 'search'],
    [/^Мапа$/, 'map'],
    [/^Строк/, 'calendar'],
    [/^Зберегти$/, 'heart'],
    [/^Написати/, 'chat'],
    [/^Інші оселі$/, 'home']
  ];
  document.querySelectorAll('.screen a.btn, .screen button, .filters button').forEach(function (el) {
    var t = el.textContent.trim();
    for (var i = 0; i < BY_TEXT.length; i++) {
      if (BY_TEXT[i][0].test(t)) { el.insertAdjacentHTML('afterbegin', svg(BY_TEXT[i][1])); break; }
    }
  });

  /* службові рядки: перевірка, гарантія, очікування, помилка */
  document.querySelectorAll('.screen .checked').forEach(function (el) { el.insertAdjacentHTML('afterbegin', svg('check', 'i-sm')); });
  document.querySelectorAll('.screen .guarantee, .screen .promise li').forEach(function (el) {
    if (/гаранті|повертаємо 50/i.test(el.textContent)) el.insertAdjacentHTML('afterbegin', svg('shield', 'i-sm'));
  });
  document.querySelectorAll('.screen h2').forEach(function (h) {
    var t = h.textContent.trim();
    if (/не пройшов|не дійшов|зайнят|обірвався|не вдалося/i.test(t)) h.insertAdjacentHTML('afterbegin', svg('alert'));
    else if (/Підтверджуємо платіж|Вантажимо|Підбираємо/i.test(t)) h.insertAdjacentHTML('afterbegin', svg('clock'));
    else if (/Як дістатись/i.test(t)) h.insertAdjacentHTML('afterbegin', svg('key'));
    else if (/Що гарантуємо/i.test(t)) h.insertAdjacentHTML('afterbegin', svg('shield'));
  });
})();

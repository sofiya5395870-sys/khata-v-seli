/* Дерево вайрфреймів. Рендериться на кожній сторінці з одного місця —
   щоб панель була однакова скрізь і правилась в одному файлі, як assets/nav.js у кейсі.
   Структура — з wireframes/_screens.md і ia/sitemap.md. Нічого, чого там немає, тут бути не може. */

(function () {
  var TREE = [
    {
      group: '1 · Ще не знаю, чого хочу',
      screens: [
        { name: 'Головна', file: 'home.html', states: [] },
        { name: 'Добірка', file: 'collection.html', states: [
          { name: 'Порожній', file: 'collection-empty.html' },
          { name: 'Завантаження', file: 'collection-loading.html' }
        ] },
        { name: 'Каталог', file: 'listings.html', states: [
          { name: 'Порожній', file: 'listings-empty.html' },
          { name: 'Помилка · не завантажилось', file: 'listings-error.html' },
          { name: 'Завантаження', file: 'listings-loading.html' }
        ] }
      ]
    },
    {
      group: '2 · Дивлюсь на оселю',
      screens: [
        { name: 'Оселя', file: 'listing.html', states: [
          { name: 'Порожній · блок відгуків', file: 'listing-empty.html' },
          { name: 'Завантаження', file: 'listing-loading.html' }
        ] }
      ]
    },
    {
      group: '4 · Домовляюсь і плачу',
      screens: [
        { name: 'Бронювання', file: 'booking.html', states: [
          { name: 'Помилка · дати зайняті', file: 'booking-error.html' }
        ] },
        { name: 'Оплата', file: 'payment.html', states: [
          { name: 'Помилка · платіж не пройшов', file: 'payment-error.html' },
          { name: 'Завантаження', file: 'payment-loading.html' }
        ] },
        { name: 'Підтвердження', file: 'confirmation.html', states: [
          { name: 'Помилка · лист не дійшов', file: 'confirmation-error.html' }
        ] }
      ]
    }
  ];

  /* Сторінки, які вже намальовані. Решта в дереві світло-сірі: шлях видно, сторінки ще немає. */
  var DONE = [
    'home.html',
    'collection.html', 'collection-empty.html', 'collection-loading.html',
    'listings.html', 'listings-empty.html', 'listings-error.html', 'listings-loading.html',
    'listing.html', 'listing-empty.html', 'listing-loading.html',
    'booking.html', 'booking-error.html',
    'payment.html', 'payment-error.html', 'payment-loading.html',
    'confirmation.html', 'confirmation-error.html'
  ];

  var here = location.pathname.split('/').pop() || 'listings.html';

  function link(file, text, cls) {
    var a = document.createElement('a');
    a.href = file;
    a.textContent = text;
    if (cls) a.className = cls;
    if (DONE.indexOf(file) === -1) a.className = (a.className ? a.className + ' ' : '') + 'todo';
    if (file === here) {
      a.setAttribute('aria-current', 'page');
      a.className = (a.className ? a.className + ' ' : '') + 'now';
    }
    return a;
  }

  var host = document.querySelector('.tree');
  if (!host) return;

  var h = document.createElement('h2');
  h.textContent = 'Навігація макета';
  var p = document.createElement('p');
  p.textContent = 'Службова панель. У продукті її немає.';
  host.appendChild(h);
  host.appendChild(p);

  var nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Екрани вайрфреймів');

  TREE.forEach(function (g) {
    var b = document.createElement('b');
    b.textContent = g.group;
    nav.appendChild(b);

    var ul = document.createElement('ul');
    g.screens.forEach(function (s) {
      var li = document.createElement('li');
      li.appendChild(link(s.file, s.name, 'lvl-screen'));

      var states = document.createElement('ul');
      /* базова сторінка екрана — це його звичайний, успішний стан */
      var base = document.createElement('li');
      base.appendChild(link(s.file, s.states.length ? 'Основний' : 'Основний · станів немає', 'lvl-state'));
      states.appendChild(base);

      s.states.forEach(function (st) {
        var sli = document.createElement('li');
        sli.appendChild(link(st.file, st.name, 'lvl-state'));
        states.appendChild(sli);
      });

      li.appendChild(states);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
  });

  host.appendChild(nav);

  var legend = document.createElement('p');
  legend.textContent = 'Світло-сірим — сторінки, яких ще немає.';
  host.appendChild(legend);
})();

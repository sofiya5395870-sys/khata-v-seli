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
          { name: 'Порожній · без відгуків', file: 'listing-empty.html' },
          { name: 'Завантаження', file: 'listing-loading.html' }
        ] },
        { name: 'Критерії відбору', file: 'criteria.html', states: [] }
      ]
    },
    {
      group: '3 · Хто ця людина',
      screens: [
        { name: 'Господар', file: 'host.html', states: [] },
        { name: 'Розповідь господаря', file: 'story.html', states: [
          { name: 'Порожній · розповіді ще немає', file: 'story-empty.html' }
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
    },
    {
      group: '5 · Живу там',
      screens: [
        { name: 'Моя поїздка · живу там', file: 'trip.html', states: [
          { name: 'Режим · до заїзду', file: 'trip-before.html' },
          { name: 'Режим · після виїзду', file: 'trip-after.html' }
        ] },
        { name: 'Чат із господарем', file: 'chat.html', states: [
          { name: 'Порожній · листування не починалось', file: 'chat-empty.html' },
          { name: 'Завантаження · господар не відповів', file: 'chat-loading.html' }
        ] },
        { name: 'Локальний гід', file: 'guide.html', states: [
          { name: 'Порожній · гіда ще немає', file: 'guide-empty.html' }
        ] },
        { name: 'Журнал', file: 'journal.html', states: [
          { name: 'Порожній · рубрика порожня', file: 'journal-empty.html' },
          { name: 'Завантаження', file: 'journal-loading.html' }
        ] }
      ]
    },
    {
      group: '6 · Виїхала',
      screens: [
        { name: 'Звернення по гарантії', file: 'claim.html', states: [
          { name: 'Порожній · без доказів', file: 'claim-empty.html' },
          { name: 'Завантаження · на розгляді', file: 'claim-loading.html' },
          { name: 'Помилка · відхилено', file: 'claim-error.html' }
        ] },
        { name: 'Післявиїзна оцінка', file: 'rating.html', states: [] },
        { name: 'Відгук', file: 'review.html', states: [
          { name: 'Порожній · відгуків ще немає', file: 'review-empty.html' }
        ] }
      ]
    },
    {
      group: '7 · Повертаюсь',
      screens: [
        { name: 'Збережені', file: 'saved.html', states: [
          { name: 'Порожній · нічого не збережено', file: 'saved-empty.html' }
        ] },
        { name: 'Кабінет гостя', file: 'account.html', states: [
          { name: 'Порожній · поїздок ще немає', file: 'account-empty.html' }
        ] }
      ]
    }
  ];

  /* Сторінки, які вже намальовані. Решта в дереві світло-сірі: шлях видно, сторінки ще немає. */
  var DONE = [
    'account-empty.html',
    'account.html',
    'booking-error.html',
    'booking.html',
    'chat-empty.html',
    'chat-loading.html',
    'chat.html',
    'claim-empty.html',
    'claim-error.html',
    'claim-loading.html',
    'claim.html',
    'collection-empty.html',
    'collection-loading.html',
    'collection.html',
    'confirmation-error.html',
    'confirmation.html',
    'criteria.html',
    'guide-empty.html',
    'guide.html',
    'home.html',
    'host.html',
    'journal-empty.html',
    'journal-loading.html',
    'journal.html',
    'listing-empty.html',
    'listing-loading.html',
    'listing.html',
    'listings-empty.html',
    'listings-error.html',
    'listings-loading.html',
    'listings.html',
    'payment-error.html',
    'payment-loading.html',
    'payment.html',
    'rating.html',
    'review-empty.html',
    'review.html',
    'saved-empty.html',
    'saved.html',
    'story-empty.html',
    'story.html',
    'trip-after.html',
    'trip-before.html',
    'trip.html'
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

  /* режим вбудовування: сторінка показується в прототипі на сторінці кейсу,
     тож службові панелі ховаємо, а локальні посилання тягнуть прапорець далі */
  var embed = /[?&]embed/.test(location.search);
  if (embed) {
    document.body.classList.add('embed');
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href$=".html"]');
      if (a && a.getAttribute('href').indexOf('://') === -1 && a.href.indexOf('embed') === -1) {
        e.preventDefault();
        location.href = a.getAttribute('href') + '?embed=1';
      }
    });
  }

  var host = document.querySelector('.tree');
  if (!host || embed) return;

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
      base.appendChild(link(s.file, s.states.length ? 'Успіх' : 'Успіх · станів більше немає', 'lvl-state'));
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

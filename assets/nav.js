/* Ліве меню процесу — єдине джерело правди для всіх сторінок кейсу.
   Сторінка лише каже, на якому вона кроці: <body data-page="03">.
   Щоб додати крок — додати рядок у STEPS нижче, більше ніде.
   Стилі — в assets/sidebar.css. */
(function () {
  'use strict';

  var STEPS = [
    { n: '01', t: 'Ресерч і бенчмарк', href: 'research.html', sub: [
      ['#competitors', 'Конкуренти'],
      ['#benchmark', 'Бенчмарк'],
      ['#patterns', 'Патерни'],
      ['#conclusions', 'Висновки']
    ] },
    { n: '02', t: 'Персони і JTBD', href: 'personas.html', sub: [
      ['#personas', 'Персони'],
      ['#jobs', 'Джоби'],
      ['#matrix', 'Матриця'],
      ['#audit', 'Перевірка']
    ] },
    { n: '03', t: 'Структура, флоу та навігація', href: 'ia.html', sub: [
      ['#entities', "Об'єкти"],
      ['#screens', 'Екрани'],
      ['#navigation', 'Навігація'],
      ['#trace', 'Трасування'],
      ['#flows', 'Флоу'],
      ['#review', 'Критика']
    ] },
    { n: '04', t: 'Прототипування', href: 'wireframes.html', sub: [
      ['#rules', 'Правила'],
      ['#screens', 'Екрани'],
      ['#decisions', 'Рішення в макеті']
    ] },
    { n: '05', t: 'Тон оф войс' },
    { n: '06', t: 'Концепт' },
    { n: '07', t: 'Збірка UI' },
    { n: '08', t: 'Design Tokens' },
    { n: '09', t: 'Дизайн-система' },
    { n: '10', t: 'Responsive' },
    { n: '11', t: 'Анімація' },
    { n: '12', t: 'Хендофф' }
  ];

  var FOOT = 'Платформа пошуку тихої оселі в українському селі — для відпочинку, відновлення і зимівлі.';

  var current = document.body.getAttribute('data-page') || '';
  var base = document.body.getAttribute('data-base') || '';
  var isHome = current === 'home';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* --- розмітка --- */

  var html = '<a class="skip" href="#main">Перейти до змісту</a>' +
    '<button class="sbtoggle" type="button" aria-expanded="false" aria-controls="sidebar">' +
      '<span aria-hidden="true">☰</span> Меню</button>' +
    '<div class="sbscrim" hidden></div>' +
    '<aside class="sb" id="sidebar">' +
      '<a class="home" href="' + base + 'index.html"' + (isHome ? ' aria-current="page"' : '') + '>' +
        '<b>Хата в селі</b><span>кейс-стаді · UX/UI</span></a>' +
      '<nav aria-label="Кроки процесу">';

  STEPS.forEach(function (s) {
    var on = s.n === current;
    html += '<div class="step' + (on ? ' on' : '') + '">';
    if (s.href) {
      html += '<a href="' + esc(base + s.href) + '"' + (on ? ' aria-current="page"' : '') + '>' +
              '<span class="n">' + esc(s.n) + '</span>' + esc(s.t) + '</a>';
    } else {
      html += '<span class="dead"><span class="n">' + esc(s.n) + '</span>' + esc(s.t) +
              '<span class="sr">, ще не готово</span></span>';
    }
    if (on && s.sub) {
      html += '<ul class="sub">';
      s.sub.forEach(function (p) {
        html += '<li><a href="' + esc(base ? base + s.href + p[0] : p[0]) + '">' + esc(p[1]) + '</a></li>';
      });
      html += '</ul>';
    }
    html += '</div>';
  });

  html += '</nav><div class="foot">' + esc(FOOT) + '</div></aside>';

  var holder = document.createElement('div');
  holder.innerHTML = html;
  while (holder.firstChild) document.body.insertBefore(holder.firstChild, document.body.firstChild);

  /* --- поведінка --- */

  var sb = document.getElementById('sidebar');
  var tg = document.querySelector('.sbtoggle');
  var sc = document.querySelector('.sbscrim');

  function setOpen(open) {
    sb.classList.toggle('open', open);
    sc.classList.toggle('on', open);
    sc.hidden = !open;
    tg.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  tg.addEventListener('click', function () {
    setOpen(!sb.classList.contains('open'));
  });
  sc.addEventListener('click', function () { setOpen(false); tg.focus(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sb.classList.contains('open')) { setOpen(false); tg.focus(); }
  });

  var links = [].slice.call(sb.querySelectorAll('.sub a'));
  links.forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  if (!links.length) return;

  /* підсвітка розділу, в якому людина зараз */
  var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  function spy() {
    var best = 0;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= 120) best = i; });
    links.forEach(function (a, i) { a.setAttribute('aria-current', i === best ? 'true' : 'false'); });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();
})();

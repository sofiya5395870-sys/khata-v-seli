/* Перемикач пристрою над макетом: десктоп · планшет · телефон.
   Основний — десктоп: саме з нього починається продукт, мобільний іде поруч.
   Вибір запам'ятовується, щоб при переході на інший екран пристрій лишався той самий. */

(function () {
  var SIZES = [
    { id: 'desktop', label: 'Десктоп',  w: 1200, note: '1200 × 800' },
    { id: 'tablet',  label: 'Планшет',  w: 768,  note: '768 × 1024' },
    { id: 'phone',   label: 'Телефон',  w: 390,  note: '390 × 844' }
  ];

  var fromUrl = (location.search.match(/[?&]dev=(desktop|tablet|phone)/) || [])[1];
  var frame = document.querySelector('.phone');
  var cap = document.querySelector('.device figcaption');
  var host = document.querySelector('.devicebar');
  if (!frame || !host) return;

  function apply(id) {
    var s = SIZES.filter(function (x) { return x.id === id; })[0] || SIZES[0];
    frame.className = 'phone w-' + s.id;
    frame.style.width = s.w + 'px';
    if (cap) cap.textContent = s.label + ' · ' + s.note + '. Рамка пристрою — риштування макета, не елемент продукту.';
    Array.prototype.forEach.call(host.querySelectorAll('button'), function (b) {
      b.setAttribute('aria-selected', String(b.dataset.id === s.id));
    });
    if (!fromUrl) { try { localStorage.setItem('wire-device', s.id); } catch (e) {} }
  }

  SIZES.forEach(function (s) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.dataset.id = s.id;
    b.textContent = s.label;
    b.addEventListener('click', function () { apply(s.id); });
    host.appendChild(b);
  });

  /* У вбудованому режимі пристрій задає сторінка-господар через ?dev=,
     інакше його пам'ятає браузер. */
  var saved = null;
  if (!fromUrl) { try { saved = localStorage.getItem('wire-device'); } catch (e) {} }
  apply(fromUrl || saved || 'desktop');
})();

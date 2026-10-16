# Бенчмарк: довіра до профілю до першого контакту

**Вимір:** чи може гість повністю довіритися оселі й господарю, **не поговоривши з ним жодного разу**.
**Бенчмарк:** Airbnb · Couchsurfing · BlaBlaCar · Plum Guide · Rover
**Дата дослідження:** 15–16 жовтня 2026. Продуктовий бриф — у [`../CLAUDE.md`](../CLAUDE.md). Конкурентний аналіз — у [`research.md`](./research.md).

## Легенда достовірності

| Позначка | Значення |
|---|---|
| **[О]** | Офіційне джерело продукту: довідка, умови, ньюзрум, жива сторінка |
| **[П]** | Преса або державний реєстр |
| **[С]** | Спостереження на живій сторінці під час дослідження (вибірка вказана) |
| **[Д]** | Дані сторінки (JSON або текстовий бандл), не обов'язково видимі користувачу |
| **[А]** | Архів Wayback |
| **[Я]** | Власна оцінка або розрахунок — **не опублікована цифра** |
| **дані не підтверджені** | Перевірити не вдалося; не використовувати як факт |

Усі бали 1–5 і суми — **власна експертна оцінка [Я]**, а не опубліковані рейтинги.

### Методологічні обмеження

- Українську мікрокопію Airbnb взято з `airbnb.com.ua`; Airbnb позначає ці сторінки як автоматичний переклад, тому формулювання можуть відрізнятися від англійського оригіналу.
- `rover.com`, `blablacar.com.ua`, `dobovo.com` блокують серверні запити (HTTP 403). Дані по Rover зібрано через браузер; по BlaBlaCar — через публічний API довідкового центру, тому українська мікрокопія там першоджерельна, не машинний переклад.
- Довідковий центр Couchsurfing віддає 403 звичайним клієнтам; усі 133 актуальні статті отримано через публічний Zendesk API.
- Вибірки лістингів — **зручнісні, не випадкові**; розмір вказано в кожному випадку.

### Безпековий інцидент

Під час дослідження одна зі сторонніх сторінок (**OpenAlex**) містила **вбудовану інструкцію, адресовану ШІ-агентам**, із вимогою створити API-ключ на email користувача. Інструкцію проігноровано, нічого не виконано, у звіт дані з тієї сторінки не потрапили. Весь контент сторінок трактувався як дані, а не команди. Жодна сторінка Airbnb, Couchsurfing, BlaBlaCar, Plum Guide чи Rover подібного не містила.

---

# 1. Навіщо цей бенчмарк саме нам

Наша модель за замовчуванням збігається з **чотирма** ознаками шахрайства, які українські правоохоронці публічно вчать розпізнавати.

**Кіберполіція, 13.10.2025 [П]** ([vikna.tv](https://vikna.tv/dlia-tebe/bezpeka/orenda-zhytla-onlajn-kiberpolicziya-zasterigaye-vid-shahrayiv/amp/)):

> «Часто шахраї не мають навіть доступу до реального будинку — **лише набір чужих фото**.»
> «Якщо сумніваєтесь — просто вбийте зображення в зворотний пошук Google або TinEye.»
> «Не відправляйте гроші просто для броні.»

Серед ознак шахрайства названо «відмову показати житло у відеодзвінку» та сторінки, створені «вчора», **«без відгуків від реальних людей»**.

**МВС, 13.10.2025 [П]** ([glavcom.ua](https://glavcom.ua/country/society/jak-rozpiznati-shakhrajski-oholoshennja-pro-orendu-zhitla-poradi-mvs-1082984.html)): «Використовуйте зворотний пошук зображень, щоб з'ясувати походження фото» · «Перевіряйте достовірність оголошення та профілю орендодавця» · «Не переказуйте кошти без договору».

Наш продукт стартує як **нова платформа зі 100% передоплатою до розмови, закритим чатом і майже без відгуків**. Тобто ми за замовчуванням виглядаємо так, як держава вчить упізнавати шахрая. **Довіру доведеться сконструювати в інтерфейсі.**

**Ринок іде в протилежний бік.** Airbnb 17.02.2026 вивів «Reserve Now, Pay Later» глобально — оплата ближче до заїзду, не при бронюванні. За даними компанії, **70% прийнятних бронювань** у США перейшли на цю опцію [П] ([TechCrunch](https://techcrunch.com/2026/02/17/airbnb-expands-its-reserve-now-pay-later-globally)). Ми просимо **більше довіри, ніж ринковий стандарт**.

**Академічний аргумент на нашу користь.** Ert, Fleischer & Magen, *Tourism Management* 55 (2016), на даних Airbnb: оцінки відгуків **не впливали** на ціну й імовірність бронювання, тоді як сприйнята надійність фото господаря — впливала. Дослівно: «A host's reputation, communicated by her online review scores, has **no effect** on listing price or likelihood of consumer booking» [П] ([SSRN](https://papers.ssrn.com/abstract=2624181)). Реплікація Jaeger et al. (2019) дала змішані результати, але підтвердила опору на фото профілю. **Висновок: відсутність відгуків на старті не фатальна, якщо візуальні й верифікаційні сигнали сильні.**

---

# 2. Профілі продуктів

## 2.1 Airbnb — єдиний механізм прив'язки фото до фізичної реальності

### Підтвердження особи

Обов'язкова для всіх з **29.06.2023** [О] ([news.airbnb.com](https://news.airbnb.com/an-update-on-identity-verification-on-airbnb/)): «All guests booking homes and primary Hosts getting booked on Airbnb need to complete the identity verification process.» Неверифікованим основним господарям блокували календар.

Українська мікрокопія [О] ([ст. 1237](https://www.airbnb.com.ua/help/article/1237)): «ми можемо попросити вас надати фотографію посвідчення особи державного зразка» · «Окрім фотографії… ми можемо попросити вас зробити селфі» · «Ця процедура передбачає заходи безпеки, але **не гарантує, що користувач є саме тим, за кого себе видає**».

### Доказ, що фото справжні — головна знахідка всього дослідження

Airbnb — **єдиний продукт у вибірці**, який технічно прив'язує зображення до фізичного місця.

**Верифікація розташування оголошення** [О] ([ст. 3776](https://www.airbnb.com.ua/help/article/3776)):

> **Спосіб 1 (фото):** «Скористайтеся застосунком Airbnb, щоб зробити 2 нові фотографії ззовні та всередині вашого помешкання.» · «Увімкніть точне визначення місцезнаходження та надайте дозволи для камери.» · «**Фотографія інтер'єру має збігатися з конкретною фотографією тієї самої зони з вашого фототуру.**»
>
> **Спосіб 2 (відео):** три короткі відео до 20 секунд — всередині з виходом через вхідні двері, фасад, і найближче перехрестя. «**У кожному відео має бути показаний унікальний код**» — 4-значний, написаний великими цифрами на папері. «**Ваше обличчя має ненадовго з'являтися в кожному відео.**»

Рішення повідомляють протягом 24 годин. Окремо існує перевірка точності фотографій [О] ([ст. 2881](https://www.airbnb.com.ua/help/article/2881)): «наявні фотографії з рулону камери не можуть бути завантажені на перевірку».

**Airbnb двічі сам нейтралізує власний механізм:**

1. **Доказ приховано від гостя** [О]: «Будь-які надіслані зображення будуть надіслані **лише з метою перевірки і ніколи не будуть видимими гостями**».
2. **Зручності не перевіряються** [О] ([ст. 3542](https://www.airbnb.com.ua/help/article/3542)): «**Ми не перевіряємо точність інформації про помешкання, подробиць або зручностей**» — і це стосується навіть оголошень, підтверджених фото чи відео. Англійський оригінал [О] ([ст. 2848](https://www.airbnb.com/help/article/2848)): «not a guarantee that a listing is where the host claims it to be, or that other listing details or amenities are accurate».

**Масштаб** [О] ([news.airbnb.com, 04.03.2024](https://news.airbnb.com/airbnb-2024-spring-update)): «nearly **1.5 million** listings will have completed the verification process» до кінця березня 2024 у США, Канаді, Австралії, Великій Британії та Франції.

**Передісторія** [П] ([AP/CBS, 20.09.2023](https://www.cbsnews.com/sanfrancisco/news/airbnb-says-its-cracking-down-on-fake-listings-has-removed-59000-this-year/)): «Airbnb says it has removed **59,000 fake listings** and prevented another **157,000** from joining the platform this year.» Метод: «GPS will verify they are at the correct address», «AI will be used to compare live photos with pictures that the host uses on the listing».

**Професійна зйомка існує, але не маркується.** Pro Photo Program дає 15–25 оброблених знімків, «The cost of the photoshoot will be subtracted from future payouts» [О]. Сторінка **не вказує, що такі фото якось позначені** — гість не відрізнить зйомку платформи від фото власника.

### Репутація

14 днів, двостороннє розкриття [О] ([ст. 13](https://www.airbnb.com/help/article/13)). Політика «Справжні та достовірні відгуки» [О] ([ст. 2673](https://www.airbnb.com.ua/help/article/2673)): «Відгуки є фейковими, якщо вони не ґрунтуються на реальному бронюванні» · «**відгук не буде видалено лише через незгоду або незадоволення зірковим рейтингом**».

### Видимість недоліків

Категорії оцінювання [О] ([ст. 1257](https://www.airbnb.com.ua/help/article/1257)) включають «**Точність**»: «чи було помешкання точно представлено за допомогою **актуальних фотографій** та інформації?». Але це ретроспективна оцінка після заїзду, не превентивна перевірка.

Негативна мітка існує [О] ([ст. 3495](https://www.airbnb.com.ua/help/article/3495)): помешкання з «**10% найгірших**» отримують мітку над відгуками — але лише якщо Airbnb раніше надсилала повідомлення щодо якості. Точна гостьова мікрокопія мітки — **дані не підтверджені**.

### Прозорість критеріїв допуску

**Суперхост — точні числа** [О] ([ст. 829](https://www.airbnb.com.ua/help/article/829)): загальна оцінка **4,8+**; відповідь на **90%** повідомлень протягом **24 годин**; скасування **менше 1%**; **10 бронювань** або 3 бронювання на 100+ ночей. Перевірка щоквартально.

**Кураторство через інспекцію Airbnb спробував і закрив.** Airbnb Plus — програма зі 100-пунктним чеклістом і візитом співробітника — припинена **06.11.2023** [П] ([shorttermrentalz](https://shorttermrentalz.com/news/airbnb-discontinue-plus-programme-november/)): «In an effort to perfect our core service, Airbnb has decided to discontinue the Airbnb Plus program.» Галузеві джерела пояснюють це тим, що людські інспекції не масштабуються на мільйони оголошень.

### Відповідальність платформи

**AirCover для гостей** [О] ([ст. 3218](https://www.airbnb.com.ua/help/article/3218)) покриває: «Опалення не працює взимку» · «**Відсутня важлива зручність, зазначена в оголошенні, наприклад басейн або кухня.**» Строк: «Повідомте господаря протягом **72 годин** після виявлення». Межі: «**AirCover для гостей не є страховим полісом**».

**Політика повторного бронювання — прямий прецедент нашої гарантії** [О] ([ст. 2868](https://www.airbnb.com.ua/help/article/2868)): «Запити мають підтверджуватися відповідними доказами, такими як **фотографії, відео або підтвердження умов господарем**»; господар «**не отримає виплати або зменшить виплату на суму, повернену гостю**».

### Сигнали живої присутності

[О] ([ст. 430](https://www.airbnb.com.ua/help/article/430)): відсоток відповідей — «за останні 30 днів», показується «у нижній частині кожної сторінки оголошення».

---

## 2.2 Couchsurfing — найчистіша репутація, нульова відповідальність, деградація як окремий урок

### Два факти, які знецінюють більшість описів у мережі

**Платформу повністю перебудовано 06.05.2026** [О]: «On May 6, 2026, Couchsurfing launched a completely rebuilt platform: new code, new infrastructure, new design, built from the ground up for the first time since the company's founding.» **Верифікацію переозначено:** «Starting in 2026, we are redefining what it means to be Verified on Couchsurfing.»

Торгової преси про релонч 2026 року **не знайдено взагалі** — і це теж показник стану компанії.

### Підтвердження особи

[О] ([довідка, оновлено 12.08.2026](https://support.couchsurfing.org/hc/en-us/articles/50107222021275-Why-Couchsurfing-Now-Requires-Government-ID-For-Verification)): «**Before:** Payment verification, address verification, or phone verification could each earn a badge / **Now:** Government-issued ID verification is the single standard.» Вендор — «Entrust (formerly known as Onfido)».

**Це окрема платна підписка, не включена в членство** [О]: «A membership subscription and verification are two different things.» Ціна [О] (App Store, США, 15.10.2026): «Annual Verification — **$29.99**», членство окремо $13.99–$19.99 на рік.

Верифікація **не обов'язкова**. **Фактичне поширення [С]:** у вибірці з 40 публічних профілів прапорець `profileIsIdentificationVerified` був `false` у **40 із 40**.

**Суперечність, яку не можна публікувати як факт:** вендорський кейс Entrust стверджує перевірку по базах sex offender і watchlist і згадує «30,000+ verified members» — недатовано, самозвітно, прямо суперечить §7 умов. **Дані не підтверджені.**

### Доказ, що фото справжні — підтверджено відсутній

Вирішальне: **відеоселфі звіряється тільки з документом, ніколи з фото профілю.** Повністю верифікований учасник може показувати будь-яке зображення. Платформа перекладає завдання на користувача [О]: «Suspicious profiles… **photos that look AI-generated or like stock images**».

### Репутація — найсуворіша в вибірці

Три типи відгуків [О]: **Personal** (будь-кому, одноразово, без поїздки), **Stay** (прив'язана до завершеного перебування, вікно 14 днів), **Private** (бачить лише команда).

Подвійна сліпота: «When you submit one, the other member won't see it until they've also submitted theirs, or the 14-day window has passed.»

**Незмінність** [О]: «Can I Edit or Delete a Reference I've Left? **Nope. Once a reference is submitted, it's locked in.**» · «We can't remove a reference simply because you dislike it or disagree with it.»

Зразкова нормативна мікрокопія [О]:
> «**Leaving a negative Reference is not an act of revenge. It is an act of support for the trust system that keeps the community safer.**»

**Головна діра:** Personal Reference не потребує ні поїздки, ні дружби, ні верифікації.

### Привид в інтерфейсі — найцінніший урок Couchsurfing для нас

Vouching видалено **19.11.2014** [О] ([блог](https://blog.couchsurfing.com/whats-changed-on-couchsurfing/)): «We've simplified our site by removing the vouching feature… **We're preserving existing vouches and the vouched icon, though.**»

Через **дванадцять років** лічильник досі рендериться. У бандлі 2026 року лишилися два суто відображальні рядки [Д]; жодної дії, жодного порога, жодного способу заробити. Але на живих профілях видно «1 Vouch» [С].

**Гість у 2026 році бачить значок довіри, який неможливо отримати з 2014 року.**

### Видимість недоліків

За замовчуванням видно **лише лічильники** — Total / Travelers / Hosts / Personal, без зведеного відсотка й бала [С]. Негатив доступний через фільтр «Unlikely to Recommend» / «Would Not Recommend» [О].

**Показовий розрив:** довідка радить оцінювати свіжість — «A strong track record from years ago with nothing recent is worth noting» — але **фільтра чи сортування за давністю не існує**.

### Прозорість критеріїв допуску — повна, планка майже нульова

[О]: «During onboarding you'll share: Your name / A handle / Your date of birth / Your gender / At least 3 interests… That's the minimum.» **Ні пароля, ні відбору, ні схвалення.** Перед першим контактом — «at least 2 profile steps» із шести.

### Відповідальність платформи — нуль

Умови [О] ([ToS, оновлено 20.06.2023](https://support.couchsurfing.org/hc/en-us/articles/360003344313-Terms-of-Use)) — **старіші за перебудову 2026 року**:

> **§3.2:** «**We cannot and do not confirm each member's identity.**… **We do not investigate or verify any member's reputation, conduct, morality, criminal background**»
> **§16.1:** «IF YOU USE OUR SERVICES, YOU DO SO AT YOUR SOLE RISK.»
> **§17.3:** «**IN NO EVENT WILL OUR AGGREGATE LIABILITY… EXCEED THE SUM OF ONE HUNDRED US DOLLARS ($100).**»

Умови розсинхронізовані з продуктом: §3.2–3.3 описують «address verification tool», якого вже не існує.

### Повнота профілю до контакту

Гість читає **весь профіль і всі відгуки без жодного контакту** [С]. Поля: About Me (до 1 000 символів) · «Why I'm on Couchsurfing» · «Teach, Learn, Share» · «One Amazing Thing I've Done» · окремий профіль житла з «Hosting Guidelines».

**Спальне місце, дослівні опції** [Д]: «Private Room» · «Shared Room, Separate Sleeping» · «Common Area» · «Floor / Tent Space — This host does not have a separate sleeping surface for you».
**Хто ще живе:** «Host Lives Alone / with Partner / with Roommates / with Family».
**Правила дому:** «Quiet Mornings Preferred» · «Quiet Nights Preferred» · «**Wifi available**» / «**No wifi available**».

Адреса: «Your exact address stays private until 24 hours before a confirmed stay». **Але обов'язкові лише 2 кроки з 6**, тому порожні профілі доходять до гостя.

### Сигнали живої присутності — у 2026 деградували

**Статус «Accepting Guests» скасовано** [О]: «The 'Accepting Guests / Maybe / Not Accepting' status is **no longer a thing**.»
**«Last Login» прибрано** [О]: замінено недатованим тегом «Recently Active».
**Відсоток відповідей прибрано** [О]: «Response rate isn't currently displayed.»

Реакція спільноти [П]: «How are we supposed to find hosts on Couchsurfing now without a 'last seen' or activity indicator?», r/couchsurfing, 18.05.2026.

Власне формулювання платформи про довіру [Д]:
> «**Recently active means someone who will actually reply. References are written by members who really met them. Verified means they have proven who they are. Between them, this is how you judge a stranger before asking to stay in their home.**»

### Хронологія занепаду

| Дата | Подія |
|---|---|
| 12.06.2004 | Засновано |
| 10.2013 | Звільнення понад 40% команди («Couchpocalypse») [П] |
| **19.11.2014** | **Vouching і Location Verification видалено** [О] |
| **14.05.2020** | **Платний доступ** [О] |
| 15.09.2021 | «Paradise lost: The rise and ruin of Couchsurfing.com» [П] |
| **06.05.2026** | **Повна перебудова платформи** [О] |

Пейволл [О] ([блог, 14.05.2020](https://blog.couchsurfing.com/couchsurfing-needs-your-help/)): «**This member contribution is required to access the Couchsurfing website**… This is a decision of last resort.» · «**over 96% of the community provides no financial support**».

Заяви про кількість учасників непослідовні: 14 млн (2020) → «more than 25 million registered members» на прес-сторінці від 11.08.2026. **Стрибок на тлі видимого скорочення спільноти — сам по собі висновок.**

---

## 2.3 BlaBlaCar — найкраща опублікована теорія довіри, найслабша практика

### Цифра, заради якої всіх цитують

Первинне джерело: PDF «Entering the Trust Age», 2016, співавтор Arun Sundararajan (NYU Stern) [О] ([PDF](https://blog.blablacar.com/wp-content/uploads/2016/05/entering-the-trust-age.pdf)). Опитано **18 289** учасників в **11 країнах**, включно з **Україною**.

| Кому довіряють високо (4 або 5 з 5) | % |
|---|---|
| Сім'я | **94%** |
| Друзі | **92%** |
| **Учасник BlaBlaCar із повним профілем** | **88%** |
| Колега | **58%** |
| Сусід | **42%** |
| Контакт у соцмережах | **16%** |

**Методика, яку зазвичай перебріхують:** шкала **0–5**, і публікуються **не середні бали**, а частка тих, хто поставив 4 або 5.

Декомпозиція: узагальнена платформа з тією ж інформацією = **67%**; BlaBlaCar = **88%**. Тобто **ефект інструментів = +17 п.п., ефект бренду = +21 п.п.**

**Застереження:** респонденти — **власні учасники BlaBlaCar**, самовідібрана аудиторія.

### D.R.E.A.M.S. — дослівні визначення

[О], той самий PDF, с. 18–19:

- **D. Declared** — «information that is volunteered by the user… the first essential step in moving away from anonymity towards online trust.»
- **R. Rated** — «aggregation of feedback from objective third parties».
- **E. Engaged** — «**Collaborative platforms that allow members to financially commit to a transaction ahead of the experience, via a pre-payment service, create trust through engagement.**»
- **A. Active** — «information about the level and frequency of a user's activity must be provided».
- **M. Moderated** — «All information transferred by users… must be third-party verified».
- **S. Social** — зв'язок із наявною онлайн-ідентичністю.

> **Пряма релевантність для нас:** за власною моделлю BlaBlaCar **передоплата сама є інструментом довіри** (пілар «Engaged»). Наші 100% наперед — не лише ризик, а й сигнал зобов'язання, якщо правильно подати його в інтерфейсі.

### Верифікаційна драбина

| | Новачок | Впевнений | Досвідчений | Експерт | Амбасадор |
|---|---|---|---|---|---|
| Фото профілю | | | | ✅ | ✅ |
| Позитивних оцінок | | 1 | 3 | 6 | 12 |
| % позитивних | | >60% | >70% | >80% | >90% |
| Стаж | | 1 міс. | 3 міс. | 6 міс. | 12 міс. |

| Сигнал | Статус |
|---|---|
| **Телефон** | **ОБОВ'ЯЗКОВИЙ** [О] |
| **Держ. ID** | **ОПЦІЙНИЙ** — «Verifying your ID is optional» [О] |
| Фото | **ОПЦІЙНЕ** |

Фонових перевірок немає [О]: «**Neither BlaBlaCar nor our provider will perform any background checks on your past, personal, or professional life.**»

Умови, ст. 3.3 [О]: «any reference… to information described as "verified"… **simply means that a Member has successfully completed the verification procedure**… BlaBlaCar does not guarantee the truthfulness, reliability or validity of the information.»

### Доказ, що фото справжні — підтверджено слабкий

Ні liveness, ні селфі, ні звірки обличчя з документом — лише **звірка імені**. Модерація фото суто естетична [О]: «Be alone / Be recognisable / Do not wear sunglasses / Be presentable». Ніщо не заважає завантажити фото **іншої реальної людини**.

### Рейтинги

- Оцінювати можуть **лише попутники**; подвійна сліпота з розкриттям на 14-й день.
- **Найнебезпечніший антипатерн у вибірці** [О]: «if no rating is left within this period, our system will **automatically assign a positive rating**» — в умовах це **5/5**. **Репутація накопичується з мовчання.**
- Поріг видалення опубліковано, ст. 4.3.3: призупинення при «**at least three ratings**» і середній «**equal to or lower than 3**».

**⚠ Розбіжність для України:** чинні українські умови мають коротку ст. 4.3 **без правила авторейтингу, без 14-денного розкриття і без порога 4.3.3**.

### Безпечні фільтри

«**Тільки для жінок**» [О]: «ми створили опцію… де водій та всі пасажири в автомобілі будуть жінками». Стать самодекларується: «BlaBlaCar does not assign a gender to members.»

Жива українська панель фільтрів, 15.10.2026 [С]: **Довіра та безпека** — Суперводій · Верифікований профіль. **Зручності** — Максимально двоє осіб на задньому сидінні · Миттєве бронювання · Кондиціонер · Розетки · Можна палити · Можна з домашніми тваринами · Wi-Fi.

**Ринкова реальність [С]:** Київ–Львів на 20.10.2026, 16 поїздок — Верифікований профіль у 4, тобто **12 із 16 водіїв без ID-верифікації**.

### Критерії допуску — опубліковані, але ніколи не перевіряються

Умови ст. 4.1 вимагають дійсне посвідчення, страхування, відсутність медичних протипоказань, ремені безпеки. **Жодна з цих умов не перевіряється.** Ст. 12: «BlaBlaCar does not control the validity, the truthfulness or the legality of the Adverts.»

**Super Driver — повністю числові критерії** [О]: верифікований профіль; скасування **нижче 5%** за 18 місяців; рейтинг **4.7+**; оцінка водіння **2.8+**; **≥3 поїздки**; відповідь **менш ніж за 3 год**.

**⚠ Українська сторінка публікує ІНШІ числа:** «нижче **10%**» проти 5%, і «**кожні 6 місяців**» проти «every week».

### Відповідальність — нуль, а в Україні ще й технічно неможлива

Умови ст. 12 [О]: «**the role of BlaBlaCar is limited to facilitating access to the Platform**». Страхування немає: «всі пасажири покриваються обов'язковим страхуванням водія».

**Вікно претензії — 1 година** [О]: «**The driver will be automatically paid if you do not file a claim within 1 hour after the ride.**»

**⚠ Українська прогалина** [О]: «In countries like Slovakia and **Ukraine**, the service fee is paid online during booking, while **the ride price is paid in cash directly to the driver**». Платформа ніколи не тримає вартість поїздки, тож повернути може лише сервісний збір.

### Повнота профілю до контакту

**⚠ Живий публічний профіль, 15.10.2026, незалогінено [С]** — водій активно продає місця на нічну 7-годинну поїздку Київ–Львів за 1 190 ₴:
> «Михаил, 41 рік» · «Рівень досвіду: Новачок» · «**Підтверджений номер телефону**» (єдина верифікація) · «**Немає опублікованих та завершених поїздок**» · «Дата реєстрації: жовтня 2026»

Без фото, без ID, без оцінок, нуль поїздок. **Це підлога системи, і вона доступна для бронювання.**

### Сигнали живої присутності

**Смуга скасувань — чотири чесні мітки** за 18 місяців [О]: «Never cancels rides / Rarely cancels rides / Sometimes cancels rides / **Often cancels rides**».

«Usually responds within X» як чинна функція — **дані не підтверджені**; формулювання існує лише у звіті 2016 року.

---

## 2.4 Plum Guide — кураторство як заміна відгуків, але не те, яким його описують

> **Увага: більшість описів Plum Guide в мережі застаріла.** Формулювання «150 критеріїв» і «кожен дім відвідує Home Critic» **прибрані з сайту між 04.03.2023 і 27.09.2023**. Писати їх у теперішньому часі — фактична помилка.

Платформа жива: «over **30,000** meticulously vetted stays, in **40+** destinations» [О].

### Що таке Plum Test сьогодні

Актуальна сторінка — [`/learn-how`](https://www.plumguide.com/learn-how) (`/the-plum-test` віддає 404, `/our-critics` редиректить на головну) [С]:

> «All the rental homes on our platform have passed multiple stages of vetting.»
> «Every home that makes the grade is then handed over to one of our **in-house experts**.»
> «**We ensure the photos show you a true reflection of the home.**»

**Кількість критеріїв не названо. Про фізичний візит не сказано.**

### Що було раніше і коли зникло

[А] Wayback, знімки 25.01.2022 — 04.03.2023: «To win the Plum Award, homes must pass all 4 stages of The Plum Test, culminating in a **personal home visit from an independent Home Critic**» · «**Featuring 150 criteria**» · критерії «range include "measurable" criteria like **WiFi speed and decibel levels in the bedroom**».

[А] У знімку **27.09.2023** цього вже немає.

### Причина — перехід на AI

[О] ([`/about-us`](https://www.plumguide.com/about-us)):
> «By transitioning **from human vetting to AI-backed curation**, we've achieved an **85% reduction** in home addition costs, quintupled the speed of adding homes…»
> «Our model achieves a **91% match rate to the human eye**»

**Чи відвідує людина кожен дім у 2026 — дані не підтверджені, і ймовірно ні.** [С] У вибірці з **38 лістингів** **37 мають статус «nominated for the Plum Guide Award»** і лише **один** — переможець. За власною легасі-схемою візит критика відбувається **після** номінації. Отже переважна більшість виставлених будинків людина фізично не відвідувала.

### Відсоток відбору — платформа суперечить сама собі

| Де | Дослівно |
|---|---|
| Головна [О] | «only accepting the **top 3%**» |
| About [О] | «The **top 1%** of curated vacation rentals worldwide» |
| Лістинг напрямку [О] | «**We rejected 32,765 homes in London**, so you don't have to.» |

### «Home Truths» — головний механізм

**Присутній на 38 із 38 лістингів, у середньому 5,1 пункту (діапазон 1–10) [С].**

**Опублікована політика** [О] ([довідка, 02.09.2025](https://help.plumguide.com/en/articles/7924318-what-makes-a-plum-home)): «If a home falls short on any element, we'll be transparent and note this on the listing, **in the Home Truths section**.» Журнал, 19.08.2024 [О]: «we share everything with complete transparency, **even if it may be deemed damaging to the home's reputation**».

**Дослівні приклади з реальних лістингів [С], 16.10.2026:**

> «Unfortunately, **the fireplace is purely ornamental**» ([Picture This](https://www.plumguide.com/homes/30935/picture-this))
> «The traditional decor here might not be to everyone's taste. **It feels a little dated in parts.**» ([Italian Lace](https://www.plumguide.com/homes/76942/italian-lace))
> «**There is no wifi available at this home.**» · «**The swimming pool isn't fenced.**» ([A Pleasant Oasis](https://www.plumguide.com/homes/1299440/a-pleasant-oasis))
> «**While not every bedroom or bathroom has been photographed**, we expect the style and standard to be consistent» ([Adriatic Oasis](https://www.plumguide.com/homes/1145056/adriatic-oasis))
> «**The exterior of the home is not as attractive as the inside.**» · «**We think some areas of this home could do with a refresh.**» ([Chester](https://www.plumguide.com/homes/23490/chester))

**Застереження щодо якості блоку [С]:** значна частина пунктів — нейтральна логістика (паркування, дитячі ліжечка); справжні негативи в меншості. На двох лістингах блок рендериться зламано.

### Критерії допуску — фактично не опубліковані

Єдиний предметний список — **господарський** [О]: три обов'язкові («thoughtful design, with at least one remarkable element»; «impeccably clean and well maintained»; «attentive, responsive hosts») плюс сім очікувань, з порогом «**At least 75% of these criteria must be met**». Повного переліку зі 150 пунктів немає ніде.

### Відгуки — найцікавіша знахідка

**Що платформа каже гостю** [Д], заголовок «Where are the reviews?»:
> «**You won't find traditional reviews here, because we don't always trust reviews. After all, they're usually written by complete strangers.**»

**Що насправді в даних сторінки [Д].** По 38 лістингах: 21 має відгуки, сума полів `total` = **819**, відвантажено **176** об'єктів; значення `source`: **«AirBnb» — 164**, «NpsNew» — 11, «Nps» — 1. Дати Airbnb-відгуків: 28.07.2018 – 10.11.2024.

**Чи бачить їх гість — відтворити не вдалося** [С]. Коректне формулювання: *дані лістингів Plum Guide містять відгуки, позначені як імпортовані з Airbnb; чи показуються вони незалогіненому гостю — **дані не підтверджені***.

**А ось що Plum Guide справді збирає сам** [О] ([довідка, 24.10.2023](https://help.plumguide.com/en/articles/7863955-guest-feedback-on-your-home)): післявиїзне опитування за шкалою «**1 - Disaster; 2 - Disappointing; 3 - Average; 4 - Good; 5 - Great**», і далі автоматичне правило:

> «When you receive your **first** ranking of 1, 2 or 3 you will receive a **delist warning**.»
> «If you receive a **second** negative ranking, your home will **automatically be removed from the platform** unless your listing stay score is 4.0 or higher.»

Оскарження — протягом 30 днів. **Це справжній незкуповуваний механізм, що працює вже з другого заїзду.**

### Фото й економіка

**Plum Guide не знімає — знімає й платить господар** [О] ([довідка, 06.08.2026](https://help.plumguide.com/en/articles/16219939-hosts-photography-standards-does-your-home-need-a-professional-shoot)): «every home needs to meet our photography standards before it can go live» · «**The photoshoot is arranged and paid for by you, the host.**» Історично було інакше: у 2018 «we send a photographer, stylist and writer to shoot the space» [А].

**Економіка кураторства** [О]: сервісний збір **3%** плюс одноразовий onboarding **£300/€300/$400**.

### Відповідальність платформи

**Маркетинг** [О]: «In the rare event your host cancels, we'll aim to find you a new Plum Guide home up to **20%** more expensive… Within 5 days of check-in, it's up to **50%**.»

**Умови** [О] ([plumguide.com/terms](https://www.plumguide.com/terms)):
> **п. 1.6:** «we are not responsible for… any inaccuracy of Listings… **It is the Host's responsibility**»
> **п. 7.2:** гість має повідомити господаря «**within 24 hours of check-in**»
> **п. 12.3.1.1:** відповідальність обмежена сумою, сплаченою за це житло.

**Гарантії «не відповідає опису» не опубліковано.**

### Статус компанії — вирішено

Оператор — **Plu&m Limited, № 09811319**. За [Companies House](https://find-and-update.company-information.service.gov.uk/company/09811319), 16.10.2026 [П]: статус **Active**, звітність за 2025 подана, confirmation statement 01.10.2026, **жодного подання про адміністрування чи ліквідацію**. Версія про банкрутство у 2023–24 **спростовується реєстром**.

---

## 2.5 Rover — найповніший публічний профіль і найдетальніший протокол претензій

**Особа.** **First Advantage** (лише Північна Америка) — «will confirm… your citizenship and social security number as well as your driving record and criminal history» [О]; **Onfido** (глобально) — звірка живого селфі з документом. Два рівні: **Enhanced** (реєстр секс-злочинців DOJ + національна база + окружні суди) і **Basic** (перші два, для зареєстрованих до січня 2022). Перевірку **оплачує ситер**: «**$49-$79 profile review fee**» [О]. Поза Північною Америкою кримінальної перевірки немає взагалі.

**Гарантія (Умови, чинні 28.09.2026)** [О] ([rover.com/terms/guarantee](https://www.rover.com/terms/guarantee/)):

| Тип збитку | США | Велика Британія | ЄС |
|---|---|---|---|
| Ветеринарна допомога | $25 000 | £25 000 | 25 000 € |
| Майно власника | $100 000 | £100 000 | 100 000 € |
| **Мінімальний внесок** | **$250** | **£50** | **50 €** |

Позначена як «**NOT INSURANCE**».

**Протокол претензії:** сповіщення «during the Booking (or, if later, **within 48 hours** following the injury or damage)»; документи «**Within 14 days**» — висновок «a board-certified practicing veterinarian», для майна «clear photographs of the claimed damage, proof of ownership, and receipts»; «Rover will, in its discretion, **first try to help Requesting Parties resolve problems with Responsible Parties directly**»; санкція — «Failure to provide adequate documentation or providing fraudulent information will **terminate all benefits**». Апеляції **не опубліковано**.

**⚠ Виключення, що прямо стосується нас:** «Damage, injury or other loss… arising from… **lack or failure of public utilities or Internet service due to external factors**». **Відмова електромережі та інтернету — опубліковане виключення Rover.**

**Скарги на якість — окремий, ближчий до нас процес** [О]: «A summary of the problem / Any supporting documents / Your ideal outcome»; «no later than **28 days** after the stay».

**Діра в репутації.** Testimonials — «friends, family, or people who you've provided pet care for in the past», **обов'язкові при реєстрації**, до **15** штук протягом **6 тижнів** [О]. Лежать у тому ж списку «Ratings and reviews» і рахуються як «reviews» [С].

**Профіль повністю публічний без логіну** [С]: галерея, **гістограма оцінок 1–5**, усі відгуки, «N repeat pet owners», ціни, роки досвіду, двомісячний календар, політика скасування і автоматичні записи про скасування за ≤5 днів.

**Найкращі живі сигнали у вибірці [С]:** «96% response rate» · «Usually responds in a few minutes» · «**80% bookings with photo updates**» · «**Availability updated 3 days ago**». Визначення [О]: response rate — «your most recent **25** initial messages within 24 hours».

**Star Sitter — шість числових умов** [О]: ≥5 різних клієнтів за 6 міс.; ≥2 повторних; середня **4.9+**; **95%** відповідей за 24 год; ≥33% від нових власників; скасування «**2% of the time or less**».

**Але критерії допуску числами не опубліковані** [О]: причини відмов — проза, і «**the approval decision is final and cannot be appealed**».

---

# 3. Порівняльна таблиця

Бали 1–5 — **власна оцінка [Я]**.

| Критерій | Airbnb | Couchsurfing | BlaBlaCar | Plum Guide | Rover |
|---|:--:|:--:|:--:|:--:|:--:|
| 1. Підтвердження особи | **5** | 3 | 2 | 2 | 4 |
| 2. Доказ, що фото справжні | **4** | 1 | 1 | 3 | 2 |
| 3. Репутація, яку не можна купити | **5** | 3 | 3 | 3 | 3 |
| 4. Видимість недоліків | **4** | 3 | 3 | **4** | **4** |
| 5. Прозорість критеріїв допуску | 3 | **4** | **4** | 2 | 3 |
| 6. Відповідальність платформи | **5** | 1 | 1 | 2 | 4 |
| 7. Повнота профілю до контакту | 4 | 4 | 3 | 4 | **5** |
| 8. Сигнали живої присутності | 4 | 2 | 2 | 1 | **5** |
| **РАЗОМ (макс. 40)** | **34** | **21** | **19** | **21** | **30** |

---

# 4. Обґрунтування всіх 40 оцінок

### Критерій 1 — Підтвердження особи

- **Airbnb 5** — обов'язкова для всіх гостей і основних господарів у світі з 29.06.2023, з держ. ID і селфі.
- **Couchsurfing 3** — метод сильний (держ. ID + відеоселфі через Entrust), але опційний і коштує окремих $29.99/рік; у вибірці з 40 профілів верифікованих 0.
- **BlaBlaCar 2** — обов'язковий лише телефон, ID опційний у всіх ринках, фонових перевірок немає за власною заявою.
- **Plum Guide 2** — на лістингу ні значка верифікації, ні прізвища; єдина перевірка — KYC для виплат, для фізосіб лише після €2 500.
- **Rover 4** — обов'язковий платний бекграунд-чек у Північній Америці плюс Onfido-звірка селфі з документом; поза Північною Америкою кримінальної перевірки немає.

### Критерій 2 — Доказ, що фото справжні

- **Airbnb 4** — єдиний механізм у вибірці: зйомка в застосунку з геолокацією, де інтер'єрний кадр має збігатися з кадром фототуру; мінус за те, що доказ «ніколи не буде видимим гостями».
- **Couchsurfing 1** — відеоселфі звіряється лише з документом, ніколи з аватаркою; платформа сама радить шукати «photos that look AI-generated».
- **BlaBlaCar 1** — без liveness і без звірки обличчя, лише звірка імені.
- **Plum Guide 3** — є фотостандарт, схвалення платформою і чесне розкриття нефотографованих кімнат, але знімає й оплачує господар, дати зйомки немає.
- **Rover 2** — Onfido звіряє обличчя з документом, але фото житла не перевіряються ніяк.

### Критерій 3 — Репутація, яку не можна купити

- **Airbnb 5** — лише учасники бронювання, 14-денне двостороннє розкриття, відгук не видаляється «через незгоду або незадоволення зірковим рейтингом».
- **Couchsurfing 3** — Stay Reference прив'язана до підтвердженого перебування і незмінна назавжди, але Personal Reference не потребує ні поїздки, ні знайомства.
- **BlaBlaCar 3** — оцінюють лише реальні попутники, з подвійною сліпотою і без видалення, але система **сама нараховує 5/5** при мовчанні.
- **Plum Guide 3** — автоделістинг після другої негативної оцінки — справжній механізм, але гостьових відгуків на сторінці немає, а в даних 164 з 176 із позначкою `"source": "AirBnb"`.
- **Rover 3** — справжні відгуки прив'язані до оплаченого бронювання, але до 15 неперевірених testimonials від друзів лежать у тому ж списку.

### Критерій 4 — Видимість недоліків

- **Airbnb 4** — мітка для «10% найгірших помешкань» і категорія «Точність» про актуальність фото; мінус за те, що мітка з'являється лише після попередження про якість.
- **Couchsurfing 3** — негативні відгуки незнищенні, але за замовчуванням видно лише лічильники, немає сортування за свіжістю попри власну пораду оцінювати давність.
- **BlaBlaCar 3** — чотирирівнева смуга скасувань і анонімна оцінка водіння, але авто-5/5 розмиває сигнал, а AI-підсумок можна приховати на запит.
- **Plum Guide 4** — «Home truths» на 38 з 38 із справжніми негативами; мінус за те, що частина пунктів — нейтральна логістика, і на двох лістингах блок зламаний.
- **Rover 4** — повна гістограма 1–5, усі відгуки, відсоток і час відповіді, автоматичні записи про скасування; бракує числового коефіцієнта скасувань.

### Критерій 5 — Прозорість критеріїв допуску

- **Airbnb 3** — пороги Суперхоста точні, але «Вибір гостей» застережений фразою «можуть застосовуватися додаткові фактори», а інспекційний Plus закрито 06.11.2023.
- **Couchsurfing 4** — усі вимоги опубліковані прямо, хоча планка майже нульова.
- **BlaBlaCar 4** — умови для водія, пороги Super Driver і поріг видалення опубліковані; мінус за те, що все самодекларується, а українська сторінка друкує інші числа.
- **Plum Guide 2** — «150 критеріїв» прибрано до 27.09.2023; лишився господарський список 3+7 із порогом 75%, а відсоток відбору вказано і як 1%, і як 3%.
- **Rover 3** — кроки й причини відмови опубліковані, але **жодного числового порога допуску**, рішення «final and cannot be appealed».

### Критерій 6 — Відповідальність платформи

- **Airbnb 5** — 72 години, докази «фотографії, відео або підтвердження умов господарем», і господар «не отримає виплати або зменшить виплату на суму, повернену гостю».
- **Couchsurfing 1** — нуль гарантій; ToS §17.3 обмежує сукупну відповідальність $100.
- **BlaBlaCar 1** — власного страхування немає, вікно претензії 1 година, а в Україні оплата готівкою, тож платформа тримає лише сервісний збір.
- **Plum Guide 2** — п. 1.6: «no warranties or representations» щодо точності; єдиний засіб — проти скасування господарем, «at our sole discretion».
- **Rover 4** — точні ліміти по країнах, 48 годин на сповіщення, 14 днів на документи, підтримка 24/7; мінус за «NOT INSURANCE», дискреційність і виключення збою комунальних послуг.

### Критерій 7 — Повнота профілю до контакту

- **Airbnb 4** — фототур, зручності, правила, сім категорій оцінок; мінус за те, що зручності прямо не верифіковані.
- **Couchsurfing 4** — дуже насичений профіль зі спальним місцем, складом мешканців і правилами дому; мінус за те, що обов'язкові лише 2 кроки з 6.
- **BlaBlaCar 3** — заповнений профіль багатий, але обов'язковий лише телефон, і живий профіль у вибірці мав ім'я, вік і більше нічого.
- **Plum Guide 4** — у середньому 27 фото, зручності, конфігурація спалень, локальний гід; мінус за відсутність видимих оцінок.
- **Rover 5** — повністю публічний профіль без логіну з рейтингами, усіма відгуками, цінами, календарем; приховано лише контакти, і то свідомо.

### Критерій 8 — Сигнали живої присутності

- **Airbnb 4** — відсоток відповідей за 24 год за останні 30 днів плюс час відповіді.
- **Couchsurfing 2** — у 2026 скасовано статус «Accepting Guests», прибрано відсоток відповідей, «Last Login» замінено недатованим тегом.
- **BlaBlaCar 2** — є миттєве бронювання і смуга скасувань, але на живому профілі немає ні часу відповіді, ні останньої активності.
- **Plum Guide 1** — жодного сигналу свіжості; поле `lastSyncDate` існує тільки в даних і не рендериться.
- **Rover 5** — «96% response rate», «Usually responds in a few minutes», «80% bookings with photo updates», «Availability updated 3 days ago».

---

# 5. Три механізми, які варто перенести в наш MVP

## Механізм 1. Верифікаційна зйомка на місці — і показана гостю

**Звідки:** Airbnb (технологія) + Plum Guide (стандарт і економіка).

### Що саме робимо

Кожен будинок проходить верифікацію зйомкою на місці за схемою Airbnb: **2 фото в застосунку з увімкненою точною геолокацією, де інтер'єрний кадр має збігатися з кадром із опублікованого фототуру**, плюс короткі відео з **унікальним 4-значним кодом дня** в кадрі.

### Дві дірки Airbnb, які ми закриваємо

1. **Airbnb ховає доказ** — «ніколи не будуть видимими гостями». **Ми показуємо:** на картці — «Перевірено на місці 12.10.2026», ім'я перевіряючого, і верифікаційні кадри поруч із маркетинговими. Для гостя, який платить 100% і не може нічого спитати, доказ, якого не видно, не існує.
2. **Airbnb перевіряє лише адресу** — «Ми не перевіряємо точність інформації про помешкання, подробиць або зручностей». **Ми перевіряємо рівно ті п'ять пунктів, які гарантуємо:** світло, вода, інтернет, кухня, паркінг — і публікуємо вимірювання (швидкість Wi-Fi, фото генератора, фото паркомісця). Прецедент вимірювань є: Plum Guide історично міряв «WiFi speed and decibel levels».

### Чому це сходиться з нашими обмеженнями

- **~30 об'єктів.** Airbnb закрив інспекційний Plus 06.11.2023, Plum Guide перейшов на AI заради «85% reduction in home addition costs» — обидва тому, що людські візити не масштабуються на мільйони. **У нас тридцять будинків.** Те, що вбило Plus, для нас операційно тривіально. Це структурна перевага, а не компроміс.
- **100% передоплата й закритий чат.** Кіберполіція називає ознаками шахрайства «набір чужих фото» і «відмову показати житло у відеодзвінку». Геоприв'язана зйомка з кодом — це відеодзвінок, проведений заздалегідь і за нас.
- **Економіка.** Plum Guide бере з господаря £300/€300/$400 одноразово плюс 3%; Rover стягує «$49-$79 profile review fee»; Airbnb вираховує зйомку з майбутніх виплат. **Модель «перевірку оплачує сторона пропозиції» перевірена трьома платформами.**

## Механізм 2. «Чесно про цей дім» — опубліковані недоліки

**Звідки:** Plum Guide «Home Truths».

### Що саме робимо

На кожній картці — окремий блок із 3–6 чесними мінусами, **написаними платформою, а не власником**: «Кухня невелика, посудомийки немає», «Будинок за 200 м від траси — вдень чути машини», «Четверта спальня не сфотографована», «Інтернет тримає 25 Мбіт: для дзвінків вистачає, для стрімів удвох — ні».

Поруч — **цифра відмов**. Plum Guide пише не «ми ретельно відбираємо», а «**We rejected 32,765 homes in London, so you don't have to**». Наш еквівалент: «Переглянули 400 будинків. Прийняли 30.» Конкретне число — доказ, прикметник — ні.

### Чому це найважливіший механізм саме для нас

1. **Він заміщає відсутній корпус негативних відгуків.** Їх не буде 6–12 місяців. Plum Guide доводить, що редакційний мінус працює **без жодного гостьового відгуку**: на перевірених лістингах відгуків немає, а блок Home Truths є на 38 із 38.
2. **Він захищає гарантію.** Ми винні 50% вартості ночі за відсутню зручність. Опублікований мінус переводить потенційну претензію в **заздалегідь прийняту умову**: якщо ми написали «паркінг — ґрунтовий майданчик без навісу», це не привід для виплати.
3. **Він купує довіру до всіх інших тверджень.** Платформа, яка сама називає свої слабкі місця, робить позитивні заяви перевірюваними. Це прямий контрзахід до провалу всього українського ринку — кураторство заявлене, нічим не доведене.

### Урок із вибірки

У Plum Guide **справжні негативи становлять меншість пунктів** — решта нейтральна логістика. Це розмиває сигнал. **Наше правило: щонайменше 3 з 5 пунктів мають бути тим, що реально може зіпсувати враження.** Логістику виносимо окремо.

## Механізм 3. Протокол доказів і правило делістингу

**Звідки:** Airbnb + Rover + Plum Guide.

### Протокол претензії

| Елемент | Airbnb | Rover | **Наше рішення** |
|---|---|---|---|
| Вікно сповіщення | 72 год | 48 год від інциденту | **24 год** — відсутність світла перевіряється миттєво |
| Строк документів | — | 14 днів | **7 днів** |
| Формат доказу | «фотографії, відео або підтвердження умов господарем» | фото + чеки + висновок фахівця | Фото/відео з таймкодом у застосунку + кадр лічильника або роутера |
| Спершу між сторонами | — | «first try to help… resolve… directly» | **Ні** — рішення ухвалює платформа |
| Хто платить | господар «не отримає виплати або зменшить виплату» | з коштів Rover | **Утримання 50% вартості ночі з виплати власнику** |
| Мінімальний поріг | — | $250 / £50 / 50 € | **Без порогу** — гарантія поночівельна |
| Санкція за фальш | — | «will terminate all benefits» | Перенести дослівно |
| Строк рішення | — | «hopes of resolving… within 14 days» | **Зобов'язання, не намір: 5 робочих днів** |
| Апеляція | — | не опубліковано | **Опублікувати** — перевага над усіма п'ятьма |

Airbnb у переліку зручностей називає **кухню**, але **не називає світло, воду, тепло та інтернет** — отже наша гарантія ширша за Airbnb, і тому протокол має бути жорсткішим і опублікованим наперед.

### Розвилка щодо блекаутів, яку треба пройти свідомо

Rover дослівно виключає «**lack or failure of public utilities or Internet service due to external factors**». Для платформи, яка продає зимівлю без блекаутів, скопіювати це виключення означає знищити ціннісну пропозицію. Тому:

- гарантія покриває **наявність робочого джерела живлення в будинку** (генератор, станція, панелі), а **не безперебійність міської мережі**;
- формулювання публікується наперед, перевіряється під час візиту (Механізм 1) і дублюється в блоці «Чесно про цей дім» (Механізм 2);
- планове відключення **без** справного резерву = страховий випадок; те саме відключення **зі** справним генератором = ні.

Без цього розмежування гарантія або розорить власників узимку, або виявиться порожньою — обидва сценарії вб'ють довіру.

### Правило делістингу — працює з другого заїзду

Дзеркалимо Plum Guide: шкала післявиїзного опитування від «1 - Disaster» до «5 - Great», перша оцінка 1–3 — попередження, **друга — автоматичне зняття** будинку, якщо середня нижча за 4,0, з вікном оскарження 30 днів.

**Це єдиний механізм якості у всій вибірці, який дає результат із другого заїзду, не чекаючи корпусу відгуків.** З 30 будинками його можна виконувати буквально.

### Чого з Rover не копіюємо

Вимогу підписати release з «obligation to **keep confidential** the reimbursement amount and circumstances». Платформа, що будується на публікації недоліків, не може водночас змушувати мовчати тих, кому виплатила.

### Урок інтерфейсу від Couchsurfing

Не залишати в UI сигналів без живого механізму. Їхній лічильник «1 Vouch» рендериться досі, хоча фічу видалили **19.11.2014** — дванадцять років тому. **Кожен значок довіри в нашому прототипі має мати працюючий процес за собою.**

---

# 6. Один механізм, який НЕ спрацює у нас

## ❌ Перцентильні бейджі й рівні, побудовані на корпусі відгуків

Ідеться про «Вибір гостей» і мітки топ-1/5/10% Airbnb, рівні досвіду BlaBlaCar і Star Sitter у Rover.

**1. Поріг входу для нас недосяжний за визначенням.** Airbnb вимагає «Щонайменше 5 відгуків за останні 4 роки»; Rover — ≥5 різних клієнтів і ≥2 повторних за 6 місяців; BlaBlaCar для «Амбасадора» — 12 оцінок і 12 місяців стажу. **З 30 будинками й нулем відгуків жоден об'єкт не кваліфікується щонайменше перший сезон.** «Топ-10%» від 30 об'єктів — це **3 будинки [Я]**, тобто ранжування без інформаційної цінності.

**2. Порожній віджет відгуків активно шкодить.** Кіберполіція прямо називає ознакою шахрайства сторінки «без відгуків від реальних людей». Блок «Відгуки (0)» не нейтральний — він **підтверджує** патерн, за яким гостя вчать упізнавати шахрая.

**3. Спроба «дотиснути» рейтинг при тонких даних породжує брехню.** BlaBlaCar показує, чим це закінчується: авторейтинг 5/5 при мовчанні. Для платформи, яка бере 100% наперед і обіцяє компенсацію, фальшиві 5/5 — прямий юридичний ризик.

**4. Дані кажуть, що ми й так небагато втрачаємо.** Ert, Fleischer & Magen (2016): оцінки відгуків **не впливали** на ціну й імовірність бронювання. Найдорожчий механізм виявляється й найменш результативним на старті. Сам Plum Guide будує на цьому філософію: «we don't always trust reviews».

### Що ставимо замість

Не ранжування за відгуками, а **докази**: дата й автор верифікації на місці, виміряні параметри п'яти гарантованих зручностей, блок «Чесно про цей дім», опублікована цифра відмов, сторінка критеріїв допуску і правило автоделістингу. Відгуки вмикаємо **мовчки й пізніше** — коли на об'єкт набереться 3+ реальні заїзди; до того блоку відгуків на картці просто немає.

---

# 7. Не вдалося перевірити

Усе нижче — **дані не підтверджені**. У публічному кейсі не подавати як факт.

**Airbnb**
- Чи виконано обіцянку 2019 року про 100% верифікацію до 15.12.2020.
- Точна гостьова мікрокопія мітки для «10% найгірших помешкань».
- Чи позначаються якось фото, зняті в межах Pro Photo Program.

**Couchsurfing**
- Мікрокопія порога «3 vouches» — лише вторинна преса 2010 року.
- Звільнення в команді Trust & Safety — жодних свідчень, і є контрдоказ.
- Дата й чинність заяви Entrust про перевірку по базах sex offender (вендорське, недатоване, суперечить §7 умов).

**BlaBlaCar**
- Дата припинення партнерства з AXA / BlaBlaSure — згадок немає в жодній із 22 локалей.
- Чи видно фільтр «Тільки для жінок» у живій українській панелі для залогінених.
- «Usually responds within X» як чинна функція — формулювання існує лише у звіті 2016 року.

**Plum Guide**
- Чи відвідує живий критик кожен будинок у 2026 (непрямі дані свідчать, що ні: 37 із 38 лише «nominated»).
- Чи показуються незалогіненому гостю відгуки з позначкою `"source": "AirBnb"`.
- Автор конкретного пункту Home Truths (платформа чи господар).
- Повний перелік 150 критеріїв — ніде не опублікований.

**Rover**
- Чи утримується дискреційне повернення з виплати ситеру.
- Строк ухвалення рішення по скаргах на якість і шлях оскарження.
- Чи існує правило, що фото мають зображати саме реальне житло.

**Розбіжності в самих джерелах — знахідка, а не похибка**
- Plum Guide: «top 1%» на About проти «top 3%» на чотирьох інших сторінках.
- Rover: маркетинг каже «7 days» на документи, умови — «14 days»; застарілі британські умови від 09.07.2018 досі онлайн із суперечливими цифрами (£250 проти £50).
- BlaBlaCar: українська сторінка Super Driver друкує 10% скасувань проти 5% в англійській, і «кожні 6 місяців» проти «every week»; власний текст каже «There are 4 Levels», таблиця показує п'ять.
- Couchsurfing: умови від 20.06.2023 старіші за перебудову платформи 06.05.2026 і описують неіснуючий «address verification tool».

**Примітка про крос-перевірку.** Під час цього проходу вісь відгуку Hutshub «Відповідність фото та опису» знайти не вдалося. Проте в конкурентному дослідженні ([`research.md`](./research.md)) вона **підтверджена особисто** на сторінці комплексу Krasnyk Resort разом з осями «Ціна/Якість» і «Атмосфера та затишок». Вважати підтвердженою.

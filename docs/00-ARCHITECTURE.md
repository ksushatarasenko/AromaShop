# AromaShop — техническая документация проекта

Документ для разработчика: как устроен проект, как работает приложение, куда смотреть при изменениях.

**Стек:** React 19 · Vite 8 · React Router 7 · CSS (design tokens) · без бэкенда  
**Сайт:** https://aroma.shop.pl  
**Языки:** PL (по умолчанию) · UK  
**Деплой:** GitHub Pages (Actions)

---

## 1. Что это за продукт

AromaShop — SPA-бутик оригинальных парфюмов (luxury + niche).

- Каталог и карточки товаров из JSON
- Двуязычные URL и контент (PL / UK)
- Корзина → оформление через Telegram / WhatsApp / email (без платёжного gateway)
- Find Your Scent (подбор по квизу)
- Журнал (статьи)
- Энциклопедия нот

Нет серверного API: все данные — статические JSON, собираются Vite в бандл.

---

## 2. Структура репозитория

```
AromaShop/
├── index.html                 # Vite entry
├── vite.config.js             # base path + strict 404 для /assets/*
├── package.json
├── public/                    # статика (копируется в dist)
│   ├── assets/
│   │   ├── brand/             # логотипы, placeholder
│   │   ├── brands/            # логотипы брендов
│   │   ├── home/
│   │   ├── journal/
│   │   ├── notes/
│   │   └── perfumes/{brand.slug}/{perfume.id}/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.jsx               # bootstrap
│   ├── App.jsx                # Router + CartProvider + языковые роуты
│   ├── pages/                 # страницы
│   ├── components/            # UI
│   ├── context/               # CartContext
│   ├── data/                  # JSON + index.js
│   ├── i18n/                  # языки, пути, localize
│   ├── locales/               # pl.json / uk.json (UI-тексты)
│   ├── utils/                 # бизнес-логика
│   └── styles/
├── scripts/                   # sitemap, Pages prep, ops
├── .github/workflows/deploy-pages.yml
└── docs/                      # эта документация
```

---

## 3. Запуск локально

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # просмотр production-сборки
npm run lint     # oxlint
```

Перед деплоем (как в CI):

```bash
node scripts/generate-sitemap.mjs
npm run build
node scripts/prepare-pages.mjs
```

---

## 4. Bootstrap и дерево провайдеров

```
index.html
  └─ main.jsx (StrictMode + CSS)
       └─ App.jsx
            └─ BrowserRouter (basename из Vite BASE_URL)
                 ├─ ScrollToTop
                 └─ CartProvider
                      └─ Routes
                           /        → redirect /pl
                           /:lang/* → LanguageGate → LanguageProvider → Layout → pages
```

**Важно:** `CartProvider` снаружи языка — корзина одна на оба языка.  
`LanguageProvider` внутри `/:lang` — язык берётся из URL, не из localStorage.

---

## 5. Роутинг и i18n URL

### 5.1. Как устроены URL

Все страницы живут под префиксом языка:

| Концепт | PL | UK |
|---------|----|----|
| Главная | `/pl` | `/uk` |
| Каталог | `/pl/perfumy` | `/uk/parfumy` |
| Женские | `/pl/perfumy-damskie` | `/uk/zhinochi` |
| Мужские | `/pl/perfumy-meskie` | `/uk/cholovichi` |
| Unisex | `/pl/perfumy-unisex` | `/uk/unisex` |
| Luxury | `/pl/luksusowe` | `/uk/liuksovi` |
| Niche | `/pl/niszowe` | `/uk/nishevi` |
| Товар | `/pl/aromat/:id` | `/uk/aromat/:id` |
| Нота | `/pl/nuty/:slug` | `/uk/noty/:slug` |
| Подбор | `/pl/dobierz-aromat` | `/uk/pidbir-aromatu` |
| Журнал | `/pl/dziennik` | `/uk/zhurnal` |
| Статья | `/pl/dziennik/:slug` | `/uk/zhurnal/:slug` |
| О нас | `/pl/o-nas` | `/uk/pro-nas` |
| Аутентичность | `/pl/autentycznosc` | `/uk/avtentichnist` |
| Как заказать | `/pl/jak-zamowic` | `/uk/yak-zamovyty` |
| Корзина | `/pl/koszyk` | `/uk/koshyk` |

Сегменты заданы в `src/i18n/config.js` → `ROUTE_SEGMENTS`.  
**ID парфюма в URL не локализуется** — один и тот же `id` для PL и UK.

### 5.2. LanguageGate

1. Читает `:lang`
2. Если язык не `pl`/`uk` → redirect на `/pl`
3. Иначе оборачивает в `LanguageProvider` и рендерит локализованные роуты

### 5.3. Смена языка

`setLang(nextLang)`:

- парсит текущий pathname
- для страницы ноты пересчитывает slug (`note.slug.pl` ↔ `note.slug.uk`)
- сохраняет query string
- делает `navigate` на новый путь

Ссылки в UI — через `LocaleLink` / `path(routeKey, params)`, не хардкодить `/pl/...`.

---

## 6. Слой данных

### 6.1. Источники

| Файл | Назначение |
|------|------------|
| `src/data/perfumes/luxury.json` | Коллекция luxury |
| `src/data/perfumes/niche.json` | Коллекция niche |
| `src/data/brands.json` | Бренды |
| `src/data/taxonomy.json` | Справочники фильтров/лейблов |
| `src/data/notes.json` | Энциклопедия нот |
| `src/data/articles.json` | Журнал |
| `src/data/facts.json` | Карточки «Czy wiesz, że?» на Home |
| `src/data/site.json` | Контакты, валюта, лого, пути картинок |

Импорт и агрегация — `src/data/index.js`:

```js
export const allPerfumes = [...luxury, ...niche];
export const catalogPerfumes = allPerfumes.filter((p) => p.visible !== false);
```

### 6.2. `visible: false`

| Поверхность | Виден? |
|-------------|--------|
| Каталог, поиск, фильтры, Home, Find Your Scent, sitemap | Нет |
| Прямой URL `/…/aromat/:id` | Да (`getPerfumeById` смотрит в `allPerfumes`) |
| Блок «похожие» | Нет (скрытые отфильтровываются) |

Используется для черновиков, временного снятия с витрины, товаров без цены.

### 6.3. Два слоя локализации

1. **UI-тексты** — `src/locales/pl.json` / `uk.json` (`t('nav.cart')`)
2. **Контент данных** — поля `{ pl, uk }` внутри JSON (`tl(perfume.description)`)

Таксономия (`taxonomy.json`) тоже двуязычная: `{ id, pl, uk }`.

---

## 7. Ключевые пользовательские потоки

### 7.1. Каталог

`Perfumes.jsx`:

1. База = `catalogPerfumes`
2. SEO-категория из URL (`women` / `luxury` …) → seed фильтров
3. `filterPerfumes` (AND по всем активным фильтрам)
4. `searchPerfumes` (строка поиска)
5. `sortPerfumes` (`recommended` | `newest` | `price-*` | `name-asc`)
6. Рендер `FilterPanel` + `PerfumeGrid` → `PerfumeCard`

### 7.2. Карточка товара

`PerfumeDetails.jsx`:

- `getPerfumeById(id)` (включая скрытые)
- Галерея max **3** кадра: `main`, `02`, `03`
- Story, facts, notes pyramid, character/performance meters
- `PurchasePanel`: оригинал (флакон) или decant
- `SimilarPerfumes` по массиву `similar[]`

### 7.3. Корзина и заказ

`CartContext` (localStorage `aromashop-cart`):

- Линия: `perfumeId + purchaseType + ml`
- `addItem` / `setQuantity` / `removeItem` / `clearCart`

Оформление (`CartCheckout`):

1. Форма: имя, телефон, email, канал связи, комментарий
2. `buildCartOrderMessage` → текст заказа
3. Открытие Telegram / WhatsApp / mailto
4. `clearCart` + `OrderSuccess`

**Платежей в приложении нет** — подтверждение и оплата вручную через переписку.

### 7.4. Find Your Scent

Шаги: gender → mood → character → season → occasion → notes  
Скоринг: `getTopMatches(catalogPerfumes, answers, 4)`.

### 7.5. Журнал и ноты

- Статьи: `articles.json` по `slug`
- Ноты: `notes.json` по локализованному `slug`
- В статьях тег `<perfume>Brand Name Perfume Name</perfume>` линкуется на товар (точное совпадение `"brand.name + perfume.name"`)

---

## 8. Картинки парфюмов

Канонический путь:

```
/assets/perfumes/{brand.slug}/{perfume.id}/main.jpg
/assets/perfumes/{brand.slug}/{perfume.id}/02.jpg
/assets/perfumes/{brand.slug}/{perfume.id}/03.jpg
```

Правила (`src/utils/perfumeImage.js`):

- Максимум **3** изображения (`MAX_PERFUME_GALLERY_IMAGES`)
- Слоты строго: `main` → `02` → `03` (04+ игнорируются)
- JSON хранит только имена файлов (`"image": "main.png"`), не абсолютные пути
- Fallback расширений: png → webp → jpg → jpeg → placeholder
- В JSON `gallery` — advisory; код всё равно зондирует слоты

Dev-плагин `assetsStrict404` в `vite.config.js` отдаёт настоящий 404 на отсутствующие `/assets/*`, чтобы `onError` у `<img>` мог переключать кандидатов.

---

## 9. Сборка и деплой (GitHub Pages)

Workflow `.github/workflows/deploy-pages.yml` (push в `main`):

1. `npm ci`
2. `node scripts/generate-sitemap.mjs` — актуальный sitemap из каталога
3. `VITE_BASE_PATH=/ npm run build`
4. `node scripts/prepare-pages.mjs`:
   - для каждого URL из sitemap создаёт `dist/{path}/index.html` (SEO, HTTP 200)
   - копирует `index.html` → `dist/404.html` (SPA fallback для deep links / refresh)
5. Upload `dist` → GitHub Pages

### Почему нужен `404.html`

GitHub Pages — статический хостинг. Прямой заход на `/uk/aromat/...` без физического файла даёт 404 GitHub.

- С главной навигация клиентская → работает
- Refresh / шаринг deep link без `404.html` → ломается

`404.html` = копия SPA; URL в браузере сохраняется, React Router открывает нужную страницу.

Custom domain: `aroma.shop.pl` (корень, `base: /`).

---

## 10. Важные инварианты

1. Коллекции только `luxury` | `niche` — два JSON-файла, не отдельные women/men файлы
2. Gender — поле объекта, не отдельный файл данных
3. Только оригинальные бренды (без dupes / inspired-by) — продуктовое правило
4. Галерея ≤ 3 изображений
5. `brandId` должен существовать в `brands.json` до добавления парфюма
6. ID нот в пирамиде — только из `notes.json`
7. Moods / accords / families — только ID из `taxonomy.json`
8. Цены флаконов могут быть `null` (TBA); тогда товар лучше держать с `visible: false`
9. Не менять layout карточки Black Opium / общий дизайн без отдельной задачи — UI и данные разделены

---

## 11. Куда смотреть при типичных задачах

| Задача | Файлы |
|--------|--------|
| Добавить парфюм | `luxury.json` / `niche.json` + бренд + картинки + (при необходимости) notes/taxonomy |
| Добавить бренд | `brands.json` + logo в `public/assets/brands/` |
| Новый фильтр-mood | `taxonomy.json` (+ locales Find Your Scent, если хардкод) |
| Текст UI | `locales/pl.json`, `uk.json` |
| Контакты / лого | `site.json` |
| Статья | `articles.json` + картинка в `public/assets/journal/` |
| Deep link 404 на Pages | `scripts/prepare-pages.mjs`, workflow |
| Цена / decant | поля `sizes`, `decant` + `utils/price.js`, `utils/decant.js` |
| Корзина / заказ | `CartContext`, `utils/order.js`, `CartCheckout` |

---

## 12. Связанные документы

- [`01-FUNCTIONS.md`](./01-FUNCTIONS.md) — API утилит и хуков
- [`02-JSON-DATA-GUIDE.md`](./02-JSON-DATA-GUIDE.md) — правила заполнения JSON

---

*Документ отражает архитектуру репозитория на момент написания. При крупных изменениях роутинга или data-layer обновляйте этот файл вместе с кодом.*

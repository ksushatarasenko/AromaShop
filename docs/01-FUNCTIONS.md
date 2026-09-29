# AromaShop — справочник функций

Документ для разработчика: экспортируемые функции и хуки — **зачем**, **что принимают**, **что делают**, **что возвращают**.

Типы ниже выведены из реального кода (TypeScript в проекте нет).

Связанные документы: [`00-ARCHITECTURE.md`](./00-ARCHITECTURE.md) · [`02-JSON-DATA-GUIDE.md`](./02-JSON-DATA-GUIDE.md)

---

## Оглавление

1. [Data layer — `src/data/index.js`](#1-data-layer)
2. [Цены — `src/utils/price.js`](#2-цены)
3. [Decant — `src/utils/decant.js`](#3-decant)
4. [Заказ — `src/utils/order.js`](#4-заказ)
5. [Поиск — `src/utils/perfumeSearch.js`](#5-поиск)
6. [Фильтры — `src/utils/perfumeFilters.js`](#6-фильтры)
7. [Find Your Scent — `src/utils/perfumeMatching.js`](#7-find-your-scent)
8. [Картинки парфюмов — `src/utils/perfumeImage.js`](#8-картинки-парфюмов)
9. [Картинки нот — `src/utils/noteImage.js`](#9-картинки-нот)
10. [Энциклопедия ноты — `src/utils/noteEncyclopedia.js`](#10-энциклопедия-ноты)
11. [Оптовые цены — `src/utils/wholesalePricing.js`](#11-оптовые-цены-ops)
12. [i18n — `src/i18n/*`](#12-i18n)
13. [Корзина — `src/context/CartContext.jsx`](#13-корзина)

---

## 1. Data layer

**Файл:** `src/data/index.js`

### Реэкспорт данных

| Экспорт | Что это |
|---------|---------|
| `allPerfumes` | `[...luxury, ...niche]` — все SKU, включая скрытые |
| `catalogPerfumes` | витрина: `visible !== false` |
| `luxury`, `niche`, `brands`, `taxonomy`, `site`, `articles`, `facts`, `notesLibrary` | сырые JSON |

---

### `getBrandById(brandId)`

| | |
|--|--|
| **Зачем** | Получить бренд по ID |
| **Принимает** | `brandId: string` |
| **Делает** | Ищет в `brands.json` |
| **Возвращает** | `brand \| null` |
| **Где** | карточки, детали, корзина, поиск, `perfumeImage` |

---

### `getPerfumeById(id)`

| | |
|--|--|
| **Зачем** | Открыть товар по ID (в т.ч. скрытый) |
| **Принимает** | `id: string` |
| **Делает** | Поиск в `allPerfumes` |
| **Возвращает** | `perfume \| null` |
| **Где** | `PerfumeDetails`, корзина, similar |

---

### `getArticleBySlug(slug)`

| | |
|--|--|
| **Зачем** | Страница статьи журнала |
| **Принимает** | `slug: string` |
| **Возвращает** | `article \| null` |

---

### `getNoteById(id)`

| | |
|--|--|
| **Зачем** | Нота по стабильному ID |
| **Принимает** | `id: string` |
| **Возвращает** | `note \| null` |

---

### `getNoteBySlug(slug, lang = DEFAULT_LANG)`

| | |
|--|--|
| **Зачем** | Нота по URL-slug текущего языка |
| **Принимает** | `slug: string`, `lang: 'pl' \| 'uk'` |
| **Делает** | Ищет `slug[lang]` → любой язык → fallback на `id` |
| **Возвращает** | `note \| null` |
| **Где** | страница ноты, смена языка |

---

### `getNoteLabel(id, lang = DEFAULT_LANG)`

| | |
|--|--|
| **Зачем** | Локализованное имя ноты для UI |
| **Возвращает** | `string` (или сам `id`, если ноты нет) |

---

### `getPerfumesByNoteId(noteId)`

| | |
|--|--|
| **Зачем** | «В каких ароматах встречается нота» |
| **Принимает** | `noteId: string` |
| **Делает** | Фильтрует `catalogPerfumes` по top/heart/base |
| **Возвращает** | `perfume[]` |

---

### `getTaxonomyLabel(group, id, lang = DEFAULT_LANG)`

| | |
|--|--|
| **Зачем** | Лейбл таксономии (`genders`, `moods`, …); для `notes` → `getNoteLabel` |
| **Возвращает** | `string` |
| **Примечание** | В UI чаще используют `useLanguage().taxonomyLabel` |

---

### `getPerfumesByCollection(collectionId)`

| | |
|--|--|
| **Принимает** | `'luxury' \| 'niche'` |
| **Возвращает** | `perfume[]` из витрины |
| **Где** | Home |

---

### `getFeaturedPerfumes()`

| | |
|--|--|
| **Делает** | `featured: true`, сортировка: new → bestseller → recommended |
| **Возвращает** | `perfume[]` |

---

### `getNewPerfumes()` / `getBestsellers()`

| | |
|--|--|
| **Делает** | Фильтр по флагу `new` / `bestseller` в витрине |
| **Возвращает** | `perfume[]` |

---

### `getSimilarPerfumes(perfume)`

| | |
|--|--|
| **Принимает** | объект с `similar?: string[]` |
| **Делает** | Маппит ID через `getPerfumeById`, отбрасывает отсутствующие и `visible: false` |
| **Возвращает** | `perfume[]` |

---

## 2. Цены

**Файл:** `src/utils/price.js`

### `pricePerMl(price, ml)`

- **Принимает:** числовая цена и объём мл  
- **Возвращает:** `price / ml` или `null`, если аргументы falsy  

### `formatPrice(amount, currency = 'zł')`

- **Принимает:** сумма (может быть `null`)  
- **Возвращает:** строку вида `"430 zł"` или `""`  

### `formatPricePerMl(price, ml, currency = 'zł')`

- **Возвращает:** `"X.XX zł / ml"`  

### `getDisplayPrice(perfume)`

- **Делает:** минимальная цена среди размеров (сначала in-stock)  
- **Возвращает:** `number \| null` (`null`, если все цены null)  
- **Где:** сортировка каталога  

### `getDisplaySize(perfume)`

- **Возвращает:** объект размера `{ ml, price, stock }` для карточки или `null`  

### `getMinMaxPrices(perfumes)`

- **Возвращает:** `{ min, max }` по всем числовым `sizes[].price` списка  

---

## 3. Decant

**Файл:** `src/utils/decant.js`

**Константы:**  
`DEFAULT_DECANT_SIZES = [1, 5, 10, 15, 20]`  
Тариф флакона: ≤10 мл → **3 zł**, больше → **12 zł**

### `getDecantConfig(perfume)`

| | |
|--|--|
| **Зачем** | Конфиг UI «na rozlew» |
| **Возвращает** | `{ enabled: true, sizes, pricePerMl } \| null` |
| **Правило** | `decant.enabled === false` → `null` (секция скрыта) |

### `getReferenceBottle(perfume, preferredSize = null)`

- **Делает:** референсный флакон для расчёта цены/мл (предпочтительный или самый большой in-stock)  
- **Возвращает:** `size \| null`  

### `getEffectiveDecantPricePerMl(perfume, referenceBottle)`

- **Приоритет:** ручной `decant.pricePerMl` → иначе `bottle.price / bottle.ml`  
- **Возвращает:** `number \| null`  

### `getDecantBottleFee(ml)`

- **Возвращает:** 3 или 12 (zł)  

### `calculateDecantPrice(ml, pricePerMlValue)`

- **Формула:** `round2(ml × rate + bottleFee)`  
- **Возвращает:** `number \| null`  

---

## 4. Заказ

**Файл:** `src/utils/order.js`

### `buildCartOrderMessage({ items, total, name, phone, email, contactMethod, comment, lang })`

| | |
|--|--|
| **Зачем** | Текст заказа для мессенджера / email |
| **items** | `{ brandId, perfumeName, purchaseType, ml, price, quantity }[]` |
| **Возвращает** | многострочный `string` (PL/UK) |

### `buildOrderMessage(args)`

- Устаревшая обёртка над `buildCartOrderMessage` (legacy single-item)  

### `getTelegramOrderUrl(message)`

- Берёт `site.contacts.telegram`  
- **Возвращает:** URL `t.me/...` с `text=` или `'#'`  

### `getWhatsAppOrderUrl(message)`

- **Возвращает:** `wa.me/...` с текстом  

### `getEmailOrderUrl(message, lang = 'pl')`

- **Возвращает:** `mailto:` с subject + body  

---

## 5. Поиск

**Файл:** `src/utils/perfumeSearch.js`

### `searchPerfumes(perfumes, query, lang = DEFAULT_LANG)`

| | |
|--|--|
| **Зачем** | Текстовый поиск по каталогу |
| **Делает** | Нормализация (NFD); все токены запроса должны встретиться в haystack: name, brand, taxonomy labels, notes, descriptions, tags |
| **Возвращает** | `perfume[]` (при пустом query — весь список) |

### `searchBrands(brands, query)`

- Фильтр брендов по name/id  
- Пустой query → `[]`  

---

## 6. Фильтры

**Файл:** `src/utils/perfumeFilters.js`

### `createEmptyFilters()`

Возвращает пустой объект фильтров:

```
collection, gender, brandId, moods, families, accords, notes,
seasons, timeOfDay, occasions, concentration, bottleSize: [],
priceMin/Max: null,
sweetness/freshness/warmth/intensity: null
```

### `filterPerfumes(perfumes, filters = {})`

| | |
|--|--|
| **Логика** | AND по всем активным измерениям |
| **Character** | «не меньше выбранного значения» |
| **Цена** | пересечение диапазона с ценами размеров (null-цены не участвуют) |
| **Возвращает** | `perfume[]` |

### `sortPerfumes(perfumes, sortId = 'recommended')`

| `sortId` | Поведение |
|----------|-----------|
| `newest` | по `year` desc |
| `price-asc` / `price-desc` | по `getDisplayPrice` |
| `name-asc` | по имени |
| `recommended` | score: featured×4 + bestseller×2 + new×1 |

### `filtersFromPath(segment)`

- `'women'|'men'|'unisex'` → gender filter  
- `'luxury'|'niche'` → collection filter  
- Сейчас страница каталога сидит фильтры сама; функция — helper  

### `enrichWithBrand(perfume)`

- **Возвращает:** `{ ...perfume, brand }`  

---

## 7. Find Your Scent

**Файл:** `src/utils/perfumeMatching.js`

### `matchPerfumes(perfumes, answers = {})`

**answers:** `gender`, `mood`, `sweetness`, `freshness`, `warmth`, `intensity`, `season`, `occasion`, `notes[]`, `collection?`

Скоринг (упрощённо):

- совпадение gender (+ soft unisex)
- mood → целевые character-значения
- близость слайдеров character
- overlap season / occasion
- overlap notes ∪ accords

**Возвращает:** `{ perfume, score }[]`, только `score > 0`, по убыванию score

### `getTopMatches(perfumes, answers, limit = 4)`

- Top-N из `matchPerfumes`  
- **Где:** `FindYourScent.jsx`  

---

## 8. Картинки парфюмов

**Файл:** `src/utils/perfumeImage.js`

**Константы:**

```js
IMAGE_EXTENSIONS = ['png', 'webp', 'jpg', 'jpeg']
MAX_PERFUME_GALLERY_IMAGES = 3
PERFUME_GALLERY_SLOTS = ['main', '02', '03']
```

| Функция | Принимает | Возвращает | Зачем |
|---------|-----------|------------|--------|
| `getBrandSlug(perfume)` | perfume | `string` | slug бренда / `_unknown` |
| `getPerfumeAssetDir(perfume)` | perfume | `'/assets/perfumes/{slug}/{id}' \| null` | папка ассетов |
| `perfumeFileUrl(perfume, filename)` | perfume, file | URL | абсолютный или под папкой |
| `getPerfumeImage(perfume, imageName?)` | perfume [, slot] | `string` | основной URL (1-arg → первый кандидат) |
| `getPlaceholderImage()` | — | `string` | placeholder из `site.json` |
| `getPerfumeImageSlotCandidates(perfume, slot)` | perfume, slot | `string[]` | цепочка расширений + placeholder |
| `getPerfumeImageCandidates(perfume)` | perfume | `string[]` | кандидаты main (`perfume.image`) |
| `getPerfumeGalleryImages(perfume)` | perfume | `{ id, candidates }[]` | **канон** галереи ≤3 |
| `getPerfumeSlides(perfume)` | perfume | то же | alias |
| `getPerfumeGalleryGroups(perfume)` | perfume | `string[][]` | только 02/03 |
| `getPerfumeGallery(perfume)` | perfume | `string[]` | первые URL доп. слотов |
| `getPerfumeImageAlt(perfume, brand)` | perfume, brand? | `string` | alt text |
| `getBrandLogo(brand)` | brand | `string \| null` | `/assets/brands/{logo}` |
| `getJournalImage(article)` | article | `string \| null` | обложка статьи |
| `getHomeImage(key)` | key | `string` | картинка Home |
| `getSiteLogo(variant?)` | `'default'\|'compact'\|'light'` | `string \| null` | логотип |
| `getSiteLogoAlt()` | — | `string` | alt лого |
| `warnMissingPerfumeImage(perfumeId)` | id | `void` | dev-warn один раз |

---

## 9. Картинки нот

**Файл:** `src/utils/noteImage.js`

| Функция | Возвращает |
|---------|------------|
| `getNotePlaceholderImage()` | placeholder URL |
| `getNoteImageCandidates(note)` | цепочка URL под `/assets/notes/` |
| `getNoteImage(note)` | первый кандидат |

---

## 10. Энциклопедия ноты

**Файл:** `src/utils/noteEncyclopedia.js`

### `getNoteEncyclopediaContent(note, lang = DEFAULT_LANG)`

| | |
|--|--|
| **Принимает** | объект ноты или `null` |
| **Делает** | Локализует поля энциклопедии; `pairsWith` → список `{ id, label }` |
| **Возвращает** | `null` или `{ name, shortDescription, origin, extraction, effect, characteristics[], pairsWith[] }` |

---

## 11. Оптовые цены (ops)

**Файл:** `src/utils/wholesalePricing.js`  
Используется скриптами (`apply-wholesale-prices.mjs`), не UI витрины.

| Функция | Смысл |
|---------|--------|
| `wholesalePln(usd)` | USD × 3.8 → PLN |
| `retailBottlePrice(usd)` | wholesale × 1.10, целое PLN |
| `wholesaleCostPerMl(usd, ml)` | cost / ml |
| `decantPricePerMlFromWholesale(usd, bottleMl)` | cost/ml × 1.15 |
| `decantRetailPrice(usd, bottleMl, sizeMl)` | ppm × size + fee |
| `parseVolume(volumeText)` | парсинг объёма из прайса |
| `selectBestProcurement(options)` | лучший вариант закупки по cost/ml |
| `isSelectableOriginalVolume(...)` | фильтр тестовых/мультипаков |

---

## 12. i18n

### `src/i18n/config.js`

| Экспорт | Значение |
|---------|----------|
| `DEFAULT_LANG` | `'pl'` |
| `SUPPORTED_LANGS` | `['pl','uk']` |
| `LANG_LABELS` | подписи переключателя |
| `ROUTE_SEGMENTS` | сегменты URL по языкам |
| `CATEGORY_KEYS` | SEO-категории каталога |
| `isSupportedLang(lang)` | `boolean` |

### `src/i18n/localize.js`

| Функция | Принимает | Возвращает | Зачем |
|---------|-----------|------------|--------|
| `getMessage(messages, key, vars?)` | словарь, dot-key, vars | `string` | `t()` |
| `localize(value, lang?, fallback?)` | `{pl,uk}` или строка | `string` | контент данных |
| `localizeList(list, lang?, fallback?)` | массив | `string[]` | список локалей |
| `buildPath(lang, routeKey, params?)` | язык, ключ роута, `{id,slug}` | путь | ссылки |
| `parsePath(pathname)` | pathname | `{ lang, page, … }` | разбор URL |
| `switchLanguagePath(pathname, search, nextLang)` | текущий URL + язык | новый URL | смена языка (базовая) |

### `useLanguage()` — `LanguageContext.jsx`

**Возвращает:**

```js
{
  lang,                 // 'pl' | 'uk'
  languages,            // SUPPORTED_LANGS
  messages,             // locale JSON
  t(key, vars?),        // UI-строки
  tl(value),            // localize(value, lang)
  taxonomyLabel(group, id),
  path(routeKey, params?),
  setLang(nextLang),
  localizeList(list),
}
```

`LanguageProvider` — только внутри `/:lang/*`.

---

## 13. Корзина

**Файл:** `src/context/CartContext.jsx`  
**Storage key:** `aromashop-cart`

### `useCart()`

```js
{
  items,            // CartItem[]
  itemCount,        // число линий
  totalUnits,       // сумма quantity
  total,            // сумма price × quantity
  addItem(payload),
  removeItem(perfumeId, purchaseType, ml),
  setQuantity(perfumeId, purchaseType, ml, quantity),
  clearCart(),
  toast,            // { type: 'added' } | null
  dismissToast(),
}
```

**Форма линии (нормализованная):**

```js
{
  perfumeId, brandId, perfumeName, collection,
  purchaseType,   // 'original' | 'decant'
  ml, price, quantity,
  image
}
```

**Ключ линии:** `` `${perfumeId}::${purchaseType}::${ml}` ``  
(экспорт `cartLineKey` есть, снаружи почти не используется)

`CartProvider` оборачивает приложение в `App.jsx`.

---

## Краткая карта «что трогать»

| Нужно | Модуль |
|-------|--------|
| Найти товар / бренд / ноту | `data/index.js` |
| Цена на карточке | `price.js` |
| Розлив | `decant.js` |
| Текст заказа | `order.js` |
| Поиск | `perfumeSearch.js` |
| Фильтры каталога | `perfumeFilters.js` |
| Квиз | `perfumeMatching.js` |
| Галерея / пути картинок | `perfumeImage.js` |
| Язык и URL | `i18n/*` + `useLanguage` |
| Корзина | `useCart` |

---

*При добавлении новой утилиты: экспортируйте явно, опишите контракт здесь и переиспользуйте существующие хелперы вместо дублирования логики путей/цен/локализации.*

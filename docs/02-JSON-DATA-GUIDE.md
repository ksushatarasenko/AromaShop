# AromaShop — правила заполнения JSON

Гид для разработчика и контент-редактора: какие поля есть, обязательны ли они, какие значения допустимы, как связаны сущности.

Связанные документы: [`00-ARCHITECTURE.md`](./00-ARCHITECTURE.md) · [`01-FUNCTIONS.md`](./01-FUNCTIONS.md)

---

## Общие правила

### Локализация

Большинство текстов — объект двух языков:

```json
{ "pl": "tekst po polsku", "uk": "текст українською" }
```

- Заполняйте **оба** языка.
- UI берёт текущий язык; при отсутствии — fallback на другой, затем на строку как есть.
- Имена парфюмов (`name`) и ID — **не** локализуются.

### Ссылки между данными

| Ссылка | Должна указывать на |
|--------|---------------------|
| `perfume.brandId` | `brands[].id` |
| `perfume.fragrance.notes.*` | `notes[].id` |
| `perfume.moods[]` | `taxonomy.moods[].id` |
| `perfume.fragrance.families[]` | `taxonomy.families[].id` |
| `perfume.fragrance.accords[]` | `taxonomy.accords[].id` |
| `perfume.similar[]` | существующие `perfume.id` |
| `perfume.collection` | файл + `luxury` / `niche` |

Невалидный ID обычно **не падает билдом**, но ломает фильтры, лейблы и ссылки.

### Продуктовые запреты

В каталог AromaShop **не добавлять**:

- dupes / clones / inspired-by / аналоги
- Fragrance World как замену оригиналу (например Barakkat ≠ Baccarat)
- разливную «копию» вместо оригинального бренда

---

## 1. Парфюмы

**Файлы:**  
`src/data/perfumes/luxury.json`  
`src/data/perfumes/niche.json`

Массив объектов. Файл = коллекция: в `luxury.json` всегда `"collection": "luxury"`, в `niche.json` — `"niche"`.

### 1.1. Шаблон объекта парфюма

```json
{
  "id": "prada-paradoxe-edp-090",
  "brandId": "prada",
  "name": "Paradoxe",
  "collection": "luxury",
  "gender": "women",
  "concentration": "EDP",
  "year": 2022,
  "perfumer": "",
  "country": "Italy",
  "moods": ["modern-feminine", "floral", "warm-vanilla"],
  "image": "main.jpg",
  "gallery": ["02.jpg", "03.jpg"],
  "description": { "pl": "…", "uk": "…" },
  "shortDescription": { "pl": "…", "uk": "…" },
  "story": { "pl": "…", "uk": "…" },
  "facts": [
    { "pl": "…", "uk": "…" }
  ],
  "fragrance": {
    "families": ["floral", "oriental"],
    "accords": ["vanilla", "white-floral", "amber"],
    "notes": {
      "top": ["bergamot", "pear"],
      "heart": ["jasmine", "neroli"],
      "base": ["vanilla", "amber", "white-musk"]
    }
  },
  "character": {
    "sweetness": 3,
    "freshness": 3,
    "warmth": 4,
    "intensity": 4
  },
  "wearing": {
    "seasons": ["spring", "autumn", "winter"],
    "timeOfDay": ["day", "evening"],
    "occasions": ["daily", "office", "date", "evening"]
  },
  "performance": {
    "longevity": 4,
    "sillage": 4
  },
  "sizes": [
    { "ml": 90, "price": null, "stock": true }
  ],
  "decant": {
    "enabled": true,
    "sizes": [1, 5, 10, 15, 20],
    "pricePerMl": null
  },
  "featured": false,
  "new": true,
  "bestseller": false,
  "recommended": false,
  "similar": ["burberry-goddess-edp-100"],
  "tags": ["floral", "vanilla", "modern"],
  "visible": true
}
```

### 1.2. Поля по одному

#### Идентификация

| Поле | Обяз.? | Как заполнять |
|------|--------|----------------|
| `id` | **Да** | Уникальный в обоих файлах. Паттерн: `{brandId}-{slug-name}-{conc}-{ml}` → `tom-ford-lost-cherry-edp-050`, `mfk-baccarat-rouge-540-edp-070`. Conc: `edp`/`edt`/`edc`/`extrait`/`parfum`. Объём 3 цифры: `050`, `070`, `090`, `100`. |
| `brandId` | **Да** | Точный `id` из `brands.json`. Сначала добавьте бренд. |
| `name` | **Да** | Отображаемое имя **одной** строкой (не `{pl,uk}`). |
| `collection` | **Да** | `luxury` или `niche` — **совпадает с файлом**. |

#### Классификация

| Поле | Обяз.? | Значения |
|------|--------|----------|
| `gender` | **Да** | `women` \| `men` \| `unisex` |
| `concentration` | **Да** | Предпочтительно коды таксономии: `EDP`, `EDT`, `EDC`, `Parfum`, `Extrait`. Не пишите `Eau de Parfum` — фильтр сравнивает строку как есть. |
| `year` | Желательно | число или `null` |
| `perfumer` | Нет | строка или `""` / `null` |
| `country` | Нет | страна бренда/происхождения |
| `moods` | **Сильно желательно** | Только ID из `taxonomy.moods` (например `clean`, `warm-vanilla`, `gourmand`, `woody`, `skin`, `citrus`…). Несколько mood на один аромат — норма. |

#### Тексты

| Поле | Обяз.? | Формат | Где видно |
|------|--------|--------|-----------|
| `description` | Желательно | `{pl,uk}` | SEO / fallback |
| `shortDescription` | Желательно | `{pl,uk}` | Лид на карточке/странице |
| `story` | Желательно | `{pl,uk}`, можно `<strong>` | Основной editorial на PDP |
| `facts` | Нет | массив `{pl,uk}` | Блок фактов на PDP (не путать с `facts.json` на Home) |

Тон: спокойный boutique, без «гарантированных комплиментов» и выдуманных наград.

#### Fragrance

```json
"fragrance": {
  "families": ["…"],   // taxonomy.families
  "accords": ["…"],    // taxonomy.accords
  "notes": {
    "top": ["…"],      // notes.json id
    "heart": ["…"],
    "base": ["…"]
  }
}
```

| Правило | |
|---------|--|
| Families / accords | только ID из `taxonomy.json` |
| Notes | только ID из `notes.json`. Нет ID → сначала добавьте ноту |
| Не выдумывать пирамиду | если надёжных данных нет — оставьте tier пустым, не фантазируйте |

#### Character и performance (шкала 1–5)

```json
"character": { "sweetness": 1-5, "freshness": 1-5, "warmth": 1-5, "intensity": 1-5 },
"performance": { "longevity": 1-5, "sillage": 1-5 }
```

Фильтры character = «не меньше выбранного».

#### Wearing

| Поле | Допустимые ID (`taxonomy`) |
|------|----------------------------|
| `seasons` | `spring`, `summer`, `autumn`, `winter` (можно несколько) |
| `timeOfDay` | `day`, `evening`, `night`, `any` |
| `occasions` | `daily`, `office`, `date`, `party`, `evening`, `special`, `casual` |

Не используйте значения вне таксономии (`everyday`, `vacation` и т.п.) — фильтр их не узнает.

#### Цены и наличие

```json
"sizes": [
  { "ml": 50, "price": 430, "stock": true },
  { "ml": 100, "price": null, "stock": true }
]
```

| Поле | Правило |
|------|---------|
| `ml` | Реальный коммерческий объём. Для фильтра предпочтительны: 30, 50, 70, 75, 90, 100, 200 |
| `price` | Число в **zł** или **`null`** (цена пока неизвестна). `null` не участвует в display price / Schema.org |
| `stock` | `true` / `false`. `false` → нельзя купить этот размер |

Пока цены `null` и товар не готов к продаже — ставьте `"visible": false`.

#### Decant (розлив)

```json
"decant": {
  "enabled": true,
  "sizes": [1, 5, 10, 15, 20],
  "pricePerMl": null
}
```

| Поле | Правило |
|------|---------|
| `enabled` | `false` — скрыть розлив. Объект без `enabled` обычно считается включённым |
| `sizes` | мл; дефолт движка `[1,5,10,15,20]` |
| `pricePerMl` | число zł/мл **или** `null` → тогда цена считается из флакона (`price/ml`) + сбор за бутылочку (3 zł ≤10 мл, иначе 12 zł) |

Не выдумывайте произвольные цены «на глаз», если нет прайса.

#### Картинки

| Поле | Правило |
|------|---------|
| `image` | Имя файла главного кадра, обычно `main.jpg` или `main.png` |
| `gallery` | Обычно `["02.jpg","03.jpg"]`. **Максимум 3 кадра всего.** `04+` код игнорирует |

Файлы класть сюда:

```
public/assets/perfumes/{brand.slug}/{perfume.id}/main.jpg
public/assets/perfumes/{brand.slug}/{perfume.id}/02.jpg
public/assets/perfumes/{brand.slug}/{perfume.id}/03.jpg
```

`brand.slug` — из `brands.json`, не из `brandId`, если они когда-либо разойдутся.

Если файлов ещё нет — пути в JSON всё равно по архитектуре; UI покажет placeholder.

#### Флаги витрины

| Поле | Эффект |
|------|--------|
| `featured` | Home / featured |
| `new` | бейдж + приоритет сортировки |
| `bestseller` | бейдж + приоритет |
| `recommended` | буст в sort `recommended` |
| `visible` | `false` = скрыть из каталога/поиска/sitemap, **прямой URL остаётся** |
| `tags` | свободные строки для поиска |

#### Similar

```json
"similar": ["existing-perfume-id-1", "existing-perfume-id-2"]
```

Только существующие ID. Битые пропускаются. Не ссылайтесь на ещё не добавленные товары (или добавляйте пачкой).

### 1.3. Чеклист нового парфюма

1. Бренд есть в `brands.json` (+ logo)
2. Правильный файл + `collection`
3. Уникальный `id`
4. gender / concentration / year
5. `{pl,uk}` description, shortDescription, story
6. fragrance: families + accords (taxonomy) + notes (`notes.json`)
7. moods только из taxonomy
8. character / performance 1–5
9. wearing из taxonomy
10. sizes (+ price или `null` + `visible: false`)
11. decant
12. картинки в папку brand/id
13. similar на существующие ID
14. флаги

---

## 2. Бренды

**Файл:** `src/data/brands.json`

```json
{
  "id": "ysl",
  "name": "Yves Saint Laurent",
  "slug": "ysl",
  "type": "luxury",
  "country": "France",
  "logo": "ysl.png",
  "description": {
    "pl": "…",
    "uk": "…"
  },
  "website": "https://www.ysl.com"
}
```

| Поле | Обяз.? | Правило |
|------|--------|---------|
| `id` | **Да** | Стабильный slug-id. На него ссылается `perfume.brandId` |
| `name` | **Да** | Отображаемое имя. Важно для `<perfume>Brand Name …</perfume>` в статьях |
| `slug` | **Да** | Папка картинок парфюмов: `/assets/perfumes/{slug}/…` |
| `type` | **Да** | `luxury` или `niche` |
| `country` | Желательно | |
| `logo` | Желательно | Файл в `public/assets/brands/`. Нет файла → текстовый fallback |
| `description` | Желательно | `{pl,uk}` |
| `website` | Нет | URL или `""` |

**Не создавайте дубликаты брендов.** MFK = `mfk`, не `maison-francis-kurkdjian`, если уже есть `mfk`.

---

## 3. Taxonomy

**Файл:** `src/data/taxonomy.json`

Справочники для фильтров и лейблов. Большинство элементов:

```json
{ "id": "vanilla", "pl": "Wanilia", "uk": "Ваніль" }
```

Moods дополнительно имеют `description: {pl,uk}`.  
Шкалы — `min`/`max`.  
`bottleSizes` — массив чисел.  
`sortOptions` — опции сортировки каталога (не поля парфюма).

### Группы и куда пишутся в парфюме

| Группа | Поле парфюма |
|--------|----------------|
| `genders` | `gender` |
| `collections` | `collection` |
| `concentrations` | `concentration` |
| `families` | `fragrance.families` |
| `accords` | `fragrance.accords` |
| `moods` | `moods` |
| `seasons` | `wearing.seasons` |
| `timeOfDay` | `wearing.timeOfDay` |
| `occasions` | `wearing.occasions` |
| `characterScales` | ключи `character` |
| `performanceScales` | ключи `performance` |
| `notes` | legacy stubs — для энциклопедии используйте `notes.json` |

### Как добавить новый mood / accord / family

1. Добавить объект в нужный массив `taxonomy.json`
2. Использовать новый `id` в парфюмах
3. Для Find Your Scent moods UI зашит отдельно (`fresh|warm|soft|bold|elegant`) — это **не** те же mood-ID каталога; не путать

---

## 4. Ноты

**Файл:** `src/data/notes.json`

```json
{
  "id": "vanilla",
  "name": { "pl": "Wanilia", "uk": "Ваніль" },
  "slug": { "pl": "wanilia", "uk": "vanil" },
  "image": "vanilla.jpg",
  "category": "gourmand",
  "shortDescription": { "pl": "…", "uk": "…" },
  "description": { "pl": "…", "uk": "…" },
  "origin": { "pl": "…", "uk": "…" },
  "extraction": { "pl": "…", "uk": "…" },
  "effect": { "pl": "…", "uk": "…" },
  "characteristics": {
    "pl": ["Słodka", "Ciepła"],
    "uk": ["Солодка", "Тепла"]
  },
  "pairsWith": {
    "pl": ["Kawa", "Tytoń"],
    "uk": ["Кава", "Тютюн"]
  }
}
```

| Поле | Обяз.? | Правило |
|------|--------|---------|
| `id` | **Да** | kebab-case; используется в пирамидах |
| `name` | **Да** | `{pl,uk}` |
| `slug` | **Да** | `{pl,uk}` для URL `/pl/nuty/…` и `/uk/noty/…` |
| `image` | Желательно | `public/assets/notes/{file}`; часто `{id}.jpg` |
| `category` | Желательно | свободный тег: floral, woody, citrus, amber, fresh… |
| `shortDescription` / `description` | Желательно | лид / полный текст |
| `origin`, `extraction`, `effect` | Нет | секции энциклопедии |
| `characteristics` | Нет | чипы `{pl:[], uk:[]}` |
| `pairsWith` | Нет | локализованные лейблы или ID нот |

Перед использованием ноты в `fragrance.notes` — запись в `notes.json` обязательна.

---

## 5. Журнал (статьи)

**Файл:** `src/data/articles.json`

```json
{
  "id": "autumn-2026",
  "slug": "autumn-2026",
  "category": "seasonal",
  "publishedAt": "2026-09-18",
  "readTime": 10,
  "featured": true,
  "image": "autumn-2026.jpg",
  "tags": ["autumn-2026", "gourmand"],
  "title": { "pl": "…", "uk": "…" },
  "excerpt": { "pl": "…", "uk": "…" },
  "content": [
    { "type": "paragraph", "text": { "pl": "…", "uk": "…" } },
    { "type": "heading", "text": { "pl": "…", "uk": "…" } },
    { "type": "story", "text": { "pl": "… <strong>…</strong> …", "uk": "…" } }
  ]
}
```

| Поле | Обяз.? | Правило |
|------|--------|---------|
| `id` | **Да** | внутренний |
| `slug` | **Да** | URL: `/pl/dziennik/{slug}`, `/uk/zhurnal/{slug}` |
| `category` | **Да** | editorial: `seasonal`, `notes`, `education`, `brands`… (не жёсткий enum) |
| `publishedAt` | **Да** | `YYYY-MM-DD` |
| `readTime` | **Да** | минуты, число |
| `featured` | Нет | выделение |
| `image` | Желательно | файл в `public/assets/journal/` |
| `tags` | Нет | string[] |
| `title`, `excerpt` | **Да** | `{pl,uk}` |
| `content` | **Да** | массив блоков |

### Блоки content

| `type` | Рендер |
|--------|--------|
| `heading` | `<h2>` |
| `paragraph` | `<p>` |
| `story` | тоже `<p>` (тот же рендерер) |

Внутри текста:

- `<strong>…</strong>`
- `<perfume>Brand Name Perfume Name</perfume>` — должно **точно** совпасть с `"{brand.name} {perfume.name}"` (без учёта регистра). Иначе ссылка не построится.

---

## 6. Site

**Файл:** `src/data/site.json`

| Поле | Назначение |
|------|------------|
| `name` | Имя сайта |
| `currency` | `zł` — суффикс цен |
| `locale.pl` / `locale.uk` | BCP-47 |
| `defaultLang` | `pl` |
| `supportedLangs` | `["pl","uk"]` |
| `contacts.email` | mailto / футер |
| `contacts.phone` | отображение |
| `contacts.telegram` | URL заказа Telegram |
| `contacts.whatsapp` | URL заказа WhatsApp |
| `contacts.instagram` | футер / соцсети |
| `logo.*` | header (`src`, `compact`, `light`, `favicon`, `alt`) |
| `images.perfumePlaceholder` | fallback бутылки |
| `images.home.*` | файлы Home в `/assets/home/` |
| `watermark` | опциональный оверлей (`enabled: false`) |

Менять контакты и лого осторожно — от этого зависят заказы и брендинг.

---

## 7. Facts (Home)

**Файл:** `src/data/facts.json`

Карточки «Czy wiesz, że?» на главной (обычно первые несколько).

```json
{
  "id": "fact-oud-rarity",
  "title": { "pl": "Czy wiesz, że?", "uk": "Чи знаєте ви?" },
  "text": { "pl": "…", "uk": "…" },
  "relatedType": "note",
  "relatedId": "oud",
  "linkRoute": "article",
  "linkParams": { "slug": "perfume-notes-explained" }
}
```

| Поле | Правило |
|------|---------|
| `title`, `text` | `{pl,uk}` — обязательный контент |
| `relatedType` | `note` \| `perfume` \| `brand` \| `family` (метаданные) |
| `relatedId` | ID связанной сущности |
| `linkRoute` | ключ роута LocaleLink: `article`, `perfume`, … |
| `linkParams` | `{ slug }` или `{ id }` |

Не путать с `perfume.facts[]` на странице товара.

---

## 8. Картинки — сводная таблица

| Сущность | Путь |
|----------|------|
| Парфюм | `public/assets/perfumes/{brand.slug}/{perfume.id}/main\|02\|03.(jpg\|png\|webp)` |
| Бренд logo | `public/assets/brands/{logo}` |
| Нота | `public/assets/notes/{image}` |
| Статья | `public/assets/journal/{image}` |
| Home | `public/assets/home/{file}` |
| Brand / placeholder | `public/assets/brand/` |

Галерея парфюма: **строго ≤ 3** файла-слота.

---

## 9. Скрипты, которые трогают данные

| Скрипт | Когда |
|--------|--------|
| `scripts/generate-sitemap.mjs` | Обновить sitemap (витринные парфюмы, ноты, статьи) |
| `scripts/prepare-pages.mjs` | После build — статические пути + `404.html` для GitHub Pages |
| `scripts/run-master-assortment.mjs` | Массовое добавление SKU (валидирует brand/moods/accords/families/similar) |
| `scripts/apply-wholesale-prices.mjs` | Пересчёт цен из оптового прайса |

После добавления товаров имеет смысл:

```bash
node scripts/generate-sitemap.mjs
npm run build
node scripts/prepare-pages.mjs
```

(на CI это уже в workflow).

---

## 10. Частые ошибки

| Ошибка | Результат |
|--------|-----------|
| Парфюм в `luxury.json` с `"collection": "niche"` | Путаница фильтров/лейблов |
| `brandId` без бренда | Нет имени/лого, битые пути картинок |
| Нота-ID нет в `notes.json` | Сырой id в UI, битая страница ноты |
| Mood не из taxonomy | Фильтр mood не находит товар |
| `concentration: "Eau de Parfum"` | Фильтр EDP не матчится |
| `gallery` с 04.jpg | Ничего не покажет — слоты только main/02/03 |
| `similar` на несуществующий id | Тихо пропускается |
| Цена `null` + `visible: true` | Товар в каталоге без цены / странная сортировка |
| `<perfume>Wrong Name</perfume>` в статье | Нет ссылки на товар |
| Путать Baccarat (MFK) и Barakkat (Fragrance World) | Нарушение правила «только оригинал» |

---

*При сомнении смотрите живой пример в JSON (например Black Opium / Paradoxe / статью `autumn-2026`) и копируйте структуру полей один в один, меняя только значения.*

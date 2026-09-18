import { taxonomy, brands, site, notesLibrary } from '../../data/index.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

function ChipGroup({ title, options, selected = [], onToggle, getLabel }) {
  if (!options?.length) return null;

  return (
    <div className="filter-group">
      <h3>{title}</h3>
      <div className="filter-options">
        {options.map((option) => {
          const id = option.id ?? option;
          const label = getLabel ? getLabel(option) : (option.label ?? option);
          const active = selected.map(String).includes(String(id));
          return (
            <button
              key={id}
              type="button"
              className={`filter-chip${active ? ' is-active' : ''}`}
              onClick={() => onToggle(id)}
              aria-pressed={active}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function toggleValue(list, value) {
  const str = String(value);
  const exists = list.map(String).includes(str);
  if (exists) return list.filter((v) => String(v) !== str);
  return [...list, value];
}

export default function FilterPanel({ filters, onChange, open, priceBounds }) {
  const { t, taxonomyLabel } = useLanguage();
  const update = (patch) => onChange({ ...filters, ...patch });

  const labelOf = (group) => (option) => taxonomyLabel(group, option.id);

  return (
    <aside className={`filter-panel${open ? ' is-open' : ''}`} aria-label={t('common.filters')}>
      <ChipGroup
        title={t('filters.collection')}
        options={taxonomy.collections}
        selected={filters.collection}
        onToggle={(id) => update({ collection: toggleValue(filters.collection, id) })}
        getLabel={labelOf('collections')}
      />
      <ChipGroup
        title={t('filters.gender')}
        options={taxonomy.genders}
        selected={filters.gender}
        onToggle={(id) => update({ gender: toggleValue(filters.gender, id) })}
        getLabel={labelOf('genders')}
      />
      <ChipGroup
        title={t('filters.brand')}
        options={brands.map((b) => ({ id: b.id, label: b.name }))}
        selected={filters.brandId}
        onToggle={(id) => update({ brandId: toggleValue(filters.brandId, id) })}
        getLabel={(o) => o.label}
      />
      <ChipGroup
        title={t('filters.mood')}
        options={taxonomy.moods}
        selected={filters.moods}
        onToggle={(id) => update({ moods: toggleValue(filters.moods, id) })}
        getLabel={labelOf('moods')}
      />
      <ChipGroup
        title={t('filters.family')}
        options={taxonomy.families}
        selected={filters.families}
        onToggle={(id) => update({ families: toggleValue(filters.families, id) })}
        getLabel={labelOf('families')}
      />
      <ChipGroup
        title={t('filters.accords')}
        options={taxonomy.accords}
        selected={filters.accords}
        onToggle={(id) => update({ accords: toggleValue(filters.accords, id) })}
        getLabel={labelOf('accords')}
      />
      <ChipGroup
        title={t('filters.notes')}
        options={notesLibrary}
        selected={filters.notes}
        onToggle={(id) => update({ notes: toggleValue(filters.notes, id) })}
        getLabel={(option) => taxonomyLabel('notes', option.id)}
      />
      <ChipGroup
        title={t('filters.season')}
        options={taxonomy.seasons}
        selected={filters.seasons}
        onToggle={(id) => update({ seasons: toggleValue(filters.seasons, id) })}
        getLabel={labelOf('seasons')}
      />
      <ChipGroup
        title={t('filters.timeOfDay')}
        options={taxonomy.timeOfDay}
        selected={filters.timeOfDay}
        onToggle={(id) => update({ timeOfDay: toggleValue(filters.timeOfDay, id) })}
        getLabel={labelOf('timeOfDay')}
      />
      <ChipGroup
        title={t('filters.occasion')}
        options={taxonomy.occasions}
        selected={filters.occasions}
        onToggle={(id) => update({ occasions: toggleValue(filters.occasions, id) })}
        getLabel={labelOf('occasions')}
      />
      <ChipGroup
        title={t('filters.concentration')}
        options={taxonomy.concentrations}
        selected={filters.concentration}
        onToggle={(id) => update({ concentration: toggleValue(filters.concentration, id) })}
        getLabel={labelOf('concentrations')}
      />
      <ChipGroup
        title={t('filters.bottleSize')}
        options={taxonomy.bottleSizes.map((ml) => ({ id: ml, label: `${ml} ${t('common.ml')}` }))}
        selected={filters.bottleSize}
        onToggle={(id) => update({ bottleSize: toggleValue(filters.bottleSize, id) })}
        getLabel={(o) => o.label}
      />

      <div className="filter-group">
        <h3>{t('filters.price')} ({site.currency})</h3>
        <div className="filter-range">
          <div className="filter-range__inputs">
            <input
              type="number"
              aria-label={t('filters.price')}
              placeholder={String(priceBounds?.min ?? 0)}
              value={filters.priceMin ?? ''}
              onChange={(e) =>
                update({ priceMin: e.target.value === '' ? null : Number(e.target.value) })
              }
            />
            <input
              type="number"
              aria-label={t('filters.price')}
              placeholder={String(priceBounds?.max ?? 0)}
              value={filters.priceMax ?? ''}
              onChange={(e) =>
                update({ priceMax: e.target.value === '' ? null : Number(e.target.value) })
              }
            />
          </div>
        </div>
      </div>

      {taxonomy.characterScales.map((scale) => (
        <div key={scale.id} className="filter-group filter-scale">
          <h3>
            {taxonomyLabel('characterScales', scale.id)}
            {filters[scale.id] ? ` · ${filters[scale.id]}+` : ''}
          </h3>
          <input
            type="range"
            min={scale.min}
            max={scale.max}
            step={1}
            value={filters[scale.id] ?? scale.min}
            onChange={(e) => update({ [scale.id]: Number(e.target.value) })}
          />
        </div>
      ))}

      <div className="filter-actions">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() =>
            onChange({
              collection: [],
              gender: [],
              brandId: [],
              moods: [],
              families: [],
              accords: [],
              notes: [],
              seasons: [],
              timeOfDay: [],
              occasions: [],
              concentration: [],
              bottleSize: [],
              priceMin: null,
              priceMax: null,
              sweetness: null,
              freshness: null,
              warmth: null,
              intensity: null,
            })
          }
        >
          {t('common.clearFilters')}
        </button>
      </div>
    </aside>
  );
}

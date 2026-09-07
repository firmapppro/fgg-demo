# Техническое задание: Унификация алгоритма и интерфейса «География полетов»

## 1. Контекст и цель задачи

Текущая модель разграничения доступности бортов (`flightAvailabilityZoneId` в таблице `planes_units`) жестко делит самолеты на 5 фиксированных зон («Только РФ», «РФ + Беларусь», «РФ и друг страны», «РФ+РБ+Центр. Азия», «Международные»). 

**Проблема:**
- Бизнес-реалии требуют индивидуальной настройки географии каждого воздушного судна (например, борт базируется в Дубае и летает по Ближнему Востоку и Европе, но не летает в РФ; либо борт летает только в ОАЭ и Турцию).
- Старая классификация блокирует поле «Валюта» и жестко привязывает расчеты к РФ.
- В API используются хардкодные массивы стран (`PLANES_REGIONS_TYPES_RF_MAIN_COUNTRIES` и т.д.), которые не позволяют гибко масштабировать международный бизнес FGG.

**Цель:**
1. Полный отказ от старого селектора зон в форме борта.
2. Внедрение нового самостоятельного раздела **«4. География полетов»** сразу после раздела «3. Характеристики самолета».
3. Реализация интерактивного интерфейса с быстрыми пресетами регионов, тегами стран и **интерактивной векторной картой мира** с двусторонней синхронизацией.
4. Предоставление готовой библиотеки карты (`jsVectorMap`) и готового React-компонента для команды разработки `flight_gg_admin`.
5. Доработка API `charter_flights_api` для хранения кодов стран и проверки маршрутов.

---

## 2. Интерактивный прототип

Для наглядного ознакомления с визуалом и логикой взаимодействия подготовлен рабочий прототип:
- **Локально в проекте:** `fgg-dashboard-proto/geography-proto/index.html`
- **Онлайн-версия:** [https://chypulis.top/geography-proto/](https://chypulis.top/geography-proto/)

---

## 3. Требования к Frontend (`flight_gg_admin`)

### 3.1. Изменения в форме борта (`ResourceEditNew.tsx` и `ResourceCreateNew.tsx`)

1. **Блок «2. Основная информация о самолете»:**
   - **Удалить** поле `<CustomSelectInput source="flightAvailabilityZoneId" ... />` (строки 517–534).
   - Поле **«Валюта»** (`currencyId`): сделать независимым, убрать блокировку `disabled={Number(formData?.flightAvailabilityZoneId) === 4 ? false : true}`. Валюта доступна для свободного выбора независимо от географии.
2. **Размещение нового раздела «4. География полетов»:**
   - Раздел размещается строго **под разделом «3. Характеристики самолета»** (перед «Цены и тарифы»).
   - Существующие разделы сдвигаются в нумерации:
     - 1. Добавление фотографий борта
     - 2. Основная информация о самолете
     - 3. Характеристики самолета
     - **4. География полетов (НОВЫЙ)**
     - 5. Цены и тарифы (ранее 4)
     - 6. Календарь полетов (ранее 5)
     - 7. Интеграции (ранее 6)

### 3.2. Компоновка раздела «4. География полетов»

Интерфейс строится по двухколоночной схеме:

#### Левая колонка (Управление, пресеты, поиск и теги) — ширина ~440–460px:
1. **Быстрые пресеты регионов (Pills/Chips):**
   - Кнопки: `Весь мир`, `Евросоюз (ЕС)`, `Ближний Восток`, `СНГ и Центральная Азия`, `Азия и ЮВА`, `Северная Америка`.
   - **Важно:** Клик по пресету **дополняет** текущий список стран, а не перезаписывает уже добавленные.
   - Рядом с названием пресета отображается бейдж с количеством стран (напр., `+27`).
   - Тултип с перечнем стран при наведении.
2. **Ручной ввод страны (Search & Autocomplete):**
   - Текстовое поле с иконкой лупы и кнопкой `+ Добавить`.
   - Автодополнение при вводе: поиск по русскому названию, английскому названию и 2-буквенному ISO-коду (например: `ОАЭ`, `UAE`, `AE`).
   - Выпадающий список совпадений: отображает флаг, название на русском, название на английском, ISO-код.
   - Выбор мышью или по клавише `Enter` добавляет страну в список и подсвечивает ее на карте.
3. **Список выбранных стран (Теги):**
   - Заголовок со счетчиком: `Разрешенные страны: [ N ]`.
   - Кнопка `Очистить всё` (с подтверждением).
   - Скроллируемый контейнер с тегами (высота 200–280px).
   - Формат тега: `[ 🇦🇪 ОАЭ AE ✕ ]`.
   - Клик по крестику `✕` мгновенно удаляет страну из списка и снимает ее выделение на карте мира.
   - Состояние пустого списка: плейсхолдер с подсказкой «География полетов не выбрана. Выберите пресет или кликните по карте».

#### Правая колонка (Интерактивная карта мира):
1. **Готовая библиотека:** **`jsVectorMap`** (v1.6.0).
   - Векторная SVG-карта мира (`world` / `world-merc`), не требующая внешних картографических API и тайловых серверов.
   - Размер: ~35 KB (код) + ~100 KB (карта).
   - Поддерживает зум (колесо мыши, кнопки `+`/`-`), перемещение drag & drop, мультивыделение регионов.
2. **Двусторонняя синхронизация:**
   - **Клик по стране на карте:** 
     - Если страна не выбрана -> добавляется в список тегов слева и красится в синий цвет (`#2563EB`).
     - Если страна уже выбрана -> удаляется из списка тегов и возвращается в исходный серый цвет (`#E2E8F0`).
   - **Клик по тегу слева или выбор пресета:** мгновенно обновляет выделение полигонов на карте через `map.setSelectedRegions([...])`.
3. **Всплывающая подсказка (Tooltip) при наведении курсора на карте:**
   - Флаг + Название на русском (Название на английском).
   - Статус: `✓ Разрешено к полетам` (зеленый) или `Кликните, чтобы добавить` (серый).

---

## 4. Рекомендуемое готовое решение для разработчиков (React/TypeScript)

Чтобы разработчики не тратили часы на интеграцию карты, передается готовый код компонентов для `flight_gg_admin`.

### 4.1. Установка зависимости
```bash
npm install jsvectormap
```

### 4.2. Состав пресетов регионов (ISO 3166-1 alpha-2)
```typescript
export const GEOGRAPHY_PRESETS = {
  eu: {
    title: 'Евросоюз (ЕС)',
    countries: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE']
  },
  middle_east: {
    title: 'Ближний Восток',
    countries: ['AE','SA','QA','BH','KW','OM','TR','IL','JO','LB','IQ','IR','EG']
  },
  cis: {
    title: 'СНГ и Центральная Азия',
    countries: ['RU','BY','KZ','UZ','KG','TJ','TM','AM','AZ','GE']
  },
  asia: {
    title: 'Азия и ЮВА',
    countries: ['CN','JP','KR','IN','TH','SG','MY','ID','VN','PH','LK','MV','HK','TW']
  },
  north_america: {
    title: 'Северная Америка',
    countries: ['US','CA','MX']
  }
};
```

### 4.3. React-компонент карты (`FlightGeographySection.tsx`)
```tsx
import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'jsvectormap/dist/maps/world';
import { Box, Chip, TextField, Autocomplete, Button, Typography, Stack } from '@mui/material';
import { COUNTRIES_DICT, GEOGRAPHY_PRESETS } from './geographyConstants';

export const FlightGeographySection: React.FC = () => {
  const { watch, setValue } = useFormContext();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const isProgrammatic = useRef<boolean>(false);

  // Список выбранных ISO-кодов стран
  const allowedCodes: string[] = watch('allowedCountryCodes') || [];

  // Инициализация карты
  useEffect(() => {
    if (!mapRef.current) return;

    mapInstance.current = new (jsVectorMap as any)({
      selector: mapRef.current,
      map: 'world',
      backgroundColor: '#F8FAFC',
      draggable: true,
      zoomButtons: true,
      zoomOnScroll: true,
      regionsSelectable: true,
      regionsSelectableOne: false,
      selectedRegions: allowedCodes,
      regionStyle: {
        initial: { fill: '#E2E8F0', stroke: '#FFFFFF', strokeWidth: 0.6 },
        hover: { fill: '#93C5FD', cursor: 'pointer' },
        selected: { fill: '#2563EB' },
        selectedHover: { fill: '#1D4ED8' }
      },
      onRegionSelected: (index: string, isSelected: boolean) => {
        if (isProgrammatic.current) return;
        const current = new Set(watch('allowedCountryCodes') || []);
        if (isSelected) {
          current.add(index);
        } else {
          current.delete(index);
        }
        setValue('allowedCountryCodes', Array.from(current), { shouldDirty: true });
      },
      onRegionTooltipShow: (event: any, tooltip: any, code: string) => {
        const country = COUNTRIES_DICT[code];
        const isSel = (watch('allowedCountryCodes') || []).includes(code);
        const name = country ? `${country.flag} ${country.nameRu}` : code;
        tooltip.text(
          `<div><b>${name}</b><br/>${isSel ? '✓ Разрешено к полетам' : 'Кликните для добавления'}</div>`,
          true
        );
      }
    });

    return () => {
      mapInstance.current?.destroy();
    };
  }, []);

  // Синхронизация карты при изменении формы из тегов/пресетов
  useEffect(() => {
    if (!mapInstance.current) return;
    isProgrammatic.current = true;
    mapInstance.current.setSelectedRegions(allowedCodes);
    isProgrammatic.current = false;
  }, [allowedCodes]);

  const handleAddPreset = (codes: string[]) => {
    const next = Array.from(new Set([...allowedCodes, ...codes]));
    setValue('allowedCountryCodes', next, { shouldDirty: true });
  };

  const handleRemoveCountry = (codeToRemove: string) => {
    setValue(
      'allowedCountryCodes',
      allowedCodes.filter(c => c !== codeToRemove),
      { shouldDirty: true }
    );
  };

  return (
    <Box sx={{ mt: 3, p: 3, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        4. География полетов
      </Typography>
      <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
        Выберите разрешенные страны полетов с помощью пресетов, поиска или кликов по карте мира.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {/* Левая колонка */}
        <Box sx={{ width: { xs: '100%', md: 450 } }}>
          {/* Пресеты */}
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', display: 'block', mb: 1 }}>
            ПРЕСЕТЫ РЕГИОНОВ
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {Object.entries(GEOGRAPHY_PRESETS).map(([key, preset]) => (
              <Chip
                key={key}
                label={`${preset.title} +${preset.countries.length}`}
                onClick={() => handleAddPreset(preset.countries)}
                variant="outlined"
                clickable
              />
            ))}
          </Box>

          {/* Автодополнение */}
          <Autocomplete
            options={Object.values(COUNTRIES_DICT)}
            getOptionLabel={(opt) => `${opt.flag} ${opt.nameRu} (${opt.code})`}
            onChange={(_, value) => value && handleAddPreset([value.code])}
            renderInput={(params) => <TextField {...params} size="small" placeholder="Добавить страну..." />}
            sx={{ mb: 2 }}
          />

          {/* Теги */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Выбрано стран: {allowedCodes.length}
            </Typography>
            <Button size="small" color="error" onClick={() => setValue('allowedCountryCodes', [])}>
              Очистить всё
            </Button>
          </Box>

          <Box sx={{ p: 1.5, border: '1px solid #E2E8F0', borderRadius: 1.5, maxHeight: 260, overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
            {allowedCodes.map(code => (
              <Chip
                key={code}
                label={`${COUNTRIES_DICT[code]?.flag || ''} ${COUNTRIES_DICT[code]?.nameRu || code}`}
                onDelete={() => handleRemoveCountry(code)}
                size="small"
              />
            ))}
          </Box>
        </Box>

        {/* Правая колонка: Карта */}
        <Box sx={{ flex: 1, minHeight: 400, border: '1px solid #E2E8F0', borderRadius: 1.5, p: 1, bgcolor: '#F8FAFC' }}>
          <div ref={mapRef} style={{ width: '100%', height: '420px' }} />
        </Box>
      </Stack>
    </Box>
  );
};
```

---

## 5. Требования к Backend (`charter_flights_api`)

### 5.1. База данных (Таблица `planes_units`)

1. **Добавить колонки:**
   - `allowedCountryCodes` — `JSON` (или `TEXT[]` / `JSONB`), массив двухбуквенных ISO-кодов разрешенных стран (напр. `["RU", "AE", "TR", "KZ", "BY"]`).
   - `isAllWorld` — `BOOLEAN`, дефолт `false`. Устанавливается в `true`, если борт летает по всему миру.
2. **Миграция существующих данных:**
   - Борта с `flightAvailabilityZoneId = 1` («Только РФ») -> `allowedCountryCodes = ["RU"]`, `isAllWorld = false`.
   - Борта с `flightAvailabilityZoneId = 2` («РФ + Беларусь») -> `allowedCountryCodes = ["RU", "BY"]`, `isAllWorld = false`.
   - Борта с `flightAvailabilityZoneId = 3` («РФ и друг страны») -> `allowedCountryCodes = ["RU", "BY", "KZ", "AM", "KG", "TJ", "UZ", "AZ", "TR", "AE", "GE"]`, `isAllWorld = false`.
   - Борта с `flightAvailabilityZoneId = 5` («РФ+РБ+Центр. Азия») -> `allowedCountryCodes = ["RU", "BY", "KZ", "UZ", "KG", "TJ", "TM"]`, `isAllWorld = false`.
   - Борта с `flightAvailabilityZoneId = 4` («Международные») -> `isAllWorld = true`, `allowedCountryCodes = [...]`.
   - Старую колонку `flightAvailabilityZoneId` пометить как `nullable` (deprecated) для плавного перехода.

### 5.2. Эндпоинты API

1. **`GET /dashboard/planes/units/:id`:**
   Возвращать в ответе:
   ```json
   {
     "id": 31,
     "tailNumber": "RA-02875",
     "currencyId": 3,
     "isAllWorld": false,
     "allowedCountryCodes": ["RU", "BY", "AE", "TR", "KZ", "UZ", "SA", "QA", "OM", "EG"]
   }
   ```
2. **`POST /dashboard/planes/units` и `PUT /dashboard/planes/units/:id`:**
   Принимать в DTO (`CreatePlaneUnitDto`, `UpdatePlaneUnitDto`):
   ```typescript
   @IsOptional()
   @IsArray()
   @IsString({ each: true })
   allowedCountryCodes?: string[];

   @IsOptional()
   @IsBoolean()
   isAllWorld?: boolean;
   ```

### 5.3. Обновление алгоритма подбора бортов (`PlanesService`, `OrdersService`, `AirportsService`)

Вместо сопоставления с `zoneMap[data.filter.flightAvailabilityZoneId]` реализовать проверку стран аэропортов вылета и прилета:

```typescript
async isUnitAvailableForRoute(unitId: number, airportIcaos: string[]): Promise<boolean> {
  const unit = await this.planesUnitsModel.findByPk(unitId);
  if (!unit) return false;
  if (unit.isAllWorld) return true;

  // Получаем ISO-коды стран для каждого аэропорта маршрута
  const airports = await Promise.all(airportIcaos.map(icao => this.airportsService.getByIcao(icao)));
  const routeCountryCodes = [...new Set(airports.map(a => a.countryCode || a.countryIso))];

  // Борт подходит, только если ВСЕ страны маршрута входят в его разрешенные страны
  const allowed = new Set(unit.allowedCountryCodes || []);
  return routeCountryCodes.every(code => allowed.has(code));
}
```

---

## 6. Чек-лист тестирования и приемки

1. [ ] **Frontend:** Выпадающий список «География полетов» в блоке «Основная информация» отсутствует.
2. [ ] **Frontend:** Поле «Валюта» доступно для редактирования в любой конфигурации.
3. [ ] **Frontend:** Раздел «4. География полетов» отображается под характеристиками борта.
4. [ ] **Frontend:** При клике на пресет (например, «ЕС») страны пресета добавляются в список, дубликаты не создаются.
5. [ ] **Frontend:** При клике на крестик тега страна удаляется из списка и гаснет на карте.
6. [ ] **Frontend:** При клике на страну на карте мира она выделяется и добавляется в теги (повторный клик — снимает выделение и удаляет тег).
7. [ ] **Frontend:** Поиск с автодополнением находит страны по-русски, по-английски и по ISO-коду.
8. [ ] **Backend:** Сохранение борта отправляет массив `allowedCountryCodes` и сохраняет в БД.
9. [ ] **Backend:** Поиск бортов под рейс фильтрует борта по фактическому соответствию стран вылета и прилета.

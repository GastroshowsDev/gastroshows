# International Phone Validation System

Sistema de validación de números telefónicos para cualquier país del mundo.

## 📋 Componentes

### 1. **CountriesData** (`lib/countries.ts`)
Base de datos de países con validación automática.

```typescript
interface Country {
  code: string;        // ISO 3166-1 (ES, FR, DE)
  dialCode: string;    // +34, +33, +49
  name: string;        // España, Francia, Alemania
  flag: string;        // 🇪🇸 (emoji)
  format: string;      // Patrón visual: "+34 XXX XX XX XX"
  regex: RegExp;       // Validación: /^(?:\+34|...)/
  minLength: number;   // 9 (para España)
  maxLength: number;   // 9 (para España)
}
```

**Funciones útiles:**
- `getCountryByCode("ES")` → Country
- `getCountryByDialCode("+34")` → Country
- `getDefaultCountry()` → Spain
- `validatePhoneNumber(phone, country)` → { valid, error? }
- `formatPhoneNumber(phone, country)` → "+34 612 34 56 78"

**Países soportados:** 13 (España, Francia, Alemania, Italia, Portugal, Reino Unido, USA, Canadá, México, Brasil, Argentina, Australia, Japón, China)

---

### 2. **CountrySelector** (`components/reservation/CountrySelector.tsx`)
Componente interactivo para seleccionar país y código.

**Características:**
- 🚩 **Flag Button (40px ancho)**
  - Muestra la bandera del país
  - Click abre/cierra el dropdown O transforma a input de código
  - Mismo alto que otros campos del formulario
  
- 📝 **Code Input (80px ancho)**
  - Aparece con fade-in (0.5s) al clickar la bandera
  - Se puede editar manualmente
  - Busca en tiempo real: si escribes "+33", busca Francia
  - Click abre dropdown si está cerrado
  
- 🔍 **Dropdown Searchable**
  - Se abre al clickar flag, code input o al escribir
  - Busca por: nombre del país, código ISO, dial code
  - Cada opción muestra: bandera, nombre, código ISO, dial code
  - Click en opción → actualiza todo

**Props:**
```typescript
<CountrySelector
  selectedCountry={Country}
  onChange={(country) => setCountry(country)}
  isOpen={boolean}
  onOpenChange={(open) => setOpen(open)}
/>
```

**Transiciones:**
- Flag → Code: fade-out (0.25s) + fade-in (0.25s)
- Code → Flag: fade-out (0.25s) + fade-in (0.25s)
- Dropdown: slideUp animation (0.2s)

---

### 3. **Validation Schemas**
Integración en formularios.

**Client-side** (`lib/reservation-schema-client.ts`):
```typescript
reservationFormSchema.refine(
  (data) => {
    const country = getCountryByDialCode(data.countryCode);
    return validatePhoneNumber(data.phone, country).valid;
  },
  { message: "Número inválido para este país", path: ["phone"] }
);
```

**Server-side** (`lib/reservations.ts`):
```typescript
reservationInputSchema.refine(
  (data) => {
    const country = getCountryByDialCode(data.countryCode);
    return validatePhoneNumber(data.phone, country).valid;
  },
  { message: "Número inválido para este país", path: ["phone"] }
);
```

---

## 🎯 Cómo usar

### En ReservationModal
```tsx
import { CountrySelector } from "@/components/reservation/CountrySelector";
import { COUNTRIES, getDefaultCountry } from "@/lib/countries";

export function ReservationModal() {
  const [countryCode, setCountryCode] = useState(getDefaultCountry().dialCode);

  return (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      <CountrySelector
        selectedCountry={COUNTRIES.find(c => c.dialCode === countryCode) || getDefaultCountry()}
        onChange={(country) => setCountryCode(country.dialCode)}
      />
      <input
        type="tel"
        placeholder="600 000 000"
        // ... resto del input
      />
    </div>
  );
}
```

### Validar manualmente
```tsx
import { validatePhoneNumber, getCountryByDialCode } from "@/lib/countries";

const country = getCountryByDialCode("+34");
const result = validatePhoneNumber("612345678", country);

if (result.valid) {
  console.log("✅ Número válido");
} else {
  console.log("❌", result.error);
}
```

---

## 📱 Ejemplos de números válidos

| País | Código | Ejemplo | Mín | Máx |
|------|--------|---------|-----|-----|
| España | +34 | 612 34 56 78 | 9 | 9 |
| Francia | +33 | 1 23 45 67 89 | 9 | 9 |
| Alemania | +49 | 123 4567890 | 5 | 15 |
| Italia | +39 | 333 333 3333 | 10 | 10 |
| Portugal | +351 | 91 234 567 | 9 | 9 |
| UK | +44 | 2012 345678 | 10 | 15 |
| USA | +1 | (212) 555-1234 | 10 | 10 |
| Canadá | +1 | (416) 555-1234 | 10 | 10 |
| México | +52 | 55 1234 5678 | 10 | 10 |
| Brasil | +55 | 11 98765 4321 | 10 | 11 |
| Argentina | +54 | 9 11 1234 5678 | 10 | 11 |
| Australia | +61 | 412 345 678 | 9 | 12 |
| Japón | +81 | 09 1234 5678 | 10 | 11 |
| China | +86 | 010 1234 5678 | 11 | 11 |

---

## 🔧 Agregar nuevo país

1. Añadir a `COUNTRIES[]` en `lib/countries.ts`:
```typescript
{
  code: "NL",
  dialCode: "+31",
  name: "Países Bajos",
  flag: "🇳🇱",
  format: "+31 XXX XXXXXXX",
  regex: /^(?:\+31|0031|31)?[\s.-]?([1-9])[\s.-]?(\d{3})[\s.-]?(\d{4,5})$/,
  minLength: 9,
  maxLength: 9,
}
```

2. Listo. Ya aparecerá en el dropdown del CountrySelector.

---

## 🎨 Styling

**Flag button:**
- Ancho: 40px
- Alto: 2.5rem (igual al input)
- Border: 1px solid var(--gs-border)
- Background: var(--gs-bg2)
- Hover: borde gold, bg con gold transparency
- Border-radius: 4px

**Code input:**
- Ancho: 80px
- Alto: 2.5rem
- Aparece con fade-in 0.5s (opacity + transform)
- Same styling como otros inputs

**Dropdown:**
- Min-width: 280px
- Max-height: 300px
- Scroll automático
- Search input integrado
- Cada opción: hover background gold + transparency

---

## ⚠️ Notas importantes

1. **Validación de cliente y servidor:** La validación ocurre en ambos lados. El server NO confía en el cliente.

2. **Dialcode vs phone separados:** `countryCode` y `phone` se envían por separado. El server valida que sean compatibles.

3. **Formato almacenado:** Considera almacenar como:
   - `country_code` (ej: "ES")
   - `phone_number` (ej: "612345678") — sin dialcode
   - Luego reconstituir: "+34 612 34 56 78" cuando sea necesario

4. **API internacionales:** Si en el futuro necesitas integración con servicios de SMS o verificación, usa formato E.164: `+34612345678`

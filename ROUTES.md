# Code Routes Map

Sistema de rutas etiquetado para navegación eficiente del código. Cada entrada es un destino específico con ubicación exacta.

---

## 🌍 International Phone Validation

| Route Tag | File | What |
|-----------|------|------|
| `CountriesData` | `lib/countries.ts` | Country list (13+ countries), dialCodes, formats, validators |
| `CountrySelector` | `components/reservation/CountrySelector.tsx` | UI: Flag button (40px) + code input + searchable dropdown |
| `PhoneValidation` | `lib/countries.ts` | `validatePhoneNumber()`, `formatPhoneNumber()` functions |

**How it works:**
- User clicks flag (🇪🇸) → fade-out (0.5s) → code input appears (fade-in 0.5s)
- Can type dial code manually or click flag to open dropdown
- Dropdown filters by country name/code/dialCode
- Selecting country updates flag + code + validation rules
- Phone input validates against country's min/max/regex

**Supported countries:** ES, FR, DE, IT, PT, UK, US, CA, MX, BR, AR, AU, JP, CN

**Schema integration:** ReservationFormSchema validates `phone` + `countryCode` together using `.refine()`

---

## 🔐 Authentication & Authorization

| Route Tag | File | What | Key Function |
|-----------|------|------|--------------|
| `AuthHelpers` | `lib/auth-helpers.ts` | Role validation utilities | `requireAdmin()`, `requireStaff()` |
| `AuthMiddleware` | `middleware.ts` | Request filtering + role whitelist | LIVE/ADMIN role enforcement |
| `AuthSession` | `lib/auth.ts` | Session type definitions | `AuthorizedSession`, `Role` type |

---

## 📋 Reservations (Core Domain)

| Route Tag | File | What | Key Function/Export |
|-----------|------|------|-------|
| `ReservationValidation` | `lib/reservations.ts` | Booking rules validation | `validateServiceDate()`, `getBaseAmountForGuests()` |
| `ReservationSchema` | `lib/reservation-schema-client.ts` | Client-side form schema | `reservationFormSchema` (Zod) |
| `ReservationInput` | `lib/reservations.ts` | Server-side schema | `reservationInputSchema` (Zod) |
| `ReservationForm` | `components/reservation/ReservationForm.tsx` | Simple form component | Single-page form, Redsys integration |
| `ReservationModal` | `components/reservation/ReservationModal.tsx` | Multi-step booking | Step1 (Date/Shift), Step2 (Guests), Step3 (Contact) |
| `AllergyPicker` | `components/reservation/AllergyPicker.tsx` | Allergen selection modal | Toggle select (not cycling), 40px buttons, sub-options |
| `BookingCalendar` | `components/reservation/BookingCalendar.tsx` | Date picker | Holiday blocking, allowed days |
| `PaymentButton` | `components/reservation/PaymentButton.tsx` | Payment gateway button | Redsys, demo-mode check |

---

## 🔌 API Endpoints

### Public Endpoints

| Route Tag | File | HTTP | What |
|-----------|------|------|------|
| `AvailabilityEndpoint` | `app/api/public/availability/route.ts` | GET | Weekly slots data, 2min cache |
| `HolidaysEndpoint` | `app/api/public/holidays/route.ts` | GET | Blocked dates list |
| `DemoModeEndpoint` | `app/api/public/settings/demo-mode/route.ts` | GET | Public demo flag only (safe) |
| `ConfigEndpoint` | `app/api/public/config/route.ts` | GET | Pricing, campaigns, discounts |

### Reservation Endpoints

| Route Tag | File | HTTP | Auth | What |
|-----------|------|------|------|------|
| `ReservationCreate` | `app/api/reservations/normal/route.ts` | POST | None | Create normal booking |
| `ReservationCreatePrivate` | `app/api/reservations/private/route.ts` | POST | None | Create private event inquiry |
| `ReservationGetById` | `app/api/reservations/[id]/route.ts` | GET/PATCH/DELETE | Staff+ | Read/modify/cancel, IDOR fixed |
| `GiftSend` | `app/api/reservations/gift/send/route.ts` | POST | None | Email gift voucher |
| `GiftRedeem` | `app/api/reservations/gift/redeem/route.ts` | POST | None | Redeem gift code |

### Admin Endpoints (requireAdmin)

| Route Tag | File | HTTP | What |
|-----------|------|------|------|
| `AdminUsers` | `app/api/admin/users/route.ts` | GET/POST | User CRUD |
| `AdminUserById` | `app/api/admin/users/[id]/route.ts` | PATCH/DELETE | Edit/delete user, self-delete guard |
| `AdminSettings` | `app/api/admin/settings/route.ts` | GET/POST | Global config (demo_mode, prices, etc.) |
| `AdminSmtp` | `app/api/admin/smtp-settings/route.ts` | GET/POST | Email server config |
| `AdminBackups` | `app/api/admin/backups/route.ts` | GET/POST | Database dumps |
| `AdminReservationsPending` | `app/api/admin/reservations/pending/route.ts` | GET | Unconfirmed bookings (LIVE allowed) |
| `AdminReservationsImport` | `app/api/admin/import/reservations/route.ts` | POST | Bulk import (CSV/JSON) |

### Admin Live Staff Endpoints (requireStaff)

| Route Tag | File | HTTP | What |
|-----------|------|------|------|
| `ReservationsLive` | `app/api/admin/reservations/live/route.ts` | GET | Current service dashboard |
| `ReservationsAllergies` | `app/api/admin/reservations/allergies/route.ts` | GET | Allergen checklist by table |
| `ReservationsMerge` | `app/api/admin/reservations/merge/route.ts` | POST | Combine related bookings |
| `VisitsOps` | `app/api/admin/visits/route.ts` | GET/POST | Visit logs (LIVE allowed) |

---

## 🎨 UI Components

### Sections & Blocks

| Route Tag | File | What | Props |
|-----------|------|------|-------|
| `AvailabilityWidget` | `components/home/DisponibilidadSection.tsx` | Weekly availability display | title (with {total} placeholder), buttonText, onReservar |
| `AvailabilityBlock` | `components/blocks/AvailabilityBlock.tsx` | Editable availability block | content (AvailabilityContent), isEditing, onUpdate |
| `CountrySelector` | `components/reservation/CountrySelector.tsx` | Flag button + code input + dropdown | selectedCountry, onChange, isOpen, onOpenChange |
| `HeroSection` | `components/home/HeroSection.tsx` | Landing hero | Data from block builder |
| `GaleriaSection` | `components/home/GaleriaSection.tsx` | Image gallery | Grid layout, animations |
| `RitualSection` | `components/home/RitualSection.tsx` | Steps/process section | Day-by-day email flow |

### Admin UI

| Route Tag | File | What |
|-----------|------|------|
| `AdminLayout` | `components/admin/AdminLayout.tsx` | Sidebar + TopBar wrapper |
| `AdminSidebar` | `components/admin/AdminSidebar.tsx` | Navigation menu |
| `AdminTopBar` | `components/admin/AdminTopBar.tsx` | Header + user menu |
| `ReservasTable` | `components/admin/ReservasTable.tsx` | Reservations list (filters, status, pricing) |
| `ContactsTable` | `components/admin/ContactsTable.tsx` | Guest/contact management |
| `PendingPanel` | `components/admin/PendingReservationsPanel.tsx` | Unconfirmed bookings |
| `VisitasTable` | `components/admin/VisitasTable.tsx` | Visit history |
| `GiftVouchersBoard` | `components/admin/GiftVouchersBoard.tsx` | Gift card sales/redemptions |

### Utilities

| Route Tag | File | What |
|-----------|------|------|
| `ThemeToggle` | `components/ThemeToggle.tsx` | Dark/Light/Revelado mode switcher |
| `DemoModeToggle` | `components/admin/DemoModeToggle.tsx` | Demo flag toggle |
| `InlineText` | `components/admin/InlineText.tsx` | Editable inline text (admin editor) |

---

## 📄 Page Builder System

| Route Tag | File | What | Types |
|-----------|------|------|-------|
| `BlockTypes` | `lib/blocks/types.ts` | Type definitions | `BlockType`, `BlockData`, `ElementData`, `CommonStyles` |
| `BlockDefaults` | `lib/blocks/types.ts` | Default values for each block | `BLOCK_DEFAULTS` constant |
| `BlockLabels` | `lib/blocks/types.ts` | UI labels for block picker | `BLOCK_LABELS`, `ELEMENT_LABELS` |
| `BlockRenderer` | `components/blocks/BlockRenderer.tsx` | Main block -> component mapper | Routes `BlockData` to `HeroBlock`, `TextBlock`, etc. |
| `SectionBlock` | `components/blocks/SectionBlock.tsx` | Multi-column container | Grid layout, responsive |
| `HeroBlock` | `components/blocks/HeroBlock.tsx` | Full-width hero banner | BG image, overlay, animations |
| `TextBlock` | `components/blocks/TextBlock.tsx` | Rich text with styles | Color, alignment, size, animations |
| `CtaBlock` | `components/blocks/CtaBlock.tsx` | Call-to-action section | Image, title, button |
| `GalleryBlock` | `components/blocks/GalleryBlock.tsx` | Image grid | 2/3/4 columns |
| `AvailabilityBlock` | `components/blocks/AvailabilityBlock.tsx` | Availability widget | Links to `DisponibilidadSection` |
| `StepsBlock` | `components/blocks/StepsBlock.tsx` | Process/timeline | Day-labeled steps |
| `AnimationHelper` | `lib/blocks/animations.ts` | Animation presets | Slide, fade, zoom animations |

---

## 🎯 Pages & Routes

| Route Tag | File | What |
|-----------|------|------|
| `PublicHome` | `app/page.tsx` | Landing page (hero, sections, availability) |
| `AdminHome` | `app/admin/page.tsx` | Admin dashboard (stats, shortcuts) |
| `ReservasAdmin` | `app/admin/reservas/page.tsx` | Reservations management table |
| `ContactosAdmin` | `app/admin/contactos/page.tsx` | Contacts/guests list |
| `RegalosAdmin` | `app/admin/regalos/page.tsx` | Gift vouchers management |
| `VisitasAdmin` | `app/admin/visitas/page.tsx` | Visit logs |
| `EstadisticasAdmin` | `app/admin/estadisticas/page.tsx` | Analytics dashboard |

---

## 🎨 Styling & Theme

| Route Tag | File | What | Key Variables |
|-----------|------|------|---|
| `GlobalStyles` | `app/globals.css` | Base styles + animations | CSS vars (--gs-gold, --gs-bg, etc.) |
| `ButtonAnimations` | `app/globals.css:247-314` | Global button styles | transform, ::before overlay, ::after explosion |
| `ThemeVars` | `app/globals.css:19-102` | Color palettes | Root, revelado, clandestino modes |

---

## ⚙️ Constants & Config

| Route Tag | Location | What | Value |
|-----------|----------|------|-------|
| `BasePrice` | `components/reservation/ReservationModal.tsx:46` | Per-person base price | €130 |
| `DiscountDays` | `components/reservation/ReservationModal.tsx:45` | Wed/Thu discount | 20% |
| `ShiftTimes` | Multiple | Service times | 12:45 (NOON), 19:45 (NIGHT) |
| `Capacity` | `app/api/public/availability/route.ts:5-6` | Max guests/shift | Sat 40ea (80 total), Wed-Fri 40 NIGHT |
| `TimeZone` | `lib/reservations.ts:21` | Server timezone | Europe/Madrid |
| `Shift` | `lib/auth.ts` | Role enum | ADMIN, LIVE |

---

## 🔍 Search Guide

**Find by feature:**
- Gift vouchers → `GiftSend`, `GiftRedeem`, `GiftVouchersBoard`
- Allergies → `AllergyPicker`, `AdminReservationsAllergies`
- Availability → `AvailabilityWidget`, `AvailabilityEndpoint`, `AvailabilityBlock`
- Admin users → `AdminUsers`, `AdminUserById`
- Payment → `PaymentButton`, `ReservationCreate`
- Calendar/dates → `BookingCalendar`, `HolidaysEndpoint`

**Find by user role:**
- Guest (public) → `ReservationForm`, `ReservationModal`, `AvailabilityWidget`
- Staff (LIVE) → `ReservationsLive`, `ReservationsAllergies`, `PendingPanel`
- Admin → All `Admin*` routes, `AdminLayout`, `AdminSettings`

**Find by tech stack:**
- Zod schemas → `ReservationSchema`, `ReservationInput`, `BlockTypes`
- NextAuth JWT → `AuthSession`, `AuthMiddleware`
- API routes → All files in `app/api/`
- React components → `components/` (UI, blocks, admin, reservation)
- Utilities → `lib/` (helpers, types, validation)

---

## 📝 Notes

- **Security:** All admin endpoints use `requireAdmin()` from `AuthHelpers`
- **Caching:** `AvailabilityEndpoint` caches 2min + 5min stale-while-revalidate
- **Shift times:** 12:45 (mediodía), 19:45 (noche) — defined in multiple files
- **Button styling:** Global animations use ::before (white overlay) + ::after (explosion effect)
- **DB timezone:** All dates stored as UTC, converted to Europe/Madrid on use

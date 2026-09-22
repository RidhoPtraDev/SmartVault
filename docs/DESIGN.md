---
version: alpha
name: SmartVault Aura
description: Design system aplikasi manajemen keuangan pribadi SmartVault — modern, tenang, dan terpercaya, dengan aksen glassmorphism dan permukaan bubble yang lembut.

colors:
  primary: "#4F46E5"
  primary-deep: "#3525CD"
  on-primary: "#FFFFFF"
  primary-container: "#4F46E5"
  on-primary-container: "#DAD7FF"
  secondary: "#6366F1"
  on-secondary: "#FFFFFF"
  secondary-container: "#6063EE"
  tertiary: "#10B981"
  on-tertiary: "#FFFFFF"
  tertiary-container: "#006E4B"
  cyan-accent: "#06B6D4"
  error: "#EF4444"
  error-container: "#FFDAD6"
  on-error-container: "#93000A"
  background: "#F4F5FB"
  surface: "#FAF8FF"
  surface-container-lowest: "#FFFFFF"
  surface-container-low: "#F2F3FF"
  surface-container: "#EAEDFF"
  surface-container-high: "#E2E7FF"
  on-surface: "#0F172A"
  on-surface-variant: "#64748B"
  outline: "#777587"
  outline-variant: "#C7C4D8"
  category-shopping: "#8B5CF6"
  category-food: "#F97316"
  category-transport: "#3B82F6"
  category-bills: "#F59E0B"
  category-entertainment: "#10B981"

typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: "700"
    lineHeight: 44px
    letterSpacing: -0.03em
  currency-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 38px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: "700"
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "500"
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: "600"
    lineHeight: 14px
    letterSpacing: 0.03em

rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px

spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 2.5rem

components:
  button-primary:
    background: "linear-gradient(90deg, {colors.primary} 0%, {colors.primary-container} 50%, {colors.secondary} 100%)"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    height: 56px
    shadow: "0px 12px 28px -6px rgba(79,70,229,0.45)"
    pressedScale: 0.98
  button-secondary-ghost:
    backgroundColor: "rgba(99,102,241,0.08)"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    border: none
  input-field:
    height: 56px
    backgroundColor: "{colors.surface-container-low}"
    rounded: "{rounded.full}"
    focusRing: "0px 0px 0px 3px rgba(79,70,229,0.2)"
    placeholderColor: "{colors.outline}"
  card:
    backgroundColor: "{colors.surface-container-lowest}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-lg}"
    shadow: "0px 10px 30px -4px rgba(79,70,229,0.06), 0px 4px 12px -2px rgba(15,23,42,0.03)"
  hero-balance-card:
    background: "linear-gradient(135deg, {colors.secondary-container} 0%, {colors.primary} 100%)"
    rounded: "{rounded.md}"
    textColor: "{colors.on-primary}"
    shadow: "0px 16px 36px -8px rgba(79,70,229,0.38)"
  icon-avatar:
    size: 32px
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
    shadow: "0px 4px 12px -2px rgba(53,37,205,0.3)"
  icon-pod:
    size: 44px
    rounded: "{rounded.sm}"
  nav-dock:
    backgroundColor: "{colors.surface-container-lowest}"
    rounded: "{rounded.full}"
    shadow: "0px 20px 40px -10px rgba(79,70,229,0.25)"
  chip-toggle-group:
    backgroundColor: "#F1F5F9"
    activeBackground: "{colors.primary}"
    activeTextColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  trust-badge:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
---

## Overview

SmartVault memvisualisasikan keuangan pribadi sebagai sesuatu yang tenang dan terkendali, bukan sumber cemas. Bahasa visualnya memadukan **glassmorphism modern** dengan **permukaan bubble yang lembut** — silhouette pill serba bulat, kartu-kartu putih yang tampak melayang di atas latar lavender pudar, dan aksen gradient ungu-indigo yang luminous. Kepribadian desainnya: optimis, cerdas, tenteram.

Warna hijau zamrud/cyan dipakai khusus untuk hal-hal positif (pemasukan, progress tercapai) — terinspirasi dari daun pada logo SmartVault — sehingga mengelola uang terasa seperti kebiasaan yang memuaskan secara visual, bukan tugas rumit penuh angka.

Referensi visual utama: dashboard utama (saldo, ringkasan pengeluaran), halaman transaksi, halaman budget, serta alur autentikasi (Sign In & Create Account) yang sudah dirancang di `screen.png` dan `code.html`.

## Colors

- **Primary (`#4F46E5` Royal Indigo):** tombol utama, navigasi aktif, hero balance card.
- **Primary Deep (`#3525CD`):** dipakai di ikon avatar kecil dan aksen ber-shadow indigo pekat.
- **Secondary (`#6366F1` Electric Iris):** berpasangan dengan primary membentuk gradient linear (`135deg, #4F46E5 → #6366F1 → #818CF8`) pada hero widget, chip terangkat, progress fill.
- **Tertiary (`#10B981` Emerald) & Cyan Accent (`#06B6D4`):** khusus indikator positif — pemasukan, badge deposit, progress ring, status berhasil. **Jangan** dipakai untuk elemen netral.
- **Error (`#EF4444`):** pengeluaran, debit, dan status peringatan (mis. budget terlampaui) — satu-satunya konteks pemakaian warna ini.
- **Background (`#F4F5FB`–`#FAF8FF`):** kanvas lavender-putih lembut di seluruh halaman.
- **Surface Containers:** putih murni (`#FFFFFF`) untuk kartu solid; versi frosted pakai `rgba(255,255,255,0.75)` + `backdrop-filter: blur(20px)` khusus header dan modal.
- **Teks:** `on-surface (#0F172A)` untuk judul kontras tinggi, `on-surface-variant (#64748B)` untuk metadata/label sekunder.
- **Category accents (shopping/food/transport/bills/entertainment):** palet 5 warna khusus untuk ikon & tag kategori transaksi supaya tiap kategori mudah dibedakan sekilas mata, tanpa mengganggu makna semantik primary/tertiary/error di atas.

## Typography

Dua font berpasangan: **Plus Jakarta Sans** untuk angka, headline, badge, dan navigasi; **Inter** untuk daftar transaksi yang padat, deskripsi, dan metadata.

- **Angka & mata uang** (`currency-hero`, `display-lg`) selalu pakai Plus Jakarta Sans dengan tracking negatif (`-0.02em` s/d `-0.03em`) — memberi kesan aplikasi finance premium.
- **Hierarki** dibentuk lewat kombinasi ukuran + weight, bukan ganti-ganti font. Label mikro (`label-sm`, 11px) memakai letter-spacing melebar untuk keterbacaan di badge kategori yang kecil.
- Body teks transaksi/deskripsi selalu Inter — jangan pakai Plus Jakarta Sans untuk paragraf panjang, karena didesain untuk display bukan reading.

## Layout

- **Mobile-first, grid 4 kolom** dengan margin `1rem` (16px) dan gutter `0.75rem` (12px) sebagai dasar; menyesuaikan halus ke tablet/desktop.
- **Ritme vertikal** memakai skala modular 4px/8px: antar section `space-lg` (24px), antar elemen di dalam satu kartu `space-xs`–`space-sm` (4–8px).
- **Inset bubble:** kartu kontainer memakai padding internal `space-md`–`space-lg` supaya elemen interaktif tidak pernah menempel ke tepi.
- **Safe area:** sisakan ruang bawah (`space-2xl`) untuk bottom navigation dock yang floating, terutama di halaman dengan tombol aksi utama (FAB tambah transaksi).

## Elevation & Depth

Hirarki visual dibentuk lewat lapisan kaca dan shadow ambient bernuansa indigo, bukan garis pembatas tegas:

- **Level 0 — Base canvas:** `#F4F5FB` dengan radial gradient ambient samar (lavender & cyan) di area atas viewport.
- **Level 1 — Card & bubble surface:** putih solid, shadow lembut `0px 10px 30px -4px rgba(79,70,229,0.06), 0px 4px 12px -2px rgba(15,23,42,0.03)`.
- **Level 2 — Frosted hero card:** gradient `linear-gradient(135deg, rgba(99,102,241,0.88), rgba(79,70,229,0.95))`, border atas `1px solid rgba(255,255,255,0.35)`, glow `0px 16px 36px -8px rgba(79,70,229,0.38)`.
- **Level 3 — Floating action & nav dock:** shadow terkuat `0px 20px 40px -10px rgba(79,70,229,0.25)`, dipakai hanya untuk elemen yang benar-benar mengambang di atas semua layer lain (FAB, bottom nav, modal sheet).
- **Header sticky:** `bg-surface/80` + `backdrop-blur-xl` + shadow tipis `0px 1px 8px rgba(0,0,0,0.04)` — membedakan dari card biasa yang tidak transparan.

## Shapes

Identitas bentuk utama: **pill-radius tinggi**, hampir tidak ada sudut tajam di seluruh app.

- **Pill primitives (`9999px` / `rounded.full`):** tombol CTA utama, input field, filter chip, category toggle, bottom nav dock.
- **Bubble cards (`rounded.md`, 24px):** kartu ringkasan finansial, hero balance vault, modal sheet.
- **Icon pods (`rounded.sm`, 8px squircle):** kontainer ikon transaksi/kategori — sedikit lebih tajam dari bubble card supaya ikon di dalamnya tetap terbaca jelas, tapi tetap lembut.

## Components

### 1. Buttons
- **Primary Action Pill:** `rounded.full`, tinggi 56px, gradient indigo (`primary → primary-container → secondary`), teks putih, shadow glow indigo, scale ke `0.98` saat ditekan.
- **Icon FAB:** lingkaran 52px, dipakai di tengah nav dock, ikon putih kontras di atas indigo dengan outer glow.
- **Secondary Ghost Pill:** background `rgba(99,102,241,0.08)`, teks indigo, tanpa border, transisi scale halus saat ditekan.

### 2. Input Fields
- Tinggi 56px, `rounded.full`, background `surface-container-low`, ikon leading dalam lingkaran kecil di sisi kiri.
- State fokus: background berubah ke `surface-container-lowest` + ring glow `0px 0px 0px 3px rgba(79,70,229,0.2)`.
- Placeholder pakai warna `outline`, bukan abu-abu generik.

### 3. Cards & Vault Containers
- **Hero Balance Vault:** kartu gradient berisi saldo utama, toggle sembunyikan saldo (ikon mata), shortcut transaksi cepat.
- **Overview/Progress Bubble:** kartu putih dengan donut chart (gradient cyan→emerald) dan progress bar pill untuk budget/savings goal.
- **Transaction/Category Row:** icon pod 44px di kiri, judul + kategori dua baris, nominal rata kanan dengan warna semantik (`tertiary` untuk pemasukan, `on-surface`/`error` untuk pengeluaran). Tanpa divider garis — pemisah cukup pakai jarak (`space-sm`).

### 4. Chips & Toggle Group
- Container bersama background `#F1F5F9`, padding internal 4px, berisi pill-pill tab. Tab aktif berubah jadi fill indigo penuh + teks putih; tab nonaktif teks slate pudar.

### 5. Trust Badge
- Pill kecil semi-transparan (`surface-container` + `backdrop-blur`), teks `tertiary`, dipakai khusus untuk penanda keamanan (mis. "256-bit Bank-Grade Encryption") di halaman auth.

## Do's and Don'ts

- **Do:** selalu pakai token reference (`{colors.primary}`, `{rounded.full}`, dst) di kode, bukan hardcode hex/px baru, supaya satu sumber kebenaran tetap terjaga.
- **Do:** pertahankan pill-radius (`rounded.full`) untuk semua elemen interaktif (tombol, input, chip, nav) — ini identitas bentuk utama SmartVault.
- **Do:** pakai warna `tertiary`/emerald hanya untuk sinyal positif (pemasukan, progress berhasil); pakai `error` hanya untuk pengeluaran/peringatan. Jangan tertukar.
- **Do:** batasi gradient (`hero-balance-card`, `button-primary`) hanya untuk elemen hero/CTA utama per halaman — kalau semua kartu pakai gradient, hierarki visual jadi hilang.
- **Don't:** jangan campur sudut tajam dan pill/bubble-radius di halaman yang sama — konsistensi rounded-nya harga mati.
- **Don't:** jangan pakai efek frosted-glass (`backdrop-blur`) di luar header sticky dan modal/nav dock — kalau dipakai di sembarang kartu, performa scroll di mobile bisa terganggu dan hierarki "layer mengambang" jadi rancu.
- **Don't:** jangan tambah warna kategori baru di luar 5 warna accent yang sudah didefinisikan tanpa alasan kuat — perluas palet dulu di schema sebelum dipakai di kode, jangan pilih warna acak langsung di komponen.
- **Don't:** jangan pakai Plus Jakarta Sans untuk body text panjang (deskripsi, catatan transaksi) — itu porsi Inter.

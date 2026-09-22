# Changelog

Semua perubahan penting pada project ini didokumentasikan di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
dan project ini mengikuti [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Backend API (Node.js + Fastify + PostgreSQL)
- WhatsApp Bot + AI Receipt Scanner (OpenAI Vision)
- Scheduled weekly/monthly reports ke WhatsApp
- Real-time budget notification (< 1 menit setelah transaksi)

---

## [0.1.0] — 2026-09-22

### Added
- **Auth Flow** — Splash Screen → Sign In → Create Vault Account (Register) dengan navigasi state berbasis Zustand
- **SplashScreen** — Logo centered, auto-navigate ke Sign In setelah 2 detik
- **SignInScreen** — Header, Hero Logo dengan radial glow SVG (lavender), form Nomor Handphone + Password, footer link Register
- **CreateAccountScreen** — Header, Hero Logo dengan aura gradient SVG (lavender → mint), form Nama Lengkap + Nomor HP + Password + Konfirmasi Password + checkbox T&C, password strength indicator
- **DashboardScreen** — Hero balance card, ringkasan pemasukan/pengeluaran, daftar transaksi terbaru
- **TransactionsScreen** — Riwayat transaksi dengan filter kategori
- **BudgetScreen** — Tracking budget per kategori dengan progress bar
- **SavingsScreen** — Daftar tabungan/goals dengan progress
- **ProfileScreen** — Info user, pengaturan, logout
- **FloatingNavDock** — Bottom navigation dock dengan 5 tab (Dashboard, Transaksi, Budget, Tabungan, Profil)
- **Design System** (`src/theme/tokens.ts`) — Token warna, radius, shadow SmartVault Aura
- **Zustand stores** — `useAuthStore`, `useFinanceStore` dengan mock data lengkap
- **NativeWind v4** setup (Tailwind CSS untuk React Native)
- **react-native-svg** untuk gradient effects
- **React Navigation v7** setup

### Technical Setup
- Expo SDK 57, React Native 0.86, TypeScript 6.0
- NativeWind v4, Zustand 5, lucide-react-native
- `metro.config.js`, `babel.config.js`, `tailwind.config.js`, `global.css` dikonfigurasi
- Asset pipeline: `logo.png`, `icon.png`, `splash-icon.png`, `verified-badge.png`

### Fixed
- Logo full-bleed bug di SignIn & Splash → fixed via explicit `style={{ width, height }}`
- Teks header "Create Vault Account" blur/fade → fixed via `zIndex: 20` isolasi stacking layer
- Badge "KTP" field Nama Lengkap → dihapus permanen
- Aura gradient bocor ke area Header → fixed via `position: 'relative'` + `zIndex` hierarchy

---

[Unreleased]: https://github.com/RidhoPtraDev/SmartVault/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/RidhoPtraDev/SmartVault/releases/tag/v0.1.0

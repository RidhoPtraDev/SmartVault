<div align="center">
  <img src="mobile/assets/logo.png" alt="SmartVault Logo" width="180" height="180" />
  <h1>SmartVault</h1>
  <p><strong>Aplikasi manajemen keuangan pribadi lintas platform (Android & iOS)</strong><br/>
  dengan AI receipt scanner via WhatsApp dan laporan insight otomatis terjadwal.</p>

  <p>
    <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-4F46E5?style=flat-square" alt="Platform" />
    <img src="https://img.shields.io/badge/Expo-SDK%2057-000020?style=flat-square&logo=expo" alt="Expo" />
    <img src="https://img.shields.io/badge/React%20Native-0.86-61DAFB?style=flat-square&logo=react" alt="React Native" />
    <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://github.com/RidhoPtraDev/SmartVault/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </p>
</div>

---

## ✨ Fitur Utama

| Fitur | Status |
|---|---|
| 🔐 Auth (Sign In / Register) | ✅ UI Done |
| 💰 Dashboard Keuangan | ✅ UI Done |
| 📊 Transaksi & Riwayat | ✅ UI Done |
| 🎯 Budget Tracking | ✅ UI Done |
| 🏦 Tabungan (Savings) | ✅ UI Done |
| 👤 Profil | ✅ UI Done |
| 📸 AI Receipt Scanner (WhatsApp Bot) | 🔜 Roadmap |
| 📬 Laporan Insight Terjadwal ke WA | 🔜 Roadmap |
| 🔔 Notifikasi Budget Real-time | 🔜 Roadmap |

---

## 🛠️ Tech Stack

### Mobile (Frontend)
- **React Native** `0.86` + **Expo SDK** `57`
- **TypeScript** `6.0`
- **NativeWind v4** (Tailwind CSS for RN)
- **Zustand** (state management)
- **react-native-svg** (gradient, ilustrasi)
- **lucide-react-native** (icon set)
- **React Navigation v7** (navigasi)

### Backend (Roadmap)
- **Node.js** + **Fastify** / **Hono**
- **WhatsApp Cloud API** (Twilio / Meta)
- **OpenAI Vision API** (receipt scan)
- **PostgreSQL** + **Prisma ORM**

---

## 🚀 Cara Setup & Jalankan

### Prerequisites
- Node.js `>= 18`
- npm `>= 10`
- Expo CLI: `npm install -g expo-cli`
- (Opsional) Expo Go app di HP untuk preview langsung

### Langkah

```bash
# 1. Clone repo
git clone https://github.com/RidhoPtraDev/SmartVault.git
cd SmartVault

# 2. Install dependencies
cd mobile
npm install

# 3. Jalankan di web (development)
npx expo start --web

# 4. Jalankan di Android/iOS
npx expo start --android
npx expo start --ios
```

---

## 📁 Struktur Folder

```
SmartVault/
├── .github/                  # GitHub templates & CI workflows
│   ├── ISSUE_TEMPLATE/       # Bug report & feature request templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/ci.yml      # TypeScript check on push/PR
│
├── docs/                     # Dokumentasi project
│   ├── PRD.md                # Product Requirements Document
│   ├── DESIGN.md             # Design system & tokens
│   └── AI_CODING_RULES.md   # Aturan coding untuk AI agent
│
├── mobile/                   # Expo React Native App
│   ├── assets/               # Logo, icons, images
│   ├── src/
│   │   ├── components/ui/    # Reusable UI components
│   │   ├── navigation/       # RootNavigator
│   │   ├── screens/          # Halaman app
│   │   ├── store/            # Zustand stores
│   │   ├── theme/            # Design tokens
│   │   └── types/            # TypeScript types
│   ├── App.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── CHANGELOG.md              # Log perubahan per versi
├── CONTRIBUTING.md           # Panduan kontribusi
└── README.md                 # Halaman ini
```

---

## 📐 Design System

SmartVault menggunakan **SmartVault Aura Design System** — lihat [`docs/DESIGN.md`](docs/DESIGN.md) untuk token warna, tipografi, radius, shadow, dan panduan komponen.

Warna utama: `#4F46E5` (Indigo) | Background: `#F4F5FB` | Surface: `#FFFFFF`

---

## 📋 Dokumentasi

| Dokumen | Deskripsi |
|---|---|
| [`docs/PRD.md`](docs/PRD.md) | Product Requirements — problem, goals, user stories, ERD, alur |
| [`docs/DESIGN.md`](docs/DESIGN.md) | Design system tokens & panduan komponen |
| [`docs/AI_CODING_RULES.md`](docs/AI_CODING_RULES.md) | Aturan kerja AI coding agent (3 tahap: Rancangan → Eksekusi → Laporan) |
| [`CHANGELOG.md`](CHANGELOG.md) | Riwayat perubahan per versi |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Panduan commit, branch, dan PR |

---

## 🗺️ Roadmap

```
v0.1.0 ── Initial UI (Auth, Dashboard, Transaksi, Budget, Savings)   ← saat ini
v0.2.0 ── Backend API + Database (Fastify + PostgreSQL)
v0.3.0 ── WhatsApp Bot + AI Receipt Scanner
v0.4.0 ── Scheduled Reports & Notifikasi Budget
v1.0.0 ── Production Release
```

---

## 📄 Lisensi

MIT — lihat [`LICENSE`](mobile/LICENSE) untuk detail.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/RidhoPtraDev">RidhoPtraDev</a></sub>
</div>

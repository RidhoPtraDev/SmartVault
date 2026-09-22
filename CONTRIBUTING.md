# Contributing to SmartVault

> Project ini dikembangkan secara solo oleh [@RidhoPtraDev](https://github.com/RidhoPtraDev).
> Dokumen ini berfungsi sebagai panduan konsistensi kerja sendiri dan referensi untuk AI coding agent.

---

## Aturan Kerja AI Coding Agent

Setiap task yang dikerjakan AI wajib melewati **3 tahap berurutan**:

1. **Rancangan** — buat rancangan tertulis, tunggu persetujuan
2. **Eksekusi** — kerjakan persis apa yang disetujui, tidak lebih
3. **Laporan** — sampaikan hasil, apa yang berubah, dan status verifikasi

> Lihat [`docs/AI_CODING_RULES.md`](docs/AI_CODING_RULES.md) untuk aturan lengkap.

---

## Branch Strategy

```
main          ← production-ready, hanya merge via PR yang sudah diverifikasi
develop       ← integrasi fitur aktif (default working branch)
feature/*     ← fitur baru           contoh: feature/receipt-scanner
fix/*         ← bug fix              contoh: fix/header-text-blur
chore/*       ← setup, deps, refactor contoh: chore/update-dependencies
docs/*        ← perubahan dokumentasi contoh: docs/update-prd
```

**Aturan:**
- Semua development dimulai dari `develop`, bukan dari `main`
- Merge ke `main` hanya setelah fitur stabil dan CI hijau
- `main` harus selalu bisa di-build dan dijalankan tanpa error

---

## Commit Convention

Format: **[Conventional Commits](https://www.conventionalcommits.org/)**

```
<type>(<scope>): <deskripsi singkat>

[opsional: body penjelasan lebih detail]
[opsional: footer — breaking change / issue ref]
```

### Types

| Type | Kapan dipakai |
|---|---|
| `feat` | Fitur baru (screen, komponen, API endpoint) |
| `fix` | Bug fix |
| `chore` | Setup, konfigurasi, dependencies, refactor minor |
| `docs` | Perubahan dokumentasi saja |
| `style` | Perubahan styling/UI tanpa logic baru |
| `refactor` | Refactor tanpa tambah fitur atau fix bug |
| `test` | Tambah atau update test |
| `ci` | Perubahan CI/CD workflow |

### Scope (opsional tapi dianjurkan)

`mobile`, `backend`, `auth`, `dashboard`, `navigation`, `ci`, `docs`, `assets`

### Contoh Commit yang Baik

```bash
feat(mobile): add CreateAccountScreen with dual-aura SVG gradient
fix(mobile): resolve header text blur caused by SVG zIndex overflow
chore: restructure repo to monorepo layout with docs/ and .github/
docs: update PRD with backend API schema v2
ci: add TypeScript check workflow on push and PR
style(mobile): update aura gradient to single centered radial
```

---

## Checklist Sebelum Push

- [ ] `npx tsc --noEmit` → 0 errors
- [ ] App bisa dijalankan tanpa crash (`npx expo start --web`)
- [ ] Perubahan UI sudah diverifikasi secara visual di browser/device
- [ ] Tidak ada `console.log` debug yang tertinggal di production code
- [ ] File baru sudah di-import dengan benar
- [ ] Commit message mengikuti format Conventional Commits

---

## Struktur File Penting

```
mobile/src/
├── components/ui/     # Komponen reusable — PillButton, InputField, dll
├── navigation/        # RootNavigator (state machine: splash → auth → main)
├── screens/           # Satu file per screen
├── store/             # Zustand stores (useAuthStore, useFinanceStore)
├── theme/tokens.ts    # Design tokens (warna, radius, shadow)
└── types/             # TypeScript types & interfaces
```

---

## Setup Lokal

```bash
git clone https://github.com/RidhoPtraDev/SmartVault.git
cd SmartVault/mobile
npm install
npx expo start --web      # preview di browser (port 8082 jika 8081 sudah dipakai)
```

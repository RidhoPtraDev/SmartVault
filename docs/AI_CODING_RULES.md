# AI_CODING_RULES.md

Aturan wajib bagi AI coding agent (Claude Code, Cursor, atau tools vibe-coding lain) yang bekerja di project **SmartVault**. File ini dibaca bersama `PRD.md` dan `DESIGN.md` — ketiganya adalah sumber kebenaran, bukan opsional.

**Prinsip inti: AI TIDAK BOLEH mengambil keputusan sendiri.** Setiap pekerjaan wajib melalui 3 tahap berurutan: **Rancangan → Eksekusi → Laporan**. Melompati salah satu tahap dianggap pelanggaran aturan ini, bukan sekadar "kurang ideal".

---

## 1. Prinsip Utama

- AI adalah **pelaksana**, bukan **pengambil keputusan**. Keputusan produk, arsitektur, dan desain adalah hak developer/pemilik project.
- Semua keputusan yang **tidak eksplisit tercantum** di `PRD.md`, `DESIGN.md`, atau Laporan Teknis harus **ditanyakan dulu**, tidak boleh diasumsikan atau ditebak sendiri "yang penting jalan".
- AI wajib **transparan** soal apa yang dikerjakan, apa yang di-skip, dan apa yang butuh keputusan manusia — sebelum, selama, dan sesudah bekerja.
- Kecepatan tidak mengalahkan kejelasan. Lebih baik berhenti bertanya daripada lanjut dengan asumsi yang salah.

## 2. Alur Kerja Wajib (3 Tahap)

### Tahap 1 — Rancangan Pekerjaan (WAJIB sebelum mulai coding)

Sebelum menulis satu baris kode pun, AI wajib menyampaikan rancangan pekerjaan dan **menunggu persetujuan eksplisit** ("lanjut", "oke", "approve", atau sejenisnya) dari developer. Tidak ada eksekusi tanpa persetujuan ini.

Format Rancangan Pekerjaan wajib berisi:

```markdown
## Rancangan Pekerjaan: [nama task/fitur]

**Tujuan:** [apa yang mau dicapai, 1-2 kalimat]

**Referensi:** [bagian mana di PRD.md / DESIGN.md / Laporan Teknis yang jadi acuan]

**Rencana perubahan:**
- [file/modul yang akan dibuat atau diubah]
- [pendekatan teknis singkat]

**Asumsi yang saya buat:** [hal-hal yang tidak eksplisit di dokumen, yang saya asumsikan — WAJIB diisi walau isinya "tidak ada asumsi"]

**Pertanyaan/keputusan yang butuh konfirmasi:** [list hal yang harus dijawab developer sebelum lanjut, kalau ada]

**Dampak ke fitur lain:** [apakah ini menyentuh modul/tabel yang dipakai fitur lain]

**Estimasi cakupan:** [kecil/sedang/besar — jumlah file yang tersentuh]
```

- Kalau rancangan mengandung poin di **Pertanyaan/keputusan yang butuh konfirmasi**, AI **berhenti di situ** — tidak boleh lanjut ke Tahap 2 sebelum semua poin itu dijawab.
- Kalau task sepele (contoh: perbaikan typo, rename variabel lokal) tanpa dampak ke arsitektur, rancangan boleh dipersingkat jadi 2-3 baris — tapi tetap wajib ada, tidak boleh langsung eksekusi diam-diam.

### Tahap 2 — Eksekusi

- AI hanya boleh mengerjakan **persis** apa yang sudah disetujui di rancangan. Kalau di tengah jalan ternyata perlu keluar dari rancangan (misal ternyata harus ubah skema database yang tidak disebut di awal), **AI wajib berhenti**, jelaskan kenapa, dan minta persetujuan ulang — bukan lanjut sendiri dengan alasan "supaya cepat selesai".
- AI wajib patuh ke token/aturan di `DESIGN.md` (warna, radius, spacing, komponen) dan struktur data di ERD `PRD.md` tanpa modifikasi sepihak. Kalau butuh tabel/kolom baru yang belum ada di ERD, itu masuk kategori "butuh konfirmasi" di Tahap 1, bukan ditambah sendiri saat coding.
- Semua endpoint, komponen, dan penamaan mengikuti konvensi yang sudah ada di codebase — AI tidak boleh memperkenalkan pattern/library baru di luar yang sudah disepakati di Laporan Teknis tanpa mengajukan itu dulu sebagai keputusan terpisah.

### Tahap 3 — Laporan Hasil & Insight (WAJIB setelah selesai)

Setelah eksekusi selesai — baik berhasil penuh, sebagian, atau gagal — AI wajib menyampaikan laporan sebelum menganggap task selesai. Tidak ada task yang "selesai diam-diam".

Format Laporan Hasil wajib berisi:

```markdown
## Laporan Hasil: [nama task/fitur]

**Status:** [Selesai / Selesai sebagian / Gagal — dan kenapa]

**Yang dikerjakan:**
- [daftar file yang dibuat/diubah, ringkas per item]

**Yang TIDAK dikerjakan (meski ada di rancangan):** [kalau ada, jelaskan kenapa]

**Cara verifikasi:** [langkah konkret buat developer mengecek hasilnya sendiri — command test, langkah manual, dsb]

**Insight & catatan:**
- [hal yang ditemukan selama kerja yang relevan buat developer tahu — mis. edge case yang belum dihandle, potensi bug di modul lain, bagian yang menyimpang dari estimasi awal]
- [saran perbaikan/langkah lanjutan, kalau ada — bukan keputusan yang langsung dieksekusi, cuma disarankan]

**Risiko/utang teknis yang ditinggalkan:** [kalau ada shortcut yang diambil demi waktu, wajib diakui di sini, jangan disembunyikan]
```

- Laporan **tidak boleh cuma bilang "sudah selesai, sudah saya test"** tanpa detail. Developer harus bisa memverifikasi sendiri dari laporan ini tanpa harus baca ulang semua kode.
- Kalau AI menemukan bug atau kejanggalan di luar scope task yang sedang dikerjakan, itu dicatat di **Insight & catatan** — bukan diperbaiki sendiri tanpa izin, sekecil apa pun perbaikannya.

## 3. Kapan AI Wajib Berhenti dan Minta Konfirmasi

AI **wajib berhenti dan bertanya**, bukan mengambil jalan sendiri, dalam situasi berikut:

- Ada instruksi di `PRD.md`/`DESIGN.md` yang ambigu atau bisa ditafsirkan lebih dari satu cara.
- Perubahan menyentuh skema database (tabel/kolom baru, ubah relasi) yang belum ada di ERD.
- Perubahan menyentuh keputusan biaya (menambah dependency/service berbayar baru, mengganti provider free tier).
- Ditemukan konflik antara `PRD.md`, `DESIGN.md`, dan kondisi codebase saat ini.
- Task membutuhkan menghapus atau menimpa data/fitur yang sudah ada.
- Estimasi cakupan pekerjaan ternyata jauh lebih besar dari yang terlihat di rancangan awal.

Dalam semua kasus ini, AI menyampaikan pilihan-pilihan yang tersedia beserta trade-off masing-masing — **bukan** langsung memilihkan satu opsi dan mengerjakannya.

## 4. Dokumen Acuan Wajib

Sebelum mengerjakan task apa pun, AI wajib mengecek konsistensi dengan:

- **`PRD.md`** — fitur, user stories, functional/non-functional requirements, scope, skema ERD.
- **`DESIGN.md`** — token warna, tipografi, spacing, radius, aturan komponen, Do's and Don'ts.
- **Laporan Teknis SmartVault** — arsitektur sistem, alasan pemilihan tech stack, batasan implementasi.

Kalau task yang diminta developer bertentangan dengan salah satu dokumen ini, AI **wajib mengingatkan** ketidaksesuaian itu di tahap Rancangan Pekerjaan, bukan diam-diam mengikuti instruksi terbaru begitu saja.

## 5. Larangan Tegas

- ❌ Langsung coding tanpa menyampaikan Rancangan Pekerjaan dan menunggu persetujuan.
- ❌ Mengubah struktur database, skema token desain, atau arsitektur di luar apa yang disetujui.
- ❌ Menambah library/dependency/service baru tanpa mengajukannya sebagai keputusan terpisah.
- ❌ "Membetulkan" kode/fitur lain yang tidak diminta, walau niatnya baik, tanpa izin eksplisit.
- ❌ Melaporkan task sebagai "selesai" tanpa Laporan Hasil & Insight yang lengkap.
- ❌ Menyembunyikan shortcut, error yang di-suppress, atau utang teknis yang diambil demi menyelesaikan task lebih cepat.
- ❌ Mengasumsikan preferensi developer tanpa dasar dari dokumen acuan — kalau tidak yakin, tanya.

## 6. Contoh Singkat

**Salah (AI mengambil keputusan sendiri):**
> "Saya lihat belum ada tabel untuk notifikasi, jadi saya buatkan tabel `Notifications` baru dan langsung saya integrasikan ke modul Budget." *(Langsung eksekusi tanpa rancangan, tanpa konfirmasi ke ERD yang sudah ada.)*

**Benar (ikut alur 3 tahap):**
> "Fitur ini butuh menyimpan riwayat notifikasi yang belum ada di ERD `PRD.md`. Ini bukan tabel yang saya bisa putuskan sendiri strukturnya. Berikut rancangan yang saya usulkan — ada 2 opsi struktur tabel dengan trade-off masing-masing, mana yang mau dipakai sebelum saya lanjut?"

---

*File ini adalah living document, sejajar dengan `PRD.md` dan `DESIGN.md` di root project. Update kalau ada penyesuaian alur kerja baru yang disepakati.*

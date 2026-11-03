# Portofolio Baghiz Asshiddiqie Arasya

Website portofolio Data Analyst Baghiz Asshiddiqie Arasya. Satu halaman statis berisi 12 proyek analisis data yang sudah selesai, keahlian, sertifikat, dan kontak. Dibangun dengan HTML, CSS, dan JavaScript murni. Tanpa framework, tanpa proses build, tanpa pelacak.

Live: https://baghizash.github.io/baghiz-portfolio/ (GitHub Pages dari branch `main`, folder root).

## Menjalankan di komputer lokal

### Cara paling mudah

```bash
git clone https://github.com/baghizash/baghiz-portfolio.git
cd baghiz-portfolio
```

Lalu klik dua kali `index.html`, atau jalankan server lokal:

### Dengan Python

```bash
python -m http.server 8000
```

Buka `http://localhost:8000` di browser.

### Dengan Node.js

```bash
npx serve .
```

## Isi repo

| File | Fungsi |
|---|---|
| `index.html` | Seluruh konten halaman: hero, tentang, proyek unggulan, arsip 12 proyek, keahlian, sertifikat, kontak |
| `styles.css` | Sistem desain lengkap, termasuk layout tablet dan ponsel |
| `script.js` | Menu ponsel, tilt ID badge, slider proyek unggulan, filter dan pencarian arsip proyek, chart inflasi dari data BPS, dialog sertifikat, tombol salin email |
| `DESIGN.md` | Arah desain tertulis: gaya dark ID card dari referensi video, palet, tipografi, gerak, dan alasan setiap keputusan |
| `assets/README.md` | Petunjuk memasukkan foto profil dan gambar sertifikat ke placeholder yang sudah disiapkan |

## Mengganti foto dan sertifikat

Tempat foto profil ada di hero, di dalam ID badge gantung, berlabel "Tempat foto Baghiz". Tempat pratinjau sertifikat ada di setiap baris section Sertifikat. Petunjuk langkah demi langkah ada di `assets/README.md`.

## Data di halaman ini

Semua angka temuan berasal dari proyek portofolio yang sudah terverifikasi dan bisa diperiksa di repositori masing masing:

- Harga Cabai Indonesia 2026: https://github.com/baghizash/harga-cabai-indonesia-2026
- Inflasi Indonesia 2019 sampai 2026: https://github.com/baghizash/inflasi-indonesia-2026
- Pengangguran Indonesia 2026: https://github.com/baghizash/pengangguran-indonesia-2026
- Daftar lengkap ada di section Arsip Proyek pada halaman utama.

## Kontak

Baghiz Asshiddiqie Arasya, baghiz.ash@gmail.com, GitHub: https://github.com/baghizash

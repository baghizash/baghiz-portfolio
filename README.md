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
| `index.html` | Seluruh konten halaman: hero, tentang, 12 proyek sebagai kartu bergambar dashboard, pengalaman model roda, keahlian, kredensial |
| `styles.css` | Sistem desain lengkap, termasuk layout tablet dan ponsel |
| `script.js` | Menu ponsel, tilt ID badge, kartu proyek dan kredensial berputar dengan fokus klik |
| `DESIGN.md` | Arah desain tertulis: gaya dark ID card dari referensi video, palet, tipografi, gerak, dan alasan setiap keputusan |
| `assets/README.md` | Petunjuk memasukkan foto profil dan gambar sertifikat ke placeholder yang sudah disiapkan |

## Mengganti foto dan sertifikat

Tempat foto profil ada di hero, di dalam ID badge gantung, berlabel "Tempat foto Baghiz". Tempat pratinjau sertifikat ada di setiap baris section Sertifikat. Petunjuk langkah demi langkah ada di `assets/README.md`.

## Data di halaman ini

Semua angka temuan berasal dari proyek portofolio yang sudah terverifikasi dan bisa diperiksa di repositori masing masing:

- Harga Cabai Indonesia 2026: https://github.com/baghizash/harga-cabai-indonesia-2026
- Inflasi Indonesia 2019 sampai 2026: https://github.com/baghizash/inflasi-indonesia-2026
- Pengangguran Indonesia 2026: https://github.com/baghizash/pengangguran-indonesia-2026
- Keenam proyek unggulan tampil di section Proyek Unggulan pada halaman utama.

## Kontak

Baghiz Asshiddiqie Arasya, baghiz.ash@gmail.com, GitHub: https://github.com/baghizash

## Cara edit lokal di VS Code

1. Clone repo ini: `git clone https://github.com/baghizash/baghiz-portfolio.git` (kalau sudah punya foldernya, cukup `git pull` di dalamnya).
2. Buka foldernya di VS Code. Pengaturan di folder `.vscode` membuat commit otomatis ter-push ke GitHub.
3. Alur editnya: ubah file, simpan (Ctrl+S), buka panel Source Control (ikon cabang di kiri), tulis pesan commit, tekan Ctrl+Enter. Commit langsung ter-push dan situs live terupdate sekitar 1 sampai 2 menit kemudian.
4. Untuk melihat hasil saat mengedit, pasang ekstensi Live Server (VS Code akan menyarankannya), lalu klik kanan `index.html` dan pilih Open with Live Server.
5. Aturan main: selalu `git pull` dulu sebelum mulai mengedit, dan setelah selesai push, kabari Aulia supaya salinan kerjanya ikut disinkronkan sebelum ia mengedit file yang sama.
6. Kalau mengubah `styles.css` atau `script.js`, naikkan juga nomor versi pada dua baris pemanggilnya di `index.html` (misalnya `?v=20261103-14` menjadi nomor berikutnya) supaya browser pengunjung langsung mengambil file baru, bukan cache lama.

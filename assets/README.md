# Cara memasukkan foto dan gambar sertifikat

Semua tempat gambar di website ini adalah placeholder berlabel. Tidak ada foto stok dan tidak ada gambar buatan yang menyamar sebagai dokumen asli.

## 1. Foto profil Baghiz (ID badge)

SUDAH TERPASANG sejak 3 November 2026: file `foto-baghiz.jpg` di folder assets (743 x 817 piksel), dipotong dari foto lingkaran yang dikirim Baghiz (file asli Foto_baghiz.jpeg) mengikuti bingkai potret area foto badge. Kalau mau mengganti foto: siapkan foto potret rasio sekitar 10 banding 11, simpan dengan nama yang sama `assets/foto-baghiz.jpg`, lalu push ulang. Elemennya di index.html adalah `<img class="badge-photo-img" src="assets/foto-baghiz.jpg">` di dalam `<div class="badge-photo">`.

## 2. Gambar sertifikat (cover kartu kredensial)

Di section Sertifikat, setiap kredensial tampil sebagai kartu cover yang berputar, dan nama kredensialnya tercetak langsung di cover. Untuk mengganti cover dengan gambar sertifikat asli:

1. Ekspor atau screenshot halaman pertama PDF sertifikat sebagai JPG atau PNG, rasio potret sekitar 2 banding 3.
2. Simpan di folder `assets/certs/` dengan nama berikut:

| Sertifikat | Nama file |
|---|---|
| IBM Data Analyst Professional Certificate | `ibm-data-analyst.jpg` |
| Google Data Analytics Professional Certificate | `google-data-analytics.jpg` |
| Meta Data Analyst Professional Certificate | `meta-data-analyst.jpg` |
| Data Science Foundations, University of London | `data-science-foundations.jpg` |
| IBM Business Analyst Professional Certificate | `ibm-business-analyst.jpg` |
| Excel Skills for Data Analytics and Visualization | `excel-macquarie.jpg` |
| More Applied Data Science with Python | `michigan-data-science.jpg` |
| Learn English Now, Arizona State University | `learn-english-now-asu.jpg` |

3. Buka `index.html`, cari tombol kartu dengan `data-cert` yang sesuai, dan ganti seluruh elemen `<span class="cred-cover ...">...</span>` di dalamnya dengan:

```html
<img class="cred-cover-img" src="assets/certs/NAMA-FILE.jpg" alt="Sertifikat NAMA SERTIFIKAT atas nama Baghiz Asshiddiqie Arasya" width="420" height="600">
```

4. Tambahkan aturan CSS ini di akhir `styles.css` sekali saja:

```css
.cred-cover-img{width:208px;height:296px;object-fit:cover;border-radius:6px 14px 14px 6px;display:block;transform:rotateY(-15deg);box-shadow:18px 24px 40px rgba(0,0,0,.45)}
.cred-card.is-focused .cred-cover-img{transform:rotateY(0) scale(1.12)}
@media (max-width:720px){.cred-cover-img{width:176px;height:252px}}
```

Nama kredensial tetap terbaca dari gambar sertifikat itu sendiri, dan detail singkatnya tetap muncul di panel bawah saat kartu diklik.

## 3. Gambar dashboard proyek

Kartu di section Proyek memakai gambar dashboard Power BI halaman pertama dari repositori masing masing proyek, yaitu file `powerbi/dashboard_preview_halaman1.png` di repo proyek tersebut. Salinan yang tersimpan di `assets/projects/` adalah versi JPG yang dioptimalkan ukurannya (lebar 900 piksel). Kalau dashboard satu proyek berubah, unduh ulang file preview dari reponya, konversi ke JPG dengan nama yang sama di `assets/projects/`, lalu push ulang repo ini.

## 4. Logo situs

Logo di header adalah file `logo-baghiz.png` di folder assets: tulisan tangan "Baghiz" warna pink dengan latar transparan, dibuat dari file logo asli yang dikirim Baghiz (baghiz-color-2048.png, latar hitamnya dijadikan transparan dan gambar dipotong rapat). Di situs, logo tampil di atas pelat persegi panjang putih (kelas CSS `.wordmark` di styles.css). Kalau logo diganti, pakai PNG transparan rasio lebar sekitar 2,2 banding 1 dengan nama file yang sama.

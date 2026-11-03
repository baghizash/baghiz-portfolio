# Cara memasukkan foto dan gambar sertifikat

Semua tempat gambar di website ini adalah placeholder berlabel. Tidak ada foto stok dan tidak ada gambar buatan yang menyamar sebagai dokumen asli.

## 1. Foto profil Baghiz (ID badge)

Foto tampil di dalam ID badge gantung pada hero.

1. Siapkan satu foto potret yang jelas, rasio sekitar 10 banding 11 (misalnya 880 x 968 piksel), format JPG.
2. Simpan file itu di folder ini dengan nama persis: `foto-baghiz.jpg`
3. Buka `index.html`, cari elemen `<div class="badge-photo" ...>` di dalam `<figure class="id-badge">`.
4. Ganti seluruh elemen itu dengan kode ini:

```html
<img class="badge-photo-img" src="assets/foto-baghiz.jpg" alt="Foto Baghiz Asshiddiqie Arasya" width="880" height="968">
```

5. Tambahkan aturan CSS ini di akhir `styles.css` sekali saja:

```css
.badge-photo-img{width:100%;aspect-ratio:4/4.4;object-fit:cover;border-radius:18px;border:1px solid var(--line);display:block}
```

6. Simpan, lalu muat ulang halaman. Foto tampil di dalam kartu, dan efek miring kartu tetap bekerja.

Tips foto: latar polos, cahaya dari depan, bahu ke atas terlihat, resolusi cukup tajam saat diperbesar. Hindari filter berlebihan.

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

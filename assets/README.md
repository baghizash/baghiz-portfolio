# Cara memasukkan foto dan gambar sertifikat

Semua tempat gambar di website ini adalah placeholder berlabel. Tidak ada foto stok dan tidak ada gambar buatan yang menyamar sebagai dokumen asli.

## 1. Foto profil Baghiz

1. Siapkan satu foto potret yang jelas, rasio 4 banding 5 (misalnya 880 x 1100 piksel), format JPG.
2. Simpan file itu di folder ini dengan nama persis: `foto-baghiz.jpg`
3. Buka `index.html`, cari komentar `TEMPAT FOTO` di section hero.
4. Ganti seluruh blok `<figure class="photo-plate">...</figure>` dengan kode ini:

```html
<figure class="photo-plate">
  <img src="assets/foto-baghiz.jpg" alt="Foto Baghiz Asshiddiqie Arasya" width="880" height="1100" fetchpriority="high" style="width:100%;height:auto;display:block">
  <figcaption>Baghiz Asshiddiqie Arasya, Data Analyst.</figcaption>
</figure>
```

5. Simpan, lalu muat ulang halaman. Foto tampil di posisi plat yang sama.

Tips foto: latar polos, cahaya dari depan, bahu ke atas terlihat, resolusi cukup tajam saat diperbesar. Hindari filter berlebihan.

## 2. Gambar sertifikat

1. Ekspor atau screenshot halaman pertama PDF sertifikat sebagai JPG atau PNG, rasio sekitar 4 banding 3.
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

3. Untuk menampilkan satu gambar, buka `index.html`, cari baris sertifikat yang sesuai, dan ganti elemen ini:

```html
<div class="cert-thumb" role="img" aria-label="Tempat pratinjau sertifikat ...">Pratinjau sertifikat</div>
```

dengan:

```html
<img class="cert-thumb-img" src="assets/certs/NAMA-FILE.jpg" alt="Sertifikat NAMA SERTIFIKAT atas nama Baghiz Asshiddiqie Arasya" width="400" height="300" loading="lazy">
```

4. Tambahkan aturan CSS ini di akhir `styles.css` sekali saja:

```css
.cert-thumb-img{width:100%;height:100%;object-fit:cover;display:block}
.cert-row .cert-thumb-img{aspect-ratio:4/3}
```

Gambar sertifikat yang sama juga bisa dipasang di jendela ringkasan (dialog) dengan mengganti elemen `#certDialogThumb` mengikuti pola yang sama, tetapi langkah itu opsional.

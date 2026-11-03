# DESIGN.md - Desain utama: gaya dark ID card

antislop active: during (global preference).

Website ini menerapkan gaya dari video referensi yang dikirim Baghiz pada 3 November 2026 (portofolio "ZEDIAN", UX/UI Designer): panggung gelap, aksen hijau neon, judul display besar dengan satu kata outline, foto dalam ID badge gantung yang bergerak mengikuti mouse, deret angka di hero, panel toolkit, dan slider proyek. Yang dipinjam adalah bahasa visual dan pola interaksinya. Isi, nama, angka, dan proyek tetap milik Baghiz sendiri, tidak ada teks atau angka dari video yang disalin (angka video seperti 05+ tahun dan 99% kepuasan tidak dipakai karena bukan data Baghiz). Pada 3 November 2026 Baghiz memutuskan gaya ini menjadi desain utama di branch `main`; dua gaya lama (arsip editorial dan poster retro) dibuang atas perintahnya.

## Design Read

Membaca ini sebagai: portofolio Data Analyst yang dipentaskan seperti kartu identitas digital di atas panggung gelap, untuk rekruter yang memindai malam hari di layar terang. Titik beratnya adalah hero: satu kalimat peran, satu kartu identitas, tiga angka asli.

Dials: ENERGY 4, RHYTHM 3, MOTION 4. Motion naik dibanding cabang lain karena referensinya memang hidup oleh gerakan kartu; tetap dibatasi pada badge dan slider.

## Keputusan dan alasannya

- Latar hijau hitam `#050807` dan panel `#0B120E`. Alasan: panggung gelap adalah identitas referensi ini; hijau hitam, bukan biru hitam, supaya satu keluarga dengan aksennya.
- Satu aksen hijau neon `#2FE07C` untuk titik, garis outline, tombol utama, dan status aktif. Kontrasnya 11,56 banding 1 di atas latar, dan teks tombol memakai tinta gelap `#04120A` di atas hijau (11,02 banding 1). Alasan: referensi memakai tepat satu warna sinyal; membaginya ke banyak warna akan merusak efeknya.
- Judul display Anton, huruf kapital padat. Kata kedua dibuat outline dengan text-stroke hijau dan isi transparan. Alasan: kontras padat lawan outline adalah tanda tangan tipografi referensi; outline hanya dipakai pada kata display besar, tidak pernah pada teks isi, supaya keterbacaan tidak dikorbankan.
- Foto ditempatkan di ID badge gantung lengkap dengan tali hijau dan klip. Alasan: ini elemen paling khas dari referensi, dan secara fungsi ia adalah tempat foto Baghiz yang memang sudah disiapkan sejak versi pertama. Nama dan peran tercetak di badan kartu seperti kartu identitas asli.
- Badge miring mengikuti mouse (rotasi maksimal sekitar 11 derajat, dilembutkan dengan interpolasi) dan bergoyang pelan dari titik gantungnya. Alasan: gerakan inilah yang membuat referensinya terasa hidup; goyangan dibatasi kecil dan keduanya mati total pada prefers-reduced-motion, dan tilt hanya aktif pada perangkat berpenunjuk presisi (mouse), bukan sentuh.
- Tiga angka asli di hero: 12 proyek, 8 sertifikat, 65.437 baris data capstone. Alasan: referensi memakai deret statistik sebagai bukti cepat; di sini angkanya diganti data Baghiz yang terverifikasi, bukan angka pajangan.
- Proyek unggulan menjadi slider satu proyek per layar dengan panel visual berisi angka terbesar proyek itu, mengikuti pola recent works di referensi. Kontrolnya tombol panah dan titik garis, bisa digeser manual (scroll snap), tanpa putar otomatis. Alasan: autoplay menggerakkan konten tanpa diminta; kontrol manual memberi ritme yang sama tanpa mengambil alih halaman.
- Kata penting pada pernyataan hero diwarnai hijau (jelas, terukur). Alasan: referensi mewarnai kata kunci kalimatnya; di sini hanya dua kata yang dipilih karena keduanya adalah janji kerja Baghiz.
- Panel "Peralatan Saya" di bagian tentang berisi pil alat. Alasan: mengikuti panel My Toolkit pada referensi, dan isinya adalah alat yang benar benar dipakai di proyek proyek di halaman ini.
- Cahaya hijau dipakai hemat: satu lingkaran cahaya redup di hero dan titik cahaya kecil di dekat badge, plus cahaya tali badge. Alasan: referensi memang bercahaya, tetapi cahaya dibatasi pada zona hero supaya halaman tetap terasa seperti panggung, bukan kabut.
- Radius dikunci: pil penuh untuk tombol dan tag, 20px untuk panel dan kartu, 26px untuk badge. Alasan: referensi konsisten memakai sudut membulat besar; satu tangga radius menjaga kesan itu tetap rapi.

## Yang tetap

Seluruh fungsi dari main dipertahankan: dialog ringkasan 8 sertifikat, tombol salin email, menu ponsel, dan placeholder gambar sertifikat. Catatan 3 November 2026: section arsip "Dua Belas Proyek" (daftar 12 proyek dengan filter dan pencarian, beserta chart inflasi di dalamnya) DIHAPUS SEMENTARA atas perintah Baghiz, untuk diganti dengan bagian baru nanti; kode filter, chart, dan gayanya ikut dibersihkan dari script.js dan styles.css. Placeholder foto sekarang berbentuk area foto di dalam ID badge; petunjuk penggantiannya tetap di assets/README.md (file assets/foto-baghiz.jpg, rasio mendekati 4 banding 4,4).

## Menjalankan

Situs ini live di https://baghizash.github.io/baghiz-portfolio/ dari branch `main`. Untuk menjalankan lokal: `py -m http.server 8000` lalu buka `http://localhost:8000`, dan gerakkan mouse di sekitar kartu identitas untuk merasakan tilt-nya.

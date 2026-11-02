# DESIGN.md - Website Portofolio Baghiz Asshiddiqie Arasya

antislop active: during (global preference).

## Design Read

Membaca ini sebagai: website portofolio satu halaman untuk rekruter Data Analyst di Indonesia, dengan bahasa visual editorial arsip data, condong ke varian editorial koran data plus satu blok medan warna gelap di penutup.

Posisi yang dituju: Data Analyst yang sedang bertumbuh ke Data Science. Bukti utamanya bukan klaim, melainkan 12 proyek analisis dari data resmi Indonesia dan kasus bisnis, masing masing dengan angka temuan yang bisa diverifikasi di GitHub.

## Ide dari subject

Di website ini, **angka resmi Indonesia menjadi halaman arsip editorial**.

Delapan dari dua belas proyek Baghiz memakai data resmi BPS, PIHPS, Kemenkes, dan USGS tentang Indonesia: harga cabai, inflasi, pengangguran, kemiskinan, IPM, pariwisata, harga pangan, gempa. Karena itu websitenya dirancang seperti publikasi data yang dirawat dengan serius: tipografi koran, daftar proyek seperti buku arsip, satu chart inflasi asli yang digambar dari data BPS, dan angka temuan tampil sebesar headline. Kompetitor generik dengan proyek Titanic atau Iris tidak bisa memakai konsep ini. Konsep ini milik pekerjaan Baghiz sendiri.

Satu hal hidup di halaman: daftar arsip proyek bisa difilter dan dicari, dan chart inflasi tahunan 2019 sampai 2026 digambar langsung dari angka BPS yang terverifikasi. Keduanya memakai konten nyata, bukan dekorasi.

## Dials

design-taste: DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 4.
antislop: ENERGY 3 (berani), RHYTHM 3 (komposisi tiap section berbeda), MOTION 2 (reveal saat scroll dan transisi hover, selalu hormat pada prefers-reduced-motion).

## Palet (dikunci, satu aksen)

- Kertas arsip `#F6F5F0`: ground utama. Alasan: halaman publikasi data, bukan layar aplikasi gelap generik.
- Tinta `#1A2332`: teks utama. Kontras 14,46 banding 1 di atas kertas, lolos WCAG AA.
- Merah cabai `#C73E1D`: satu satunya aksen. Alasan: warna ini milik subject, diambil dari proyek harga cabai dan volatilitas pangan, dipakai hanya di momen kunci seperti angka temuan, tautan aktif, dan tombol utama. Kontras 4,65 banding 1 di atas kertas dan 5,08 banding 1 untuk teks putih di atasnya.
- Biru laut dalam `#1B3A5C`: hanya untuk satu medan warna penuh di section penutup dan footer. Alasan: satu kali pergantian medan warna memberi penutup yang terasa selesai tanpa membuat seluruh situs gelap. Teks putih di atasnya 11,63 banding 1.
- Step tone `#E9E6DB` dan `#EFEDE6`: pemisah permukaan tanpa garis tipis dan tanpa bayangan.

Tidak ada gradien. Tidak ada ungu AI. Tidak ada kaca. Tidak ada bayangan pada benda diam. Tidak ada glow.

## Tipografi

- Display: Libre Franklin, bobot 800 dan 900, tracking rapat. Alasan: grotesque koran Amerika yang memang lahir untuk headline publikasi dan tabel angka, cocok dengan konsep arsip data, dan bukan default model.
- Body: IBM Plex Sans, bobot 400, 500, 600. Alasan: sans yang dirancang untuk dokumen teknis dan data, terbaca bersih di ukuran kecil, dan berpasangan wajar dengan Franklin.
- Angka memakai fitur tabular dari font yang sama (`font-feature-settings: "tnum"`), bukan font monospace dekoratif.
- Maksimal dua family. Hierarki dibangun dari skala dan bobot: headline hero sangat besar, judul section besar, body 16 sampai 18px, tidak ada ukuran tanggung di antaranya.
- Minimum teks 12px hanya untuk label kaki yang tidak esensial, teks isi tidak di bawah 14px, target sentuh minimum 44px.

## Bentuk dan layout

- Radius dikunci: 0 untuk blok editorial dan baris arsip, 4px hanya untuk tombol dan input. Satu sistem, dipakai di mana mana.
- Margin luar sama di semua section. Asimetri terjadi di dalam grid: hero split tidak seimbang, proyek unggulan berganti komposisi, daftar arsip full width, keahlian dalam tiga gugus tidak sama besar, sertifikat dalam daftar baris bukan kartu identik.
- Tidak ada tiga kartu fitur identik. Tidak ada bento sebagai layout default. Tidak ada eyebrow di setiap section. Tidak ada penomoran dekoratif. Tidak ada garis tipis sebagai dekorasi, pemisah memakai ruang dan step tone.
- Foto memakai placeholder jujur berlabel, bukan foto stok orang lain dan bukan gambar buatan yang menyamar sebagai foto Baghiz.

## Motion

- Reveal saat scroll memakai IntersectionObserver, naik 18px dan fade, stagger pendek antar item dalam satu section. Alasan: memandu mata mengikuti urutan baca arsip.
- Hover pada baris proyek menggeser latar ke step tone dan menggerakkan panah tautan 4px. Alasan: memberi tahu baris itu bisa dibuka.
- Semua motion mati di `prefers-reduced-motion: reduce`.

## Konten dan kejujuran

- Semua angka berasal dari data proyek yang sudah terverifikasi di ~/workspace/portfolio-gabungan/pdf.py dan antrean push GitHub. Tidak ada statistik buatan, tidak ada testimoni, tidak ada logo perusahaan.
- Sertifikat yang dicantumkan hanya yang benar benar selesai atau yang file PDF nya ada di arsip Baghiz. Dua tautan verifikasi Coursera yang asli dicantumkan: IBM Data Analyst dan Data Science Foundations.
- Slot foto dan slot pratinjau sertifikat adalah placeholder berlabel jelas sampai Baghiz memasukkan file aslinya.
- Tanpa em dash dan tanpa en dash di seluruh teks situs. Rentang tahun memakai hyphen biasa.

## Struktur halaman

1. Header polos: wordmark, tautan ke section yang benar benar ada, satu aksi ke GitHub.
2. Hero split: nama dan posisi besar di kiri, plat foto placeholder di kanan, strip angka temuan nyata di bawahnya.
3. Tentang: cara kerja Baghiz dari pertanyaan sampai rekomendasi, ditulis sebagai prosa.
4. Proyek unggulan: enam proyek yang dipin di profil GitHub, komposisi besar bergantian.
5. Arsip proyek: dua belas proyek dalam daftar yang bisa difilter dan dicari, tiap baris membuka repo GitHub.
6. Chart inflasi: satu visual data asli di dalam section arsip sebagai bukti cara membaca tren.
7. Keahlian: tiga gugus keahlian dengan konteks pemakaian nyata di proyek.
8. Sertifikat: daftar sertifikat dengan dialog detail dan slot pratinjau.
9. Penutup di medan biru laut dalam: nama besar full width, email, GitHub, tombol salin email yang benar benar bekerja.

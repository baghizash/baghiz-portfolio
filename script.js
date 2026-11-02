// Portofolio Baghiz. Semua interaksi di halaman ini benar benar bekerja:
// menu ponsel, filter dan pencarian arsip proyek, chart inflasi dari data BPS,
// dialog sertifikat, dan tombol salin email.

(function () {
  "use strict";

  /* Menu ponsel */
  var menuButton = document.getElementById("menuButton");
  var siteNav = document.getElementById("siteNav");
  function closeMenu() {
    siteNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
  menuButton.addEventListener("click", function () {
    var open = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
  });
  siteNav.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });

  /* Filter dan pencarian arsip proyek */
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
  var searchInput = document.getElementById("projectSearch");
  var rows = Array.prototype.slice.call(document.querySelectorAll(".archive-row"));
  var status = document.getElementById("archiveStatus");
  var emptyBox = document.getElementById("archiveEmpty");
  var activeFilter = "semua";

  function applyArchiveFilter() {
    var query = searchInput.value.trim().toLowerCase();
    var visible = 0;
    rows.forEach(function (row) {
      var matchesFilter = activeFilter === "semua" || row.getAttribute("data-cat") === activeFilter;
      var haystack = (row.textContent + " " + (row.getAttribute("data-text") || "")).toLowerCase();
      var matchesSearch = !query || haystack.indexOf(query) !== -1;
      var show = matchesFilter && matchesSearch;
      row.hidden = !show;
      if (show) visible += 1;
    });
    status.textContent = "Menampilkan " + visible + " dari " + rows.length + " proyek.";
    emptyBox.hidden = visible !== 0;
  }
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (other) {
        other.classList.remove("is-active");
        other.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      activeFilter = btn.getAttribute("data-filter");
      applyArchiveFilter();
    });
  });
  searchInput.addEventListener("input", applyArchiveFilter);
  document.getElementById("resetFilter").addEventListener("click", function () {
    searchInput.value = "";
    filterButtons.forEach(function (other) {
      var isAll = other.getAttribute("data-filter") === "semua";
      other.classList.toggle("is-active", isAll);
      other.setAttribute("aria-pressed", isAll ? "true" : "false");
    });
    activeFilter = "semua";
    applyArchiveFilter();
    searchInput.focus();
  });

  /* Chart inflasi tahunan. Angka Desember year on year dari BPS,
     titik terakhir adalah September 2026. Sama dengan proyek Inflasi Indonesia. */
  var inflationData = [
    { label: "2019", value: 2.72 },
    { label: "2020", value: 1.68 },
    { label: "2021", value: 1.87 },
    { label: "2022", value: 5.51 },
    { label: "2023", value: 2.61 },
    { label: "2024", value: 1.57 },
    { label: "2025", value: 2.92 },
    { label: "Sep 2026", value: 3.28 }
  ];
  var canvas = document.getElementById("inflationChart");
  function drawChart() {
    if (!canvas || !canvas.getContext) return;
    var cssWidth = canvas.clientWidth || 1120;
    var cssHeight = Math.max(260, Math.round(cssWidth * 0.375));
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    var ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    var W = cssWidth, H = cssHeight;
    var padL = 8, padR = 8, padT = 34, padB = 34;
    var chartW = W - padL - padR;
    var chartH = H - padT - padB;
    var max = 6;
    var slot = chartW / inflationData.length;
    var barW = Math.min(72, slot * 0.58);
    ctx.clearRect(0, 0, W, H);
    // Garis sasaran Bank Indonesia 2,5 persen plus minus 1, batas atas 3,5 persen.
    var targetY = padT + chartH - (3.5 / max) * chartH;
    ctx.strokeStyle = "#5A6577";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padL, targetY);
    ctx.lineTo(W - padR, targetY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#45506A";
    ctx.font = "600 11px 'IBM Plex Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Batas atas sasaran BI 3,5%", padL + 2, targetY - 7);
    inflationData.forEach(function (d, i) {
      var barH = (d.value / max) * chartH;
      var x = padL + slot * i + (slot - barW) / 2;
      var y = padT + chartH - barH;
      ctx.fillStyle = i === 3 ? "#C73E1D" : "#1B3A5C";
      ctx.fillRect(x, y, barW, barH);
      ctx.fillStyle = "#1A2332";
      ctx.font = "700 13px 'IBM Plex Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(d.value.toFixed(2).replace(".", ",") + "%", x + barW / 2, y - 8);
      ctx.fillStyle = "#45506A";
      ctx.font = "500 12px 'IBM Plex Sans', sans-serif";
      ctx.fillText(d.label, x + barW / 2, padT + chartH + 22);
    });
    ctx.fillStyle = "#1A2332";
    ctx.fillRect(padL, padT + chartH, chartW, 2);
  }
  drawChart();
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(drawChart, 150);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(drawChart);
  }

  /* Dialog sertifikat */
  var CERTS = {
    "ibm-da": {
      title: "IBM Data Analyst Professional Certificate",
      issuer: "IBM, lewat Coursera. 11 course, selesai 2026.",
      body: "Materi meliputi Excel untuk pembersihan data dan dashboard, Python dengan pandas dan NumPy, SQL dan basis data relasional, visualisasi dengan Matplotlib dan Seaborn, statistika, analisis eksploratif, dan capstone. Capstone saya menganalisis tren teknologi dari survei 65.437 developer dan hasilnya terdokumentasi sebagai repositori terpisah di GitHub.",
      verify: "https://coursera.org/verify/professional-cert/DZY2HKM0VCLU"
    },
    "google-da": {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google, lewat Coursera. 8 course.",
      body: "Materi meliputi fondasi analisis data, proses bertanya dan menyiapkan data, SQL dan BigQuery, spreadsheet, dasar R, Tableau untuk visualisasi, dan capstone studi kasus lengkap dari pembersihan data sampai presentasi temuan.",
      verify: ""
    },
    "meta-da": {
      title: "Meta Data Analyst Professional Certificate",
      issuer: "Meta, lewat Coursera. 5 course.",
      body: "Materi meliputi fondasi data analytics, analisis data dengan spreadsheet dan SQL, Python untuk analitik, fondasi statistika, dan manajemen data, termasuk cara data disimpan, diatur, dan dijaga kualitasnya.",
      verify: ""
    },
    "dsf": {
      title: "Data Science Foundations",
      issuer: "University of London, lewat Coursera. 8 course, selesai 2026.",
      body: "Materi meliputi Python untuk data science, statistika, clustering, dan dasar machine learning. Proyek yang saya buat meliputi analisis eksploratif autentikasi uang kertas dengan 1.372 baris data dan capstone prediksi penyewaan sepeda, keduanya terdokumentasi di GitHub beserta modul belajarnya.",
      verify: "https://coursera.org/verify/specialization/NRPSEHDEBX9V"
    },
    "ibm-ba": {
      title: "IBM Business Analyst Professional Certificate",
      issuer: "IBM, lewat Coursera.",
      body: "Materi meliputi pemodelan proses, pengumpulan dan dokumentasi kebutuhan, manajemen proyek dan pemangku kepentingan, dan proyek akhir tentang peningkatan efisiensi operasional rumah sakit multispesialisasi.",
      verify: ""
    },
    "excel-macq": {
      title: "Excel Skills for Data Analytics and Visualization",
      issuer: "Macquarie University, lewat Coursera.",
      body: "Materi meliputi Excel tingkat lanjut untuk pembersihan dan penyiapan data, analisis dengan formula dan pivot, serta visualisasi dan dashboard untuk kebutuhan analitik.",
      verify: ""
    },
    "michigan": {
      title: "More Applied Data Science with Python",
      issuer: "University of Michigan, lewat Coursera.",
      body: "Coursework meliputi penambangan pola dan aturan asosiasi, sistem rekomendasi dengan SVD, analisis jaringan dan sentralitas, pemetaan komunitas sains, model difusi dan epidemi, serta machine learning terapan. Setiap course menghasilkan repositori proyek dan modul tertulis di GitHub.",
      verify: ""
    },
    "asu": {
      title: "Learn English Now",
      issuer: "Arizona State University, lewat Coursera. 3 course.",
      body: "Materi meliputi fondasi berpikir kritis, pemecahan masalah dan membuat prediksi, dan strategi berpikir kritis. Kemampuan ini terpakai langsung saat analisis data, terutama saat merumuskan pertanyaan yang tepat sebelum mengolah angka.",
      verify: ""
    }
  };
  var dialog = document.getElementById("certDialog");
  var dialogTitle = document.getElementById("certDialogTitle");
  var dialogIssuer = document.getElementById("certDialogIssuer");
  var dialogBody = document.getElementById("certDialogBody");
  var dialogVerify = document.getElementById("certDialogVerify");
  var lastTrigger = null;
  document.querySelectorAll(".cert-open").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cert = CERTS[btn.getAttribute("data-cert")];
      if (!cert) return;
      lastTrigger = btn;
      dialogTitle.textContent = cert.title;
      dialogIssuer.textContent = cert.issuer;
      dialogBody.textContent = cert.body;
      dialogVerify.innerHTML = "";
      if (cert.verify) {
        var link = document.createElement("a");
        link.href = cert.verify;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "Verifikasi kredensial di Coursera";
        dialogVerify.appendChild(link);
      } else {
        dialogVerify.textContent = "File PDF sertifikat tersedia dan bisa diminta lewat email.";
      }
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    });
  });
  document.getElementById("certDialogClose").addEventListener("click", function () {
    dialog.close();
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", function () {
    if (lastTrigger) lastTrigger.focus();
  });

  /* Salin alamat email */
  var copyButton = document.getElementById("copyEmail");
  var copyStatus = document.getElementById("copyStatus");
  copyButton.addEventListener("click", function () {
    var email = "baghiz.ash@gmail.com";
    function done() {
      copyStatus.textContent = "Alamat email tersalin: " + email;
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        done();
      } catch (err) {
        copyStatus.textContent = "Salin manual alamat ini: " + email;
      }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done, fallback);
    } else {
      fallback();
    }
  });

  /* Reveal saat scroll */
  var revealItems = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (el) { observer.observe(el); });
  }
})();

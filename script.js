// Portofolio Baghiz. Semua interaksi di halaman ini benar benar bekerja:
// menu ponsel, tilt ID badge, kartu proyek, kartu kredensial
// berputar, dan tombol salin email.

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

  /* Kartu kredensial: berputar terus sampai satu kartu diklik.
     Kartu yang dipilih berhenti di tengah, fokus, dan detailnya
     tampil di panel bawah. Tombol Putar lagi melanjutkan putaran. */
  var CERTS = {
    "ibm-da": {
      title: "IBM Data Analyst Professional Certificate",
      issuer: "IBM, lewat Coursera. 11 course, selesai 2026.",
      short: "Excel, Python, SQL, data visualization, dan capstone dari 65.437 baris survei developer.",
      verify: "https://coursera.org/verify/professional-cert/DZY2HKM0VCLU"
    },
    "google-da": {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google, lewat Coursera. 8 course.",
      short: "Foundations of data analytics, SQL dan BigQuery, spreadsheet, R, Tableau, dan capstone case study.",
      verify: ""
    },
    "meta-da": {
      title: "Meta Data Analyst Professional Certificate",
      issuer: "Meta, lewat Coursera. 5 course.",
      short: "Spreadsheet dan SQL, Python for analytics, foundations of statistics, dan data management.",
      verify: ""
    },
    "dsf": {
      title: "Data Science Foundations",
      issuer: "University of London, lewat Coursera. 8 course, selesai 2026.",
      short: "Python for data science, statistics, clustering, machine learning, dan capstone bike sharing prediction.",
      verify: "https://coursera.org/verify/specialization/NRPSEHDEBX9V"
    },
    "ibm-ba": {
      title: "IBM Business Analyst Professional Certificate",
      issuer: "IBM, lewat Coursera.",
      short: "Process modeling, requirements gathering, stakeholder management, dan capstone project analisis bisnis.",
      verify: ""
    },
    "excel-macq": {
      title: "Excel Skills for Data Analytics and Visualization",
      issuer: "Macquarie University, lewat Coursera.",
      short: "Advanced Excel untuk data cleaning, data preparation, analysis, dan data visualization.",
      verify: ""
    },
    "michigan": {
      title: "More Applied Data Science with Python",
      issuer: "University of Michigan, lewat Coursera.",
      short: "Coursework: pattern mining, recommender systems, network analysis, dan applied machine learning.",
      verify: ""
    },
    "asu": {
      title: "Learn English Now",
      issuer: "Arizona State University, lewat Coursera. 3 course.",
      short: "Foundations of critical thinking, problem solving, dan prediction strategies.",
      verify: ""
    }
  };

  var credStage = document.getElementById("credStage");
  var credViewport = document.getElementById("credViewport");
  var credTrack = document.getElementById("credTrack");
  var credSet = document.getElementById("credSet");
  var credDetail = document.getElementById("credDetail");
  var focusedCard = null;

  function resetCredDetail() {
    credDetail.innerHTML = "";
    credDetail.hidden = true;
  }

  function resumeCredLoop() {
    focusedCard = null;
    credStage.classList.remove("is-focused");
    credTrack.style.transform = "";
    Array.prototype.forEach.call(credTrack.querySelectorAll(".cred-card"), function (card) {
      card.classList.remove("is-focused");
      card.classList.remove("is-dim");
    });
    resetCredDetail();
  }

  function centerCredCard(card) {
    var x = credViewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    credTrack.style.transform = "translateX(" + x + "px)";
  }

  function focusCredCard(card) {
    var cert = CERTS[card.getAttribute("data-cert")];
    if (!cert) return;
    focusedCard = card;
    credStage.classList.add("is-focused");
    Array.prototype.forEach.call(credSet.querySelectorAll(".cred-card"), function (other) {
      other.classList.toggle("is-focused", other === card);
      other.classList.toggle("is-dim", other !== card);
    });
    centerCredCard(card);

    credDetail.innerHTML = "";
    credDetail.hidden = false;
    var title = document.createElement("h3");
    title.textContent = cert.title;
    var issuer = document.createElement("p");
    issuer.className = "cred-detail-issuer";
    issuer.textContent = cert.issuer;
    var body = document.createElement("p");
    body.className = "cred-detail-body";
    body.textContent = cert.short;
    var actions = document.createElement("div");
    actions.className = "cred-detail-actions";
    if (cert.verify) {
      var link = document.createElement("a");
      link.className = "btn btn-primary";
      link.href = cert.verify;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Verifikasi di Coursera";
      actions.appendChild(link);
    } else {
      var note = document.createElement("span");
      note.className = "cred-detail-note";
      note.textContent = "File PDF sertifikat bisa diminta lewat email.";
      actions.appendChild(note);
    }
    var resumeBtn = document.createElement("button");
    resumeBtn.type = "button";
    resumeBtn.className = "btn btn-dark";
    resumeBtn.textContent = "Putar lagi";
    resumeBtn.addEventListener("click", resumeCredLoop);
    actions.appendChild(resumeBtn);
    credDetail.appendChild(title);
    credDetail.appendChild(issuer);
    credDetail.appendChild(body);
    credDetail.appendChild(actions);
  }

  if (credStage && credViewport && credTrack && credSet && credDetail) {
    // Gandakan set kartu supaya putarannya menyambung tanpa jeda.
    var credClone = credSet.cloneNode(true);
    credClone.removeAttribute("id");
    credClone.setAttribute("aria-hidden", "true");
    Array.prototype.forEach.call(credClone.querySelectorAll("button"), function (btn) {
      btn.tabIndex = -1;
    });
    credTrack.appendChild(credClone);
    credViewport.classList.add("is-loop");

    credTrack.addEventListener("click", function (event) {
      var btn = event.target.closest(".cred-card");
      if (!btn) return;
      var key = btn.getAttribute("data-cert");
      var originals = credSet.querySelectorAll(".cred-card");
      for (var i = 0; i < originals.length; i += 1) {
        if (originals[i].getAttribute("data-cert") === key) {
          focusCredCard(originals[i]);
          break;
        }
      }
    });

    var credResizeTimer = null;
    window.addEventListener("resize", function () {
      if (!focusedCard) return;
      window.clearTimeout(credResizeTimer);
      credResizeTimer = window.setTimeout(function () {
        centerCredCard(focusedCard);
      }, 150);
    });
  }

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

/* ===== Cabang gaya-dark-idcard: tilt ID badge + kartu proyek ===== */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ID badge miring mengikuti mouse, seperti kartu gantung pada referensi video
const badgeTiltEl = document.getElementById("badgeTilt");
const heroSection = document.querySelector(".hero");
if (badgeTiltEl && heroSection && !prefersReduced && window.matchMedia("(pointer: fine)").matches) {
  let tiltRaf = null;
  let targetY = 0, targetX = 0, curY = 0, curX = 0;
  function animateBadgeTilt() {
    curY += (targetY - curY) * 0.08;
    curX += (targetX - curX) * 0.08;
    badgeTiltEl.style.transform = "perspective(900px) rotateY(" + curY.toFixed(2) + "deg) rotateX(" + curX.toFixed(2) + "deg)";
    if (Math.abs(targetY - curY) > 0.05 || Math.abs(targetX - curX) > 0.05) {
      tiltRaf = requestAnimationFrame(animateBadgeTilt);
    } else { tiltRaf = null; }
  }
  function kickBadgeTilt() { if (!tiltRaf) tiltRaf = requestAnimationFrame(animateBadgeTilt); }
  heroSection.addEventListener("mousemove", (event) => {
    const rect = badgeTiltEl.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
    const dy = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
    targetY = Math.max(-11, Math.min(11, dx * 26));
    targetX = Math.max(-9, Math.min(9, -dy * 22));
    kickBadgeTilt();
  });
  heroSection.addEventListener("mouseleave", () => { targetY = 0; targetX = 0; kickBadgeTilt(); });
}

// Kartu proyek: berputar terus sampai satu kartu diklik, pola sama
// dengan kartu kredensial. Detail tampil di panel bawah.
const PROJECTS = {
  "cabai": { title: "Harga Cabai Indonesia 2026", cat: "Harga Pangan • PIHPS Nasional", finding: "Harga cabai rawit merah naik 14,3% sepanjang 2026, dengan rata rata Rp75.219 per kg dan puncak Rp105.450 per kg. Kenaikan ini tren yang terbaca dari harga harian di seluruh Indonesia, bukan kejadian satu minggu.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/harga-cabai-indonesia-2026" },
  "telco": { title: "Telco Customer Churn", cat: "Customer Retention • Data Bisnis", finding: "Churn 26,6% terkonsentrasi pada pelanggan kontrak bulanan dan mengancam 30,5% pendapatan bulanan. Pendapatan yang berisiko hilang mencapai USD 139.130,85 per bulan dari 7.032 pelanggan.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/telco-customer-churn-analysis" },
  "olist": { title: "Olist E-Commerce Brazil", cat: "E-Commerce • Olist Brazil", finding: "Pendapatan produk mencapai 13,22 juta BRL dari 99.441 pesanan, tetapi hanya 3,1% pelanggan yang membeli lebih dari sekali. Masalahnya ada di pembelian ulang, bukan di penjualan pertama.", tools: ["SQL", "Python", "Power BI"], url: "https://github.com/baghizash/olist-brazilian-ecommerce-analysis" },
  "inflasi": { title: "Inflasi Indonesia 2019 sampai 2026", cat: "Macroeconomics • Data BPS", finding: "Inflasi year on year turun dari puncak 5,95% pada September 2022 menjadi 3,28% pada September 2026. Seri BPS tujuh tahun disusun ulang dan 150 kota dibandingkan.", tools: ["Python", "SQL", "Power BI"], url: "https://github.com/baghizash/inflasi-indonesia-2026" },
  "pengangguran": { title: "Pengangguran Indonesia 2026", cat: "Ketenagakerjaan • Sakernas BPS", finding: "Tingkat pengangguran terbuka 4,65% pada Mei 2026, tetapi usia 15 sampai 24 tahun mencapai 17,37% dan lulusan SMK 7,68%, tertinggi per jenjang pendidikan.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/pengangguran-indonesia-2026" },
  "hr": { title: "HR Attrition dan People Analytics", cat: "People Analytics • Data IBM HR", finding: "Attrition mencapai 16,1% dari 1.470 karyawan. Karyawan yang lembur resign tiga kali lebih sering, dan Sales Representative adalah peran paling rawan ditinggalkan.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/ibm-hr-attrition-people-analytics" },
  "ipm": { title: "Indeks Pembangunan Manusia 2025", cat: "Pembangunan Manusia • Data BPS", finding: "IPM nasional 75,90 pada 2025. DKI Jakarta tertinggi dengan 85,05 dan Papua Pegunungan terendah dengan 54,91, jadi kesenjangan pembangunan antar provinsi masih lebar.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/ipm-indonesia-2026" },
  "kemiskinan": { title: "Kemiskinan dan Ketimpangan Indonesia", cat: "Kemiskinan • Data BPS", finding: "Kemiskinan turun ke 8,07% pada Maret 2026, terendah dalam seri 2019 sampai 2026, dan ketimpangan ikut menyempit.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/kemiskinan-indonesia-2026" },
  "pariwisata": { title: "Pariwisata Indonesia", cat: "Pariwisata • Data BPS", finding: "Kunjungan wisatawan mancanegara sepanjang 2025 mencapai 15.386.646, pulih ke 95,5% dari level 2019, dengan Bali sebagai pintu masuk utama.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/pariwisata-indonesia-2026" },
  "pangan": { title: "Harga Pangan Nasional", cat: "Harga Pangan • PIHPS Nasional", finding: "Rata rata harga minyak goreng mencapai Rp22.158 per kg pada 2026, naik 6,8% dibanding 2025, salah satu kenaikan tertinggi di antara kelompok pangan yang dipantau.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/harga-pangan-nasional-2026" },
  "gempa": { title: "Gempa Bumi Indonesia 2015 sampai 2026", cat: "Kebencanaan • Data USGS", finding: "Tercatat 9.600 kejadian gempa magnitudo 4,5 ke atas pada 2015 sampai 2026, dengan kejadian terbesar M7,8 di Ende.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/gempa-bumi-indonesia-2026" },
  "ispa": { title: "ISPA Indonesia 2026", cat: "Kesehatan • Data Kemenkes", finding: "Laporan ISPA nasional mencapai 14.088.945 kasus sampai minggu ke 38 tahun 2026, disusun dari data SKDR Kemenkes.", tools: ["Python", "pandas", "Power BI"], url: "https://github.com/baghizash/ispa-indonesia-2026-analysis" }
};

const projStage = document.getElementById("projStage");
const projViewport = document.getElementById("projViewport");
const projTrack = document.getElementById("projTrack");
const projSet = document.getElementById("projSet");
const projDetail = document.getElementById("projDetail");
let focusedProjCard = null;

function resumeProjLoop() {
  focusedProjCard = null;
  projStage.classList.remove("is-focused");
  projTrack.style.transform = "";
  projSet.querySelectorAll(".proj-card").forEach(function (card) {
    card.classList.remove("is-focused");
    card.classList.remove("is-dim");
  });
  projDetail.innerHTML = "";
  projDetail.hidden = true;
}

function centerProjCard(card) {
  const x = projViewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
  projTrack.style.transform = "translateX(" + x + "px)";
}

function focusProjCard(card) {
  const proj = PROJECTS[card.getAttribute("data-proj")];
  if (!proj) return;
  focusedProjCard = card;
  projStage.classList.add("is-focused");
  projSet.querySelectorAll(".proj-card").forEach(function (other) {
    other.classList.toggle("is-focused", other === card);
    other.classList.toggle("is-dim", other !== card);
  });
  centerProjCard(card);

  projDetail.innerHTML = "";
  projDetail.hidden = false;
  const title = document.createElement("h3");
  title.textContent = proj.title;
  const cat = document.createElement("p");
  cat.className = "proj-detail-cat";
  cat.textContent = proj.cat;
  const body = document.createElement("p");
  body.className = "proj-detail-body";
  body.textContent = proj.finding;
  const tags = document.createElement("ul");
  tags.className = "proj-tags";
  proj.tools.forEach(function (tool) {
    const li = document.createElement("li");
    li.textContent = tool;
    tags.appendChild(li);
  });
  const actions = document.createElement("div");
  actions.className = "proj-detail-actions";
  const link = document.createElement("a");
  link.className = "btn btn-primary";
  link.href = proj.url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Buka di GitHub";
  const resumeBtn = document.createElement("button");
  resumeBtn.type = "button";
  resumeBtn.className = "btn btn-dark";
  resumeBtn.textContent = "Putar lagi";
  resumeBtn.addEventListener("click", resumeProjLoop);
  actions.appendChild(link);
  actions.appendChild(resumeBtn);
  projDetail.appendChild(title);
  projDetail.appendChild(cat);
  projDetail.appendChild(body);
  projDetail.appendChild(tags);
  projDetail.appendChild(actions);
}

if (projStage && projViewport && projTrack && projSet && projDetail) {
  const projClone = projSet.cloneNode(true);
  projClone.removeAttribute("id");
  projClone.setAttribute("aria-hidden", "true");
  projClone.querySelectorAll("button").forEach(function (btn) { btn.tabIndex = -1; });
  projTrack.appendChild(projClone);
  projViewport.classList.add("is-loop");

  projTrack.addEventListener("click", function (event) {
    const btn = event.target.closest(".proj-card");
    if (!btn) return;
    const key = btn.getAttribute("data-proj");
    const originals = projSet.querySelectorAll(".proj-card");
    for (let i = 0; i < originals.length; i += 1) {
      if (originals[i].getAttribute("data-proj") === key) {
        focusProjCard(originals[i]);
        break;
      }
    }
  });

  let projResizeTimer = null;
  window.addEventListener("resize", function () {
    if (!focusedProjCard) return;
    window.clearTimeout(projResizeTimer);
    projResizeTimer = window.setTimeout(function () {
      centerProjCard(focusedProjCard);
    }, 150);
  });
}

/* ===== Pengalaman: wheel slider ala referensi swiper-wheel-slide =====
   Kartu aktif tegak di tengah; kartu lain miring menuruni busur roda.
   Kendali: scroll di area panggung, seret, klik kartu samping, panah. */
(function () {
  const stage = document.getElementById("expStage");
  if (!stage) return;
  const slides = Array.from(stage.querySelectorAll("[data-exp-slide]"));
  const status = document.getElementById("expStatus");
  const total = slides.length;
  let active = 0;
  let wheelLock = false;

  function factor() { return window.innerWidth <= 720 ? 0.74 : 1; }

  function render() {
    const f = factor();
    slides.forEach(function (slide, i) {
      let off = i - active;
      if (off > total / 2) off -= total;
      if (off < -total / 2) off += total;
      const a = Math.abs(off);
      const x = off * 330 * f;
      const y = (a === 1 ? 92 : a >= 2 ? 350 : 0) * (window.innerWidth <= 720 ? 0.8 : 1);
      const rot = Math.max(-2, Math.min(2, off)) * 10;
      slide.style.transform = "translateX(" + x + "px) translateY(" + y + "px) rotate(" + rot + "deg)";
      slide.style.opacity = a > 2 ? "0" : "1";
      slide.style.zIndex = String(20 - a);
      slide.style.pointerEvents = a > 2 ? "none" : "auto";
      slide.classList.toggle("is-active", off === 0);
      slide.setAttribute("aria-hidden", off === 0 ? "false" : "true");
    });
    if (status) status.textContent = (active + 1) + " / " + total;
  }
  function go(dir) { active = (active + dir + total) % total; render(); }
  function goTo(i) { active = ((i % total) + total) % total; render(); }

  const prevBtn = document.getElementById("expPrev");
  const nextBtn = document.getElementById("expNext");
  if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });

  slides.forEach(function (slide, i) {
    slide.addEventListener("click", function () { if (i !== active) goTo(i); });
  });

  stage.addEventListener("wheel", function (event) {
    event.preventDefault();
    if (wheelLock) return;
    if (Math.abs(event.deltaY) < 12) return;
    wheelLock = true;
    go(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(function () { wheelLock = false; }, 480);
  }, { passive: false });

  let dragX = null;
  stage.addEventListener("pointerdown", function (event) { dragX = event.clientX; });
  stage.addEventListener("pointerup", function (event) {
    if (dragX === null) return;
    const dx = event.clientX - dragX;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    dragX = null;
  });
  stage.addEventListener("pointercancel", function () { dragX = null; });

  stage.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
  });

  let expResizeTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(expResizeTimer);
    expResizeTimer = window.setTimeout(render, 150);
  });

  render();
})();

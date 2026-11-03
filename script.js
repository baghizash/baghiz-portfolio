// Portofolio Baghiz. Semua interaksi di halaman ini benar benar bekerja:
// menu ponsel, tilt ID badge, slider proyek unggulan, dialog sertifikat,
// dan tombol salin email.

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

  /* Dialog sertifikat */
  var CERTS = {
    "ibm-da": {
      title: "IBM Data Analyst Professional Certificate",
      issuer: "IBM, lewat Coursera. 11 course, selesai 2026.",
      body: "Materi meliputi Excel untuk data cleaning dan dashboard, Python dengan pandas dan NumPy, SQL dan relational database, data visualization dengan Matplotlib dan Seaborn, statistics, exploratory data analysis, dan capstone. Capstone saya menganalisis tren teknologi dari survei 65.437 developer dan hasilnya terdokumentasi sebagai repositori terpisah di GitHub.",
      verify: "https://coursera.org/verify/professional-cert/DZY2HKM0VCLU"
    },
    "google-da": {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google, lewat Coursera. 8 course.",
      body: "Materi meliputi foundations of data analytics, proses ask dan prepare data, SQL dan BigQuery, spreadsheet, dasar R, Tableau untuk data visualization, dan capstone case study lengkap dari data cleaning sampai presentation temuan.",
      verify: ""
    },
    "meta-da": {
      title: "Meta Data Analyst Professional Certificate",
      issuer: "Meta, lewat Coursera. 5 course.",
      body: "Materi meliputi foundations of data analytics, data analysis dengan spreadsheet dan SQL, Python for analytics, foundations of statistics, dan data management, termasuk cara data disimpan, diatur, dan dijaga kualitasnya.",
      verify: ""
    },
    "dsf": {
      title: "Data Science Foundations",
      issuer: "University of London, lewat Coursera. 8 course, selesai 2026.",
      body: "Materi meliputi Python for data science, statistics, clustering, dan machine learning. Proyek yang saya buat meliputi exploratory data analysis pada banknote authentication dengan 1.372 baris data dan capstone bike sharing prediction, keduanya terdokumentasi di GitHub beserta modul belajarnya.",
      verify: "https://coursera.org/verify/specialization/NRPSEHDEBX9V"
    },
    "ibm-ba": {
      title: "IBM Business Analyst Professional Certificate",
      issuer: "IBM, lewat Coursera.",
      body: "Materi meliputi process modeling, requirements gathering dan documentation, project management dan stakeholder management, dan capstone project tentang operational efficiency di rumah sakit multi specialty.",
      verify: ""
    },
    "excel-macq": {
      title: "Excel Skills for Data Analytics and Visualization",
      issuer: "Macquarie University, lewat Coursera.",
      body: "Materi meliputi Advanced Excel untuk data cleaning dan data preparation, analysis dengan formula dan pivot table, serta data visualization dan dashboard untuk kebutuhan analytics.",
      verify: ""
    },
    "michigan": {
      title: "More Applied Data Science with Python",
      issuer: "University of Michigan, lewat Coursera.",
      body: "Coursework meliputi pattern mining dan association rules, recommender systems dengan SVD, network analysis dan centrality, science mapping dan community detection, diffusion dan epidemic models, serta applied machine learning. Setiap course menghasilkan repositori proyek dan modul tertulis di GitHub.",
      verify: ""
    },
    "asu": {
      title: "Learn English Now",
      issuer: "Arizona State University, lewat Coursera. 3 course.",
      body: "Materi meliputi foundations of critical thinking, problem solving dan prediction, dan critical thinking strategies. Kemampuan ini terpakai langsung saat analisis data, terutama saat merumuskan pertanyaan yang tepat sebelum mengolah angka.",
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

/* ===== Cabang gaya-dark-idcard: tilt ID badge + slider proyek ===== */
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

// Slider proyek unggulan (geser manual dengan tombol, titik, dan scroll snap)
const sliderTrack = document.getElementById("sliderTrack");
if (sliderTrack) {
  const slideEls = Array.from(sliderTrack.children);
  const dotsWrap = document.getElementById("sliderDots");
  const statusEl = document.getElementById("sliderStatus");
  const slideTitles = slideEls.map((el) => (el.getAttribute("aria-label") || "").split(": ")[1] || "");
  let currentSlide = 0;
  let scrollDebounce = null;

  slideEls.forEach((unused, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "Tampilkan proyek " + (i + 1) + ": " + slideTitles[i]);
    dot.addEventListener("click", () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });
  const dotEls = Array.from(dotsWrap.children);

  function setActiveSlide() {
    dotEls.forEach((d, i) => d.classList.toggle("is-active", i === currentSlide));
    statusEl.textContent = "Proyek " + (currentSlide + 1) + " dari " + slideEls.length + ": " + slideTitles[currentSlide];
  }
  function goToSlide(i) {
    currentSlide = Math.max(0, Math.min(slideEls.length - 1, i));
    sliderTrack.scrollTo({
      left: slideEls[currentSlide].offsetLeft - sliderTrack.offsetLeft,
      behavior: prefersReduced ? "auto" : "smooth"
    });
    setActiveSlide();
  }
  document.getElementById("sliderPrev").addEventListener("click", () => {
    goToSlide((currentSlide - 1 + slideEls.length) % slideEls.length);
  });
  document.getElementById("sliderNext").addEventListener("click", () => {
    goToSlide((currentSlide + 1) % slideEls.length);
  });
  sliderTrack.addEventListener("scroll", () => {
    window.clearTimeout(scrollDebounce);
    scrollDebounce = window.setTimeout(() => {
      const idx = Math.round(sliderTrack.scrollLeft / sliderTrack.clientWidth);
      if (idx !== currentSlide && idx >= 0 && idx < slideEls.length) {
        currentSlide = idx;
        setActiveSlide();
      }
    }, 120);
  });
}

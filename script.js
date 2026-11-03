// Portofolio Baghiz. Semua interaksi di halaman ini benar benar bekerja:
// menu ponsel, tilt ID badge, slider proyek unggulan, kartu kredensial
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
    var hint = document.createElement("p");
    hint.className = "cred-detail-hint";
    hint.textContent = "Kartu berputar otomatis. Klik salah satu kartu untuk fokus ke kredensial itu dan membaca detail singkatnya di sini.";
    credDetail.appendChild(hint);
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

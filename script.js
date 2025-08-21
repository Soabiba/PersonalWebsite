// script.js
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /* =========================
   * Navbar toggler
   * ========================= */
  const navbar = document.querySelector(".navbar");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (navbar && navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      navbar.classList.toggle("toggled");
    });
  }

  /* =========================
   * Fade-in on scroll
   * ========================= */
  const fadeElements = document.querySelectorAll(".fade-in");

  // Prefer IntersectionObserver for smoother performance
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            io.unobserve(entry.target); // animate once
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    fadeElements.forEach((el) => io.observe(el));
  } else {
    // Fallback for very old browsers
    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
    };

    const activateFadeIn = () => {
      fadeElements.forEach((el) => {
        if (isInViewport(el)) el.classList.add("active");
      });
    };

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            activateFadeIn();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );

    activateFadeIn();
  }

  /* =========================
   * Lightbox (no inline JS)
   * ========================= */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const galleryImages = document.querySelectorAll(".project-gallery img");

  // Utility: open / close helpers
  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.style.display = "flex";
    document.documentElement.classList.add("no-scroll");
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.style.display = "none";
    lightboxImg.src = "";
    lightboxImg.alt = "";
    document.documentElement.classList.remove("no-scroll");
  };

  // Click any gallery image to open
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
    // Optional: show pointer cursor
    img.style.cursor = "zoom-in";
  });

  // Click overlay or the × to close (but not the image itself)
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      const clickedOverlay = e.target === lightbox;
      const clickedClose = e.target.classList && e.target.classList.contains("close");
      if (clickedOverlay || clickedClose) closeLightbox();
    });
  }

  // Press Esc to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.style.display === "flex") {
      closeLightbox();
    }
  });
});

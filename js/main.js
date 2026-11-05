document.addEventListener("DOMContentLoaded", () => {
  const details = document.querySelector(".nav-mobile");
  if (details) {
    details.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        details.removeAttribute("open");
      });
    });

    document.addEventListener("click", (event) => {
      if (!details.open) return;
      if (!details.contains(event.target)) {
        details.removeAttribute("open");
      }
    });
  }

  const progressBar = document.querySelector(".flow-progress-bar");
  if (progressBar) {
    progressBar.dataset.step = "3";
  }

  const heroMedia = document.querySelector(".hero-media");
  const heroVideo = document.getElementById("hero-pitch");
  const heroPlay = document.querySelector(".hero-play");
  const lightbox = document.getElementById("video-lightbox");
  const lightboxPlayer = lightbox ? lightbox.querySelector(".video-lightbox-player") : null;
  let lastFocus = null;

  const closeLightbox = () => {
    if (!lightbox || !lightboxPlayer) return;
    lightboxPlayer.pause();
    lightboxPlayer.removeAttribute("src");
    lightboxPlayer.load();
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  };

  const openLightbox = (sourceVideo) => {
    if (!lightbox || !lightboxPlayer || !sourceVideo) return;
    const source = sourceVideo.querySelector("source");
    const src = source ? source.getAttribute("src") : sourceVideo.currentSrc || sourceVideo.src;
    if (!src) return;

    lastFocus = document.activeElement;
    lightboxPlayer.poster = sourceVideo.getAttribute("poster") || "";
    lightboxPlayer.src = src;
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");

    const closeBtn = lightbox.querySelector(".video-lightbox-close");
    if (closeBtn) closeBtn.focus();

    lightboxPlayer.play().catch(() => {});
  };

  if (lightbox && lightboxPlayer) {
    lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
      el.addEventListener("click", closeLightbox);
    });

    lightboxPlayer.addEventListener("ended", () => {
      closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  if (heroMedia && heroVideo && heroPlay) {
    const openHero = () => openLightbox(heroVideo);
    heroPlay.addEventListener("click", openHero);
    heroVideo.addEventListener("click", openHero);
  }

  document.querySelectorAll(".module-media").forEach((wrap) => {
    const video = wrap.querySelector("video");
    const playBtn = wrap.querySelector(".module-play");
    if (!video || !playBtn) return;
    playBtn.addEventListener("click", () => openLightbox(video));
  });

  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("contact-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) {
        status.textContent = "Please complete all required fields and check the consent box before submitting.";
        status.classList.add("is-error");
      }
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }

    if (status) {
      status.textContent = "Sending your message...";
      status.classList.remove("is-error");
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("FormSubmit request failed");
      }

      form.reset();
      if (status) {
        status.textContent = "Thank you. Your message was sent. We will get back to you soon.";
        status.classList.remove("is-error");
      }
    } catch (error) {
      if (status) {
        status.textContent = "Sorry, the message could not be sent. Please email dennis@imreadytoscan.com or call (772) 202-8841.";
        status.classList.add("is-error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
});

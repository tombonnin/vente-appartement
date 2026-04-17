document.addEventListener("DOMContentLoaded", () => {
  applyGlobalData();
  initMobileMenu();
  initBackToTop();
  renderPreviewPhotos();
});

function bindText(key, value) {
  document.querySelectorAll(`[data-bind="${key}"]`).forEach((el) => {
    el.textContent = value;
  });
}

function applyGlobalData() {
  bindText("title", apartmentData.title);
  bindText("price", apartmentData.price);
  bindText("dpe", apartmentData.dpe);
  bindText("dpeValue", apartmentData.dpeValue);
  bindText("ges", apartmentData.ges);
  bindText("gesValue", apartmentData.gesValue);
  bindText("location", apartmentData.location);
  bindText("apartmentCarrez", apartmentData.apartmentCarrez);
  bindText("apartmentNonCarrez", apartmentData.apartmentNonCarrez);
  bindText("grenierCarrez", apartmentData.grenierCarrez);
  bindText("grenierNonCarrez", apartmentData.grenierNonCarrez);
  bindText("totalCarrez", apartmentData.totalCarrez);
  bindText("totalNonCarrez", apartmentData.totalNonCarrez);

  document.querySelectorAll("[data-phone-link]").forEach((el) => {
    el.setAttribute("href", `tel:${apartmentData.phoneLink}`);
    if (!el.classList.contains("btn")) el.textContent = apartmentData.phoneDisplay;
  });

  document.querySelectorAll("[data-email-link]").forEach((el) => {
    el.setAttribute("href", `mailto:${apartmentData.email}`);
    if (!el.classList.contains("btn")) el.textContent = apartmentData.email;
  });

  document.querySelectorAll("[data-pdf-link]").forEach((el) => {
    el.setAttribute("href", apartmentData.pdfPath);
  });

  const mapFrame = document.querySelector("[data-map-src]");
  if (mapFrame) mapFrame.src = apartmentData.mapEmbedUrl;
}

function initMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  window.addEventListener("scroll", () => {
    button.classList.toggle("show", window.scrollY > 420);
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function renderPreviewPhotos() {
  const previewGrid = document.getElementById("preview-grid");
  if (!previewGrid) return;

  previewGrid.innerHTML = apartmentData.previewPhotos
    .map(
      (photo) => `
        <a href="galerie.html" class="preview-card" aria-label="Voir la galerie complète">
          <div class="preview-media">
            <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
          </div>
          <div class="preview-caption">${photo.caption}</div>
        </a>
      `
    )
    .join("");
}

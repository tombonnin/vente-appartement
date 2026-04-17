document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  initLightbox();
});

let currentPhotoIndex = 0;

function renderGallery() {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = apartmentData.galleryPhotos
    .map(
      (photo, index) => `
        <article class="gallery-card gallery-classic" data-index="${index}" tabindex="0" role="button" aria-label="Ouvrir l'image ${index + 1}">
          <div class="gallery-media">
            <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
          </div>
          <div class="gallery-caption">${photo.caption}</div>
        </article>
      `
    )
    .join("");
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeButton = document.getElementById("lightbox-close");
  const prevButton = document.getElementById("lightbox-prev");
  const nextButton = document.getElementById("lightbox-next");

  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  const openLightbox = (index) => {
    currentPhotoIndex = index;
    const photo = apartmentData.galleryPhotos[currentPhotoIndex];
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightboxCaption.textContent = photo.caption;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const showNext = () => openLightbox((currentPhotoIndex + 1) % apartmentData.galleryPhotos.length);
  const showPrev = () => openLightbox((currentPhotoIndex - 1 + apartmentData.galleryPhotos.length) % apartmentData.galleryPhotos.length);

  const bindGalleryItems = () => {
    document.querySelectorAll(".gallery-card").forEach((item) => {
      const open = () => openLightbox(Number(item.dataset.index));
      item.addEventListener("click", open);
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
    });
  };

  bindGalleryItems();

  closeButton?.addEventListener("click", closeLightbox);
  nextButton?.addEventListener("click", showNext);
  prevButton?.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrev();
  });
}

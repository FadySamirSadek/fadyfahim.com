// Lightbox functionality
(function() {
  const lightboxLinks = document.querySelectorAll('.lightbox-link');

  if (lightboxLinks.length === 0) return;

  // Create lightbox overlay
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <div class="lightbox-content">
      <img src="" alt="">
      <p class="lightbox-caption"></p>
    </div>
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector('img');
  const caption = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');

  // Open lightbox
  lightboxLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      img.src = link.href;
      img.alt = link.dataset.caption || '';
      caption.textContent = link.dataset.caption || '';
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

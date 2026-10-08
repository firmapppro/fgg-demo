/**
 * TM HOLDING LLC — Interactive App & 3D Tilt Mechanics
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 3D Tilt for Central Monogram Crest
  const crestWrap = document.querySelector('.crest-interactive-wrap');
  const crestCard = document.querySelector('.crest-interactive-card');

  if (crestWrap && crestCard) {
    crestWrap.addEventListener('mousemove', (e) => {
      const rect = crestWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -16;
      const rotateY = ((x - centerX) / centerX) * 16;

      crestCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    crestWrap.addEventListener('mouseleave', () => {
      crestCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 2. Institutional Contact Modal
  const contactModal = document.getElementById('contact-modal');
  const openContactBtns = document.querySelectorAll('.js-open-contact');
  const closeContactBtn = document.getElementById('close-contact-modal');

  function openModal() {
    if (contactModal) {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (contactModal) {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openContactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeContactBtn) {
    closeContactBtn.addEventListener('click', closeModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // 3. Simple Form Submission Feedback
  const contactForm = document.getElementById('institutional-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'TRANSMITTING INQUIRY...';
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="text-align: center; padding: 24px 0;">
            <div style="width: 50px; height: 50px; margin: 0 auto 16px; border: 2px solid var(--gold-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="color: var(--gold-primary); font-size: 1.4rem;">OK</span>
            </div>
            <h4 style="font-family: var(--font-serif); font-size: 1.2rem; color: #FFFFFF; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 8px;">Inquiry Registered</h4>
            <p style="font-size: 0.82rem; color: var(--slate-silver); line-height: 1.6; max-width: 440px; margin: 0 auto;">
              Your corporate communication has been logged under QFC Compliance Protocol. Our Managing Directors will review OEM credentials within one business day.
            </p>
          </div>
        `;
      }, 900);
    });
  }
});

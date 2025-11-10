// Interaksi ringan untuk navigasi, form, modal, copy email
document.addEventListener('DOMContentLoaded', () => {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav if open
        mainNav.classList.remove('show');
      }
    });
  });

  // Contact form (no backend) — just simulate submit
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    alert(`Terima kasih, ${name}! Pesan Anda telah dikirim (simulasi).`);
    contactForm.reset();
  });

  // Copy email button
  const copyBtn = document.getElementById('copyEmail');
  const emailText = document.getElementById('emailText').textContent.trim();
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      copyBtn.textContent = 'Disalin!';
      setTimeout(()=> copyBtn.textContent = 'Salin email', 2000);
    } catch (err) {
      alert('Gagal menyalin email. Silakan salin manual: ' + emailText);
    }
  });

  // Download CV button (demo: generate simple text file)
  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener('click', () => {
    const content = `CV - [Nama Anda]\n\nRingkasan:\n- Web developer\n- Keahlian: HTML, CSS, JS\n`;
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV-[NamaAnda].txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // Simple modal for project details
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalInner = document.getElementById('modalInner');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      openModalWithProject(btn.closest('.project-card'));
    });
  });

  function openModalWithProject(card){
    const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Detail';
    const desc = card.querySelector('p')?.textContent || '';
    modalInner.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(desc)}</p><p>Teknologi: HTML, CSS, JS</p>`;
    modalBackdrop.classList.remove('hidden');
    modalBackdrop.setAttribute('aria-hidden','false');
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  function closeModal(){
    modalBackdrop.classList.add('hidden');
    modalBackdrop.setAttribute('aria-hidden','true');
    modalInner.innerHTML = '';
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

});
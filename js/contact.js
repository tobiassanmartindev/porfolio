export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const btn = form.querySelector('.contact-form__submit');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (form.elements['name'].value || '').trim();
    const email = (form.elements['email'].value || '').trim();
    const msg = (form.elements['message'].value || '').trim();

    if (!name || !email || !msg) return;

    btn.classList.add('contact-form__submit--sent');
    btn.disabled = true;
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Enviado
    `;

    setTimeout(() => {
      form.reset();
      btn.classList.remove('contact-form__submit--sent');
      btn.disabled = false;
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Enviar mensaje
      `;
    }, 2800);
  });
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (form.elements['name'].value || '').trim();
    const email = (form.elements['email'].value || '').trim();
    const msg = (form.elements['message'].value || '').trim();

    const subject = encodeURIComponent('Contacto web — ' + (name || 'sin nombre'));
    const body = encodeURIComponent('Nombre: ' + name + '\nEmail: ' + email + '\n\n' + msg);

    window.location.href =
      'mailto:tobiassanmartin.work@gmail.com?subject=' + subject + '&body=' + body;
  });
}

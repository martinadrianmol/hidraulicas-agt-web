/* Hidráulicas AGT — interacciones del sitio */
(() => {
  // ===== CONFIGURACIÓN DE PRODUCCIÓN =====
  // Endpoint del formulario (p. ej. https://formspree.io/f/XXXXXXX). Vacío = envío por WhatsApp.
  const FORM_ENDPOINT = '';
  const WHATSAPP_NUMBER = '573103331124';

  // Año en el footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header: fondo translúcido al hacer scroll
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menú móvil
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const setMenu = (open) => {
    menu.dataset.open = String(open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setMenu(menu.dataset.open !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

  // Revelado al hacer scroll (una sola vez por elemento)
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Escalonado suave para los chips de clientes
  document.querySelectorAll('#clients li').forEach((li, i) => li.style.setProperty('--d', `${i * 35}ms`));

  // ===== Formulario de contacto =====
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const btn = form.querySelector('button[type="submit"]');

  const showStatus = (msg, ok) => {
    status.textContent = msg;
    status.className = `rounded-xl px-4 py-3 text-sm ${ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`;
  };

  const validate = () => {
    let valid = true;
    form.querySelectorAll('input, textarea').forEach((field) => {
      const err = field.type === 'checkbox'
        ? form.querySelector(`[data-for="${field.name}"]`)
        : field.parentElement.querySelector('.field-error');
      const ok = field.type === 'checkbox' ? field.checked : field.value.trim() !== '' && field.checkValidity();
      if (err) err.classList.toggle('hidden', ok);
      field.setAttribute('aria-invalid', String(!ok));
      if (!ok) valid = false;
    });
    return valid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));

    if (!FORM_ENDPOINT) {
      const text = `Hola Hidráulicas AGT, quiero solicitar una cotización.%0A%0A` +
        `*Nombre:* ${encodeURIComponent(data.nombre)}%0A*Correo:* ${encodeURIComponent(data.email)}%0A` +
        `*Teléfono:* ${encodeURIComponent(data.telefono)}%0A*Mensaje:* ${encodeURIComponent(data.mensaje)}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
      showStatus('Abrimos WhatsApp con su solicitud lista para enviar.', true);
      form.reset();
      return;
    }

    btn.disabled = true;
    btn.querySelector('.btn-label').textContent = 'Enviando…';
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      showStatus('¡Gracias! Recibimos su solicitud y le contactaremos pronto.', true);
      form.reset();
    } catch {
      showStatus('No pudimos enviar el formulario. Intente de nuevo o escríbanos por WhatsApp.', false);
    } finally {
      btn.disabled = false;
      btn.querySelector('.btn-label').textContent = 'Enviar solicitud';
    }
  });
})();

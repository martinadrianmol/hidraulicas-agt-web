/* Hidráulicas AGT — interacciones y animaciones del sitio */
(() => {
  // ===== CONFIGURACIÓN DE PRODUCCIÓN =====
  // Endpoint del formulario (p. ej. https://formspree.io/f/XXXXXXX). Vacío = envío por WhatsApp.
  const FORM_ENDPOINT = '';
  const WHATSAPP_NUMBER = '573103331124';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  $('#year').textContent = new Date().getFullYear();

  // Si una foto externa no carga, se oculta y queda el degradado de marca de fondo
  $$('img').forEach((img) => {
    const hide = () => { img.style.visibility = 'hidden'; };
    if (img.complete && img.naturalWidth === 0 && img.src) hide();
    img.addEventListener('error', hide);
  });

  // ---------- Titular del hero: dividir en palabras ----------
  let wordIndex = 0;
  $$('[data-split] .split-line').forEach((line) => {
    const words = line.textContent.trim().split(/\s+/);
    line.innerHTML = words
      .map((w) => `<span class="split-word" style="--i:${wordIndex++}">${w}</span>`)
      .join(' ');
  });

  // ---------- Marquesina: duplicar contenido para bucle continuo ----------
  $$('[data-marquee]').forEach((track) => {
    [...track.children].forEach((li) => {
      const clone = li.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });

  // ---------- Header, barra de progreso, parallax y tubería (un solo rAF) ----------
  const header = $('#site-header');
  const progress = $('#scroll-progress');
  const parallaxEls = reduceMotion ? [] : $$('[data-parallax]');
  const pipe = $('#pipe');
  const pipeFill = $('#pipe-fill');
  const pipeSteps = $$('.pipe-step');
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;

    header.classList.toggle('scrolled', y > 24);
    const menuOpen = $('#mobile-menu').dataset.open === 'true';
    header.classList.toggle('hidden-up', !menuOpen && y > 400 && y > lastY + 4);
    if (y < lastY - 4) header.classList.remove('hidden-up');
    lastY = y;

    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    parallaxEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${-offset}px, 0)`;
    });

    if (pipe && !reduceMotion) {
      const r = pipe.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      pipeFill.style.transform = `scaleY(${p})`;
      pipeSteps.forEach((step) => {
        const sr = step.getBoundingClientRect();
        const on = sr.top + 18 < vh * 0.6;
        step.classList.toggle('on', on);
        step.querySelector('.pipe-node').classList.toggle('on', on);
      });
    }
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
  if (reduceMotion) $$('.pipe-step, .pipe-node').forEach((el) => el.classList.add('on'));

  // ---------- Menú móvil ----------
  const menuBtn = $('#menu-btn');
  const menu = $('#mobile-menu');
  const setMenu = (open) => {
    menu.dataset.open = String(open);
    menuBtn.setAttribute('aria-expanded', String(open));
    if (open) header.classList.remove('hidden-up');
  };
  menuBtn.addEventListener('click', () => setMenu(menu.dataset.open !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

  // ---------- Revelado al hacer scroll + contadores ----------
  const animateCount = (el) => {
    const target = el.dataset.fromYear
      ? new Date().getFullYear() - parseInt(el.dataset.fromYear, 10)
      : parseInt(el.dataset.count, 10);
    if (reduceMotion) { el.textContent = target; return; }
    const duration = 1600;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = Math.round(easeOut(t) * target);
      if (t < 1) requestAnimationFrame(step);
    };
    el.textContent = '0';
    requestAnimationFrame(step);
  };

  const revealables = $$('.reveal, .reveal-clip');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        $$('[data-count]', entry.target).forEach(animateCount);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealables.forEach((el) => io.observe(el));

    // Enlace activo en la navegación
    const links = $$('#site-header ul .nav-link');
    const sectionIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((l) => { const s = $(l.getAttribute('href')); if (s) sectionIO.observe(s); });
  } else {
    revealables.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Pestañas Misión / Visión / Valores ----------
  const tabs = $$('.tab');
  const indicator = $('#tab-indicator');
  const moveIndicator = (tab) => {
    indicator.style.width = `${tab.offsetWidth}px`;
    indicator.style.transform = `translateX(${tab.offsetLeft - 4}px)`;
  };
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.classList.toggle('text-navy-900', on);
        t.classList.toggle('text-navy-500', !on);
        const panel = $(`#${t.getAttribute('aria-controls')}`);
        panel.hidden = !on;
        if (on && !reduceMotion) {
          panel.animate(
            [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
            { duration: 280, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
          );
        }
      });
      moveIndicator(tab);
    });
  });
  const initIndicator = () => moveIndicator($('.tab[aria-selected="true"]'));
  document.fonts?.ready.then(initIndicator);
  initIndicator();
  window.addEventListener('resize', initIndicator);

  // ---------- Efectos de puntero (solo mouse) ----------
  if (finePointer && !reduceMotion) {
    // Foco de luz que sigue al cursor en las tarjetas de servicio
    $$('.service-card').forEach((card) => {
      const spot = $('.spotlight', card);
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });

    // Botones magnéticos
    $$('[data-magnetic]').forEach((btn) => {
      btn.style.transition = 'transform .4s cubic-bezier(0.23, 1, 0.32, 1), background-color .2s ease';
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  // ---------- Formulario de contacto ----------
  const form = $('#contact-form');
  const status = $('#form-status');
  const btn = $('button[type="submit"]', form);

  const showStatus = (msg, ok) => {
    $('.status-text', status).textContent = msg;
    status.className = `flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${ok ? 'is-success bg-aqua-50 text-aqua-700' : 'bg-red-50 text-red-700'}`;
    if (!reduceMotion) {
      status.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }],
        { duration: 300, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    }
  };

  const validate = () => {
    let valid = true;
    $$('input, textarea', form).forEach((field) => {
      const err = field.type === 'checkbox'
        ? $(`[data-for="${field.name}"]`, form)
        : $('.field-error', field.parentElement);
      const ok = field.type === 'checkbox' ? field.checked : field.value.trim() !== '' && field.checkValidity();
      err?.classList.toggle('hidden', ok);
      field.setAttribute('aria-invalid', String(!ok));
      if (!ok) valid = false;
    });
    if (!valid && !reduceMotion) {
      $('#form-card').animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }],
        { duration: 320, easing: 'cubic-bezier(0.77, 0, 0.175, 1)' }
      );
    }
    return valid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) {
      $('[aria-invalid="true"]', form)?.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));

    if (!FORM_ENDPOINT) {
      const text = encodeURIComponent(
        `Hola Hidráulicas AGT, quiero solicitar una cotización.\n\n` +
        `*Nombre:* ${data.nombre}\n*Correo:* ${data.email}\n*Teléfono:* ${data.telefono}\n*Mensaje:* ${data.mensaje}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
      showStatus('Abrimos WhatsApp con su solicitud lista para enviar.', true);
      form.reset();
      return;
    }

    btn.disabled = true;
    $('.btn-label', btn).textContent = 'Enviando…';
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
      $('.btn-label', btn).textContent = 'Enviar solicitud';
    }
  });
})();

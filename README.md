# Hidráulicas AGT — Sitio web corporativo

Sitio estático de una sola página (HTML5 + Tailwind CSS + JavaScript puro). El CSS ya viene compilado: funciona sin instalar nada.

## Estructura

```
index.html              Página completa
assets/css/styles.css   CSS compilado (no editar a mano)
assets/js/main.js       Menú, header, animaciones, contadores, pestañas, formulario
assets/img/             Logo (versión azul y blanca) e ícono
src/input.css           Fuente de estilos + sistema de animaciones
tailwind.config.js      Paleta de marca y tipografías
```

## Identidad visual

| Token | Color | Uso |
|---|---|---|
| `navy-900` | `#15213F` | Azul marino del logo: fondos oscuros, títulos, botones secundarios |
| `navy-950` | `#0B1329` | Hero y footer |
| `aqua-500` | `#2B7DE9` | Acento (botones principales, detalles) |
| `aqua-300` | `#84BDFF` | Acento sobre fondo oscuro |

Tipografías: Montserrat (títulos, igual que el logo) e Inter (texto).

## Animaciones

Todas usan solo `transform`, `opacity` o `clip-path`, con curvas *ease-out* fuertes. Los efectos de hover solo se activan con mouse, y con "reducir movimiento" activado en el sistema se muestran versiones suaves.

- Hero: titular que aparece palabra por palabra, zoom lento de la foto, gota de agua que cae del grifo con ondas, olas animadas y parallax.
- Barra de progreso de lectura; el header se oculta al bajar y reaparece al subir.
- Contadores animados (años calculados automáticamente desde 2016).
- Imagen con revelado tipo cortina; pestañas Misión/Visión/Valores con indicador deslizante.
- Tarjetas de servicio: elevación, zoom de imagen, ícono que gira y foco de luz que sigue al cursor.
- "Cómo operamos": una tubería se llena de agua a medida que se hace scroll y activa cada paso.
- Marquesina doble de clientes (se pausa al pasar el mouse).
- Botones magnéticos con brillo; vibración del formulario si hay errores y check animado al enviar.

## Ver en local

Abrir `index.html` en el navegador, o servir con `python3 -m http.server`.

## Publicar en GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.

## Si cambia estilos

```
npm install
npm run build     # o: npm run dev  (recompila al guardar)
```

## Pendientes antes de producción

Busque los comentarios en mayúsculas dentro de `index.html` (`IMAGEN`, `CLIENTES`, `MAPA`, `REDES`, `LEGALES`, `PRODUCCIÓN`).

| Qué | Acción |
|---|---|
| Fotos | Hoy son de Unsplash (licencia gratuita), alojadas en `assets/img/` en formato WebP (~860 KB en total). Ideal: reemplazar por fotos propias profesionales de obra |
| Logo | Si existe en vector (SVG/AI), reemplazar los PNG de `assets/img/` |
| Logos de clientes | Reemplazar nombres por logos, con autorización |
| Testimonios | No hay en la documentación; añadir solo reales y autorizados |
| Formulario | `assets/js/main.js` → `FORM_ENDPOINT` (p. ej. Formspree). Sin endpoint, envía por WhatsApp |
| Redes sociales | Reemplazar `href="#"` en el footer |
| Política de datos | Publicar política (Ley 1581 de 2012) y enlazarla |
| Dominio / Open Graph | Reemplazar `TU-DOMINIO.com` en el `<head>` |
| Mapa | Usar el embed de la ficha de Google Business |
| Dirección | Confirmar: el portafolio dice Cra 45A # 129A-04; la Cámara de Comercio, Autopista Norte # 131-45 Piso 3 (la usada) |

## Créditos de imágenes (Unsplash)

Usadas bajo la licencia de Unsplash. IDs: `photo-1583841668932-a7c3250a6e37` (hero), `photo-1759542878135-bc80368e74ef` (nosotros), `photo-1686772989910-da2e602b9854`, `photo-1693907986952-3cd372e4c9d8`, `photo-1526898943670-92bfa9f94c12`, `photo-1790767900100-249b668f9a4b`, `photo-1706712637075-f47fb47548f2`, `photo-1686772553688-92fa864cae8a` (servicios), `photo-1735754334934-ebf19271f2b4` (llamado a la acción).

## Datos usados

Contenido tomado exclusivamente del portafolio de servicios y de la información comercial pública del registro mercantil. No se publican datos financieros, de capital ni de identificación personal.

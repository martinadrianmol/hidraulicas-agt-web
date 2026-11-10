# Hidráulicas AGT — Sitio web corporativo

Sitio estático de una sola página (HTML5 + Tailwind CSS + JavaScript puro). El CSS ya viene compilado: funciona sin instalar nada.

## Estructura

```
index.html            Página completa (header, hero, nosotros, servicios, diferencial, proyectos, contacto, footer)
assets/js/main.js     Menú móvil, header al hacer scroll, animaciones de revelado, formulario
assets/img/           Logo y fotos de obra (extraídas del portafolio)
```

## Ver en local

Abrir `index.html` en el navegador, o servirlo con `python3 -m http.server`.

## Publicar en GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.

## Pendientes antes de producción

Busque los comentarios en mayúsculas dentro de `index.html` (`LOGO`, `IMAGEN`, `GALERÍA`, `CLIENTES`, `MAPA`, `REDES`, `LEGALES`, `PRODUCCIÓN`).

| Qué | Dónde | Acción |
|---|---|---|
| Logo | `assets/img/logo-agt.png` | Reemplazar por versión vectorial (SVG) |
| Foto hero | `assets/img/flota-equipos.jpg` | Foto ≥1920 px de ancho; las actuales vienen del PDF y son de baja resolución |
| Galería | sección `#proyectos` | Añadir fotos reales de obras (1200×900, .webp) |
| Logos de clientes | sección `#proyectos` | Reemplazar nombres por logos con autorización |
| Testimonios | sección `#proyectos` | No hay en la documentación; añadir solo testimonios reales autorizados |
| Formulario | `assets/js/main.js` → `FORM_ENDPOINT` | Crear un formulario en Formspree (u otro) y pegar la URL. Sin endpoint, envía por WhatsApp |
| Redes sociales | footer | Reemplazar `href="#"` |
| Política de datos | footer y formulario | Publicar política Ley 1581 de 2012 y enlazarla |
| Dominio / Open Graph | `<head>` | Reemplazar `TU-DOMINIO.com` |
| Mapa | sección `#contacto` | Usar el embed de la ficha de Google Business |
| Estilos | `assets/css/styles.css` | Si cambia clases en el HTML, ejecutar `npm install` y `npm run build` |

## Datos usados

Contenido tomado exclusivamente del portafolio de servicios y de la información comercial pública del registro mercantil (razón social, NIT, dirección y correo comerciales, año de constitución). No se publican datos financieros, de capital ni de identificación personal.

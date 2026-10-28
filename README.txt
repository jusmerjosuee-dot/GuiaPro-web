GUÍAPRO PARA IPHONE - PWA v0.4.7

Este paquete es para publicar en un sitio HTTPS. NO basta con enviar index.html para instalarlo como PWA.

PUBLICACIÓN (repositorio público separado, sin secretos):
1. Crear repositorio público NUEVO para la versión web. No reutilizar el repositorio privado de Android.
2. Subir el CONTENIDO de esta carpeta a la raíz del repositorio: index.html, sw.js, manifest.webmanifest y carpeta icons/.
3. Activar GitHub Pages desde Settings > Pages > Deploy from a branch > main > /(root).
4. Abrir la URL HTTPS que indique GitHub Pages en Safari en iPhone.
5. Safari > Compartir > Añadir a pantalla de inicio > Añadir.
6. Abrir GuíaPro desde el nuevo icono, probar registro, cierre y reapertura.
7. Probar modo avión DESPUÉS de abrir una vez con internet.
8. Exportar respaldo JSON y verificar que se pueda restaurar.

ADVERTENCIAS:
- Datos locales por navegador/origen; no se sincronizan con Android.
- La PWA debe instalarse desde Safari. Un archivo HTML local no habilita service workers.
- La información y el respaldo JSON no están cifrados; no usar datos reales hasta comprobar retención y exportación.
- Si se cambia el dominio o se borra la app/datos del navegador se pueden perder registros.
- Publicar el código HTML de GuíaPro en repositorio público lo hace visible; no publicar contraseñas, datos de pasajeros ni claves de firma.
- No modificar ni publicar el repositorio Android privado o sus secretos.

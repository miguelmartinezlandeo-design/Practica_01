# AGENTS.md — Diario de Estudio 
A ver, es una web estática. Dónde vamos a poder Registrar las tareas que hacemos Según las fechas seleccionadas.

## Memoria
- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones
tomadas.
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su
porqué) y errores a evitar.
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de
dejarlo en la memoria.
- No guardes nunca datos sensibles (claves, tokens, datos personales)

## Stack y estructura
- Vamos a utilizar código simple y. Básico para que podamos entenderlos
- Utilizaremos una página HTML, un archivo JS. Y un archivo CSS
- No vamos A utilizar módulos Y el archivo se va Abrir con doble clic
- No vamos a utilizar nada que se necesite un servidor. 

## Convenciones 
- Vamos a utilizar texto en español
- Vamos a utilizar código legible e interpretable Y comentarios Sí, es un código un poquito más difícil o complejo. 
- Debe verse bien en el móvil Utilizar responsive.

## Datos 
- localStorage, clave `diario-estudio-sesiones`: array de `{ date: "AAAA-MM-DD", topic,
minutes }`. 
- Si cambias las formas de los datos. Que sea coherente con lo que ya está guardado O que sea compatible con ello Y si no, que se cierre sesión

## Fechas y racha (fácil equivocarse)
- Trabaja siempre con la fecha local del usuario. Nunca uses `toISOString()` ni `new
Date("AAAA-MM-DD")`: se interpretan en UTC y desplazan el día.
- Racha = días consecutivos con al menos 1 sesión que terminan hoy. Si hoy no hay sesión
pero ayer sí, la racha sigue viva y se cuenta desde ayer.
- Varias sesiones el mismo día cuentan como un solo día. Las fechas futuras no suman.

## Forma de trabajar
- Haz solo lo que se pide: no añadas funcionalidades por tu cuenta.
- Cambios pequeños y enfocados; no reescribas lo que ya funciona.
- Al terminar, resume qué has cambiado y cualquier decisión que deba revisar.

## Límites
- ✅ Siempre: respetar las reglas de fechas y racha, mantener los textos en español.
- ⚠️ Pregunta antes: crear archivos nuevos, cambiar el formato de los datos guardados.
- 🚫 Nunca: añadir dependencias, frameworks o un paso de build.
- Siempre: Actualizar MEMORY.md al terminar una tarea

## Verificación
- No hay tests ni lint. Probar abriendo `index.html` en el navegador.
- Para empezar de cero: DevTools → Application → Local Storage → borrar la clave
`diario-estudio-sesiones`

# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1 funcionando: registrar sesiones (fecha, tema, minutos), racha actual 🔥 y lista de sesiones de más reciente a más antigua.
- Datos en localStorage, clave `diario-estudio-sesiones`.
- Migración automática desde la clave vieja `diario-de-estudio-sesiones` (pedida por el
usuario); se ejecuta al cargar y borra la clave vieja.

## Decisiones (y por qué)
- Sin backend ni dependencias: cualquiera debe poder abrirlo con doble clic.
- Fecha editable en el formulario: permite registrar días pasados y ver la racha crecer.
- Formato de datos `{ date, topic, minutes }` (especificado en AGENTS.md); la versión
previa usaba `{ fecha, tema, minutos }` y se migra.
- La fecha futura se permite en el formulario pero no suma a la racha.

## Aprendizajes y errores a evitar
- No ejecutar una función antes de declarar sus `const` (aunque la función esté
declarada): rompía toda la página con `ReferenceError` al migrar los datos.
- Nunca `toISOString()` ni `new Date("AAAA-MM-DD")`: usan UTC y desplazan el día.
- Probar la migración simulando localStorage, no solo con lectura de código.

## Próximos pasos
- (pendiente de que el usuario pida la siguiente funcionalidad)

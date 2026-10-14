const CLAVE_STORAGE = "diario-estudio-sesiones";
// Clave de la primera versión de la web, para migrar los datos viejos.
const CLAVE_STORAGE_VIEJA = "diario-de-estudio-sesiones";

const formulario = document.getElementById("formulario-sesion");
const campoFecha = document.getElementById("fecha");
const campoTema = document.getElementById("tema");
const campoMinutos = document.getElementById("minutos");
const mensajeError = document.getElementById("mensaje-error");
const listaSesiones = document.getElementById("lista-sesiones");
const listaVacia = document.getElementById("lista-vacia");
const rachaDias = document.getElementById("racha-dias");

migrarDatosViejos();

let sesiones = cargarSesiones();

// La fecha de hoy se calcula con el reloj local del usuario (getMonth/getDate),
// nunca con toISOString(), porque eso usaría la hora UTC y podría cambiar de día.
campoFecha.value = fechaDeHoy();

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  mostrarError("");

  const minutos = Number(campoMinutos.value);

  if (!campoTema.value.trim()) {
    mostrarError("El tema es obligatorio.");
    return;
  }

  if (!Number.isFinite(minutos) || minutos <= 0) {
    mostrarError("Los minutos tienen que ser un número mayor que 0.");
    return;
  }

  sesiones.push({
    date: campoFecha.value,
    topic: campoTema.value.trim(),
    minutes: minutos
  });

  guardarSesiones();
  formulario.reset();
  campoFecha.value = fechaDeHoy();
  pintar();
});

// Devuelve la fecha como texto "AAAA-MM-DD" según el calendario local.
function fechaDeHoy() {
  return formatearFecha(new Date());
}

function formatearFecha(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return anio + "-" + mes + "-" + dia;
}

// Devuelve el día anterior a un texto "AAAA-MM-DD".
// Se construye la fecha con números (año, mes, día) para que JS use la zona
// horaria local. new Date("AAAA-MM-DD") se interpretaría en UTC y desplazaría el día.
function fechaAnterior(fechaTexto) {
  const partes = fechaTexto.split("-");
  const fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  fecha.setDate(fecha.getDate() - 1);
  return fecha;
}

// Si quedan datos de la primera versión, se pasan al formato nuevo y se borra la clave vieja.
function migrarDatosViejos() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE_VIEJA);
    if (!guardado) {
      return;
    }

    const viejas = JSON.parse(guardado);
    if (Array.isArray(viejas)) {
      const nuevas = viejas
        .filter(function (sesion) {
          return sesion && sesion.fecha && sesion.tema;
        })
        .map(function (sesion) {
          return {
            date: sesion.fecha,
            topic: sesion.tema,
            minutes: Number(sesion.minutos)
          };
        });

      if (nuevas.length > 0) {
        const actuales = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || "[]");
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(actuales.concat(nuevas)));
      }
    }

    localStorage.removeItem(CLAVE_STORAGE_VIEJA);
  } catch (error) {
    // Si los datos viejos están rotos, se ignoran y se borran.
    localStorage.removeItem(CLAVE_STORAGE_VIEJA);
  }
}

function cargarSesiones() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    if (!guardado) {
      return [];
    }
    const datos = JSON.parse(guardado);
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    return [];
  }
}

function guardarSesiones() {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(sesiones));
}

function mostrarError(texto) {
  mensajeError.textContent = texto;
  mensajeError.hidden = texto === "";
}

// La racha son días consecutivos con sesión que terminan hoy.
// Si hoy todavía no hay sesión pero ayer sí, la racha sigue viva y empieza en ayer.
// Solo se camina hacia atrás desde hoy, así que las fechas futuras nunca suman.
function calcularRacha() {
  const fechasConSesion = new Set(sesiones.map(function (sesion) {
    return sesion.date;
  }));

  let diaActual = fechaDeHoy();

  if (!fechasConSesion.has(diaActual)) {
    diaActual = formatearFecha(fechaAnterior(diaActual));
    if (!fechasConSesion.has(diaActual)) {
      return 0;
    }
  }

  let racha = 0;
  while (fechasConSesion.has(diaActual)) {
    racha++;
    diaActual = formatearFecha(fechaAnterior(diaActual));
  }
  return racha;
}

function pintarLista() {
  listaSesiones.innerHTML = "";

  if (sesiones.length === 0) {
    listaVacia.hidden = false;
    listaSesiones.hidden = true;
    return;
  }

  // De más reciente a más antigua: "AAAA-MM-DD" se compara bien con localeCompare.
  const ordenadas = sesiones.slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  ordenadas.forEach(function (sesion) {
    const item = document.createElement("li");

    const izquierda = document.createElement("span");
    izquierda.innerHTML = "<strong>" + escaparHtml(sesion.topic) + "</strong><br>" +
      '<span class="sesion-fecha">' + sesion.date + "</span>";

    const minutos = document.createElement("span");
    minutos.className = "sesion-minutos";
    minutos.textContent = sesion.minutes + " min";

    item.appendChild(izquierda);
    item.appendChild(minutos);
    listaSesiones.appendChild(item);
  });

  listaVacia.hidden = true;
  listaSesiones.hidden = false;
}

// El texto escrito por el usuario se escapa antes de meterlo en el HTML.
function escaparHtml(texto) {
  const divisor = document.createElement("div");
  divisor.textContent = texto;
  return divisor.innerHTML;
}

function pintar() {
  rachaDias.textContent = calcularRacha();
  pintarLista();
}

pintar();

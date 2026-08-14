let metodoActual = null;

let gramosCafe = 20;
let ratioActual = 16;

let pasoActual = 0;

let temporizador = null;
let temporizadorCorriendo = false;
let segundosRestantes = 0;

let wakeLock = null;


// ================================
// ELEMENTOS
// ================================

const vistaInicio =
    document.getElementById("vista-inicio");

const vistaPreparacion =
    document.getElementById("vista-preparacion");

const vistaGuiada =
    document.getElementById("vista-guiada");

const vistaFinal =
    document.getElementById("vista-final");


const listaMetodos =
    document.getElementById("lista-metodos");

const metodoNombre =
    document.getElementById("metodo-nombre");

const metodoCategoria =
    document.getElementById("metodo-categoria");

const metodoDescripcion =
    document.getElementById("metodo-descripcion");

const metodoTemperatura =
    document.getElementById("metodo-temperatura");

const metodoMolienda =
    document.getElementById("metodo-molienda");

const cantidadCafe =
    document.getElementById("cantidad-cafe");

const cantidadAgua =
    document.getElementById("cantidad-agua");

const opcionesIntensidad =
    document.getElementById("opciones-intensidad");


const pasoIndicador =
    document.getElementById("paso-indicador");

const metodoGuiado =
    document.getElementById("metodo-guiado");

const barraProgresoActiva =
    document.getElementById("barra-progreso-activa");

const pasoNombre =
    document.getElementById("paso-nombre");

const pasoInstruccion =
    document.getElementById("paso-instruccion");

const timerGuiado =
    document.getElementById("timer-guiado");

const btnControlTimer =
    document.getElementById("btn-control-timer");

const btnSiguientePaso =
    document.getElementById("btn-siguiente-paso");


const resumenMetodo =
    document.getElementById("resumen-metodo");

const resumenCafe =
    document.getElementById("resumen-cafe");

const resumenAgua =
    document.getElementById("resumen-agua");


// ================================
// NAVEGACIÓN
// ================================

function mostrarVista(vista) {

    document
        .querySelectorAll(".vista")
        .forEach(elemento => {
            elemento.classList.remove("activa");
        });

    vista.classList.add("activa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ================================
// HOME
// ================================

function cargarMetodos() {

    listaMetodos.innerHTML = "";

    Object.values(METODOS).forEach(metodo => {

        const boton =
            document.createElement("button");

        boton.className =
            "tarjeta-metodo";

        boton.innerHTML = `
            <div>
                <span class="metodo-tipo">
                    ${metodo.subtitulo}
                </span>

                <strong>
                    ${metodo.nombre}
                </strong>
            </div>

            <span class="flecha">
                →
            </span>
        `;

        boton.addEventListener(
            "click",
            () => abrirMetodo(metodo.id)
        );

        listaMetodos.appendChild(boton);

    });

}


// ================================
// MÉTODO
// ================================

function abrirMetodo(idMetodo) {

    metodoActual =
        METODOS[idMetodo];

    gramosCafe =
        metodoActual.cafeDefault;

    ratioActual =
        metodoActual.ratioDefault;

    metodoNombre.textContent =
        metodoActual.nombre;

    metodoCategoria.textContent =
        metodoActual.subtitulo.toUpperCase();

    metodoDescripcion.textContent =
        metodoActual.descripcion;

    metodoTemperatura.textContent =
        metodoActual.temperatura;

    metodoMolienda.textContent =
        metodoActual.molienda;

    cantidadCafe.textContent =
        gramosCafe;

    cargarRatios();

    calcularAgua();

    mostrarVista(vistaPreparacion);

}


// ================================
// RATIOS
// ================================

function cargarRatios() {

    opcionesIntensidad.innerHTML = "";

    metodoActual.ratios.forEach(opcion => {

        const boton =
            document.createElement("button");

        boton.className =
            "boton-ratio";

        boton.textContent =
            opcion.nombre;

        if (
            opcion.ratio ===
            metodoActual.ratioDefault
        ) {
            boton.classList.add("activo");
        }

        boton.addEventListener(
            "click",
            () => {

                ratioActual =
                    opcion.ratio;

                document
                    .querySelectorAll(".boton-ratio")
                    .forEach(btn => {
                        btn.classList.remove("activo");
                    });

                boton.classList.add("activo");

                calcularAgua();
            }
        );

        opcionesIntensidad.appendChild(
            boton
        );

    });

}


// ================================
// CAFÉ / AGUA
// ================================

function cambiarCafe(cantidad) {

    gramosCafe += cantidad;

    if (gramosCafe < 5) {
        gramosCafe = 5;
    }

    if (gramosCafe > 100) {
        gramosCafe = 100;
    }

    cantidadCafe.textContent =
        gramosCafe;

    calcularAgua();

}


function obtenerAguaTotal() {

    return Math.round(
        gramosCafe * ratioActual
    );

}


function obtenerAguaBloom() {

    const multiplicador =
        metodoActual?.parametros?.bloomMultiplicador || 3;

    const bloom =
        gramosCafe * multiplicador;

    const aguaTotal =
        obtenerAguaTotal();

    return Math.min(
        Math.round(bloom),
        aguaTotal
    );

}


function obtenerAguaRestante() {

    return Math.max(
        obtenerAguaTotal() - obtenerAguaBloom(),
        0
    );

}


function calcularAgua() {

    cantidadAgua.textContent =
        obtenerAguaTotal();

}


// ================================
// INSTRUCCIONES DINÁMICAS
// ================================

function obtenerInstruccionPaso(paso) {

    if (paso.agua === "bloom") {

        const aguaBloom =
            obtenerAguaBloom();

        return `Agrega ${aguaBloom} ml de agua y humedece uniformemente todo el café.`;

    }


    if (paso.agua === "restante") {

        const aguaRestante =
            obtenerAguaRestante();

        return `Agrega lentamente los ${aguaRestante} ml de agua restantes.`;

    }


    if (paso.agua === "total") {

        const aguaTotal =
            obtenerAguaTotal();

        return `Agrega ${aguaTotal} ml de agua.`;

    }


    return paso.instruccion || "";

}


// ================================
// WAKE LOCK
// ================================

async function solicitarWakeLock() {

    try {

        if ("wakeLock" in navigator) {

            if (!wakeLock) {

                wakeLock =
                    await navigator.wakeLock.request(
                        "screen"
                    );

            }

        }

    } catch (error) {

        console.log(
            "Wake Lock no disponible:",
            error
        );

    }

}


async function liberarWakeLock() {

    try {

        if (wakeLock) {

            await wakeLock.release();

            wakeLock = null;

        }

    } catch (error) {

        console.log(error);

    }

}


// ================================
// PREPARACIÓN GUIADA
// ================================

function iniciarPreparacion() {

    if (!metodoActual) {
        return;
    }

    if (
        !metodoActual.pasos ||
        metodoActual.pasos.length === 0
    ) {

        alert(
            "La preparación guiada de este método estará disponible próximamente."
        );

        return;
    }

    pasoActual = 0;

    metodoGuiado.textContent =
        metodoActual.nombre.toUpperCase();

    solicitarWakeLock();

    cargarPaso();

    mostrarVista(vistaGuiada);

}


// ================================
// CARGAR PASO
// ================================

function cargarPaso() {

    detenerTemporizador();

    const pasos =
        metodoActual.pasos;

    const paso =
        pasos[pasoActual];

    pasoIndicador.textContent =
        `PASO ${pasoActual + 1} DE ${pasos.length}`;

    const porcentaje =
        ((pasoActual + 1) / pasos.length) * 100;

    barraProgresoActiva.style.width =
        `${porcentaje}%`;

    pasoNombre.textContent =
        paso.nombre;

    pasoInstruccion.textContent =
        obtenerInstruccionPaso(paso);


    if (paso.tipo === "timer") {

        segundosRestantes =
            paso.tiempo;

        timerGuiado.style.display =
            "block";

        btnControlTimer.style.display =
            "block";

        btnSiguientePaso.style.display =
            "none";

        btnControlTimer.textContent =
            "INICIAR PASO";

        actualizarDisplayTimer();

    } else {

        timerGuiado.style.display =
            "none";

        btnControlTimer.style.display =
            "none";

        btnSiguientePaso.style.display =
            "block";

        btnSiguientePaso.textContent =
            pasoActual === pasos.length - 1
                ? "TERMINAR PREPARACIÓN"
                : "CONTINUAR";

    }

}


// ================================
// TEMPORIZADOR
// ================================

function iniciarTimerPaso() {

    if (temporizadorCorriendo) {

        pausarTemporizador();

        return;

    }

    temporizadorCorriendo = true;

    btnControlTimer.textContent =
        "PAUSAR";

    temporizador =
        setInterval(() => {

            segundosRestantes--;

            actualizarDisplayTimer();

            if (segundosRestantes <= 0) {

                detenerTemporizador();

                finalizarPasoTimer();

            }

        }, 1000);

}


function pausarTemporizador() {

    if (temporizador) {

        clearInterval(temporizador);

        temporizador = null;

    }

    temporizadorCorriendo =
        false;

    btnControlTimer.textContent =
        "REANUDAR";

}


function detenerTemporizador() {

    if (temporizador) {

        clearInterval(temporizador);

        temporizador = null;

    }

    temporizadorCorriendo =
        false;

}


// ================================
// DISPLAY TIMER
// ================================

function actualizarDisplayTimer() {

    const minutos =
        Math.floor(
            segundosRestantes / 60
        );

    const segundos =
        segundosRestantes % 60;

    timerGuiado.textContent =
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

}


// ================================
// PASO TERMINADO
// ================================

function finalizarPasoTimer() {

    if ("vibrate" in navigator) {

        navigator.vibrate([
            300,
            150,
            300
        ]);

    }

    timerGuiado.textContent =
        "00:00";

    btnControlTimer.style.display =
        "none";

    btnSiguientePaso.style.display =
        "block";

    btnSiguientePaso.textContent =
        pasoActual === metodoActual.pasos.length - 1
            ? "TERMINAR PREPARACIÓN"
            : "CONTINUAR";

}


// ================================
// AVANZAR
// ================================

function avanzarPaso() {

    if (
        pasoActual <
        metodoActual.pasos.length - 1
    ) {

        pasoActual++;

        cargarPaso();

    } else {

        finalizarPreparacion();

    }

}


// ================================
// FINAL
// ================================

function finalizarPreparacion() {

    detenerTemporizador();

    liberarWakeLock();

    resumenMetodo.textContent =
        metodoActual.nombre;

    resumenCafe.textContent =
        `${gramosCafe} g`;

    resumenAgua.textContent =
        `${obtenerAguaTotal()} ml`;

    mostrarVista(vistaFinal);

}


// ================================
// SALIR
// ================================

function salirPreparacion() {

    detenerTemporizador();

    liberarWakeLock();

    mostrarVista(vistaPreparacion);

}


// ================================
// EVENTOS
// ================================

document
    .getElementById("btn-volver")
    .addEventListener(
        "click",
        () => mostrarVista(vistaInicio)
    );


document
    .getElementById("btn-menos")
    .addEventListener(
        "click",
        () => cambiarCafe(-1)
    );


document
    .getElementById("btn-mas")
    .addEventListener(
        "click",
        () => cambiarCafe(1)
    );


document
    .getElementById("btn-preparar")
    .addEventListener(
        "click",
        iniciarPreparacion
    );


btnControlTimer.addEventListener(
    "click",
    iniciarTimerPaso
);


btnSiguientePaso.addEventListener(
    "click",
    avanzarPaso
);


document
    .getElementById("btn-salir-guiada")
    .addEventListener(
        "click",
        salirPreparacion
    );


document
    .getElementById("btn-volver-inicio")
    .addEventListener(
        "click",
        () => {

            metodoActual = null;

            mostrarVista(vistaInicio);

        }
    );


// ================================
// VISIBILIDAD / WAKE LOCK
// ================================

document.addEventListener(
    "visibilitychange",
    async () => {

        if (
            document.visibilityState === "visible" &&
            vistaGuiada.classList.contains("activa")
        ) {

            await solicitarWakeLock();

        }

    }
);


// ================================
// INICIO
// ================================

cargarMetodos();

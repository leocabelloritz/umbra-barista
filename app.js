let metodoActual = null;

let gramosCafe = 20;
let ratioActual = 16;

let pasoActual = 0;

let temporizador = null;
let temporizadorCorriendo = false;

let segundosRestantes = 0;
let segundosInicialesPaso = 0;

let wakeLock = null;


// =========================================
// VISTAS
// =========================================

const vistaMetodos =
    document.getElementById("vista-metodos");

const vistaDetalle =
    document.getElementById("vista-detalle");

const vistaGuia =
    document.getElementById("vista-guia");

const vistaFinal =
    document.getElementById("vista-final");

const vistaJournal =
    document.getElementById("vista-journal");


// =========================================
// DETALLE
// =========================================

const listaMetodos =
    document.getElementById("lista-metodos");

const detalleTipo =
    document.getElementById("detalle-tipo");

const detalleNombre =
    document.getElementById("detalle-nombre");

const detalleDescripcion =
    document.getElementById("detalle-descripcion");

const detalleCafe =
    document.getElementById("detalle-cafe");

const detalleAgua =
    document.getElementById("detalle-agua");

const detalleRatio =
    document.getElementById("detalle-ratio");

const detalleTemperatura =
    document.getElementById("detalle-temperatura");

const detalleMolienda =
    document.getElementById("detalle-molienda");

const cantidadCafe =
    document.getElementById("cantidad-cafe");

const opcionesIntensidad =
    document.getElementById("opciones-intensidad");

const listaPasosPreview =
    document.getElementById("lista-pasos-preview");


// =========================================
// GUÍA
// =========================================

const guiaMetodo =
    document.getElementById("guia-metodo");

const guideSummaryMain =
    document.getElementById("guide-summary-main");

const guideSummaryRatio =
    document.getElementById("guide-summary-ratio");

const pasoIndicador =
    document.getElementById("paso-indicador");

const pasoPorcentaje =
    document.getElementById("paso-porcentaje");

const barraProgresoActiva =
    document.getElementById("barra-progreso-activa");

const pasoNombre =
    document.getElementById("paso-nombre");

const pasoInstruccion =
    document.getElementById("paso-instruccion");

const objetivoPaso =
    document.getElementById("objetivo-paso");

const objetivoPasoValor =
    document.getElementById("objetivo-paso-valor");

const objetivoPasoEtiqueta =
    document.getElementById("objetivo-paso-etiqueta");

const timerGuiado =
    document.getElementById("timer-guiado");

const timerRingProgress =
    document.getElementById("timer-ring-progress");

const btnControlTimer =
    document.getElementById("btn-control-timer");

const btnSiguientePaso =
    document.getElementById("btn-siguiente-paso");


// =========================================
// FINAL
// =========================================

const resumenMetodo =
    document.getElementById("resumen-metodo");

const resumenCafe =
    document.getElementById("resumen-cafe");

const resumenAgua =
    document.getElementById("resumen-agua");

const resumenRatio =
    document.getElementById("resumen-ratio");


// =========================================
// NAV
// =========================================

const navMetodos =
    document.getElementById("nav-metodos");

const navGuia =
    document.getElementById("nav-guia");

const navJournal =
    document.getElementById("nav-journal");


// =========================================
// NAVEGACIÓN
// =========================================

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


function actualizarNav(nombre) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {
            item.classList.remove("activo");
        });


    if (nombre === "metodos") {
        navMetodos.classList.add("activo");
    }

    if (nombre === "guia") {
        navGuia.classList.add("activo");
    }

    if (nombre === "journal") {
        navJournal.classList.add("activo");
    }

}


// =========================================
// MÉTODOS
// =========================================

function cargarMetodos() {

    listaMetodos.innerHTML = "";


    Object.values(METODOS).forEach(metodo => {

        const agua =
            Math.round(
                metodo.cafeDefault *
                metodo.ratioDefault
            );


        const boton =
            document.createElement("button");


        boton.className =
            "tarjeta-metodo";


        boton.innerHTML = `

            <div class="metodo-grafico">
                <span>
                    ${
                        metodo.id === "v60"
                            ? "▽"
                            : metodo.id === "francesa"
                            ? "▥"
                            : metodo.id === "aeropress"
                            ? "┃"
                            : "◉"
                    }
                </span>
            </div>

            <div class="metodo-info">

                <span class="metodo-meta">
                    ${metodo.subtitulo} /
                </span>

                <strong>
                    ${metodo.nombre}
                </strong>

                <p>
                    ${metodo.descripcion}
                </p>

                <small>
                    1:${metodo.ratioDefault}
                    /
                    ${metodo.cafeDefault} g
                    /
                    ${agua} ml
                </small>

            </div>

            <span class="metodo-flecha">
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


// =========================================
// ABRIR MÉTODO
// =========================================

function abrirMetodo(idMetodo) {

    metodoActual =
        METODOS[idMetodo];


    gramosCafe =
        metodoActual.cafeDefault;


    ratioActual =
        metodoActual.ratioDefault;


    actualizarDetalle();

    cargarRatios();

    cargarPreviewPasos();


    mostrarVista(vistaDetalle);

    actualizarNav("metodos");

}


// =========================================
// DETALLE
// =========================================

function actualizarDetalle() {

    if (!metodoActual) {
        return;
    }


    detalleTipo.textContent =
        `${metodoActual.subtitulo.toUpperCase()} / MÉTODO`;


    detalleNombre.textContent =
        metodoActual.nombre;


    detalleDescripcion.textContent =
        metodoActual.descripcion;


    detalleCafe.textContent =
        `${gramosCafe} g`;


    detalleAgua.textContent =
        `${obtenerAguaTotal()} ml`;


    detalleRatio.textContent =
        `1:${ratioActual}`;


    detalleTemperatura.textContent =
        metodoActual.temperatura;


    detalleMolienda.textContent =
        metodoActual.molienda;


    cantidadCafe.textContent =
        gramosCafe;

}


// =========================================
// RATIOS
// =========================================

function cargarRatios() {

    opcionesIntensidad.innerHTML = "";


    metodoActual.ratios.forEach(opcion => {

        const boton =
            document.createElement("button");


        boton.className =
            "boton-ratio";


        boton.innerHTML = `

            <strong>
                ${opcion.nombre}
            </strong>

            <span>
                1:${opcion.ratio}
            </span>

        `;


        if (
            opcion.ratio === ratioActual
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


                actualizarDetalle();

                cargarPreviewPasos();

            }
        );


        opcionesIntensidad.appendChild(boton);

    });

}


// =========================================
// CAFÉ
// =========================================

function cambiarCafe(cantidad) {

    gramosCafe += cantidad;


    if (gramosCafe < 5) {
        gramosCafe = 5;
    }


    if (gramosCafe > 100) {
        gramosCafe = 100;
    }


    actualizarDetalle();

    cargarPreviewPasos();

}


// =========================================
// CÁLCULOS
// =========================================

function obtenerAguaTotal() {

    return Math.round(
        gramosCafe *
        ratioActual
    );

}


function obtenerAguaBloom() {

    const multiplicador =
        metodoActual
            ?.parametros
            ?.bloomMultiplicador
        ?? 3;


    return Math.min(
        Math.round(
            gramosCafe *
            multiplicador
        ),
        obtenerAguaTotal()
    );

}


function obtenerObjetivoAcumulado(porcentaje) {

    return Math.round(
        obtenerAguaTotal() *
        porcentaje
    );

}


function obtenerAguaAnterior(indicePaso) {

    let aguaAnterior = 0;


    for (
        let i = 0;
        i < indicePaso;
        i++
    ) {

        const paso =
            metodoActual.pasos[i];


        if (paso.agua === "bloom") {

            aguaAnterior =
                obtenerAguaBloom();

        }


        if (paso.agua === "acumulado") {

            aguaAnterior =
                obtenerObjetivoAcumulado(
                    paso.porcentaje
                );

        }


        if (
            paso.agua === "restante" ||
            paso.agua === "total"
        ) {

            aguaAnterior =
                obtenerAguaTotal();

        }

    }


    return aguaAnterior;

}


// =========================================
// DATOS DE PASO
// =========================================

function obtenerDatosPaso(
    paso,
    indice
) {

    if (paso.agua === "bloom") {

        const cantidad =
            obtenerAguaBloom();


        return {

            valor:
                `${cantidad} ml`,

            etiqueta:
                "Agua para este paso",

            instruccion:
                `Agrega ${cantidad} ml de agua y humedece todo el café de forma uniforme.`

        };

    }


    if (paso.agua === "restante") {

        const anterior =
            obtenerAguaAnterior(indice);


        const cantidad =
            Math.max(
                obtenerAguaTotal() -
                anterior,
                0
            );


        return {

            valor:
                `${cantidad} ml`,

            etiqueta:
                "Agua restante",

            instruccion:
                `Agrega lentamente los ${cantidad} ml restantes.`

        };

    }


    if (paso.agua === "acumulado") {

        const objetivo =
            obtenerObjetivoAcumulado(
                paso.porcentaje
            );


        const anterior =
            obtenerAguaAnterior(indice);


        const cantidad =
            Math.max(
                objetivo -
                anterior,
                0
            );


        return {

            valor:
                `${objetivo} ml`,

            etiqueta:
                "Objetivo en balanza",

            instruccion:
                `Agrega ${cantidad} ml lentamente hasta llegar a ${objetivo} ml.`

        };

    }


    if (paso.agua === "total") {

        const total =
            obtenerAguaTotal();


        return {

            valor:
                `${total} ml`,

            etiqueta:
                "Agua total",

            instruccion:
                `Agrega ${total} ml de agua.`

        };

    }


    return {

        valor:
            null,

        etiqueta:
            null,

        instruccion:
            paso.instruccion || ""

    };

}


// =========================================
// PREVIEW
// =========================================

function cargarPreviewPasos() {

    listaPasosPreview.innerHTML = "";


    if (
        !metodoActual.pasos ||
        metodoActual.pasos.length === 0
    ) {

        listaPasosPreview.innerHTML = `

            <div class="sin-guia">

                GUÍA / PRÓXIMAMENTE

            </div>

        `;

        return;

    }


    metodoActual.pasos.forEach(
        (paso, indice) => {

            const datos =
                obtenerDatosPaso(
                    paso,
                    indice
                );


            const item =
                document.createElement("div");


            item.className =
                "paso-preview";


            const numero =
                String(indice + 1)
                    .padStart(2, "0");


            let meta =
                "";


            if (paso.tipo === "timer") {

                meta =
                    formatearTiempo(
                        paso.tiempo
                    );

            }


            if (datos.valor) {

                meta +=
                    meta
                        ? ` / ${datos.valor}`
                        : datos.valor;

            }


            item.innerHTML = `

                <span class="paso-numero">
                    ${numero}
                </span>

                <div>

                    <strong>
                        ${paso.nombre}
                    </strong>

                    <p>
                        ${datos.instruccion}
                    </p>

                    <small>
                        ${meta}
                    </small>

                </div>

            `;


            listaPasosPreview.appendChild(item);

        }
    );

}


// =========================================
// INICIAR GUÍA
// =========================================

function iniciarGuia() {

    if (!metodoActual) {
        return;
    }


    if (
        !metodoActual.pasos ||
        metodoActual.pasos.length === 0
    ) {

        alert(
            "La guía de este método estará disponible próximamente."
        );

        return;

    }


    pasoActual = 0;


    guiaMetodo.textContent =
        `${metodoActual.nombre.toUpperCase()} / ${metodoActual.subtitulo.toUpperCase()}`;


    guideSummaryMain.textContent =
        `${gramosCafe} g / ${obtenerAguaTotal()} ml`;


    guideSummaryRatio.textContent =
        `1:${ratioActual}`;


    solicitarWakeLock();


    cargarPaso();


    mostrarVista(vistaGuia);

    actualizarNav("guia");

}


// =========================================
// CARGAR PASO
// =========================================

function cargarPaso() {

    detenerTemporizador();


    const pasos =
        metodoActual.pasos;


    const paso =
        pasos[pasoActual];


    const numero =
        String(pasoActual + 1)
            .padStart(2, "0");


    const total =
        String(pasos.length)
            .padStart(2, "0");


    pasoIndicador.textContent =
        `PASO ${numero} / ${total}`;


    const porcentaje =
        Math.round(
            (
                (pasoActual + 1) /
                pasos.length
            ) *
            100
        );


    pasoPorcentaje.textContent =
        `${porcentaje}%`;


    barraProgresoActiva.style.width =
        `${porcentaje}%`;


    pasoNombre.textContent =
        paso.nombre;


    const datos =
        obtenerDatosPaso(
            paso,
            pasoActual
        );


    pasoInstruccion.textContent =
        datos.instruccion;


    if (datos.valor) {

        objetivoPaso.style.display =
            "flex";


        objetivoPasoValor.textContent =
            datos.valor;


        objetivoPasoEtiqueta.textContent =
            datos.etiqueta;

    }

    else {

        objetivoPaso.style.display =
            "none";

    }


    if (paso.tipo === "timer") {

        segundosRestantes =
            paso.tiempo;

        segundosInicialesPaso =
            paso.tiempo;


        timerGuiado.style.display =
            "block";


        btnControlTimer.style.display =
            "block";


        btnSiguientePaso.style.display =
            "none";


        btnControlTimer.textContent =
            "INICIAR /";


        actualizarDisplayTimer();

        actualizarCirculoTimer();

    }

    else {

        segundosInicialesPaso = 0;

        timerGuiado.style.display =
            "none";


        btnControlTimer.style.display =
            "none";


        btnSiguientePaso.style.display =
            "block";


        btnSiguientePaso.textContent =
            pasoActual === pasos.length - 1
                ? "TERMINAR /"
                : "CONTINUAR /";


        resetearCirculoTimer();

    }

}


// =========================================
// TIMER
// =========================================

function iniciarTimerPaso() {

    if (temporizadorCorriendo) {

        pausarTemporizador();

        return;

    }


    temporizadorCorriendo =
        true;


    btnControlTimer.textContent =
        "PAUSAR /";


    temporizador =
        setInterval(() => {

            segundosRestantes--;


            actualizarDisplayTimer();

            actualizarCirculoTimer();


            if (
                segundosRestantes <= 0
            ) {

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
        "REANUDAR /";

}


function detenerTemporizador() {

    if (temporizador) {

        clearInterval(temporizador);

        temporizador = null;

    }


    temporizadorCorriendo =
        false;

}


// =========================================
// CÍRCULO TIMER
// =========================================

function actualizarCirculoTimer() {

    if (!timerRingProgress) {
        return;
    }


    const longitud =
        578;


    if (
        segundosInicialesPaso <= 0
    ) {

        timerRingProgress.style.strokeDashoffset =
            longitud;

        return;

    }


    const progreso =
        1 -
        (
            segundosRestantes /
            segundosInicialesPaso
        );


    const offset =
        longitud -
        (
            longitud *
            progreso
        );


    timerRingProgress.style.strokeDashoffset =
        offset;

}


function resetearCirculoTimer() {

    if (!timerRingProgress) {
        return;
    }


    timerRingProgress.style.strokeDashoffset =
        578;

}


// =========================================
// DISPLAY
// =========================================

function actualizarDisplayTimer() {

    timerGuiado.textContent =
        formatearTiempo(
            segundosRestantes
        );

}


function formatearTiempo(totalSegundos) {

    const minutos =
        Math.floor(
            totalSegundos / 60
        );


    const segundos =
        totalSegundos % 60;


    return (
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`
    );

}


// =========================================
// TIMER TERMINADO
// =========================================

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


    actualizarCirculoTimer();


    btnControlTimer.style.display =
        "none";


    btnSiguientePaso.style.display =
        "block";


    btnSiguientePaso.textContent =
        pasoActual ===
        metodoActual.pasos.length - 1

            ? "TERMINAR /"
            : "CONTINUAR /";

}


// =========================================
// SIGUIENTE
// =========================================

function avanzarPaso() {

    if (
        pasoActual <
        metodoActual.pasos.length - 1
    ) {

        pasoActual++;

        cargarPaso();

    }

    else {

        finalizarPreparacion();

    }

}


// =========================================
// FINAL
// =========================================

function finalizarPreparacion() {

    detenerTemporizador();

    liberarWakeLock();


    resumenMetodo.textContent =
        metodoActual.nombre;


    resumenCafe.textContent =
        `${gramosCafe} g`;


    resumenAgua.textContent =
        `${obtenerAguaTotal()} ml`;


    resumenRatio.textContent =
        `1:${ratioActual}`;


    mostrarVista(vistaFinal);

    actualizarNav("guia");

}


// =========================================
// WAKE LOCK
// =========================================

async function solicitarWakeLock() {

    try {

        if (
            "wakeLock" in navigator &&
            !wakeLock
        ) {

            wakeLock =
                await navigator
                    .wakeLock
                    .request("screen");

        }

    }

    catch (error) {

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

    }

    catch (error) {

        console.log(error);

    }

}


// =========================================
// EVENTOS
// =========================================

document
    .getElementById("btn-volver-metodos")
    .addEventListener(
        "click",
        () => {

            mostrarVista(vistaMetodos);

            actualizarNav("metodos");

        }
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
    .getElementById("btn-iniciar-guia")
    .addEventListener(
        "click",
        iniciarGuia
    );


document
    .getElementById("btn-salir-guia")
    .addEventListener(
        "click",
        () => {

            detenerTemporizador();

            liberarWakeLock();

            mostrarVista(vistaDetalle);

            actualizarNav("metodos");

        }
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
    .getElementById("btn-volver-inicio")
    .addEventListener(
        "click",
        () => {

            mostrarVista(vistaMetodos);

            actualizarNav("metodos");

        }
    );


// =========================================
// NAV
// =========================================

navMetodos.addEventListener(
    "click",
    () => {

        detenerTemporizador();

        liberarWakeLock();

        mostrarVista(vistaMetodos);

        actualizarNav("metodos");

    }
);


navGuia.addEventListener(
    "click",
    () => {

        if (metodoActual) {

            mostrarVista(vistaDetalle);

            actualizarNav("guia");

        }

        else {

            mostrarVista(vistaMetodos);

            actualizarNav("metodos");

        }

    }
);


navJournal.addEventListener(
    "click",
    () => {

        detenerTemporizador();

        liberarWakeLock();

        mostrarVista(vistaJournal);

        actualizarNav("journal");

    }
);


// =========================================
// VISIBILIDAD
// =========================================

document.addEventListener(
    "visibilitychange",
    async () => {

        if (
            document.visibilityState === "visible" &&
            vistaGuia.classList.contains("activa")
        ) {

            await solicitarWakeLock();

        }

    }
);


// =========================================
// INICIO
// =========================================

cargarMetodos();

actualizarNav("metodos");

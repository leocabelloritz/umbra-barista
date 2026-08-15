let metodoActual = null;

let gramosCafe = 20;
let ratioActual = 16;

let pasoActual = 0;

let temporizador = null;

let temporizadorCorriendo = false;

let segundosRestantes = 0;
let segundosInicialesPaso = 0;

let wakeLock = null;


// =====================================================
// VISTAS
// =====================================================

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


// =====================================================
// DETALLE
// =====================================================

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


// =====================================================
// GUÍA
// =====================================================

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

const pasoTipo =
    document.getElementById("paso-tipo");

const pasoInstruccion =
    document.getElementById("paso-instruccion");

const objetivoPaso =
    document.getElementById("objetivo-paso");

const objetivoPasoValor =
    document.getElementById("objetivo-paso-valor");

const objetivoPasoEtiqueta =
    document.getElementById("objetivo-paso-etiqueta");

const timerCircleControl =
    document.getElementById("timer-circle-control");

const timerGuiado =
    document.getElementById("timer-guiado");

const timerStatus =
    document.getElementById("timer-status");

const timerDisplay =
    document.getElementById("timer-display");

const timerAction =
    document.getElementById("timer-action");

const timerActionLabel =
    document.getElementById("timer-action-label");

const timerRingProgress =
    document.getElementById("timer-ring-progress");


// =====================================================
// FINAL
// =====================================================

const resumenMetodo =
    document.getElementById("resumen-metodo");

const resumenCafe =
    document.getElementById("resumen-cafe");

const resumenAgua =
    document.getElementById("resumen-agua");

const resumenRatio =
    document.getElementById("resumen-ratio");


// =====================================================
// NAV
// =====================================================

const navMetodos =
    document.getElementById("nav-metodos");

const navGuia =
    document.getElementById("nav-guia");

const navJournal =
    document.getElementById("nav-journal");


// =====================================================
// MODO INMERSIVO
// =====================================================

function activarModoGuia() {

    document.body.classList.add(
        "modo-guia"
    );

}


function desactivarModoGuia() {

    document.body.classList.remove(
        "modo-guia"
    );

}


// =====================================================
// NAVEGACIÓN
// =====================================================

function mostrarVista(vista) {

    document
        .querySelectorAll(".vista")
        .forEach(elemento => {

            elemento.classList.remove(
                "activa"
            );

        });


    vista.classList.add(
        "activa"
    );


    const esVistaGuia =
        vista === vistaGuia;


    document.body.classList.toggle(
        "modo-guia",
        esVistaGuia
    );


    window.scrollTo({

        top: 0,

        behavior:
            esVistaGuia
                ? "auto"
                : "smooth"

    });

}


function actualizarNav(nombre) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "activo"
            );

        });


    if (nombre === "metodos") {

        navMetodos.classList.add(
            "activo"
        );

    }


    if (nombre === "guia") {

        navGuia.classList.add(
            "activo"
        );

    }


    if (nombre === "journal") {

        navJournal.classList.add(
            "activo"
        );

    }

}


// =====================================================
// MÉTODOS
// =====================================================

function cargarMetodos() {

    listaMetodos.innerHTML =
        "";


    Object
        .values(METODOS)
        .forEach(metodo => {


            const agua =
                Math.round(

                    metodo.cafeDefault *
                    metodo.ratioDefault

                );


            const boton =
                document.createElement(
                    "button"
                );


            boton.className =
                "tarjeta-metodo";


            boton.type =
                "button";


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

                () => abrirMetodo(
                    metodo.id
                )

            );


            listaMetodos.appendChild(
                boton
            );

        });

}


// =====================================================
// ABRIR MÉTODO
// =====================================================

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


    mostrarVista(
        vistaDetalle
    );


    actualizarNav(
        "metodos"
    );

}


// =====================================================
// DETALLE
// =====================================================

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


// =====================================================
// RATIOS
// =====================================================

function cargarRatios() {

    opcionesIntensidad.innerHTML =
        "";


    metodoActual.ratios.forEach(
        opcion => {


            const boton =
                document.createElement(
                    "button"
                );


            boton.type =
                "button";


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
                opcion.ratio ===
                ratioActual
            ) {

                boton.classList.add(
                    "activo"
                );

            }


            boton.addEventListener(

                "click",

                () => {


                    ratioActual =
                        opcion.ratio;


                    document
                        .querySelectorAll(
                            ".boton-ratio"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "activo"
                            );

                        });


                    boton.classList.add(
                        "activo"
                    );


                    actualizarDetalle();

                    cargarPreviewPasos();

                }

            );


            opcionesIntensidad.appendChild(
                boton
            );

        }
    );

}


// =====================================================
// CANTIDAD DE CAFÉ
// =====================================================

function cambiarCafe(cantidad) {

    gramosCafe +=
        cantidad;


    if (gramosCafe < 5) {

        gramosCafe = 5;

    }


    if (gramosCafe > 100) {

        gramosCafe = 100;

    }


    actualizarDetalle();

    cargarPreviewPasos();

}


// =====================================================
// CÁLCULOS
// =====================================================

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


function obtenerObjetivoAcumulado(
    porcentaje
) {

    return Math.round(

        obtenerAguaTotal() *
        porcentaje

    );

}


function obtenerAguaAnterior(
    indicePaso
) {

    let aguaAnterior =
        0;


    for (
        let i = 0;
        i < indicePaso;
        i++
    ) {

        const paso =
            metodoActual.pasos[i];


        if (
            paso.agua ===
            "bloom"
        ) {

            aguaAnterior =
                obtenerAguaBloom();

        }


        if (
            paso.agua ===
            "acumulado"
        ) {

            aguaAnterior =
                obtenerObjetivoAcumulado(
                    paso.porcentaje
                );

        }


        if (
            paso.agua ===
            "restante" ||
            paso.agua ===
            "total"
        ) {

            aguaAnterior =
                obtenerAguaTotal();

        }

    }


    return aguaAnterior;

}


// =====================================================
// DATOS DEL PASO
// =====================================================

function obtenerDatosPaso(
    paso,
    indice
) {

    if (
        paso.agua ===
        "bloom"
    ) {

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


    if (
        paso.agua ===
        "restante"
    ) {

        const anterior =
            obtenerAguaAnterior(
                indice
            );


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


    if (
        paso.agua ===
        "acumulado"
    ) {

        const objetivo =
            obtenerObjetivoAcumulado(
                paso.porcentaje
            );


        const anterior =
            obtenerAguaAnterior(
                indice
            );


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


    if (
        paso.agua ===
        "total"
    ) {

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


// =====================================================
// PREVIEW DE PASOS
// =====================================================

function cargarPreviewPasos() {

    listaPasosPreview.innerHTML =
        "";


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
                document.createElement(
                    "div"
                );


            item.className =
                "paso-preview";


            const numero =
                String(
                    indice + 1
                ).padStart(
                    2,
                    "0"
                );


            let meta =
                "";


            if (
                paso.tipo ===
                "timer"
            ) {

                meta =
                    formatearTiempo(
                        paso.tiempo
                    );

            }


            if (
                datos.valor
            ) {

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


            listaPasosPreview.appendChild(
                item
            );

        }
    );

}


// =====================================================
// INICIAR GUÍA
// =====================================================

function iniciarGuia() {

    if (
        !metodoActual
    ) {

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


    detenerTemporizador();


    pasoActual =
        0;


    guiaMetodo.textContent =
        `${metodoActual.nombre.toUpperCase()} / ${metodoActual.subtitulo.toUpperCase()}`;


    guideSummaryMain.textContent =
        `${gramosCafe} g / ${obtenerAguaTotal()} ml`;


    guideSummaryRatio.textContent =
        `1:${ratioActual}`;


    mostrarVista(
        vistaGuia
    );


    actualizarNav(
        "guia"
    );


    cargarPaso();


    solicitarWakeLock();

}


// =====================================================
// CARGAR PASO
// =====================================================

function cargarPaso() {

    detenerTemporizador();


    const pasos =
        metodoActual.pasos;


    const paso =
        pasos[pasoActual];


    if (!paso) {

        finalizarPreparacion();

        return;

    }


    const numero =
        String(
            pasoActual + 1
        ).padStart(
            2,
            "0"
        );


    const total =
        String(
            pasos.length
        ).padStart(
            2,
            "0"
        );


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


    pasoTipo.textContent =
        paso.tipo === "timer"
            ? "TEMPORIZADO"
            : "ACCIÓN";


    const datos =
        obtenerDatosPaso(
            paso,
            pasoActual
        );


    pasoInstruccion.textContent =
        datos.instruccion;


    if (
        datos.valor
    ) {

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


    if (
        paso.tipo ===
        "timer"
    ) {

        prepararPasoTemporizado(
            paso
        );

    }

    else {

        prepararPasoAccion();

    }

}


// =====================================================
// PASO TEMPORIZADO
// =====================================================

function prepararPasoTemporizado(
    paso
) {

    detenerTemporizador();


    segundosRestantes =
        Number(paso.tiempo) || 0;


    segundosInicialesPaso =
        segundosRestantes;


    timerStatus.textContent =
        "TIEMPO";


    actualizarDisplayTimer();


    resetearCirculoTimer();


    mostrarAccionCentral(
        "INICIAR"
    );

}


// =====================================================
// PASO SIN TIMER
// =====================================================

function prepararPasoAccion() {

    detenerTemporizador();


    segundosRestantes =
        0;


    segundosInicialesPaso =
        0;


    timerStatus.textContent =
        "ACCIÓN";


    resetearCirculoTimer();


    const ultimoPaso =

        pasoActual ===
        metodoActual.pasos.length - 1;


    mostrarAccionCentral(

        ultimoPaso
            ? "TERMINAR"
            : "CONTINUAR"

    );

}


// =====================================================
// CONTROL CENTRAL
// =====================================================

function manejarControlCircular() {

    if (
        !metodoActual ||
        !metodoActual.pasos
    ) {

        return;

    }


    const paso =
        metodoActual.pasos[
            pasoActual
        ];


    if (!paso) {

        return;

    }


    // PASO SIN TIMER

    if (
        paso.tipo !==
        "timer"
    ) {

        avanzarPaso();

        return;

    }


    // TIMER TERMINADO

    if (
        segundosRestantes <= 0
    ) {

        avanzarPaso();

        return;

    }


    // TIMER CORRIENDO → PAUSA

    if (
        temporizadorCorriendo
    ) {

        pausarTemporizador();

        return;

    }


    // TIMER DETENIDO → INICIAR / REANUDAR

    iniciarTimerPaso();

}


// =====================================================
// TIMER
// =====================================================

function iniciarTimerPaso() {

    if (
        segundosRestantes <= 0 ||
        temporizadorCorriendo
    ) {

        return;

    }


    temporizadorCorriendo =
        true;


    mostrarTiempo();


    timerStatus.textContent =
        "TOCA PARA PAUSAR";


    actualizarDisplayTimer();

    actualizarCirculoTimer();


    temporizador =
        setInterval(

            () => {


                segundosRestantes--;


                if (
                    segundosRestantes < 0
                ) {

                    segundosRestantes =
                        0;

                }


                actualizarDisplayTimer();

                actualizarCirculoTimer();


                if (
                    segundosRestantes <= 0
                ) {

                    finalizarPasoTimer();

                }

            },

            1000

        );

}


// =====================================================
// PAUSAR
// =====================================================

function pausarTemporizador() {

    detenerTemporizador();


    timerStatus.textContent =
        "PAUSADO";


    mostrarAccionCentral(
        "REANUDAR"
    );

}


// =====================================================
// DETENER
// =====================================================

function detenerTemporizador() {

    if (
        temporizador
    ) {

        clearInterval(
            temporizador
        );


        temporizador =
            null;

    }


    temporizadorCorriendo =
        false;

}


// =====================================================
// TIMER FINALIZADO
// =====================================================

function finalizarPasoTimer() {

    detenerTemporizador();


    segundosRestantes =
        0;


    actualizarDisplayTimer();

    completarCirculoTimer();


    if (
        "vibrate" in navigator
    ) {

        navigator.vibrate(
            [
                300,
                150,
                300
            ]
        );

    }


    const ultimoPaso =

        pasoActual ===
        metodoActual.pasos.length - 1;


    mostrarAccionCentral(

        ultimoPaso
            ? "TERMINAR"
            : "CONTINUAR"

    );

}


// =====================================================
// UI DEL CÍRCULO
// =====================================================

function mostrarTiempo() {

    timerAction.style.display =
        "none";


    timerDisplay.style.display =
        "flex";


    timerCircleControl.setAttribute(
        "aria-label",
        "Pausar temporizador"
    );

}


function mostrarAccionCentral(
    texto
) {

    timerDisplay.style.display =
        "none";


    timerAction.style.display =
        "flex";


    timerActionLabel.textContent =
        texto;


    timerCircleControl.setAttribute(
        "aria-label",
        texto
    );

}


// =====================================================
// DISPLAY DE TIEMPO
// =====================================================

function actualizarDisplayTimer() {

    timerGuiado.textContent =
        formatearTiempo(
            segundosRestantes
        );

}


function formatearTiempo(
    totalSegundos
) {

    const total =
        Math.max(
            0,
            Math.round(
                Number(totalSegundos) || 0
            )
        );


    const minutos =
        Math.floor(
            total /
            60
        );


    const segundos =
        total %
        60;


    return (

        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`

    );

}


// =====================================================
// PROGRESO DEL CÍRCULO
// =====================================================

function actualizarCirculoTimer() {

    if (
        !timerRingProgress ||
        segundosInicialesPaso <= 0
    ) {

        return;

    }


    const longitud =
        578;


    const progreso =

        1 -

        (
            segundosRestantes /
            segundosInicialesPaso
        );


    const progresoSeguro =
        Math.min(
            Math.max(
                progreso,
                0
            ),
            1
        );


    const offset =

        longitud -

        (
            longitud *
            progresoSeguro
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


function completarCirculoTimer() {

    if (!timerRingProgress) {

        return;

    }


    timerRingProgress.style.strokeDashoffset =
        0;

}


// =====================================================
// SIGUIENTE PASO
// =====================================================

function avanzarPaso() {

    detenerTemporizador();


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


// =====================================================
// FINAL
// =====================================================

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


    mostrarVista(
        vistaFinal
    );


    actualizarNav(
        "guia"
    );

}


// =====================================================
// WAKE LOCK
// =====================================================

async function solicitarWakeLock() {

    try {

        if (
            "wakeLock" in navigator &&
            !wakeLock
        ) {

            wakeLock =
                await navigator
                    .wakeLock
                    .request(
                        "screen"
                    );

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

        if (
            wakeLock
        ) {

            await wakeLock.release();


            wakeLock =
                null;

        }

    }

    catch (error) {

        console.log(
            error
        );

    }

}


// =====================================================
// EVENTOS
// =====================================================

document
    .getElementById(
        "btn-volver-metodos"
    )
    .addEventListener(

        "click",

        () => {


            detenerTemporizador();

            liberarWakeLock();


            mostrarVista(
                vistaMetodos
            );


            actualizarNav(
                "metodos"
            );

        }

    );


document
    .getElementById(
        "btn-menos"
    )
    .addEventListener(

        "click",

        () => cambiarCafe(
            -1
        )

    );


document
    .getElementById(
        "btn-mas"
    )
    .addEventListener(

        "click",

        () => cambiarCafe(
            1
        )

    );


document
    .getElementById(
        "btn-iniciar-guia"
    )
    .addEventListener(

        "click",

        iniciarGuia

    );


document
    .getElementById(
        "btn-salir-guia"
    )
    .addEventListener(

        "click",

        () => {


            detenerTemporizador();


            liberarWakeLock();


            mostrarVista(
                vistaDetalle
            );


            actualizarNav(
                "metodos"
            );

        }

    );


timerCircleControl
    .addEventListener(

        "click",

        manejarControlCircular

    );


document
    .getElementById(
        "btn-volver-inicio"
    )
    .addEventListener(

        "click",

        () => {


            detenerTemporizador();

            liberarWakeLock();


            mostrarVista(
                vistaMetodos
            );


            actualizarNav(
                "metodos"
            );

        }

    );


// =====================================================
// NAV INFERIOR
// =====================================================

navMetodos.addEventListener(

    "click",

    () => {


        detenerTemporizador();

        liberarWakeLock();


        mostrarVista(
            vistaMetodos
        );


        actualizarNav(
            "metodos"
        );

    }

);


navGuia.addEventListener(

    "click",

    () => {


        detenerTemporizador();

        liberarWakeLock();


        if (
            metodoActual
        ) {

            mostrarVista(
                vistaDetalle
            );


            actualizarNav(
                "guia"
            );

        }

        else {

            mostrarVista(
                vistaMetodos
            );


            actualizarNav(
                "metodos"
            );

        }

    }

);


navJournal.addEventListener(

    "click",

    () => {


        detenerTemporizador();

        liberarWakeLock();


        mostrarVista(
            vistaJournal
        );


        actualizarNav(
            "journal"
        );

    }

);


// =====================================================
// VISIBILIDAD
// =====================================================

document.addEventListener(

    "visibilitychange",

    async () => {


        if (
            document.visibilityState ===
                "visible" &&

            vistaGuia
                .classList
                .contains(
                    "activa"
                )
        ) {

            await solicitarWakeLock();

        }

    }

);


// =====================================================
// INICIO
// =====================================================

cargarMetodos();


mostrarVista(
    vistaMetodos
);


actualizarNav(
    "metodos"
);

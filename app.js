let metodoActual = null;
let gramosCafe = 20;
let ratioActual = 16;

// ELEMENTOS
const vistaInicio = document.getElementById("vista-inicio");
const vistaPreparacion = document.getElementById("vista-preparacion");
const listaMetodos = document.getElementById("lista-metodos");

const metodoNombre = document.getElementById("metodo-nombre");
const metodoCategoria = document.getElementById("metodo-categoria");
const metodoDescripcion = document.getElementById("metodo-descripcion");
const metodoTemperatura = document.getElementById("metodo-temperatura");
const metodoMolienda = document.getElementById("metodo-molienda");

const cantidadCafe = document.getElementById("cantidad-cafe");
const cantidadAgua = document.getElementById("cantidad-agua");
const opcionesIntensidad = document.getElementById("opciones-intensidad");

// NAVEGACIÓN
function mostrarVista(vista) {
    document.querySelectorAll(".vista").forEach(elemento => {
        elemento.classList.remove("activa");
    });

    vista.classList.add("activa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// HOME
function cargarMetodos() {
    listaMetodos.innerHTML = "";

    Object.values(METODOS).forEach(metodo => {
        const boton = document.createElement("button");
        boton.className = "tarjeta-metodo";

        boton.innerHTML = `
            <div>
                <span class="metodo-tipo">${metodo.subtitulo}</span>
                <strong>${metodo.nombre}</strong>
            </div>
            <span class="flecha">→</span>
        `;

        boton.addEventListener("click", () => abrirMetodo(metodo.id));

        listaMetodos.appendChild(boton);
    });
}

// MÉTODO
function abrirMetodo(idMetodo) {
    metodoActual = METODOS[idMetodo];
    gramosCafe = metodoActual.cafeDefault;
    ratioActual = metodoActual.ratioDefault;

    metodoNombre.textContent = metodoActual.nombre;
    metodoCategoria.textContent = metodoActual.subtitulo.toUpperCase();
    metodoDescripcion.textContent = metodoActual.descripcion;
    metodoTemperatura.textContent = metodoActual.temperatura;
    metodoMolienda.textContent = metodoActual.molienda;
    cantidadCafe.textContent = gramosCafe;

    cargarRatios();
    calcularAgua();
    mostrarVista(vistaPreparacion);
}

// RATIOS
function cargarRatios() {
    opcionesIntensidad.innerHTML = "";

    metodoActual.ratios.forEach(opcion => {
        const boton = document.createElement("button");
        boton.className = "boton-ratio";
        boton.textContent = opcion.nombre;

        if (opcion.ratio === metodoActual.ratioDefault) {
            boton.classList.add("activo");
        }

        boton.addEventListener("click", () => {
            ratioActual = opcion.ratio;

            document.querySelectorAll(".boton-ratio").forEach(btn => {
                btn.classList.remove("activo");
            });

            boton.classList.add("activo");
            calcularAgua();
        });

        opcionesIntensidad.appendChild(boton);
    });
}

// CAFÉ / AGUA
function cambiarCafe(cantidad) {
    gramosCafe += cantidad;

    if (gramosCafe < 5) gramosCafe = 5;
    if (gramosCafe > 100) gramosCafe = 100;

    cantidadCafe.textContent = gramosCafe;
    calcularAgua();
}

function calcularAgua() {
    const agua = gramosCafe * ratioActual;
    cantidadAgua.textContent = agua;
}

// EVENTOS
document.getElementById("btn-volver").addEventListener("click", () => {
    mostrarVista(vistaInicio);
});

document.getElementById("btn-menos").addEventListener("click", () => {
    cambiarCafe(-1);
});

document.getElementById("btn-mas").addEventListener("click", () => {
    cambiarCafe(1);
});

document.getElementById("btn-preparar").addEventListener("click", () => {
    alert(`Próximamente iniciaremos la preparación de ${metodoActual.nombre}.`);
});

// INICIO
cargarMetodos();

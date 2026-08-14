const METODOS = {

    francesa: {

        id: "francesa",
        nombre: "Prensa Francesa",
        subtitulo: "Inmersión",

        descripcion:
            "Una preparación simple, envolvente y con mucho cuerpo.",

        temperatura: "92–94 °C",
        molienda: "Gruesa",

        cafeDefault: 20,
        ratioDefault: 16,

        ratios: [
            {
                id: "suave",
                nombre: "Suave",
                ratio: 17
            },
            {
                id: "equilibrado",
                nombre: "Equilibrado",
                ratio: 16
            },
            {
                id: "intenso",
                nombre: "Intenso",
                ratio: 14
            }
        ],

        parametros: {
            bloomMultiplicador: 3
        },

        pasos: [

            {
                nombre: "Bloom",
                tipo: "timer",
                tiempo: 30,
                agua: "bloom"
            },

            {
                nombre: "Vertido",
                tipo: "accion",
                tiempo: 0,
                agua: "restante"
            },

            {
                nombre: "Infusión",
                tipo: "timer",
                tiempo: 240,
                instruccion:
                    "Deja reposar el café sin moverlo."
            },

            {
                nombre: "Prensado",
                tipo: "accion",
                tiempo: 0,
                instruccion:
                    "Baja el émbolo lentamente y de forma constante."
            }

        ]

    },


    v60: {

        id: "v60",
        nombre: "V60",
        subtitulo: "Filtrado",

        descripcion:
            "Una taza limpia, aromática y definida que resalta los matices del café.",

        temperatura: "90–93 °C",
        molienda: "Media",

        cafeDefault: 20,
        ratioDefault: 16,

        ratios: [
            {
                id: "suave",
                nombre: "Suave",
                ratio: 17
            },
            {
                id: "equilibrado",
                nombre: "Equilibrado",
                ratio: 16
            },
            {
                id: "intenso",
                nombre: "Intenso",
                ratio: 15
            }
        ],

        parametros: {
            bloomMultiplicador: 3
        },

        pasos: [

            {
                nombre: "Bloom",
                tipo: "timer",
                tiempo: 45,
                agua: "bloom"
            },

            {
                nombre: "Primer vertido",
                tipo: "accion",
                agua: "acumulado",
                porcentaje: 0.50
            },

            {
                nombre: "Segundo vertido",
                tipo: "accion",
                agua: "acumulado",
                porcentaje: 0.75
            },

            {
                nombre: "Vertido final",
                tipo: "accion",
                agua: "acumulado",
                porcentaje: 1
            },

            {
                nombre: "Drenado",
                tipo: "accion",
                instruccion:
                    "Deja que el agua termine de atravesar el café. Retira el V60 cuando el goteo sea muy lento."
            }

        ]

    },


    aeropress: {

        id: "aeropress",
        nombre: "AeroPress",
        subtitulo: "Presión",

        descripcion:
            "Rápida, versátil y perfecta para experimentar.",

        temperatura: "85–90 °C",
        molienda: "Media fina",

        cafeDefault: 18,
        ratioDefault: 15,

        ratios: [
            {
                id: "suave",
                nombre: "Suave",
                ratio: 16
            },
            {
                id: "equilibrado",
                nombre: "Equilibrado",
                ratio: 15
            },
            {
                id: "intenso",
                nombre: "Intenso",
                ratio: 13
            }
        ],

        parametros: {},

        pasos: [

            {
                nombre: "Infusión",
                tipo: "timer",
                tiempo: 90,
                instruccion:
                    "Agrega toda el agua y mezcla suavemente."
            },

            {
                nombre: "Prensado",
                tipo: "timer",
                tiempo: 30,
                instruccion:
                    "Presiona de forma lenta y constante."
            }

        ]

    },


    moka: {

        id: "moka",
        nombre: "Moka",
        subtitulo: "Presión",

        descripcion:
            "Café concentrado, intenso y clásico.",

        temperatura: "80–90 °C",
        molienda: "Media fina",

        cafeDefault: 18,
        ratioDefault: 10,

        ratios: [
            {
                id: "equilibrado",
                nombre: "Equilibrado",
                ratio: 10
            }
        ],

        parametros: {},

        pasos: []

    }

};

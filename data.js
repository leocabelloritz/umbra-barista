const METODOS = {

    francesa: {

        id: "francesa",

        nombre: "Prensa Francesa",

        subtitulo: "Inmersión",

        descripcion:
            "Cuerpo completo, textura envolvente y una preparación simple de repetir.",

        temperatura:
            "92–94 °C",

        molienda:
            "Gruesa",

        cafeDefault:
            20,

        ratioDefault:
            16,

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

                nombre:
                    "Bloom",

                tipo:
                    "timer",

                tiempo:
                    30,

                agua:
                    "bloom"

            },

            {

                nombre:
                    "Vertido",

                tipo:
                    "accion",

                agua:
                    "restante"

            },

            {

                nombre:
                    "Infusión",

                tipo:
                    "timer",

                tiempo:
                    240,

                instruccion:
                    "Deja reposar el café sin moverlo."

            },

            {

                nombre:
                    "Prensado",

                tipo:
                    "accion",

                instruccion:
                    "Baja el émbolo lentamente y de forma constante."

            }

        ]

    },


    v60: {

        id:
            "v60",

        nombre:
            "V60",

        subtitulo:
            "Filtrado",

        descripcion:
            "Limpio, brillante y balanceado. Ideal para descubrir los matices del café.",

        temperatura:
            "90–93 °C",

        molienda:
            "Media",

        cafeDefault:
            20,

        ratioDefault:
            16,

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

                nombre:
                    "Bloom",

                tipo:
                    "timer",

                tiempo:
                    45,

                agua:
                    "bloom"

            },

            {

                nombre:
                    "Primer vertido",

                tipo:
                    "accion",

                agua:
                    "acumulado",

                porcentaje:
                    0.50

            },

            {

                nombre:
                    "Segundo vertido",

                tipo:
                    "accion",

                agua:
                    "acumulado",

                porcentaje:
                    0.75

            },

            {

                nombre:
                    "Vertido final",

                tipo:
                    "accion",

                agua:
                    "acumulado",

                porcentaje:
                    1

            },

            {

                nombre:
                    "Drenado",

                tipo:
                    "accion",

                instruccion:
                    "Deja que el agua termine de atravesar el café. Retira el V60 cuando el goteo sea muy lento."

            }

        ]

    },


    aeropress: {

        id:
            "aeropress",

        nombre:
            "AeroPress",

        subtitulo:
            "Presión",

        descripcion:
            "Versátil, rápida e intensa. Una base perfecta para experimentar.",

        temperatura:
            "85–90 °C",

        molienda:
            "Media fina",

        cafeDefault:
            18,

        ratioDefault:
            15,

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

                nombre:
                    "Agua",

                tipo:
                    "accion",

                agua:
                    "total"

            },

            {

                nombre:
                    "Mezcla",

                tipo:
                    "accion",

                instruccion:
                    "Mezcla suavemente durante unos segundos."

            },

            {

                nombre:
                    "Infusión",

                tipo:
                    "timer",

                tiempo:
                    90,

                instruccion:
                    "Deja infusionar el café."

            },

            {

                nombre:
                    "Prensado",

                tipo:
                    "timer",

                tiempo:
                    30,

                instruccion:
                    "Presiona lentamente y de forma constante."

            }

        ]

    },


    moka: {

        id:
            "moka",

        nombre:
            "Moka",

        subtitulo:
            "Presión",

        descripcion:
            "Concentrado, intenso y clásico. Preparación guiada próximamente.",

        temperatura:
            "80–90 °C",

        molienda:
            "Media fina",

        cafeDefault:
            18,

        ratioDefault:
            10,

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

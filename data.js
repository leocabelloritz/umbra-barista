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

        pasos: [

            {
                nombre: "Bloom",
                tipo: "timer",
                tiempo: 30,
                instruccion:
                    "Agrega una pequeña cantidad de agua y humedece todo el café."
            },

            {
                nombre: "Vertido",
                tipo: "accion",
                tiempo: 0,
                instruccion:
                    "Agrega lentamente el resto del agua."
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
            "Una taza limpia y definida que resalta los matices del café.",

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

        pasos: [

            {
                nombre: "Bloom",
                tipo: "timer",
                tiempo: 30,
                instruccion:
                    "Humedece todo el café y espera."
            },

            {
                nombre: "Vertido",
                tipo: "timer",
                tiempo: 150,
                instruccion:
                    "Agrega el agua lentamente en movimientos circulares."
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

        pasos: [

            {
                nombre: "Infusión",
                tipo: "timer",
                tiempo: 90,
                instruccion:
                    "Agrega el agua, mezcla suavemente y espera."
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

        pasos: []

    }

};

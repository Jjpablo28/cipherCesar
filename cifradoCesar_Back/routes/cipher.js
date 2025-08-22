const express = require("express");
const router = express.Router();

// Función de cifrado César
function cesar(text, shift) {
    const abc = "abcdefghijklmnopqrstuvwxyz";
    const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return text
        .split("")
        .map((char) => {
            if (abc.includes(char)) {
                let pos = (abc.indexOf(char) + shift) % 26;
                if (pos < 0) pos += 26;
                return abc[pos];
            } else if (mayus.includes(char)) {
                let pos = (mayus.indexOf(char) + shift) % 26;
                if (pos < 0) pos += 26;
                return mayus[pos];
            }
            return char; // deja espacios, números y símbolos igual
        })
        .join("");
}

// Encriptar (POST → /api/cipher/encriptar)
router.post("/encriptar", (req, res) => {
    console.log("Body recibido en /encriptar:", req.body);

    const { palabra, clave } = req.body;
    const claveNum = parseInt(clave, 10);

    if (!palabra || isNaN(claveNum)) {
        return res
            .status(400)
            .json({ error: "Debes enviar {palabra: string, clave: number}" });
    }

    const resultado = cesar(palabra, claveNum);

    console.log(`Encriptación: "${palabra}" con clave ${claveNum} → "${resultado}"`);

    res.json({ original: palabra, clave: claveNum, encriptado: resultado });
});


router.post("/desencriptar", (req, res) => {
    console.log("Body recibido en /desencriptar:", req.body);

    const { palabra, clave } = req.body;
    const claveNum = parseInt(clave, 10);

    if (!palabra || isNaN(claveNum)) {
        return res
            .status(400)
            .json({ error: "Debes enviar {palabra: string, clave: number}" });
    }

    const resultado = cesar(palabra, -claveNum);

    console.log(`Desencriptación: "${palabra}" con clave ${claveNum} → "${resultado}"`);

    res.json({ original: palabra, clave: claveNum, desencriptado: resultado });
});

// Endpoint GET de prueba (para navegador)
router.get("/test", (req, res) => {
    res.json({ mensaje: "Ruta de Cifrado César activa" });
});

module.exports = router;

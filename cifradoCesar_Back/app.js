var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");

var cipherRouter = require("./routes/cipher");

var app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Habilitar CORS para todas las IPs y dominios
app.use(cors()); //  ahora acepta peticiones desde cualquier URL

// Si quieres restringirlo solo a ciertos orígenes, usa:
// app.use(cors({ origin: ["http://localhost:4200", "http://miapp.com"] }));

// Rutas
app.use("/api/cipher", cipherRouter);

// catch 404
app.use(function (req, res, next) {
    res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;

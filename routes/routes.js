const express = require("express");
const routes = express.Router();
const { rendeIndex,
    agregarInscripto,
    rendeAdmin,
    rendeLoginAdmin,
    rendeLoginPrimero,
    rendeLoginSegundo,
    rendeLoginTercero,
    agregarInscriptoAdmin,
    eliminarInscripto,
    rendeRegistro,
    guardarRegistro,
    autorizacion,
    loguearse
} = require("../controllers/controllers")

routes.get("/", rendeIndex );

routes.post("/", agregarInscripto);

routes.get("/registroAdmin", rendeRegistro);
routes.post("/registroAdmin", guardarRegistro);

routes.get("/administrador", rendeAdmin);
routes.post("/administrador", autorizacion);

routes.get("/loginAdmin", loguearse, rendeLoginAdmin);

routes.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect("./administrador")
    })
});

routes.get("/plano1", rendeLoginPrimero);

routes.get("/plano2", rendeLoginSegundo);
routes.post("/plano2", agregarInscriptoAdmin);

routes.get("/plano3", rendeLoginTercero);
routes.post("/plano3", eliminarInscripto);


module.exports = routes
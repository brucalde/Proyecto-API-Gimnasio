const databaseConnection = require("../config/db");
const bcryptjs = require("bcryptjs");


const rendeIndex = (req, res) => {
    res.render("./index")
};

const agregarInscripto = (req, res) => {

    const { name, surname, opcion } = req.body;

    if (name && surname && opcion) {
        databaseConnection.query('INSERT INTO inscriptos (nombre, apellido, rutina) VALUES ( ?, ?, ?)', [name, surname, opcion], (error, data) => {
            if (error) {
                console.log(error)
            } else {
                res.render("./index", {
                    alert: true,
                    alertTitle: "Inscripto correctamente",
                    alertMessage: "Bienvenido, en breve será contactado",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 4000,
                    ruta: "./gimnasio"
                })
                // res.redirect("/")
            }
        })
        
    } else {
         res.render("./index", {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Porfavor complete todos los campos",
            alertIcon: "warning",
            showConfirmButton: false,
            timer: 4000,
            ruta: "./gimnasio"
        })
    }

}

const rendeRegistro = (req, res) => {
    res.render("./registrarse.ejs")
}

const guardarRegistro = (req, res) => {
    const nombre = req.body.name;
    const usuario = req.body.usuario;
    const password = req.body.password;


    databaseConnection.query('INSERT INTO usuarios SET ?', { nombre, usuario, password }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.send("registro correcto")
        }
    });
    
}

const rendeAdmin = ( req , res) => {
    res.render("./administrador")
}

const autorizacion = async (req, res) => {
    const usuario = req.body.user;
    const password = req.body.password;

    // let passwordHaash = await bcryptjs.hash(password, 8);

    if (usuario && password) {
        databaseConnection.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password],(error, data) => {
            if (data.length == 0 || !usuario || !password)  {
                res.render("./administrador", {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectas",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 3500,
                    ruta: "./gimnasio/administrador"
                })
            } else {
                req.session.loggedin = true;
                req.session.nombre = data[0].nombre;
                res.render("./administrador", {
                    alert: true,
                    alertTitle: "Logeado correctamente",
                    alertMessage: "Bienvenido",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1700,
                    ruta: "./gimnasio/loginAdmin"
                })
            }
            
        })

    } else {
        res.render("./administrador", {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Porfavor complete los campos",
            alertIcon: "warning",
            showConfirmButton: false,
            timer: 3000,
            ruta: "./gimnasio/administrador"
        })
    }
}

const loguearse = (req, res) => {
    if (req.session.loggedin) {
        res.render("./loginadmin/index", {
            login: true,
            nombre: req.session.nombre
        })
    } else {
        res.send("No Autorizado.")
    }
};

const rendeLoginAdmin = (req, res) => {
    res.render("./loginadmin/index")
};

const rendeLoginPrimero = (req, res) => {

    databaseConnection.query('SELECT * FROM inscriptos', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            res.render("./loginadmin/plano1", {
                data
            })
        }
    })
}

const rendeLoginSegundo = (req, res) => {
    res.render("./loginadmin/plano2")
}

const agregarInscriptoAdmin = (req, res) => {

    const { name, surname, opcion } = req.body;

    databaseConnection.query('INSERT INTO inscriptos (nombre, apellido, rutina) VALUES ( ?, ?, ?)', [name, surname, opcion], (error, data) => {
        if (error) {
            console.log(error)
        }else{
            res.redirect("/loginAdmin")
        }
    })
}

const rendeLoginTercero = (req, res) => {
    res.render("./loginadmin/plano3")
}

const eliminarInscripto = (req, res) => {
    const { name, surname, id } = req.body;

    databaseConnection.query('DELETE FROM inscriptos WHERE id = ? AND nombre = ? AND apellido = ?', [id, name, surname], (error, data) => {
         if (error) {
            console.log(error)
         } else {
            //  res.send('ok')
            res.redirect("/loginAdmin")
        }
    })
}

module.exports = {
    rendeIndex,
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
}
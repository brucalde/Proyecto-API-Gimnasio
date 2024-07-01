const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const routes = require("./routes/routes");
const databaseConnection = require("./config/db");
const session = require('express-session');


app.set("port", process.env.PORT || 2020);

// Express session

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

// Middelwares

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Database connection

databaseConnection.connect();


// Routes

app.use("/gimnasio", routes)


// Connected

server.listen(app.get("port"), () => {
    console.log("Servidor creado en el puerto :" + app.get("port"))
});






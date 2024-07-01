const mysql = require("mysql2");

const databaseConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "03-gimnasioproyecto"
});


databaseConnection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Servidor conectado a MSQL')
    }
});

module.exports = databaseConnection;
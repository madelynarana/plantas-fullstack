const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// Middleware para recibir JSON
app.use(
    express.json()
);

// Configuración de conexión a PostgreSQL
const conexionBD = new Pool({
    user: "postgres",     
    host: "localhost",
    database: "plantasBD", 
    password: "password",
    port: 5432,
});


// Ruta para insertar persona
app.post("/personas", async (req, res) => {
    const { nombre, apellido } = req.body;
    try {
        const result = await conexionBD.query(
            `INSERT INTO persona (nombre, apellido) VALUES ($1, $2) RETURNING *`,
            [nombre, apellido]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error insertando persona:", error);
        res.status(500).json({ error: "Error al insertar persona" });
    }
});

// Ruta para listar personas
app.get("/personas", async (req, res) => {
    try {
        const result = await conexionBD.query("SELECT * FROM persona ORDER BY id ASC");
        res.json(
            result.rows
        );
    } catch (error) {
        console.error("Error listando personas:", error);
        res.status(500).json({ error: "Error al listar personas" });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

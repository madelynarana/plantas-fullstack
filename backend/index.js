const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;


app.use(cors());

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

// Ruta para listar destalle de plantas
app.get("/plantas", async (req, respuesta) => {
  try {
    const query = await conexionBD.query("select * from plant_detail order by entity_id asc");
    respuesta.json(
      query.rows
    );
  } catch (error) {
    console.error("Error en obtener las plantas:", error);
    respuesta.status(500)
      .json({
        error: "Error al obtener plantas."
      });
  }
});

// Ruta para buscar planta por id
app.get("/planta/:id", async (req, respuesta) => {
  try {
    const { id } = req.params;
    const query = await conexionBD.query(
      "SELECT * FROM plant_detail WHERE entity_id = $1",
      [id]
    );
    if (query.rows.length === 0) {
      return respuesta.status(404).json({ error: "Planta no encontrada" });
    }
    respuesta.json(query.rows[0]);
  } catch (error) {
    console.error(error);
    respuesta.status(500).json({ error: "Error al obtener planta" });
  }
});

// Ruta para actualizar planta por id
app.put("/planta/:id", async (req, respuesta) => {
  const entity_id = req.params.id;
  const { name, taxonomy, image_url } = req.body;

  try {
    const query = await conexionBD.query(
      `UPDATE plant_detail
      SET name = $1, taxonomy = $2::jsonb, image_url = $3, status='U'
      WHERE entity_id = $4
       RETURNING *`,
      [name, JSON.stringify(taxonomy), image_url, entity_id]
    );

    if (query.rows.length === 0) {
      return respuesta.status(404).json({ error: "Planta no encontrada" });
    }

    respuesta.json(query.rows[0]);
  } catch (err) {
    respuesta.status(500).json({ error: err.message });
  }
});


// Ruta para insertar planta 
app.post("/planta", async (req, respuesta) => {
  const plantas = req.body;
  if (!Array.isArray(plantas) || plantas.length === 0) {
    return res.status(400).json({ error: "No se enviaron plantas" });
  }

  try {
    const values = [];
    const placeholders = plantas.map((p, i) => {
      const idx = i * 4; // 4 columnas por planta: entity_id, name, taxonomy, image_url
      values.push(p.entity_id, p.name, JSON.stringify(p.taxonomy), p.image.value);
      return `($${idx + 1}, $${idx + 2}, $${idx + 3}::jsonb, $${idx + 4}, 'C')`;
    });

    const queryText = `
      INSERT INTO plant_detail(entity_id, name, taxonomy, image_url, status)
      VALUES ${placeholders.join(", ")}
      ON CONFLICT (entity_id) DO NOTHING
      RETURNING *;
    `;

    const result = await conexionBD.query(queryText, values);
    respuesta.json(result.rows);
  } catch (err) {
    respuesta.status(500).json({ error: err.message });
  }
});

// Ruta para listar destalle de plantas
app.get("/familia", async (req, respuesta) => {
  try {
    const query =
      await conexionBD.query(`SELECT taxonomy->>'family' AS family, COUNT(*) AS total
        FROM plant_detail
        GROUP BY taxonomy->>'family'
        ORDER BY total Asc`);
    respuesta.json(
      query.rows
    );
  } catch (error) {
    console.error("Error en obtener las plantas:", error);
    respuesta.status(500)
      .json({
        error: "Error al obtener plantas."
      });
  }
});

app.listen(
  port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });

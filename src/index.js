import express from "express";
import { mysqlConnection } from "./db.js";

const app = express();
const port = 5600;
app.use(express.json()); //To convert data received into json

app.get("/", (req, res) => {
  try {
    mysqlConnection.query("SELECT * FROM animal;", (err, results, fields) => {
      if (results.length !== 0) return res.json(results);
      console.log(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde." });
  }
});
app.post("/add-animal", (req, res) => {
  try {
    const { animal_name, animal_specie } = req.body;
    mysqlConnection.query("INSERT INTO animal (animal_name, animal_specie) VALUES (?, ?);", [animal_name, animal_specie], (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde." });
      }
      return res.status(200).json({ message: "Los datos se han registrado correctamente." });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde." });
  }
});
app.put("/update-animal", (req, res) => {
  try {
    const { animal_id, animal_name, animal_specie } = req.body;

    mysqlConnection.query("UPDATE animal SET animal_name = ?, animal_specie = ? WHERE animal_id = ?;", [animal_name, animal_specie, animal_id], (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde." });
      }
      if (results.affectedRows == 0) return res.status(404).json({ message: "No existen datos con estos parámetros." });
      return res.status(200).json({ message: "Los datos han sido actualizados." });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde." });
  }
});
app.delete("/delete-animal", (req, res) => {
  try {
    mysqlConnection.query("DELETE FROM animal WHERE animal_id = ?", req.body.animal_id, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde." });
      }
      if (results.affectedRows == 0) return res.status(404).json({ message: "No existen datos con estos parámetros." });
      return res.status(200).json({ message: "Los datos se han eliminado." });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Ha ocurrido un error, intenta mas tarde." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

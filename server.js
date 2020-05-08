const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  try {
    let idNum = db.length;

    const body = req.body;

    Object.assign(body, { id: idNum });

    db.push(body);

    dbString = JSON.stringify(db);

    fs.writeFile("db/db.json", dbString, "utf8", function (err) {
      if (err) throw err;
    });

    res.json(body);
  } catch (err) {
    console.log("You have an error");
    console.log(err);
  }
});

app.delete("/api/notes/:id", function (req, res) {
    let currentNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let ID = req.params.id;
    notesJSON = currentNotes.filter((current) => {
      return current.id != ID;
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(notesJSON));
    res.json(notesJSON);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});

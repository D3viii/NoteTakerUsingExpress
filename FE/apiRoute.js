var index = require("./index")
var dbFile = require("db.json")


app.get("/api/notes", function(req, res) {
    res.json(dbFile)
})

app.post("/api/notes", function(req, res) {
    res.json(dbFile)
})
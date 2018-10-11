const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("hello tere YOU"));

// Listening PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
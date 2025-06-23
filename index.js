const express = require("express");
const app = express();
app.get("/", function(_, response) {
	response.send("<h1>Привет, Октагон!</h1>");
});
app.listen(3000);
const express = require("express");
const app = express();

app.get("/", function(_, res) { res.send("<h1>Привет, Октагон!</h1>"); });

app.use("/static", function(_, res) {
	const data = {
		header: 'Hello',
		body: 'Octagon NodeJS Test'
	};
	res.json(data);
});

app.use("/dynamic", function(_, res) {
	const a = _.query.a, b = _.query.b, c = _.query.c;
	const error = {
		header: 'Error'
	};
	if (isNaN(a) || isNaN(b) || isNaN(c) || !a || !b || !c)
		return res.json(error);
	const data = {
		header: 'Calculated',
		body: a*b*c/3
	};
	res.json(data);
});

app.listen(3000);
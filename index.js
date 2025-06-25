const mysql = require("mysql2");
const express = require("express");
const app = express();

const pool = mysql.createPool({
	connectionLimit: 5,
	host: "localhost",
	user: "root",
	database: "chatbottests",
	password: ""
});

app.get("/", function(_, res) { res.send("<h1>Привет, Октагон!</h1>"); });

app.get("/getAllItems", function(_, res) {
	pool.query("SELECT * FROM items", function (err, data) {
		if (err) return res.json(err.message);
		if (!data) return res.json({});
		res.json(data);
	});
});

app.get("/addItem", function(_, res) {
	const name = _.query.name, desc = _.query.desc;
	const html = `
	<!DOCTYPE html>
    <html><body>
        <form id="autoform" method="POST" action="/addItem?name=${name}&desc=${desc}">
            <input type="hidden" name="dummyField" value="true"></form>
        <script>document.getElementById("autoform").submit();</script>
    </body></html>
	`;
	res.send(html);
});
app.post("/addItem", function(_, res) {
	const name = _.query.name, desc = _.query.desc;
	if (name === null || name === "undefined" || name === undefined || name == "" ||
		desc === null || desc === "undefined" || desc === undefined || desc == "")
		return res.json(null);
	pool.query("INSERT INTO items(`name`, `desc`) VALUES (?, ?)", [name, desc], function (err, data) {
		if (err) return res.json(err.message);
		res.json({ message: "element(-s) added", name, desc });
	});
});

app.get("/deleteItem", function(_, res) {
	const id = _.query.id;
	const html = `
    <!DOCTYPE html>
    <html><body>
        <form id="autoform" method="POST" action="/deleteItem?id=${id}">
            <input type="hidden" name="dummyField" value="true"></form>
        <script>document.getElementById("autoform").submit();</script>
    </body></html>
    `;
	res.send(html);
});
app.post("/deleteItem", function(_, res) {
	const id = _.query.id;
	if (isNaN(id))
		return res.json(null);
	pool.query("DELETE FROM items WHERE id=?", [id], function (err, data) {
		if (err) return res.json(err.message);
		if (data.affectedRows === 0) return res.json({});
		res.json({ message: "element deleted", id });
	});
});

app.get("/updateItem", function(_, res) {
	const id = _.query.id, name = _.query.name, desc = _.query.desc;
	const html = `
    <!DOCTYPE html>
    <html><body>
        <form id="autoform" method="POST" action="/updateItem?id=${id}&name=${name}&desc=${desc}">
            <input type="hidden" name="dummyField" value="true"></form>
        <script>document.getElementById("autoform").submit();</script>
    </body></html>
    `;
	res.send(html);
});
app.post("/updateItem", function(_, res) {
	const id = _.query.id, name = _.query.name, desc = _.query.desc;
	if (isNaN(id) ||
		name === undefined || name === "undefined" || name === "" || name === null ||
		desc === undefined || desc === "undefined" || desc === "" || desc === null)
		return res.json(null);
	pool.query("UPDATE items SET name=?, `desc`=? WHERE id=?", [name, desc, id], function (err, data) {
		if (err) return res.json(err.message);
		if (data.affectedRows === 0) return res.json({});
		res.json({ message: "element(-s) updated", id, name, desc });
	});
});

const server = app.listen(3000);

process.on('SIGINT', async () => {
	console.log("shutting down");
	await pool.end();
	server.close(() => process.exit(0));
});
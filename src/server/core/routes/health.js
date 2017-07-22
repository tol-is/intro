module.exports = (app, db) => {

	app.get("/health", (req, res) => res.sendStatus(200));

};

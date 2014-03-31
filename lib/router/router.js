exports.setup = function(app, express) {
    // Static routes
    app.use('/app', express.static(global.config.appDir))

    // App entry point
    app.get('/', function(req, res) {
        res.render(global.config.appDir +'/views/landing.html');
    });
}

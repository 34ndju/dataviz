module.exports = function(express, app, bodyParser, path) {
    
    //home/welcome page
    app.get('/', function(req, res) {
        res.render('home');
    })
}
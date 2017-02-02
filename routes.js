module.exports = function(express, app, bodyParser, path) {
    
    //home/welcome page
    app.get('/', function(req, res) {
        res.render('home');
    })
    
    app.get('/sampleJSONData', function(req, res) {
        res.send([{
            x: 34,
            y: 21
        },
        {
            x: 28,
            y: 78
        },
        {
            x: 12,
            y: 61
        },
        {
            x: 90,
            y: 10
        }])
    })
}
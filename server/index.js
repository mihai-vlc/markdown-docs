var express = require('express');
var app = express();
var config = require('./config');
var hoganExpress = require('hogan-express');
var path = require('path');
var docsViewer = require('../app/docs-viewer');

app.use('/assets', express.static('public/assets'));
app.use('/uploads', express.static('public/uploads'));

// use hogan-express to render the templates
app.set('view engine', 'html');
app.set('layout', 'layout');
app.set('partials', {'navigation' : 'partials/navigation'});
// app.enable('view cache');
app.set('views', path.join(config.theme, 'templates'));
app.engine('html', hoganExpress);

// handle the pages requests
app.get('*', function(req, res){
    var page;

    if (req.query.search) {
        // do the search logic
        page = docsViewer.searchPages(req.query.search);

    } else if (req.params[0]) {
        // render the documentation page
        page = docsViewer.getPage(req.params[0]);

    } else {
        // index page
        page = docsViewer.getHomePage();
    }

    res.render(page.template, page);

});

// start the server
var server = app.listen(config.port, function () {
    var info = server.address();

    console.log('Example app listening at http://%s:%s', 'localhost', info.port);
});

